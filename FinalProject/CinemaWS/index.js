const express = require("express");
const cors = require("cors");
const connectDB = require("./configs/DB");
const applyFirstUser = require("./services/applyFirstUser");

const usersDBController = require("./controllers/usersDBController");
const usersJsonController = require("./controllers/usersJsonController");
const permissionsJsonController = require("./controllers/permissionsJsonController");

const app = express();
const port = 8001;

connectDB();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/usersDB", usersDBController);
app.use("/usersJson", usersJsonController);
app.use("/permissionsJson", permissionsJsonController);

app.listen(port, () => {
  console.log("App is listening in port", port);
  applyFirstUser();
});
