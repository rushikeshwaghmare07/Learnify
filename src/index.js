require("dotenv").config();
const express = require("express");
const connectDB = require("./db/index");
const cookieParser = require("cookie-parser");

const userRoute = require("./routes/user.routes");
const adminRoute = require("./routes/admin.routes");

const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(express.json());
app.use(cookieParser());

// routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/admin", adminRoute);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on PORT: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(`MongoDB connection failed ${error}`);
  });
