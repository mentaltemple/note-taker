//pulls in dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");

//sets up the Express app
const app = express();
const PORT = process.env.PORT || 3000;

//sets up the Express app to handle data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Basic route that sends the user first to the correct page
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "index.html")));

app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "notes.html"))
);

//starts the server to begin listening
app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
