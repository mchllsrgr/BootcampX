const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

const queryString = `
SELECT DISTINCT teachers.name AS name, cohorts.name AS cohort, COUNT(assistance_requests.*) AS total_assistances
FROM teachers
JOIN assistance_requests ON teachers.id = assistance_requests.teacher_id
JOIN students ON students.id = assistance_requests.student_id
JOIN cohorts ON cohorts.id = students.cohort_id
WHERE cohorts.name = $1
GROUP BY teachers.name, cohorts.name
ORDER BY name;
`;

const cohortName = process.argv[2];
const values = [`${cohortName}`];

pool.query(queryString, values)
.then(res => {
  res.rows.forEach(teacher => {
    console.log(`${teacher.cohort}: ${teacher.name}`);
  });
})
.catch(err => {
  console.error('query error', err.stack);
});