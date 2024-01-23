var mongoose = require("mongoose");

var taskSchema = new mongoose.Schema({
    id: String,
    umfang: String,
    name: String,
    inhaltKurz: String,
    html: [],
    punkte: String
 });
 var Task = mongoose.model("Task", taskSchema);

 module.exports = mongoose.model("Task", taskSchema)