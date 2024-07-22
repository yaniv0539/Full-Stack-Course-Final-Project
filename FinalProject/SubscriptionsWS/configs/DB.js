const mongoose = require("mongoose");

const connectDB = async () => {
  const url = "mongodb://localhost:27017/SubscriptionsDB";
  let options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  await mongoose.connect(url, options);
  console.log("connected to DB");
};

module.exports = connectDB;
