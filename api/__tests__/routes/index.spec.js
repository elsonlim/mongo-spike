const request = require('supertest');
const {app} = require('../../build/src/routes');

describe('root', () => {
  it('should return Hello!', async () => {
    const response = await request(app).get('/');
  
    expect(response.status).toBe(200);
    expect(response.body).toEqual({"message": "Hello!"});
  });
});