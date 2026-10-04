# Web Programming – Assignment 3

This assignment builds the core logic of a university grading system in JavaScript. Student data is fetched from a simulated asynchronous server, modeled with ES6 classes that have immutable IDs, and used to generate an analytics report.

## File Organization

```
web-programming-3/
├── models.js      # Student class: read-only id via Object.defineProperty(), addCourse() and getAverage()
├── database.js    # fetchStudents(callback): returns raw student data after a 2-second setTimeout delay
├── analytics.js   # calculateClassAverage(), findTopStudent() with .reduce(), filterStudents() higher-order function
├── main.js        # Entry point: fetches data, creates Student instances, tests immutability, prints the report
└── README.md      # This file
```

## Challenges I Faced

- **The immutability test crashed the program:** Because the files use `import`/`export`, they run as ES modules, which are always in strict mode. In strict mode, assigning to the read-only `id` throws a `TypeError` instead of failing silently, so I wrapped the assignment in a `try/catch`.
- **Working with asynchronous data:** The student data only exists after the 2-second delay, so I had to place all the logic that uses it inside the `fetchStudents` callback. Code written after the call would run before the data arrived.
- **Plain objects vs. class instances:** The simulated server returns plain objects, which don't have the `getAverage()` method. I converted them into `Student` instances with `new Student(...)` before running the analytics.
- **Different top student from the example output:** The example output lists Zeynep (82.5) as the top student, but from the given data Ali's average is (90 + 85) / 2 = 87.5. My program reports Ali, which is the correct result.
