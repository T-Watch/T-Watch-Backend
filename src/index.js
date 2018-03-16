const { microGraphiql, microGraphql } = require('apollo-server-micro');
const micro = require('micro');
const { get, post, router } = require('microrouter');
const { makeExecutableSchema } = require('graphql-tools');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const { isValidJSValue } = require('graphql/utilities');

const { send, json } = micro;

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const graphqlHandler = async (req, res) => {
  const graphql = microGraphql({ schema, context: { token: req.headers.Authorization } });
  return graphql(req, res);
};
const graphiqlHandler = microGraphiql({ endpointURL: '/graphql' });

const signup = async (req) => {
  const user = await json(req);
  const errors = isValidJSValue(user, schema._typeMap.UserInput);
  if (errors.length > 0) {
    return { errors };
  }
  return resolvers.Mutation.user(undefined, { input: user });
};

const server = micro(router(
  get('/graphql', graphqlHandler),
  post('/graphql', graphqlHandler),
  get('/graphiql', graphiqlHandler),
  post('/signup', signup),
  (req, res) => send(res, 404, 'not found'),
));
server.listen(process.env.PORT || 3000);
