+++
date = "2025-08-09"
title = "CKKS Encoding and Decoding Explained"
description = "Understanding CKKS Encoding and Decoding: Canonical Embedding and Scaling Explained"
keywords = "ckks, encode, decode, scale"
tags = ["note", "ckks", "fhe"]
+++
## CKKS Encode/Decode Process Explained

CKKS is fully homomorphic encryption (FHE) scheme that supports
approximate arithmetic operations (addition and multiplication) on encrypted
data. It operates on vectors of complex numbers, encoding them into polynomials
in a ring, which are then encrypted. The encode/decode process is crucial for
preparing data for encryption and recovering it after decryption.

### Overview

- CKKS works on vectors of N complex numbers.
- These vectors are embedded into polynomials in the ring:
  ```
  R = Z[X] / (X^M + 1)
  ```
  where `M` is a power of 2, and `N = M / 2`.
- Encoding and decoding are approximate — small errors are introduced but
  controlled via a scaling factor.


#### Encoding

Encoding converts a complex vector into a polynomial with integer coefficients in R.

**Input:** Complex vector `z = (z0, z1, ..., z_{N-1})`

##### Step 1 — Scaling

Multiply each entry by a scaling factor Delta (Δ).
This controls precision and noise growth later:

```
m = Delta * z
```

##### Step 2 — Inverse Canonical Embedding

The scaled vector m is mapped into a polynomial in R using the inverse canonical
embedding.

- Let `zeta = exp(2pii / 2M)` be a primitive 2M-th root of unity.
- CKKS uses evaluations at odd powers of zeta: `zeta^(2j+1), j=0..N-1`.
- The inverse embedding takes the vector `m` and finds a polynomial `p(X)` such that:

```
p(zeta^(2j+1)) ≈ m_j   for j = 0..N-1
```

This step is similar to an inverse DFT.

##### Step 3 — Rounding to Integers

The coefficients of `p(X)` are rounded to the nearest integers so `p(X)` lies in
`Z[X] / (X^M + 1)`. This introduces a small encoding error, acceptable in CKKS.

Output: Integer polynomial m(X) in R, ready for encryption.

#### Decoding

Decoding reverses the process to recover the approximate original vector.

**Input**: Integer polynomial m(X) in R (typically after decryption).

##### Step 1 — Canonical Embedding

Evaluate m(X) at the same set of odd-power roots of unity to get back a complex
vector:

```
m_j = m(zeta^(2j+1))   for j = 0..N-1
```

This is like a forward DFT.

##### Step 2 — Scaling Down

Divide each entry by Delta to undo the encoding scale:

```
z ≈ m / Delta
```

The result is close to the original vector, with small errors from rounding and
homomorphic noise.

#### Mathematical Summary

Encoding:

```
z (complex vector)
 -> multiply by Delta
 -> inverse canonical embedding
 -> round coefficients to integers
 -> polynomial in Z[X] / (X^M + 1)  
```

Decoding:

```
polynomial in Z[X] / (X^M + 1)
 -> canonical embedding
 -> divide by Delta
 -> approximate complex vector
```

#### Key Points

- Inverse embedding in encoding, embedding in decoding: The names matter. Encoding uses the inverse map from complex space to polynomial space.
- Odd roots of unity: CKKS works with evaluations at zeta^(2j+1), not all roots.
- Scaling factor Delta: Larger Delta = more precision but requires larger modulus to prevent overflow.
- Vector packing: N complex numbers are packed into one polynomial, enabling SIMD-like parallelism.
- Approximate arithmetic: Rounding errors and noise are inherent and must be managed.

### Summary

The CKKS encode/decode process transforms a vector of complex numbers into a
polynomial in a cyclotomic ring and back, using a scaling factor and canonical
embedding. Encoding maps the scaled vector to a polynomial via an inverse
DFT-like operation, while decoding reverses this by evaluating the polynomial
and scaling down. The process is approximate, introducing small errors, but is
optimized for efficient homomorphic computations on encrypted data.

If you’d like a deeper dive into specific mathematical details, implementation
in a library like SEAL or HEAAN, or examples with code, let me know!

### SageMath example


```python
import numpy as np

M = 8
N = M // 2
Delta = 2**20

z = np.array([1.0, 2.0, 3.0, 4.0], dtype=np.float64).astype(np.complex128)
m = Delta * z

# odd 2M-th roots
zeta = np.exp(2j * np.pi / (2*M))
odd_roots = np.array([zeta**(2*k+1) for k in range(M)], dtype=np.complex128)

# conjugate-symmetric evaluations
y = np.zeros(M, dtype=np.complex128)
for k in range(N):
    y[k] = m[k]
    y[M - 1 - k] = np.conj(y[k])

# interpolate: V c = y, V[r,c] = odd_roots[r]^c
V = np.vander(odd_roots, N=M, increasing=True).astype(np.complex128)
c = np.linalg.solve(V, y)                    # ~ real coefficients
cZ = np.rint(np.real(c)).astype(np.int64)    # integer coeffs (encode)

# decode: evaluate and scale down
vals = V @ cZ.astype(np.complex128)
decoded = vals[:N] / Delta

for i, d in enumerate(decoded):
    print(f"slot {i}: {d}")
```

Will give:

```
slot 0: (0.9999993001888372-1.6653345369377348e-16j)
slot 1: (1.9999996669577669-4.440892098500626e-16j)
slot 2: (3.000000333042232+2.220446049250313e-16j)
slot 3: (4.000000699811162+1.7208456881689926e-15j)  
```

