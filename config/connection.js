const { connect, connection } = require("mongoose");

connect("mongodb://localhost/hackbookDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;
