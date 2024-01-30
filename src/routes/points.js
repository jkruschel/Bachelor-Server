const { v4: uuidv4 } = require('uuid');

var Points = require("../model/points");

const express = require('express')
const router = express.Router()
const {computeHighscoreList, getHighscoreListPlacement} = require("../controller/highscoreController")

router.post('/sendPoints', async (req, res) => {
    const oldRecord = await Points.findOne({userId: req.body.userId});
    // Ist der Benutzer neu und übermittelt deshalb keine UUID, wird ein neuer record für ihn angelegt
    if(oldRecord == null){
        console.log("keine userID übergeben")
        const data = new Points({
            userId: uuidv4(),
            currentPoints: req.body.currentPoints,
            lastPoints: req.body.currentPoints
        })
        try {
            const dataToSave = await data.save();
            let platzierung = await getHighscoreListPlacement(data.userId);
            let responseData = {...dataToSave.toObject(), platz: platzierung}
            res.status(200).json(responseData);
        }
        catch (error) {
            res.status(400).json({message: error.message})
        }
    }
    // Ist der Benutzer nicht neu, wird sein currentPoints geupdated
    else{     
        oldRecord.currentPoints = req.body.currentPoints;
        try {
            const dataToSave = await oldRecord.save();
            let platzierung = await getHighscoreListPlacement(req.body.userId);
            let responseData = {...dataToSave.toObject(), platz: platzierung}
            res.status(200).json(responseData);
        }
        catch (error) {
            res.status(400).json({message: error.message})
        }
    }
})

router.get('/computeHighscoreList', async (req, res, next) => {
    computeHighscoreList();
    res.status(200).json("Highscore Liste berechnet");
  })

module.exports = router