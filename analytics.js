// Average score of all students for a specific course
function calculateClassAverage(students, courseId) {
  const grades = students
    .map((student) => student.courses.find((course) => course.courseId === courseId))
    .filter((course) => course !== undefined)
    .map((course) => course.grade);

  if (grades.length === 0) return 0;
  return grades.reduce((sum, grade) => sum + grade, 0) / grades.length;
}

// Student with the highest overall average
function findTopStudent(students) {
  if (students.length === 0) return null;
  return students.reduce((top, student) =>
    student.getAverage() > top.getAverage() ? student : top
  );
}

// Higher-order function: keeps students for whom criteriaFn returns true
function filterStudents(students, criteriaFn) {
  const result = [];
  for (const student of students) {
    if (criteriaFn(student)) result.push(student);
  }
  return result;
}

export { calculateClassAverage, findTopStudent, filterStudents };
