"use strict";

// MongoDB setup
const { MongoClient } = require("mongodb");
const MONGODB_URI = "mongodb://localhost:27017/tweeter";

// App begins listening after database connection is successful
MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }

  // We have a connection to the "tweeter" db, starting here.
  console.log(`Connected to mongodb: ${MONGODB_URI}`);

  // Basic express setup:
  const PORT          = 8080;
  const express       = require("express");
  const bodyParser    = require("body-parser");
  const app           = express();

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json({}));
  app.use(express.static("public"));

  const DataHelpers = require("./lib/data-helpers.js")(db);
  
  const tweetsRoutes = require("./routes/tweets")(DataHelpers);
  
  app.use("/tweets", tweetsRoutes);
  
  app.listen(PORT, () => {
    console.log("Example app listening on port " + PORT);
  });
});
