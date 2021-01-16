const path = require('path');
const express = require('express');
const app = express();
const cors = require('cors');
const wordController = require('./controllers/wordController');

app.use(express.json());
app.use(cors());

app.route('/api/words').post(wordController.newWord).get(wordController.getWords);
app.use(express.static(path.join(__dirname,'client/build')));
app.get("/", (req,res) => {
    res.sendFile(path.join(__dirname,'client/build/index.html'));
});
app.use("*", (req,res) => {
    res.status(404).send("This page does not exist");
})

module.exports = app;