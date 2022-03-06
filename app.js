import express from "express";

function makeApp(database) {
  var app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  database.createPeopleTable()
  
}

export default makeApp;
