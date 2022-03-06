import database from "./components/database/database.js";
import makeApp from "./app.js";

// Using Dependency Injection to pass Database into makeApp
const app = makeApp(database);
app.listen(5000, () => console.log("Listening on Port 5000"));