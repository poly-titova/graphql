const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList } = graphql;

/*
const directorJson = [
  { "name": "Quentin Tarantino", "age": 55 },
  { "name": "Michael Radford", "age": 72 },
  { "name": "James McTeigue", "age": 51 },
  { "name": "Guy Ritchie", "age": 50 },
];

const moviesJson = [
  { "name": "Pulp Fiction", "genre": "Crime", "directorId": "62456228c90c886c32813325" },
  { "name": "1984", "genre": "Sci-Fi", "directorId": "62456228c90c886c32813326" },
  { "name": "V for vendetta", "genre": "Sci-Fi-Triller", "directorId": "62456228c90c886c32813327" },
  { "name": "Snatch", "genre": "Crime-Comedy", "directorId": "62456228c90c886c32813328" },
  { "name": "Reservoir Dogs", "genre": "Crime", "directorId": "62456228c90c886c32813325" },
  { "name": "The Hateful Eight", "genre": "Crime", "directorId": "62456228c90c886c32813325" },
  { "name": "Inglourious Basterds", "genre": "Crime", "directorId": "62456228c90c886c32813325" },
  { "name": "Lock, Stock and Two Smoking Barrels", "genre": "Crime-Comedy", "directorId": "62456228c90c886c32813328" },
];
*/

// Набор фильмов
const movies = [
  { id: '1', name: 'Pulp Fiction', genre: 'Crime', directorId: '1' },
  { id: '2', name: '1984', genre: 'Sci-Fi', directorId: '2' },
  { id: '3', name: 'V for vendetta', genre: 'Sci-Fi-Triller', directorId: '3' },
  { id: '4', name: 'Snatch', genre: 'Crime-Comedy', directorId: '4' },
  { id: '5', name: 'Reservoir Dogs', genre: 'Crime', directorId: '1' },
  { id: '6', name: 'The Hateful Eight', genre: 'Crime', directorId: '1' },
  { id: '7', name: 'Inglourious Basterds', genre: 'Crime', directorId: '1' },
  { id: '8', name: 'Lock, Stock and Two Smoking Barrels', genre: 'Crime-Comedy', directorId: '4' },
];

// Набор режисёров
const directors = [
  { id: '1', name: 'Quentin Tarantino', age: 55 },
  { id: '2', name: 'Michael Radford', age: 72 },
  { id: '3', name: 'James McTeigue', age: 51 },
  { id: '4', name: 'Guy Ritchie', age: 50 },
];

// Прописали объект MovieType
const MovieType = new GraphQLObjectType({
  name: 'Movie',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    director: {
      type: DirectorType,
      resolve(parent, args) {
        // поиск режисёров по родительскому запросу
        return directors.find(director => director.id == parent.id);
      }
    }
  }),
});

// Прописали объект DirectorType
const DirectorType = new GraphQLObjectType({
  name: 'Director',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    movies: {
      type: new GraphQLList(MovieType),
      resolve(parent, args) {
        return movies.filter(movie => movie.directorId == parent.id);
      },
    },
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
    director: {
      type: DirectorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return directors.find(director => director.id == args.id);
      },
    },
    movies: {
      type: new GraphQLList(MovieType),
      resolve(parent, args) {
        return movies;
      }
    },
    directors: {
      type: new GraphQLList(DirectorType),
      resolve(parent, args) {
        return directors;
      }
    },
  }
});

module.exports = new GraphQLSchema({
  query: Query,
});
