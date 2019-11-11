SELECT COUNT(students)
FROM students
JOIN cohorts
ON students.cohort_id = cohorts.id
WHERE cohorts.id <= 3;