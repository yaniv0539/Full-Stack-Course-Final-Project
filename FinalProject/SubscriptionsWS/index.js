const express = require("express");
const cors = require("cors");
const connectDB = require("./configs/DB");

const membersController = require("./controllers/membersController");
const moviesController = require("./controllers/moviesController");
const subscriptionsController = require("./controllers/subscriptionsController");
const applyFirstData = require("./services/applyFirstData");

const app = express();
const port = 8000;

connectDB();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/members", membersController);
app.use("/movies", moviesController);
app.use("/subscriptions", subscriptionsController);

app.listen(port, async () => {
  console.log("App is listening in port", port);
  try {
    await applyFirstData();
  } catch (error) {
    console.log(error);
  }
});
