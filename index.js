const express = require("express");
const mongoose = require("mongoose"); // ✅ Import Mongoose
const app = express();
const port = process.env.PORT || 3000;
const expressSession = require("express-session");
const flash = require("connect-flash");

const ownerRouter = require("./routes/ownerRouter");
const userRouter = require("./routes/userRouter");
const productRouter = require("./routes/productRouter");
const indexRouter = require("./routes/indexRouter");

require("dotenv").config();

const cookieParser = require("cookie-parser");
const path = require("path");

// ✅ Connect to MongoDB
const db_url = process.env.MONGO_URI;
mongoose
  .connect(db_url)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  expressSession({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(flash());

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.use("/", indexRouter);
app.use("/owners", ownerRouter);
app.use("/users", userRouter);
app.use("/products", productRouter);

app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});
