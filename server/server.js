require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");

const schema = require("./usersSchema/schema");
const usersData = require("./utils/utils");
const port = process.env.PORT || 5000;

const app = express();
usersData.setUsers();

app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);
const server = app.listen(port, (err) => {
  if (err) throw err;
  console.log(`Graphql Server started on port ${port}`);
});

module.exports = server;
