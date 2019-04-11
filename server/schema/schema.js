const graphql = require('graphql');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema
} = graphql;

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: {
      type: {
        type: GraphQLString
      },
      name: {
        type: GraphQLString
      },
      genre: {
        type: GraphQLString
      }
    }

  });
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: {
        id: {
          type: GraphQLString
        }
      },
      resolve(parent, args) {
        args.id
        //code to get data from db// other source 
      },
    }
  }
});

module.export = new GraphQlSchema({
  query: RootQuery
});