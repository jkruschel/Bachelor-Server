const { v4: uuidv4 } = require('uuid');

var Points = require("../model/points");

const express = require('express')
const router = express.Router()

router.post('/sendPoints', async (req, res) => {
    // Ist der Benutzer neu und übermittelt deshalb keine UUID, wird ein neuer record für ihn angelegt
    if(!req.body.userId){
        console.log("keine userID übergeben")
        req.body.userId = uuidv4();

        const data = new Points({
            userId: req.body.userId,
            currentPoints: req.body.currentPoints,
            lastPoints: req.body.currentPoints
        })
        try {
            const dataToSave = await data.save();
            res.status(200).json(dataToSave)
        }
        catch (error) {
            res.status(400).json({message: error.message})
        }
    }
    // Ist der Benutzer nicht neu, wird sein currentPoints geupdated
    else{
        const oldRecord = await Points.findOne({userId: req.body.userId});
        oldRecord.currentPoints = req.body.currentPoints;
        try {
            const dataToSave = await oldRecord.save();
            res.status(200).json(dataToSave)
        }
        catch (error) {
            res.status(400).json({message: error.message})
        }
    }
})

module.exports = router