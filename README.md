# University Course Management System

## File Organization

- **`models.js`**: Defines the `Student` class. The `id` property is created with `Object.defineProperty()` as read-only and non-configurable. Includes `addCourse()` and `getAverage()` methods.
- **`database.js`**: Simulates a slow database. `fetchStudents(callback)` waits 2 seconds with `setTimeout`, then passes the raw student data to the callback.
- **`analytics.js`**: Contains `calculateClassAverage()`, `findTopStudent()` (uses `.reduce()`) and `filterStudents()` (a higher-order function that takes a criteria callback).
- **`main.js`**: Entry point. Fetches the data, converts it into `Student` instances, tests ID immutability and prints the analytics report.

## Challenges Faced

- **Strict mode:** Files using `import`/`export` run as ES modules, which are always in strict mode. Assigning to the read-only `id` throws a `TypeError` instead of failing silently, so the test is wrapped in `try/catch`.
- **Asynchronous data:** All logic that uses the student data must run inside the `fetchStudents` callback, because the data does not exist until the 2-second delay ends.
- **Plain objects vs. class instances:** The simulated server returns plain objects without the `getAverage()` method, so the data is converted into `Student` instances before running the analytics.
- **Example output difference:** The assignment's example lists Zeynep (82.5) as the top student, but from the given data Ali's average is (90 + 85) / 2 = 87.5. The program correctly reports Ali.
