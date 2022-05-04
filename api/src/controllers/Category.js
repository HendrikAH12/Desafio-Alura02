const Category = require("../models/Category");
const Video = require("../models/Video");

class CategoryController {
    //CREATE
    async create(req, res) {
        const newCategory = new Category(req.body);

        try {
            const savedCategory = await newCategory.save();
            return res.status(200).json(savedCategory);
        } catch (err) {
            return res.status(400).json(err);
        }
    }

    //UPDATE
    async update(req, res) {
        try {
            const updatedCategory = await Category.findByIdAndUpdate(
                req.params.id,
                { $set: req.body },
                { new: true }
            );

            if (updatedCategory === null) {
                return res.status(400).json("Category does not exist...");
            }

            return res.status(200).json(updatedCategory);
        } catch (err) {
            return res.status(400).json(err);
        }
    }

    //FIND ALL
    async index(req, res) {
        try {
            const categories = await Category.find();
            return res.send(categories);
        } catch (err) {
            return res.status(400).json(err);
        }
    }

    //FIND BY ID
    async view(req, res) {
        try {
            const category = await Category.findById(req.params.id);

            if (category === null) {
                return res.status(400).json("Category does not exist...");
            }

            return res.send(category);
        } catch (err) {
            return res.status(400).json(err);
        }
    }

    //VIDEOS BY CATEGORY
    async videos(req, res) {
        const id = req.params.id;

        try {
            const videos = await Video.find({ "categoryId": id });
            return res.send(videos);
        } catch (err) {
            return res.status(400).json(err);
        }
    }

    //DELETE
    async delete(req, res) {
        try {
            const category = await Category.findByIdAndDelete(req.params.id);

            if (category === null) {
                return res.status(400).json("Category does not exist...");
            }

            return res.status(200).json("Category has been deleted...");
        } catch (err) {
            return res.status(400).json(err);
        }
    }
}

module.exports = new CategoryController();
