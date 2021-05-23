//pulls in dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");
const noteData = require("./db/db.json");

//sets up the Express app
const app = express();
const PORT = process.env.PORT || 3000;

//sets up the Express app to handle data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Basic routes that first sends the user to the correct page
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "index.html")));

app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

//display notes
app.get("/api/notes", (req, res) => res.json(noteData));

//post notes
app.post("/api/notes", (req, res) => {
  //req.body is the new note
  let newNote = req.body;
  //readfile
  let data = fs.readFileSync("./db/db.json", "utf-8");

  //Add unique id
  newNote.id = noteData.length > 0 ? noteData[noteData.length - 1].id + 1 : 0;
  //push new note into the array
  noteData.push(newNote);

  //use fs.writefile to write updated array to db.json
  fs.writeFileSync(JSON.stringify(noteData), { encoding: "utf-8" });

  //send a response to server
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

//starts the server to begin listening
app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
