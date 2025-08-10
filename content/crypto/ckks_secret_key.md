+++
date = "2025-08-10"
title = "CKKS Secret Key Generation: Ternary {-1,0,1} With Fixed Hamming Weight"
description = "How to sample a small secret polynomial s(X) for CKKS using a ternary distribution with an exact Hamming weight, plus a concise Rust implementation."
keywords = ""
tags = ["note", "ckks"]
+++

## CKKS Secret Key

The secret key is a "small" polynomial where coefficients are chosen from a
ternary distribution {-1, 0, 1} with controlled sparsity.

with exactly h non-zeros (fixed Hamming weight)

```
s(X) ∈ R = Z_q[X]/(X^N + 1)
```

```python
# CKKS secret: ternary {-1,0,1} with exact Hamming weight h (Sage-ready)

def ckks_secret(N, h, q=None, seed=None):
    import random
    # Cast Sage Integers to Python ints where stdlib expects them
    N_int = int(N); h_int = int(h)
    if seed is not None:
        random.seed(int(seed))

    if not (1 <= h_int <= N_int):
        raise ValueError("1 <= h <= N")

    pos = random.sample(range(N_int), h_int)
    coeffs = [0]*N_int
    for i in pos:
        coeffs[i] = 1 if random.getrandbits(1) else -1

    if q is None:
        PR.<X> = ZZ[]
    else:
        Zq = Integers(int(q))
        PR.<X> = Zq[]
    R = PR.quotient(X**N_int + 1, 'x'); x = R.gen()
    s = sum(PR.base_ring()(coeffs[i]) * x**i for i in range(N_int))
    return coeffs, s, R  # note: in Z_q, -1 == q-1

# demo
N, h = Integer(16), Integer(5)
q = Integer(2)**Integer(60) - Integer(2)**Integer(32) + Integer(1)
coeffs, s, R = ckks_secret(N, h, q=q, seed=Integer(42))
print("hamming:", sum(1 for a in coeffs if a != 0))
print("coeff set:", sorted(set(coeffs)))
print("s(X):", s)
```

Will give:

```
hamming: 5
coeff set: [-1, 0, 1]
s(X): x^15 + x^11 + 1152921500311879680*x^4 + 1152921500311879680*x^3 + 1152921500311879680
```

