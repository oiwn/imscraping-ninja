+++
title = "Giving agents a data catalog: the exodata MCP server"
date = "2026-07-25"
description = "How exodata.space exposes an exoplanet catalog to AI agents over the Model Context Protocol."
keywords = "mcp, model context protocol, ai agents, exodata, rust"
tags = ["mcp", "agents", "rust", "exodata"]
draft = true
+++

<!-- STUB — outline only. Flesh out each section, then set draft = false. -->

## Why MCP for a data catalog

TODO: The problem — agents need structured, queryable data, not scraped HTML.
Why expose a catalog over MCP instead of (or alongside) a REST API. What
[exodata.space](https://exodata.space) is (NASA Exoplanet Archive, Leptos + Axum + Polars).

## The exodata MCP server

TODO: Transport — Streamable HTTP in stateless JSON response mode (no session
management). Endpoint: `https://exodata.space/mcp`. Why stateless fits a read-only
catalog. Row caps (default 100, max 1000) to protect the context window.

## The tools

TODO: Walk through each tool and when an agent reaches for it.

- `health` — connectivity check; call first.
- `list_insights` — curated insight metadata.
- `run_insight` — execute an insight by slug.
- `describe_catalog` — column names, descriptions, units, data types for a table.
- `query_catalog` — read-only SQL SELECT over `stellarhosts` and `exoplanets`.
- `download_detail` — export a single record as JSON or CSV.

## Connecting an agent

TODO: Config per client.

```
claude mcp add --transport http exodata https://exodata.space/mcp
```

TODO: Equivalent config for Crush (`.crush.json`), OpenCode (`opencode.json`),
Codex CLI (`~/.codex/config.toml`).

## Example: from question to query

TODO: Worked example — natural-language question → `describe_catalog` →
`query_catalog` SQL → result. Show a real SELECT against `exoplanets`.

## Guardrails

TODO: Read-only SELECT surface, row caps, stateless design. What this prevents and
why it matters when an autonomous agent is driving.

## Takeaways for agent builders

TODO: What generalizes — expose a narrow, typed, read-only surface; make the schema
self-describing; cap output; call `health` before real work.
