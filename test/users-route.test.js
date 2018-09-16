const request = require('supertest')

const { app } = require('../src_dirty/app')
const { createTable } = require('../src_dirty/routes/users')

describe('POST /api/users', () => {
  before(async () => {
    await createTable('user_admin')
    await createTable('user_user')
  })

  it('should respond with 201 if user created successfully', (done) => {
    request(app)
      .post('/api/users')
      .send({user_name: "ccleary00", table_name: "admin"})
      .set('Accept', 'application/json')
      // .expect('Content-Type', /json/)
      .expect(201, done)
  })
})