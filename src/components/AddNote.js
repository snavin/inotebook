import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

const AddNote = (props) => {
  const { addNote } = useContext(noteContext);

    const [note,setNote] = useState({title:"", description : "", tag : ""});

  const handleClick = (e) =>{
    e.preventDefault();
    addNote(note.title,note.description,note.tag);
    setNote({title:"", description : "", tag : ""});
    props.showAlert("added Notes","success")
  }

  const onChange = (e) =>{
    //here the spread operator will append new name and value on the change of desc,title
    setNote({...note,[e.target.name]:e.target.value}) 
  }
  return (
    <div>
      <div className="container my-3">
        <h2>Add a note</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" name="title" value={note.title} onChange={onChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange}/>
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input type="text" className="form-control" id="tag" name="tag" onChange={onChange} value={note.tag} />
          </div>
          
          <button type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button>
        </form>

        {/* Notes -- NoteItem, we are getting the data from notestate using notecontext  */}
      </div>
    </div>
  );
};

export default AddNote;
