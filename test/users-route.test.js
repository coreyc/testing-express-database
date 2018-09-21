const request = require('supertest')

const { app } = require('../src_dirty/app')
const { createTable } = require('../src_dirty/routes/report')

describe('POST /api/report', () => {
  before(async () => {
    await createTable('driver_history')
  })

  it('should respond with 200 if report fetched/created successfully', async () => {
    await request(app)
      .post('/api/report')
      .send({user_name: "ccleary00", table_name: "admin"})
      .set('Accept', 'application/json')
      // .expect('Content-Type', /json/)
      .expect(201, done)
  })
})