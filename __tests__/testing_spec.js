const {MongoClient} = require('mongodb');
const request = require('supertest');
const {app} = require('../src/routes');

describe('insert', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(global.__MONGO_URI__, {
      useNewUrlParser: true,
    });
    db = await connection.db(global.__MONGO_DB_NAME__);
  });

  afterAll(async () => {
    await connection.close();
    await db.close();
  });
  it('should insert a doc into collection', async () => {
    const users = db.collection('users');
  
    const mockUser = {_id: 'some-user-id', name: 'John'};
    await users.insertOne(mockUser);
  
    const insertedUser = await users.findOne({_id: 'some-user-id'});
    expect(insertedUser).toEqual(mockUser);
  });

  it('should return Hello!', async () => {
    const response = await request(app).get('/');
  
    expect(response.status).toBe(200);
    expect(response.body).toEqual({"message": "Hello!"});
  });

  it("should return kitty name", async () => {
    const response = await request(app).get('/api/kitten');

    expect(response.status).toBe(404);
    console.log(response.body);    
    expect(response.body).toEqual({ 'message': 'missing kitten name' });
  });
});