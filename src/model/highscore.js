var mongoose = require("mongoose");

var highscoreSchema = new mongoose.Schema({
    scoreList: [],
 });
 var Highscore = mongoose.model("Highscore", highscoreSchema);

 module.exports = mongoose.model("Highscore", highscoreSchema)