import React, { useContext, useEffect,useRef,useState} from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import {useNavigate} from 'react-router-dom'

const Notes = (props) => {
    const { notes, getNotes,editNote } = useContext(noteContext);
    let navigate=useNavigate();
    useEffect(()=>{
      if(localStorage.getItem('token'))
      {
        getNotes()
      }
      else{
        navigate("/login");
      }
    },[])

    const ref = useRef(null)
    const refClose = useRef(null) // to close the modal we are using the useref hook
    const [note,setNote] = useState({id:"",etitle:"", edescription : "", etag : ""});

    // to bring the current data on the modal, press the edit icon and then u can see the data in the popup
    const updateNote =(currentNote)=>{
        ref.current.click();
        setNote({id:currentNote._id,etitle: currentNote.title, edescription :currentNote.description, etag : currentNote.tag })
    }

    const handleClick = (e) =>{
       // console.log("Update a note",note);
        editNote(note.id,note.etitle,note.edescription,note.etag);
        refClose.current.click();
        //e.preventDefault();
      }
    
      const onChange = (e) =>{
        //here the spread operator will append new name and value on the change of desc,title
        setNote({...note,[e.target.name]:e.target.value}) 
      }
    
  return (
    <div>
      <AddNote showAlert={props.showAlert}/>
        <button type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
            Launch demo modal
            </button>

        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"  aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle}  onChange={onChange} minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag}   onChange={onChange}/>
                </div>
                
            </form>
            </div>
            <div className="modal-footer">
            <button type="button" ref={refClose}  className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button  onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
            </div>
            </div>
        </div>
        </div>
        <h2 >Your Notes</h2>
      <div className="container row my-3">
      
        {notes.length === 0 && "no notes to display"}
        {notes.map((notes) => {
          return <NoteItem key={notes._id} updateNote={updateNote} notes={notes} showAlert={props.showAlert} />;
        })}
      </div>
    </div>
  );
};

export default Notes;
