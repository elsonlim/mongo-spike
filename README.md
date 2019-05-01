# Mongo-Spike

## mongodb setup
1. https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/
2. Using Docker compose 
```
  mongo: 
    image: "mongo:latest"
    ports: 
      - "27017:27017"
```
By default, mongo does not have username and password. however to set it you can supply the in the environment variable or provide a environment file
```
  mongo: 
    image: "mongo:latest"
    ports: 
      - "27017:27017"
    environment:
      - MONGO_INITDB_ROOT_USERNAME=admin
      - MONGO_INITDB_ROOT_PASSWORD=password
```

##  Using in memory mongodb with jest
1. `npm install @shelf/jest-mongodb --save-dev`
2. specify preset in jest config

_in jest.config.js_
```
{
  "preset": "@shelf/jest-mongodb"
  setupFilesAfterEnv: ["./testSetup/setup.js"]
}
```
3. setup the database before run
_in testSetup/setup.js_
```
process.env.dbUrl = global.__MONGO_URI__;
```

4. set up _jest-mongodb-config.js_
```
module.exports = {
  mongodbMemoryServerOptions: {
    instance: {
      dbName: 'test'
    },
    binary: {
      version: '3.6.10',
      skipMD5: true
    },
    autoStart: false
  }
};
```
5. connecting a in memory mongo in the test.

One carvet here is that the the dbName is suppose to map to global var `global.__MONGO_DB_NAME__`, unfortunely it doesn't maps properly and will get default to `jest`. The db name can currently be obtain from after the last "/" of `global.__MONGO_URI__`
```
  beforeAll(async () => {
    const dbParams = global.__MONGO_URI__.split("/");
    const dbName = dbParams[dbParams.length - 1];
    connection = await MongoClient.connect(global.__MONGO_URI__, {
      useNewUrlParser: true,
    });
    db = await connection.db(dbName);
  });
```

6. Cleaning up the db and disconnect mongoose if a mongoose model is created.
```
  afterAll(async () => {
    await mongoose.disconnect();
    await connection.close();
    await db.close();
  });
```

## Seeding data