import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";


//noteContext -- NoteState -- Notes.js -- NoteItem.js
const NoteItem = (props) => {
    const { deleteNote } = useContext(noteContext);
  const { notes, updateNote} = props;
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title"> {notes.title}</h5>
          <p className="card-text">{notes.description}</p>
          <i className="fa-solid fa-trash-can mx-2" onClick={()=>{deleteNote(notes._id); props.showAlert("deleted Notes","success");}}></i>
          <i className="fa-regular fa-pen-to-square mx-2" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>{updateNote(notes); props.showAlert("updated Notes","success");}}></i>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
