const mongoose  = require('mongoose');

const heroSchema = new mongoose.Schema({
    name : String,
    birthname : String,
    movies : String,
    likeCount : Number,
    imagUrl : String,
    deceased : Boolean
});

const Hero = mongoose.model("Hero", heroSchema);
module.exports = Hero;