const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = require("./app");

dotenv.config();

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {})
    .catch((err) => {err});

app.listen(process.env.PORT || 5000, () => {});
