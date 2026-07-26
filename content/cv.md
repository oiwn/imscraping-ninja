+++
title = "AI systems & data engineering CV"
+++
## Summary

Senior back-end engineer, 10+ years across the full data lifecycle: web crawling at scale, processing into clean structured data, with analytics on top of it. Since 2024, increasingly focused on agent harness infrastructure and data-centric systems around large language models. Rust primary, Python secondary.

## Experience

**2014 - present, freelance / contract.** Back-end and data engineering across a
range of domains, mostly solo or in small teams, end to end from crawling to
delivery:

- Large-scale web scraping and crawling platforms
- Price comparison and data aggregation systems
- ML dataset preparation for training and evaluation
- Agent harness and MCP infrastructure

## Core Competencies

{{ skills(label="Languages", items="!🦀 Rust (primary), 🐍 Python, 💩 JavaScript") }}
{{ skills(label="Rust stack", items="!Axum, !Leptos, Tokio, Tower, Polars") }}
{{ skills(label="Focus", items="!Agent harness, !MCP servers, web scraping, distributed crawlers, single-view dashboards, data pipelines, REST/gRPC") }}
{{ skills(label="Cloud & Infra", items="!Kubernetes, Docker, AWS, GCP, Terraform, Nix, GitHub Actions, Prometheus/Grafana") }}
{{ skills(label="Data Stores", items="PostgreSQL, Redis, MongoDB, !SurrealDB, Qdrant, !Fjall, RocksDB, VictoriaMetrics") }}
{{ skills(label="Interests", items="Fully Homomorphic Encryption, abstract algebra, natural language processing, context engineering, LLM orchestration, agentic workflows") }}

## Selected Work

- **Agent systems and MCP servers.** Build agent harness infrastructure - wiring a
  model to tools, APIs, and memory - and MCP servers that expose data and tools to
  agents safely. Example: [exodata.space](https://exodata.space) serves a stateless streamable-HTTP MCP endpoint with read-only catalog query, insight, and export
  tools ([docs](https://exodata.space/docs/mcp)).
- **High-scale web crawling.** Distributed crawlers handling millions of pages a day on a small infrastructure footprint, with pipelines that keep the data consistent downstream.
- **ML dataset preparation.** Collecting, processing, and delivering datasets for
  training and evaluating language models and other AI systems.
- **Consulting and mentoring.** Architecture reviews, Rust integration, agent/MCP
  design, and mentoring on practical AI usage.

## Open Source

- [**exodata**](https://github.com/oiwn/exodata): NASA exoplanet catalog (Leptos, Axum, Polars) with a REST API and a hosted MCP endpoint - [exodata.space](https://exodata.space)
- [**pageinfo-rs**](https://github.com/oiwn/pageinfo-rs): HTTP-only page analysis for LLMs and agents - extracts identity, URL structure, metadata, feeds, and embedded JSON
- [**capp-rs**](https://github.com/oiwn/capp-rs): Tower-native async runtime for web crawlers and task pipelines - queues, retries, backpressure, and dead-letter handling
- [**dom-content-extraction**](https://github.com/oiwn/dom-content-extraction): Rust implementation of the Content Extraction via Text Density (CETD) algorithm
- [**probabilistic-rs**](https://github.com/oiwn/probabilistic-rs): Probabilistic data structures (Bloom / expiring-Bloom filters) with persistence and Python bindings
- [**tarts**](https://github.com/oiwn/tarts): Terminal screen savers and visual effects in Rust

## Education

ITMO University - Information Technology, Optical Design and Engineering (Russia)

## Rates

<div class="cv-rates">
  <div class="cv-rate"><span class="cv-rate-label">Development</span><span class="cv-rate-value">$100/hr</span></div>
  <div class="cv-rate"><span class="cv-rate-label">Consulting &amp; mentoring</span><span class="cv-rate-value">$200/hr</span></div>
</div>

## Contact

- **GitHub:** [github.com/oiwn](https://github.com/oiwn)
- **Email:** {{ email(b64="YWxleC5ncmFibGFiQGljbG91ZC5jb20=") }}
