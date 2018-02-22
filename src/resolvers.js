const { MongoClient, ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');
const scalars = require('./scalars');

const URL = process.env.MONGO_URL || 'mongodb://172.17.0.2:27017';
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

const auth = callback =>
  async (root, args, context) => {
    if (!context.token) {
      throw new Error('No Authorization header');
    }
    try {
      jwt.verify(context.token, 'shhhh');
    } catch (e) {
      return { error: e };
    }
    return callback(root, args);
  };

connect();
module.exports = {
  Query: {
    token: async (root, args) => {
      console.log('Get token ', args);
      if (!users) {
        return null;
      }
      try {
        const u = await users.findOne(args, { type: 1 });
        if (!u) throw new Error('Wrong input');
        return { token: jwt.sign({ email: args.email, type: u.type }, 'shhhh', { expiresIn: '30d' }) };
      } catch (e) {
        return { error: e.message };
      }
    },
    user: auth(async (root, args) => {
      console.log('Get user ', args);
      if (!users) {
        return null;
      }
      return users.findOne(ObjectId(args.id));
    }),
    users: auth(async () => {
      if (!users) {
        return null;
      }
      return users.find().toArray();
    }),
    trainings: auth(async (root, args) => {
      if (!trainings) {
        return null;
      }
      return trainings.find(args).toArray();
    }),
    plans: auth(async () => {
      if (!plans) {
        return null;
      }
      return plans.find().toArray();
    }),
    messages: auth(async (root, args) => {
      if (!messages) {
        return null;
      }
      return messages.find(args).toArray();
    }),
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
