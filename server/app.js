const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('../schema/schema')

const app = express();
const PORT = 3005;

// Подключение graphql как middleware
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

// Запуск прослушивания на 3005 порту
app.listen(PORT, err => {
  err ? console.log(error) : console.log(`Server started on port ${PORT}!`);
});
