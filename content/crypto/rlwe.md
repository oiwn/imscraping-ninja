+++
date = "2025-08-08"
title = "Ring Learning With Errors (RLWE)"
description = ""
keywords = "ring learning with errors"
tags = ["note", "rlwe", "fhe"]
+++

## Ring Learning With Errors (RLWE)

RLWE is a hard mathematical problem used as the foundation for many modern
post-quantum cryptosystems and fully homomorphic encryption schemes (like BFV,
CKKS, BGV). It is an adaptation of the Learning With Errors (LWE) problem from
vectors to polynomials over a ring, making operations more efficient while
preserving hardness.

### Core idea:

Given:

- A polynomial ring `R_q = Z_q[x]/(x^n + 1)`
- A secret `s(x) in R_q`
- A random polynomial `a(x) in R_q`
- Small error `e(x)` (coefficients drawn from a narrow distribution)


You’re given pairs:

```
a(x), b(x) = a(x) * s(x) + e(x) mod {q}
```

The challenge: Recover `s(x)` given many such samples.
This is believed to be hard even for quantum computers.

### Why important:

- Basis for efficient FHE schemes (packing, SIMD operations)
- Resistant to known quantum attacks
- Well-studied reduction to worst-case lattice problems

### SageMath example

```python
# Parameters
n = 8                    # degree of ring polynomial
q = 257                  # modulus
R = PolynomialRing(Integers(q), 'x')
x = R.gen()
Rq = R.quotient(x^n + 1, 'x')
xbar = Rq.gen()

# Secret
import random
s = Rq([random.randint(-1,1) for _ in range(n)])  # small secret

# One RLWE sample
a = Rq([random.randint(0, q-1) for _ in range(n)])   # uniform
e = Rq([random.randint(-2,2) for _ in range(n)])     # small error
b = a * s + e

print("a =", a)
print("s =", s)
print("e =", e)
print("b =", b)
```
