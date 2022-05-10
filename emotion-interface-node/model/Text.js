const mongoose = require("mongoose");

const schemaText = new mongoose.Schema({
    Id: {
        type: String,
        required: true
    },
    Data: [{
        type: String,
        require: true
    }]
});

module.exports = mongoose.model("Text", schemaText);