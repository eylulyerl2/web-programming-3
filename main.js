import Student from "./models.js";
import { fetchStudents } from "./database.js";
import {
  calculateClassAverage,
  findTopStudent,
  filterStudents,
} from "./analytics.js";

console.log("Fetching data from database...");

fetchStudents((rawData) => {
  console.log("Data received!\n");

  // Convert raw data into Student instances
  const students = rawData.map(
    (data) => new Student(data.id, data.name, data.courses)
  );

  // Immutability test
  console.log("Testing Immutability:");
  console.log(`Original ID: ${students[0].id}`);
  console.log("Attempting to change ID to 999...");
  try {
    students[0].id = 999;
  } catch (error) {
    // ES modules run in strict mode, so the failed write throws a TypeError
  }
  const unchanged = students[0].id === 1;
  console.log(
    `Final ID: ${students[0].id} (${unchanged ? "Success: ID did not change" : "Failure: ID changed"})\n`
  );

  // Analytics report
  console.log("--- Analytics Report ---");

  const average101 = calculateClassAverage(students, 101);
  console.log(`Class Average for Course 101: ${average101.toFixed(2)}`);

  const top = findTopStudent(students);
  console.log(`Top Student: ${top.name} (Average: ${top.getAverage()})`);

  const in102 = filterStudents(students, (student) =>
    student.courses.some((course) => course.courseId === 102)
  );
  console.log(`Students in Course 102: ${in102.map((s) => s.name).join(", ")}`);
});
