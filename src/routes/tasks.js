var Task = require("../model/task");

const express = require('express')
const router = express.Router()

router.post('/create', async (req, res) => {
  const data = new Task({
      id: req.body.id,
      umfang: req.body.umfang,
      name: req.body.name,
      inhaltKurz: req.body.inhaltKurz,
      html: req.body.html,
      punkte: req.body.punkte
  })

  try {
      const dataToSave = await data.save();
      res.status(200).json(dataToSave)
  }
  catch (error) {
      res.status(400).json({message: error.message})
  }
})

router.get('/all', async (req, res, next) => {
  try{
    const data = await Task.find();
    res.json(data)
}
catch(error){
    res.status(500).json({message: error.message})
}
})

module.exports = router