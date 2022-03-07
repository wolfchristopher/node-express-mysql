import express from "express";
import healthEndpoint from "./components/health/health.js";
import peopleBatch from "./components/people/peopleBatch.js";

function makeApp(database) {
  var app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  database.createPeopleTable();
  healthEndpoint(app);
  peopleBatch.peopleBatchPost(database, app);
  
  return app
}

export default makeApp;
