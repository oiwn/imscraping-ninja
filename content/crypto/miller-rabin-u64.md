+++
title = "Miller-Rabin Primality Test for u64"
date = "2025-08-20"
description = "Deterministic primality testing for 64-bit integers using Miller-Rabin."
keywords = "miller-rabin, primality test, u64, number theory"
tags = ["note", "prime", "crypto"]
draft = false
+++

## The Idea

Miller-Rabin tests whether `n` is prime by checking Fermat's little theorem
and its square-root consequences. For prime `p` and `a` coprime to `p`:

```
a^(p-1) ≡ 1 (mod p)
```

If `p` is prime, the only square roots of `1` modulo `p` are `1` and `p-1`.
Composite numbers often have extra roots, which Miller-Rabin exploits.

## Algorithm

For odd `n > 2`:

1. Write `n - 1 = 2^s * d` where `d` is odd
2. For each base `a`:
   - Compute `x = a^d mod n`
   - If `x == 1` or `x == n-1`: continue to next base
   - Square `s-1` times: `x = x^2 mod n`
   - If any `x == n-1`: continue to next base
   - Otherwise: `n` is composite (witness found)
3. If no witness found: `n` is prime

## Deterministic for u64

For all `n < 2^64`, testing these 12 bases is sufficient:

```
[2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37]
```

This gives a **deterministic** primality test—no probability, no false positives.

## Worked Example

Test `n = 561` (a Carmichael number, composite: `3 * 11 * 17`):

```
n - 1 = 560 = 2^4 * 35, so s = 4, d = 35
```

With base `a = 2`:

```
x = 2^35 mod 561 = 263
x = 263^2 mod 561 = 166
x = 166^2 mod 561 = 67
x = 67^2 mod 561 = 1
```

Got `1` without passing through `n-1 = 560`, so `2` is a witness: **561 is composite**.

Contrast with base `a = 50` (a "strong liar"):

```
x = 50^35 mod 561 = 560 = n-1  -> passes
```

This is why multiple bases are needed. With the full 12-base set, all composites
under `2^64` are caught.

## Why It Matters for FHE

FHE schemes like CKKS/BFV need many large primes for RNS bases and modulus
switching. Miller-Rabin with fixed bases gives fast, reliable prime generation
for 60-bit primes fitting in u64 arithmetic.
