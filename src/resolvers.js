const { MongoClient, ObjectId } = require('mongodb');
const scalars = require('./scalars');

const URL = 'mongodb://172.17.0.2:27017';
const DB = 't-watch';

let users; let trainings; let plans; let messages;

const connect = async () => {
  try {
    const connection = await MongoClient.connect(URL);
    const db = connection.db(DB);

    users = db.collection('Users');
    users.ensureIndex({ email: 1 }, { unique: true });
    trainings = db.collection('Trainings');
    plans = db.collection('Plans');
    messages = db.collection('Messages');
  } catch (e) {
    console.error(e);
  }
};

connect();
module.exports = {
  Query: {
    user: async (root, args) => {
      console.log(`Get user ${args}`);
      if (!users) {
        return null;
      }
      return users.findOne(ObjectId(args.id));
    },
    users: async () => {
      if (!users) {
        return null;
      }
      return users.find().toArray();
    },
    trainings: async (root, args) => {
      if (!trainings) {
        return null;
      }
      return trainings.find(args).toArray();
    },
    plans: async () => {
      if (!plans) {
        return null;
      }
      return plans.find().toArray();
    },
    messages: async (root, args) => {
      if (!messages) {
        return null;
      }
      return messages.find(args).toArray();
    },
  },
  Mutation: {
    user: async (root, args) => {
      console.log('New user with', args);
      if (!users) {
        return null;
      }
      const res = await users.insertOne({ ...args.input, registryDate: new Date() });
      return res.insertedCount === 1;
    },
  },
  ...scalars,
};
