import express from "express";
import healthEndpoint from "./components/health/health.js";

function makeApp(database) {
  var app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  database.createPeopleTable()
  healthEndpoint(app)
  
  return app
}

export default makeApp;
