+++
date = "2025-08-15"
title = "CKKS Public Key"
description = "Very short overview of public key generation in CKKS via RLWE."
keywords = "ckks public key, rlwe, fhe"
tags = ["note", "ckks", "fhe", "rlwe"]
+++

## Public Key Generation

CKKS derives its public key from the RLWE problem. A public key is a pair of polynomials `(a, b)` over the ring `R_q = Z_q[x]/(x^n + 1)`:

- Sample `a` uniformly at random in `R_q`.
- Sample a small error `e` from a narrow distribution (e.g., discrete Gaussian).
- Let `s` be the secret key (small polynomial). Compute `b = e - a · s (mod q)`.

Security relies on the hardness of recovering `s` from `(a, b)`; the pair satisfies the RLWE relation `b + a · s ≈ e (mod q)` with small `e`.

### Minimal Algorithm
1. `a ← Uniform(R_q)`
2. `e ← Error(σ)` with `σ > 0`
3. `b ← e − a · s (mod q)`
4. Output `pk = (a, b)`

Notes: choose `s` and `e` with small coefficients; record `n`, `q`, and `σ` with the key to ensure compatibility with encryption and evaluation.
