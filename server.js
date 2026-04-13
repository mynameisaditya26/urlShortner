const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/bachaderUrlShortener")
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.error("Could not connect to MongoDB", err));


app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use('/', require('./routes/urlRoutes'));


app.listen(3000, () => {
    console.log("Server is running on port 3000");
});