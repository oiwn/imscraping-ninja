+++
date = "2026-03-12"
title = "Building a Full-Stack Rust Web App with Leptos: From NASA Data to Production"
description = "How exodata.space was built with Leptos, Axum, Polars, and Tokio, including the single-vCPU SSR streaming deadlock and its fix."
keywords = "rust, leptos, axum, polars, tokio, ssr, nasa exoplanet archive"
tags = ["rust", "leptos", "webdev", "ssr", "axum", "polars"]
+++

## Full-Stack Rust Web App with Leptos: Exoplanets Catalog

Over the past few months, I've been building [exodata.space](https://exodata.space), an interactive catalog for exploring the NASA Exoplanet Archive. It lets you browse stellar hosts and exoplanets through a web UI or query them programmatically via a REST API. I also wanted to build something like a data provider that allows fast and efficient queries over the API.

This wasn't just about making a useful tool. I wanted to test whether the Rust ecosystem is actually ready for full-stack web development.

## The Stack

Here's what I ended up with:

- **Leptos** for the frontend, a reactive framework that compiles to WASM and supports server-side rendering
- **Axum** for the backend, a small and composable HTTP server from the Tokio project
- **Polars** for in-memory data processing
- **utoipa** for automatic OpenAPI and Swagger documentation
- **Tailwind CSS** for styling, which let me avoid writing custom CSS almost entirely
- **Tokio** as the async runtime powering everything

## How I Built It

Of course I used LLMs, mostly GLM-4.7 and GLM-5.

The development happened roughly in this order:

1. **Downloaded data from NASA** and figured out how to read VOTable format
2. **Built CLI tools** to explore and understand the data structure
3. **Tried Postgres** because working with VOTables directly for analysis was awkward, but I quickly realized it was overkill and would make deployment harder
4. **Found Polars** and realized the Parquet files were only a few hundred megabytes, so I could keep the whole dataset in memory even on a small DigitalOcean instance
5. **Wrote converters** for VOTable to Parquet plus metadata extraction
6. **Built the Leptos app**, which became relatively straightforward after the data layer was sorted
7. **Set up infrastructure** with OpenTofu for the DigitalOcean droplet and Ansible for setup and deployment
8. **Fixed bugs and iterated**, especially the SSR rendering issue described below

## Key Technical Decisions

### In-Memory Data with Polars

The NASA Exoplanet Archive contains tens of thousands of records, including duplicates from different instruments:

- **Stellar hosts:** ~46,887 records
- **Exoplanets:** ~39,119 records

I realized I could load the entire dataset into memory at startup and query it instantly, with no database needed. The full dataset in Parquet form is only a few hundred megabytes.

Polars turned out to be perfect for this. It's a DataFrame library, roughly "pandas but faster and in Rust", and it supports both a sane API for data manipulation and plain SQL queries:

```rust
let mut ctx = SQLContext::new();
ctx.register("stellarhosts", stellarhosts_df.lazy());
ctx.register("exoplanets", exoplanets_df.lazy());
let df = ctx.execute(&query)?.limit(limit).collect()?;
```

([Full SQL handler code](https://github.com/oiwn/exoplanets-catalog/blob/main/src/server/handlers.rs))

### VOTable Parsing

NASA provides data in VOTable format, an XML-based standard for astronomical data. The Rust astronomy community has been building useful tools, including the `votable` parser crate from [cds-astro](https://github.com/cds-astro/cds-votable-rust). This let me ingest the data without writing custom XML parsing code.

([VOTable loader code](https://github.com/oiwn/exoplanets-catalog/blob/main/crates/exo-cli/src/votable_loader.rs))

### Server-Side Rendering with Leptos

Leptos supports multiple SSR modes. I went through a few iterations:

- Started with `SsrMode::OutOfOrder` for streaming
- Tried `SsrMode::Async` thinking it would help with timeouts
- Eventually settled back on `OutOfOrder` as the right approach

SSR was important for SEO and initial page load performance. Users see content immediately while WASM hydrates in the background.

#### The Big Obstacle: SSR Streaming Deadlock

This was the most frustrating bug I encountered during the project.

**The symptom:** In production, table routes would hang mid-stream. The browser received about 50 KB of HTML, basically the page shell plus a loading spinner, then stalled with `ERR_INCOMPLETE_CHUNKED_ENCODING`. Everything worked fine locally. The REST API worked fine. Simple pages like `/about` worked fine.

**The investigation:** I added logging, reproduced locally with `docker run --cpus=1`, and tested routes systematically:

| Test | Result |
|------|--------|
| `GET /rest/exoplanets` (direct JSON) | 1.7 ms |
| `GET /about` (SSR, no `Resource`) | instant |
| `GET /exoplanets` (SSR, with `Resource`) | hangs |

The pattern was clear: routes with Leptos `Resource` components were hanging.

**The root cause:** My production server is a DigitalOcean `s-1vcpu-2gb` droplet with one virtual CPU. `#[tokio::main]` defaults the number of worker threads to the number of CPUs, so on a 1-vCPU machine Tokio created exactly one worker thread.

Leptos SSR rendering does substantial synchronous work between await points. Meanwhile, I was using `spawn_blocking` for Polars data processing. When that blocking work completed and tried to wake up the `JoinHandle`, there was no free worker thread to pick it up. The single thread was busy rendering, the resource future never resumed, and the stream hung.

**The fix:** After discussing it with people in the Rust community, the fix was simply to force more worker threads regardless of CPU count:

```rust
#[tokio::main(flavor = "multi_thread", worker_threads = 4)]
async fn main() {
```

With four threads on one CPU, the OS scheduler can still interleave them. Wakeups get handled while rendering continues elsewhere, and the deadlock disappears.

**Lesson:** If you're deploying async Rust on a low-CPU VPS, explicitly set the Tokio worker thread count. The default can become a footgun on single-CPU machines.

### Tailwind CSS

Tailwind let me build a decent-looking interface by composing utility classes. Components end up looking like this:

```html
<div class="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg">
```

No custom CSS file was needed beyond a few Tailwind configuration tweaks.

## What Worked Well

- **Server functions:** call Rust functions directly from frontend components with no REST boilerplate
- **Shared types between frontend and backend:** no DTO drift and no TypeScript definitions to maintain
- **Leptos reactivity:** once signals and resources click, the mental model is clean
- **utoipa:** annotate handlers and get Swagger UI for free
- **Polars performance:** genuine sub-millisecond queries on the full dataset
- **Cargo ecosystem:** formatting, linting, and testing all feel integrated

## Conclusion

The Rust full-stack ecosystem is ready for production. Leptos handles SSR well, shared types simplify development, and the async tooling around Tokio and Axum is mature.

If you're considering Rust for web development with LLM assistance, Rust's type system and restrictive compiler work surprisingly well with LLMs. For this kind of software you don't need to start with complex lifetime-heavy designs. You can build something straightforward first, then refactor bottlenecks later if they're real.

## Links

- [Live Demo](https://exodata.space)
- [GitHub Repository](https://github.com/oiwn/exoplanets-catalog)
- [API Documentation](https://exodata.space/swagger-ui)
