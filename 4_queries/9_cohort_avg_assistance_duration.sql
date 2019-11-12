SELECT AVG(total_duration) AS average_total_duration
FROM (
  SELECT cohorts.name AS cohort, SUM(completed_at - started_at) AS total_duration
  FROM assistance_requests
  JOIN students on student_id = students.id
  JOIN cohorts on students.cohort_id = cohorts.id
  GROUP BY cohorts.name
  ORDER BY total_duration
) as total_durations;