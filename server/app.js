const express = require('express');
const app = express();
const graphqlHTTP = require('express-graphql');

app.use('/graphql', graphqlHTTP(

));

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`)
});