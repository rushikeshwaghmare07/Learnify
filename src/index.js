require("dotenv").config();
const express = require("express");
const connectDB = require("./db/index");

const userRoute = require("./routes/user.routes");

const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(express.json());

// routes
app.use("/api/v1/user", userRoute);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on PORT: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(`MongoDB connection failed ${error}`);
  });
