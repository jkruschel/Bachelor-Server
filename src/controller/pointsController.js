var Points = require("../model/points");

// Setzt bei allen Einträgen lastPoints gleich currentPoints
const pointsReset = async () => {
    punkteListe = Points.find();
    punkteListe.forEach(element => {
        element.lastPoints = element.currentPoints;
    });
}


module.exports = pointsReset;