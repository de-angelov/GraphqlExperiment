const express = require('express');
const app = express();
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

app.use(cors());

mongoose.connect('mongodb+srv://user:1234@cluster0-asu05.mongodb.net/test?retryWrites=true')
mongoose.connection.once('open', () => {
  console.log('connected to database');
})

app.use('/graphql', graphqlHTTP(
  schema,
  graphiql: true
));

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`)
});