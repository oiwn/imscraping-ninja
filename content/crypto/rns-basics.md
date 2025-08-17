+++
title = "Residue Number System (RNS): a quick intro"
date = "2025-08-17"
description = "Basics of RNS with ASCII math and simple examples."
keywords = "residue number system, rns, crt, number theory"
tags = ["note", "rns", "crypto"]
draft = false
+++

## What is RNS?

Residue Number System (RNS) represents an integer by its residues modulo a set of
pairwise coprime moduli. Computations occur independently per modulus and combine
via the Chinese Remainder Theorem (CRT).

Basic setup:

  - `B = (m1, m2, ..., mk)` with `gcd(mi, mj) = 1` for `i != j`
  - `M = m1*m2*...*mk` (dynamic range)
  - `x` in `[0, M)` encodes to `(x1, x2, ..., xk)` where `xi = x mod mi`

Component-wise arithmetic (no carries across channels):

  - Addition:    `((a1+b1) mod m1, ..., (ak+bk) mod mk)`
  - Subtraction: `((a1-b1) mod m1, ..., (ak-bk) mod mk)`
  - Multiplication: `((a1*b1) mod m1, ..., (ak*bk) mod mk)`

Reconstruction (CRT) for x:

  - Let `Mi = M/mi` and `ti = inverse(Mi, mi)` (modular inverse)
  - Then `x = sum_{i=1..k} (xi * Mi * ti) mod M`

Small example:

  - Choose `B = (5, 7, 8)` with `M = 5*7*8 = 280` (pairwise coprime)
  - `x = 123 -> (123 mod 5, 123 mod 7, 123 mod 8) = (3, 4, 3)`
  - `y = 94  -> (94  mod 5,  94  mod 7,  94  mod 8) = (4, 3, 6)`
  - `x + y` in RNS: `(3+4 mod 5, 4+3 mod 7, 3+6 mod 8) = (2, 0, 1)`
  - Multiply similarly per modulus: `(3*4 mod 5, 4*3 mod 7, 3*6 mod 8) = (2, 5, 2)`

Why RNS is useful:

  - Parallelism: each modulus is independent -> fast on vector/SIMD hardware
  - No carry propagation within a modulus -> predictable timing
  - Widely used in HE/FHE and large-integer arithmetic
