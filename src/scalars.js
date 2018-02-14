const { GraphQLScalarType } = require('graphql');

const dateScalarType = new GraphQLScalarType({
  name: 'Date',
  description: 'Simple date scalar type',
  serialize(date) {
    return date.toString();
  },
  parseValue(value) {
    return new Date(value);
  },
  parseLiteral(ast) {
    if (ast.kind === 'StringValue') {
      return new Date(ast.value);
    }
    return null;
  },
});

module.exports = {
  Date: dateScalarType,
};
