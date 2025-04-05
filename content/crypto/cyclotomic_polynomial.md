+++
date = "2025-04-04"
title = "Cyclotomic polynomial for CKKS"
description = ""
keywords = "note, ckks"
tags = ["note", "ckks"]
+++
## Cyclotomic Polynomial `{Z}_q[X]/(X^n + 1)` in CKKS

CKKS homomorphic encryption heavily relies on polynomial arithmetic modulo
the cyclotomic polynomial `X^n + 1`.

This polynomial provides two crucial benefits:
  - Efficient Polynomial Arithmetic:
Reduces polynomial multiplication complexity via Number Theoretic Transform (NTT).
  - Ensuring Polynomial Compactness:
Keeps polynomials within fixed degree n-1, preventing degree explosion during multiplication.


In CKKS, polynomials represent encrypted values, and multiplication would double
their degree. To prevent growth, we use the reduction modulo `X^n + 1`,
effectively folding polynomials back to degree `n - 1`.

### Example:

Let’s choose `n = 4` and multiply two polynomials modulo `X^4 + 1`:

`(a_0 + a_1*X + a_2*X^2 + a_3*X^3) * (b_0 + b_1*X + b_2*X^2 + b_3*X^3)`

Expanding gives a polynomial up to degree `6`. For instance, term `X^4`
and higher are reduced modulo `X^4 + 1`:

- `X^4 = -1 mod (X^4 + 1)`
- `X^5 = -X mod (X^4 + 1)`
- `X^6 = -X^2 mod (X^4 + 1)`

Thus, after reduction, the result returns to degree `3`:

`c_0 + c_1*X + c_2*X^2 + c_3*X^3`

This approach keeps computations efficient and manageable, crucial for practical CKKS operations.

SageMath example:

```python
# Define ring Z_q[X]/(X^n + 1)
q = 17  # modulus q (prime for simplicity)
n = 4   # polynomial modulus degree
 
R.<X> = PolynomialRing(Integers(q))
S = R.quotient(X^n + 1, 'x')
x = S.gen()
 
# Define polynomials in quotient ring
A = 3 + 2*x + x^2 + 4*x^3
B = 1 + x^2
 
# Multiply polynomials modulo X^n + 1
C = A * B
 
print("A * B mod (X^n + 1):", C)
A * B mod (X^n + 1): 6*x^3 + 4*x^2 + 15*x + 2
```
