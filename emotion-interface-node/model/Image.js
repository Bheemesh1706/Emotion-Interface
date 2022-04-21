const mongoose = require("mongoose");

const schemaImage = new mongoose.Schema({
    Id: {
        type: String,
        required: true
    },
    Data: [{
        type: Object,
        require: true
    }]
});

module.exports = mongoose.model("Image", schemaImage);