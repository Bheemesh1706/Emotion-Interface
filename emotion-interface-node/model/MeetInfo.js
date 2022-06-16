const mongoose = require("mongoose");

const schemaMeetInfo = new mongoose.Schema({
    Id: {
        type: String,
        required: true
    },
    Link: {
        type: String,
        require: true
    },
    Participants:[{type:String}]
});

module.exports = mongoose.model("MeetInfo", schemaMeetInfo);