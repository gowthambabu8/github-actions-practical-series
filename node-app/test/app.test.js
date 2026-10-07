const request = require('supertest');
const app = require('../src/app');

describe('GET /', () => {
  it('returns the welcome message', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
  });
});

describe('GET /health', () => {
  it('reports healthy', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('healthy');
  });
});

describe('GET /courses', () => {
  it('returns all courses', async () => {
    const res = await request(app).get('/courses');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveLength(4);
  });

  it('filters courses by level', async () => {
    const res = await request(app).get('/courses?level=intermediate');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveLength(2);
  });
});

describe('GET /courses/:id', () => {
  it('returns a single course', async () => {
    const res = await request(app).get('/courses/2');
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe('GitHub Actions Caching');
  });

  it('returns 404 for an unknown course', async () => {
    const res = await request(app).get('/courses/999');
    expect(res.statusCode).toBe(404);
  });
});
