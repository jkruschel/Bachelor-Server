var Points = require("../model/points");
var Highscore = require("../model/highscore");

const computeHighscoreList = async () => {
    await Highscore.deleteMany();
    pointsList = await Points.find();
    let sortedPointsArray = pointsList.sort((a, b) => {
        a.pointsDiff = a.lastPoints - a.currentPoints;
        b.pointsDiff = b.lastPoints - b.currentPoints;
        return (a.pointsDiff > b.pointsDiff) ? 1 : ((b.pointsDiff > a.pointsDiff) ? -1 : 0)
    })
    const data = new Highscore({
        scoreList: sortedPointsArray,
    })
    data.save();
}

const getHighscoreListPlacement = async (uuid) => {
    const highscoreList = await Highscore.findOne();
    entry = highscoreList.scoreList.find(a => a.userId === uuid);
    return highscoreList.scoreList.indexOf(entry) + 1;
}

module.exports = {computeHighscoreList, getHighscoreListPlacement};