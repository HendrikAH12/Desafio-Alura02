const Video = require("../models/Video");
const Category = require("../models/Category");

class VideoController {
    //CREATE
    async create(req, res) { 
        const { categoryId, title, desc, url } = req.body;

        let CategoryId;

        if (!categoryId) {
            CategoryId = process.env.FIRST_CATEGORY;
        } else {
            CategoryId = categoryId;
        }

        try {
            try {
                const category = await Category.findById(CategoryId);
                
                if (category === null) {
                    return res.status(400).json("Category does not exist...");
                }
            } catch (err) {
                return res.status(400).json(err);
            }

            const newVideo = new Video({ categoryId: CategoryId, title, desc, url });
            const savedVideo = await newVideo.save();
            return res.status(200).json(savedVideo);
        } catch (err) {
            return res.status(400).json(err);
        }
    }

    //UPDATE
    async update(req, res) {
        const { categoryId, title, desc, url } = req.body;

        let CategoryId;

        if (!categoryId) {
            CategoryId = process.env.FIRST_CATEGORY;
        } else {
            CategoryId = categoryId;
        }

        try {
            try {
                const category = await Category.findById(CategoryId);
                
                if (category === null) {
                    return res.status(400).json("Category does not exist...");
                }
            } catch (err) {
                return res.status(400).json(err);
            }

            const updatedVideo = await Video.findByIdAndUpdate(
                req.params.id,
                { $set: { categoryId: CategoryId, title, desc, url } },
                { new: true }
            );

            if (updatedVideo === null) {
                return res.status(400).json("Video does not exist...");
            }

            return res.status(200).json(updatedVideo);
        } catch (err) {
            return res.status(400).json(err);
        }
    }

    //FIND ALL
    async index(req, res) {
        try {
            const videos = await Video.find();
            return res.send(videos);
        } catch (err) {
            return res.status(400).json(err);
        }
    }

    //FIND BY ID
    async view(req, res) {
        try {
            const video = await Video.findById(req.params.id);

            if (video === null) {
                return res.status(400).json("Video does not exist...");
            }

            return res.send(video);
        } catch (err) {
            return res.status(400).json(err);
        }
    }

    //SEARCH BY TITLE
    async indexByTitle(req, res) {
        const title = req.query.search;

        try {
            const videos = await Video.find({ "title": title });
            return res.send(videos);
        } catch (err) {
            return res.status(400).json(err);
        }
    }

    //DELETE
    async delete(req, res) {
        try {
            const video = await Video.findByIdAndDelete(req.params.id);

            if (video === null) {
                return res.status(400).json("Video does not exist...");
            }

            return res.status(200).json("Video has been deleted...");
        } catch (err) {
            return res.status(400).json(err);
        }
    }
}

module.exports = new VideoController();
