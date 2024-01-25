var mongoose = require("mongoose");

var pointsSchema = new mongoose.Schema({
    userId: String,
    currentPoints: String,
    lastPoints: String,
 });
 var Points = mongoose.model("Points", pointsSchema);

 module.exports = mongoose.model("Points", pointsSchema)