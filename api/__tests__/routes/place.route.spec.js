const {MongoClient} = require('mongodb');
const request = require('supertest');
const {app} = require('../../build/src/routes');
var mongoose = require("mongoose");

describe('kitten', () => {
  let connection;
  let db;

  const createRandomPlace = (name, description, lng, lat) => {
    return {
      name: name | `randomName${Math.random(1000)}`,
      description: description | `randomDescription${Math.random(1000)}`,
      location: {
        type: 'Point',
        coordinates: [lng | Math.random(1000), lat | Math.random(1000)]
      }
    }
  }

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

  beforeEach(async () => {
    await db.dropDatabase();
  })
  
  it("should create place", async () => {
    const mockPlace = {
      name: 'Nylon',
      description: 'Coffee with Joy',
      lng: -122.5,
      lat: 37.7
    };

    const placeObj = {
      name: 'Nylon',
      description: 'Coffee with Joy',
      location: {
        type: 'Point',
        coordinates : [-122.5, 37.7]
      }
    }

    const response = 
      await request(app)
        .post('/api/place')
        .send(mockPlace)
        .set('Accept', 'application/json');
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(placeObj);

    const Places = db.collection('places');
    const somePlace = await Places.findOne({name: 'Nylon'});
    expect(somePlace).toMatchObject(placeObj);
  });
  
  it("should return all saved places", async () => {
    const Places = db.collection('places');
    const mockPlace1 = createRandomPlace('placeA');
    const mockPlace2 = createRandomPlace('placeB');
    await Places.insertMany([mockPlace1, mockPlace2]);

    const response = await request(app).get('/api/place');
    expect(response.status).toBe(200);

    const responsePlaces = response.body;
    expect(responsePlaces.length).toBe(2);
  });
});