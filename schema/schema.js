const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID } = graphql;

// Набор фильмов
const movies = [
  { id: '1', name: 'Pulp Fiction', genre: 'Crime' },
  { id: '2', name: '1984', genre: 'Sci-Fi' },
  { id: 3, name: 'V for vendetta', genre: 'Sci-Fi-Triller' },
  { id: 4, name: 'Snatch', genre: 'Crime-Comedy' },
];

// Прописали объект MovieType
const MovieType = new GraphQLObjectType({
  name: 'Movie',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
  }),
});

// Прописали объект Query
const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    movie: {
      type: MovieType,
      args: { id: { type: GraphQLID } },
      // что в результате
      resolve(parent, args) {
        // поиск фильма по запросу с id
        return movies.find(movie => movie.id == args.id);
      },
    },
  }
});

module.exports = new GraphQLSchema({
  query: Query,
});
