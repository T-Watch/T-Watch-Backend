const { MongoClient, ObjectId } = require('mongodb');
const scalars = require('./scalars');

const URL = 'mongodb://172.17.0.2:27017';
const DB = 't-watch';

let users; let trainings; let subscriptions; let messages;

const connect = async () => {
  try {
    const connection = await MongoClient.connect(URL);
    const db = connection.db(DB);

    users = db.collection('Users');
    trainings = db.collection('Trainings');
    subscriptions = db.collection('Subscriptions');
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
      if (!subscriptions) {
        return null;
      }
      return subscriptions.find().toArray();
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
      const res = await users.insertOne({ ...args, registryDate: new Date() });
      return res.insertedCount === 1;
    },
  },
  ...scalars,
};
