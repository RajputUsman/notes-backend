const { response } = require("express");
const express = require("express");
var notesRouter = express.Router();
const mongoose = require("mongoose");
const NoteModel = require("../../db/models/note.model");


// Get All Notes 
notesRouter.get("/", (req, res) => {
  NoteModel.find({}, (err, notes) => {
    if (err) return console.error(err);

    res.json({
      notes,
    });
  });

  // {text, link, tasks, dueDate}
  // Note.find(function (err, kittens) {
  //     if (err) return console.error(err);
  //     console.log(kittens);
  //   })
});


/*
* Add a new Note
*/
notesRouter.post("/", (req, res) => {
    console.log(req.body);
    const newNote = new NoteModel(req.body);
    newNote.save().then((savedNote) => {
        res.json({
            note:savedNote,
        });
    });
//   res.json({
//     reply: "Note created",
//   });
});

/*
* Get a Note by Id
*/
notesRouter.get("/:id", (req, res) => {
  const noteId = req.params.id;

  NoteModel.findById(noteId, (err,note) => {
    if (err){ 
      return console.log(err);
    }

    if(!note){
      return res.status(404).json({
        message: "note not found"
      })
    }

    res.json({
      reply:'note by id success',
      note,
    });
  })
  });

/** 
* Delete a Note by Id
*/
  notesRouter.delete("/:id", (req, res) => {
    const noteId = req.params.id;
    NoteModel.findByIdAndRemove(noteId, (err,deletedNote) => {
      console.log(err, deletedNote)
      if(err){
        return console.log(err);
      }
      if(!deletedNote){
        return res.status(404).json({
          message: "note not found for deletion"
        })
      }
      res.json({
        reply:'delete note by id success',
      });
    })
  });

/** 
* Update Note by Id
*/
  notesRouter.put("/:id", (req, res) => {
    const noteId = req.params.id;
    const updatedBody = req.body;
    NoteModel.findByIdAndUpdate(noteId, updatedBody, {new:true}, (err,updatedNote)=>{

      
      if(err){
        return console.log(err);
      }
      if(!updatedNote){
        return res.status(404).json({
          message: "note not found for updating"
        })
      }
      res.json({
        reply:'updated note by id success',
        updatedNote,
      });

    })
    
  });



module.exports = {
  notesRouter,
};
