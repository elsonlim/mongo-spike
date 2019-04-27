const {MongoClient} = require('mongodb');
const request = require('supertest');
const {app} = require('../src/routes');
var mongoose = require("mongoose");

describe('insert', () => {
  let connection;
  let db;

  beforeAll(async () => {
    const dbParams = global.__MONGO_URI__.split("/");
    const dbName = dbParams[dbParams.length - 1];
    connection = await MongoClient.connect(global.__MONGO_URI__, {
      useNewUrlParser: true,
    });
    db = await connection.db(dbName);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await connection.close();
    await db.close();
  });
  
  it('should insert a doc into collection', async (done) => {
    const users = db.collection('users');
  
    const mockUser = {_id: 'some-user-id', name: 'John'};
    await users.insertOne(mockUser);
  
    const insertedUser = await users.findOne({_id: 'some-user-id'});
    expect(insertedUser).toEqual(mockUser);
    done();
  });

  it('should return Hello!', async () => {
    const response = await request(app).get('/');
  
    expect(response.status).toBe(200);
    expect(response.body).toEqual({"message": "Hello!"});
  });

  it("should create kitty", async () => {
    const mockKitten = {name: 'Puss'};
    const response = 
      await request(app)
        .post('/api/kitten')
        .send(mockKitten)
        .set('Accept', 'application/json');
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(mockKitten);

    const Kittens = db.collection('kittens');
    const someCat = await Kittens.findOne(mockKitten);
    expect(someCat).toMatchObject(mockKitten);
  });
  it("should return missing name message", async () => {
    const response = await request(app).get('/api/kitten');

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ 'message': 'missing kitten name' });
  });

  it("should return kitten", async (done) => {
    const Kittens = db.collection('kittens');
    const mockKitten = {name: 'Fluffy'};
    await Kittens.insertOne(mockKitten);

    const someCat = await Kittens.findOne(mockKitten);
    expect(someCat).toEqual(mockKitten);

    const response = await request(app).get('/api/kitten?name=Fluffy');
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({ 'name': 'Fluffy' });
    await process.nextTick(() => {});
    done();
  });
});