+++
date = "2026-03-30"
title = "Cutting WASM Bundle Size by 55% with Leptos Lazy Routes"
description = "How I split a 1.2 MB WASM bundle into a 535 KB main chunk with on-demand loading per route using Leptos 0.8 lazy routes."
keywords = "rust, leptos, wasm, code splitting, lazy routes, web performance"
tags = ["rust", "leptos", "wasm", "webdev", "performance"]
+++

## Cutting WASM Bundle Size by 55% with Leptos Lazy Routes

[exodata.space](https://exodata.space) ships as a single WASM binary. After maxing out compiler-level optimizations (`opt-level='z'`, LTO, single codegen unit), the bundle sat at **1.2 MB** release. That's quite a heavy payload. It's definitely worth addressing — on a 4G connection, the initial load takes a significant amount of time, and even with a spinner, the wait can be frustrating for users.


Leptos 0.8 added lazy routes: each route gets its own `.wasm` chunk that loads only when the user navigates to it. You can look at this [video walkthrough of Leptos lazy routes](https://www.youtube.com/watch?v=w5fhcoxQnII) for more details.

### The setup

Lazy routes work through the `LazyRoute` trait. You define a struct with `data()` and `view()` methods, annotate with `#[lazy_route]`, and swap the route declaration from a component to `Lazy::<YourStruct>::new()`.

The simplest case — a fully static page like `/about`:

```rust
#[derive(Clone)]
pub struct AboutLazy;

#[lazy_route]
impl LazyRoute for AboutLazy {
    fn data() -> Self { Self }

    fn view(_this: Self) -> AnyView {
        view! { <AboutPage/> }.into_any()
    }
}
```

Then in the router:

```rust
<Route path=StaticSegment("about") view={Lazy::<AboutLazy>::new()}/>
```

That's it. The `view()` body — and everything it pulls in — gets split into its own WASM chunk. The existing `AboutPage` component stays untouched and still works for SSR.

### The key change: `hydrate_lazy`

One line change in `src/lib.rs`:

```rust
// Before
leptos::mount::hydrate_body(App);

// After
leptos::mount::hydrate_lazy(App);
```

This tells the client-side runtime to expect multiple chunks instead of a single blob. Same lifecycle, same overlay behavior — the pre-hydration loading screen still works identically.

### Build command

```bash
cargo leptos build --release --split
```

The `--split` flag tells the build pipeline to extract lazy route views into separate `.wasm` files.

### The results

I converted all 6 routes in 4 phases, starting with the simplest to validate the pipeline:

| Stage | Main Bundle | What split out |
|-------|:-----------:|----------------|
| Baseline | 1.2 MB | — |
| After static routes | 1.1 MB | `/about` (48 KB), `/` overview (55 KB) |
| After table routes | 803 KB | `/stellarhosts` (70 KB), `/exoplanets` (57 KB) + shared deps (238 KB) |
| After detail routes | **535 KB** | `/stellarhosts/:hostname` (83 KB), `/exoplanets/:pl_name` (41 KB) |

On top of that, adding  application/wasm  to nginx's  gzip_types  compresses every WASM chunk on the wire — the baseline 1.2 MB bundle alone drops from 1.2 MB to 523 KB over the network, a 56% reduction for zero code changes. These two optimizations stack: lazy routes shrink what gets fetched, gzip shrinks what gets transferred.

**55% reduction in initial page load.** The first visit to any route fetches its chunk, then it's cached by the browser. The total bytes across all chunks are slightly higher (~1.3 MB) due to chunk glue code, but users only download what they actually visit.

### Why it went smoothly

A few things made this painless:

**The wrapper pattern.** I didn't rewrite any components. Each lazy struct just wraps the existing `#[component]` function in its `view()` method. SSR still uses the original components directly. Zero risk of breaking existing behavior.

**Phased rollout.** Starting with `/about` (fully static, 182 lines) meant I could validate the entire pipeline — `hydrate_lazy`, `--split` build, chunk loading, overlay behavior — before touching the heavy routes. If something broke, I'd know immediately.

**No server-side changes.** Lazy routes are a client-side concern. Server functions, SSR streaming, caching — all untouched. The `SsrMode::OutOfOrder` on table routes works the same way.

**Nginx needed nothing.** The build outputs all chunks into `target/site/pkg/`. The existing Nginx config serves everything from that directory. No whitelist, no MIME type tweaks.

### Bottom line

Lazy routes in Leptos 0.8 are straightforward. The API is minimal, the build integration is a single flag, and the wrapper pattern means you don't have to restructure existing code. If your WASM bundle is the bottleneck and compiler optimizations have plateaued, code splitting is the logical next step — and Leptos makes it surprisingly boring to implement.
