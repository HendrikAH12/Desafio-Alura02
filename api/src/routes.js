const express = require("express");
const VideoRoutes = require("./routes/Video");
const CategoryRoutes = require("./routes/Category");

const app = express();

app.use(VideoRoutes);
app.use(CategoryRoutes);

module.exports = app;
