## Example (JavaScript)

## 🚩 Problem Statement

Implement a function that processes a dictionary `D` where:

- **Key:** Date string in `YYYY-MM-DD` format
- **Value:** Integer

The function should return a new dictionary:

1. **Key:** Day of the week (`Mon`, `Tue`, `Wed`, `Thu`, `Fri`, `Sat`, `Sun`)
2. **Value:** Sum of all values for that day

---

### 📚 Example 1

```python
Input: D = {
    "2020-01-01": 4, "2020-01-02": 4, "2020-01-03": 6, "2020-01-04": 8, "2020-01-05": 2, "2020-01-06": -6, "2020-01-07": 2, "2020-01-08": -2
}
Output: {
    "Mon": -6, "Tue": 2, "Wed": 2, "Thu": 4, "Fri": 6, "Sat": 8, "Sun": 2
}
```

---

### 🧮 Handling Missing Days

If a day is missing in the input, set its value to the **mean of the previous and next day**.

#### Example 2

```python
Input: D = {
    "2020-01-01": 6, "2020-01-04": 12, "2020-01-05": 14, "2020-01-06": 2, "2020-01-07": 43
}
Output: {
    "Mon": 2, "Tue": 4, "Wed": 6, "Thu": 8, "Fri": 10, "Sat": 12, "Sun": 14
}
```

---

### ⚙️ Assumptions

- Input dictionary contains **at least Mon & Sun**
- Keys: Strings in `[1970-01-01 .. 2100-01-01]`
- Values: Integers in `[-1,000,000 .. 1,000,000]`

---

## 🚀 Installation

```bash
npm install
```

---

## 🧪 Run Tests

To execute unit tests:

```bash
npm run test
```