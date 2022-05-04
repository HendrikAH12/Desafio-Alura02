const mongoose = require("mongoose");

const VideoSchema = new mongoose.Schema(
    {
        categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
        title: { type: String, required: true },
        desc: { type: String, required: true },
        url: { type: String, required: true }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Video", VideoSchema);
