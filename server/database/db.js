const mongoose = require("mongoose");

const Connection = async (USERNAME, PASSWORD) => {
  const URL = `mongodb+srv://${USERNAME}:${PASSWORD}@mernstack.ogsop2q.mongodb.net/?retryWrites=true&w=majority`;
  try {
    await mongoose.connect(URL, {});
    console.log("Database connection successful");
  } catch (error) {
    console.log("Database connection failed" + error.message);
  }
};

module.exports = Connection;