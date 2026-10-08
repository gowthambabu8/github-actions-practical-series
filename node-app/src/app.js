const express = require('express');
const _ = require('lodash');

const app = express();
app.use(express.json());

// In-memory data, enough to give the tests something to exercise
const courses = [
  { id: 1, title: 'GitHub Actions Basics', level: 'beginner' },
  { id: 2, title: 'GitHub Actions Caching', level: 'intermediate' },
  { id: 3, title: 'GitHub Actions Matrix Strategy', level: 'intermediate' },
  { id: 4, title: 'Reusable Workflows', level: 'advanced' },
];

app.get('/', (req, res) => {
  res.json({ message: 'GitHub Actions caching demo', status: 'ok' });
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy', uptime: process.uptime() });
});

app.get('/courses', (req, res) => {
  const { level } = req.query;
  const result = level ? _.filter(courses, { level }) : courses;
  res.json(result);
});

app.get('/courses/:id', (req, res) => {
  const course = _.find(courses, { id: Number(req.params.id) });
  if (!course) {
    return res.status(404).json({ error: 'Course not found' });
  }
  res.json(course);
});

module.exports = app;
