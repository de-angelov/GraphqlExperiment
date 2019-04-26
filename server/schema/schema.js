const graphql = require('graphql');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLInt,
  GraphQLID,
  GraphQLNonNull,
  GraphQLList
} = graphql;

const Book = require('../models/book');
const Author = require('../models/author');

const authors = [{
  name: 'Patrick Rothfuss',
  age: 44,
  id: "1"
}, {
  name: 'Brandon Sanderson',
  age: 42,
  id: "2"
}, {
  name: 'Terry Pratchett',
  age: 66,
  id: "3"
}, ]

const books = [{
  name: 'Name of the Wind',
  genre: 'Fantasy',
  id: '1',
  authorId: '1'
}, {
  name: 'The Final Empire',
  genre: 'Fantasy',
  id: '2',
  authorId: '2'
}, {
  name: 'The Long Earth',
  genre: 'Sci-Fi',
  id: '3',
  authorId: '3'
}, {
  name: 'The Hero of Ages',
  genre: 'Fantasy',
  id: '4',
  authorId: '2'
}, {
  name: 'The Colour of Magic',
  genre: 'Fantasy',
  id: '5',
  authorId: '3'
}, {
  name: 'The Light Fantastic',
  genre: 'Fantasy',
  id: '6',
  authorId: '3'
}]

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
      },
      author: {
        type: AuthorType,
        resolve: (parent, args) {
          // return authors.find(author => author.id === id)
          return Author.findById(parent.authorId);
        }
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: {
      type: {
        type: GraphQLString
      },
      name: {
        type: GraphQLString,
      },
      age: {
        type: GraphQLInt
      },
      books: {
        type: new GraphQLList(BookType),
        resolve: () {
          // return books.filter(book => book.authorId === id);
          return Book.find({
            authorid: parent.id
          })
        }

      }
    }
  })
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
        // return books.find(movie => movie.id === id);
        return Book.findById(args.id);
      },
    },
    author: {
      type: AuthorType,
      args: {
        id: {
          type: GraphQLID
        }
      },
      resolve: (parent, args) => {
        // return authors.find(author => author.id === id);
        return Author.findById(args.id);
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // return books
        // return Book.findById(args.id);
        return Books.find();
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        // return authors;
        return Author.find();
      }
    }

  }
});

const Mutations = new GraphQLObjectType({
  name: 'Mutations',
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: {
          type: new GraphQLNonNull(GraphQLString)
        },
        age: {
          type: new GraphQLNonNull(GraphQLInt)
        }
      },
      resolve(parent, args) {
        let author = new Author({
          name: args.name,
          age: args.age,
        });
        return author.save();
      }
    },
    addBook: {
      type: BookType,
      args: {
        name: {
          type: new GraphQLNonNull(GraphQLString)
        },
        genre: {
          type: new GraphQLNonNull(GraphQLString)
        },
        authorId: {
          type: new GraphQLNonNull(GraphQLID)
        },
      },
      resolve(parent, args) {
        let book = new Book({
          name: args.name,
          genre: args.genre,
          authorId: args.id
        });
        return book.save();

      }
    }

  }
})

module.export = new GraphQlSchema({
  query: RootQuery,
  mutation: Mutation,
});