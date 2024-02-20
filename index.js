const express = require("express")
const app = express();
const mongoose = require("mongoose")
const dotenv = require("dotenv");
const userRoute = require ("./routes/user");
const authRoute = require ("./routes/auth");
const articleRoute = require ("./routes/article");
const videoRoute = require ("./routes/video");
const chatRoute = require ("./routes/chat");

dotenv.config()

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());  
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/articles", articleRoute);
app.use("/api/videos", videoRoute);
app.use("/api/chats", chatRoute);


app.listen(process.env.POT || 5000, () => {
    console.log("Backend server is running!");
});