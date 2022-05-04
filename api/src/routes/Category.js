const express = require("express");
const CategoriesController = require("../controllers/Category");
const categoryValidator = require("../validators/Category");

const routes = express.Router();

routes.post("/categories", categoryValidator.createAndUpdate, CategoriesController.create);

routes.put("/categories/:id", categoryValidator.createAndUpdate, CategoriesController.update);

routes.get("/categories", CategoriesController.index);
routes.get("/categories/view/:id", CategoriesController.view);
routes.get("/categories/:id/videos", CategoriesController.videos);

routes.delete("/categories/:id", CategoriesController.delete);

module.exports = routes;
