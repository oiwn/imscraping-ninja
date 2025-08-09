+++
date = "2025-08-09"
title = "Overview of Major Fully Homomorphic Encryption (FHE) Schemes"
description = "Description the main Fully Homomorphic Encryption (FHE) schemes — BGV, CKKS, BFV, FHEW, and TFHE — with concise explanations of their traits, arithmetic types, and best use cases."
keywords = "FHE, BGV, CKKS, BFV, FHEW, TFHE"
tags = ["note", "fhe"]
+++

## Main FHE Schemes and Their Traits

### BGV (Brakerski–Gentry–Vaikuntanathan)

- **Type:** Exact integer arithmetic (mod t)
- **Noise management:** Relies on modulus switching to control noise growth
- **Use case:** Secure computation over integers with good performance
  for deep circuits
- **Trait:** Flexible parameter selection, supports leveled and bootstrapped modes

### CKKS (Cheon–Kim–Kim–Song)

- **Type:** Approximate arithmetic over complex numbers
- **Noise management:** Rescaling operation to maintain precision
- **Use case:** Privacy-preserving machine learning, statistics, signal processing
- **Trait** Supports controlled precision loss, trades exactness for efficiency

### BFV (Brakerski–Fan–Vercauteren)
- **Type:** Exact integer arithmetic (mod t)
- **Noise management:** Uses relinearization and modulus switching
- **Use case:** Applications requiring exact integer results (e.g., voting, counters)
- **Trait:** Conceptually simpler than BGV, popular in Microsoft SEAL

### FHEW (Fast Fully Homomorphic Encryption over the Torus)
- **Type:** Bit-level FHE, boolean gate operations
- **Noise management:** Extremely fast bootstrapping (~0.1s per gate in original)
- **Use case:** Low-latency evaluation of small boolean circuits
- **Trait:** Pioneered ultra-fast gate bootstrapping, foundation for TFHE,
  one ciphertext per bit

### TFHE (Fast Fully Homomorphic Encryption over the Torus — extended)
- **Type:** Bit-level FHE, boolean and arithmetic gates
- **Noise management:** Bootstrapping in tens of microseconds per gate
- **Use case:** Encrypted decision trees, conditional branching, crypto protocols
- **Trait:** Industry’s fastest bootstrapping; practical for real-time logic
  evaluation, one ciphertext per bit
