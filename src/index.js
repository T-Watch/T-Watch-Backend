const { microGraphiql, microGraphql } = require('apollo-server-micro');
const micro = require('micro');
const { get, post, router } = require('microrouter');
const { makeExecutableSchema } = require('graphql-tools');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

const { send } = micro;

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const graphqlHandler = microGraphql({ schema });
const graphiqlHandler = microGraphiql({ endpointURL: '/graphql' });

const server = micro(router(
  get('/graphql', graphqlHandler),
  post('/graphql', graphqlHandler),
  get('/graphiql', graphiqlHandler),
  (req, res) => send(res, 404, 'not found'),
));

server.listen(3000);
