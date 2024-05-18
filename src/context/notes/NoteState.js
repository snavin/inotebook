import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  //   const s1 = {
  //     "name": "Navin",
  //     "class": "5b"
  //   }

  //const [state, setState] = useState(s1);
  //   const update = () => {
  //     setTimeout(() => {
  //       setState({
  //         name: "Kumar",
  //         class: "10b",
  //       });
  //     }, 1000);
  //   };

  const host = "http://localhost:5000";
  const notesInitial = [];

  //   const notesInitial = [
  //     {
  //       _id: "663a335de0654f0b3dd51635",
  //       user: "662aacd3cd0fc9629f3fce13",
  //       title: "new note",
  //       description: "isdfsd up early",
  //       tag: "personal",
  //       date: "2024-05-07T13:57:49.491Z",
  //       __v: 0,
  //     },
  //     {
  //       _id: "663a3369e0654f0b3dd5163a",
  //       user: "662aacd3cd0fc9629f3fce13",
  //       title: "new note2",
  //       description: "isdfsd up early",
  //       tag: "personal",
  //       date: "2024-05-07T13:58:01.580Z",
  //       __v: 0,
  //     },
  //     {
  //       _id: "663a336de0654f0b3dd5163c",
  //       user: "662aacd3cd0fc9629f3fce13",
  //       title: "new note3",
  //       description: "isdfsd up early",
  //       tag: "personal",
  //       date: "2024-05-07T13:58:05.368Z",
  //       __v: 0,
  //     },
  //     {
  //       _id: "663a336de0654f0b3dd5163d",
  //       user: "662aacd3cd0fc9629f3fce13",
  //       title: "new note4",
  //       description: "isdfsd up early",
  //       tag: "personal",
  //       date: "2024-05-07T13:58:05.368Z",
  //       __v: 0,
  //     },
  //     {
  //       _id: "663a336de0654f0b3dd5163g",
  //       user: "662aacd3cd0fc9629f3fce13",
  //       title: "new note3",
  //       description: "isdfsd up early",
  //       tag: "personal",
  //       date: "2024-05-07T13:58:05.368Z",
  //       __v: 0,
  //     },
  //   ];

  const [notes, setNotes] = useState(notesInitial);

  //Get all notes
  const getNotes = async () => {
    //Api Call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem("token")
      },
    });
    const json =await response.json();
    //console.log(json)
    setNotes(json);
  }

  //Add a note
  const addNote = async (title, description, tag) => {
    //Api Call
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYyYWFjZDNjZDBmYzk2MjlmM2ZjZTEzIn0sImlhdCI6MTcxNDQxNTA4OX0.IK6ZILFwf7ku9xjgQLocPVD-SGIBN-Ah-Ux_Jssevc8",
      },
      body: JSON.stringify({ title, description, tag })
    });
    const note = await response.json();
    //console.log(json);
    //console.log("adding a new note");
    //const note = json;
    // const note = {
    //   _id: "663a336de0654f0b3dd5163gg",
    //   user: "662aacd3cd0fc9629f3fce14",
    //   title: title,
    //   description: description,
    //   tag: tag,
    //   date: "2024-05-07T13:58:05.368Z",
    //   __v: 0,
    // };

    setNotes(notes.concat(note));
  };

  //Delete a note
  const deleteNote = async (id) => {

    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYyYWFjZDNjZDBmYzk2MjlmM2ZjZTEzIn0sImlhdCI6MTcxNDQxNTA4OX0.IK6ZILFwf7ku9xjgQLocPVD-SGIBN-Ah-Ux_Jssevc8",
        }
      });
    const json = response.json();
    console.log(json);
    const newNotes = notes.filter((notes) => {
      return notes._id !== id;
    });
    // these wil delete the particular id and leave the other id as it is
    setNotes(newNotes);
  };

  //Edit a note

  const editNote = async (id, title, description, tag) => {
    //Api Call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYyYWFjZDNjZDBmYzk2MjlmM2ZjZTEzIn0sImlhdCI6MTcxNDQxNTA4OX0.IK6ZILFwf7ku9xjgQLocPVD-SGIBN-Ah-Ux_Jssevc8",
      },
      body: JSON.stringify({title, description, tag}),
    });
    const json = response.json();
    console.log(json);

    let newNotes = JSON.parse(JSON.stringify(notes));

    //Logic to edit the client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };

  return (
    // <div>This is About</div>
    <NoteContext.Provider
      value={{ notes, setNotes, addNote, deleteNote, editNote,getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );

  //   return (
  //     // <div>This is About</div>
  //     <NoteContext.Provider value={{ state, update }}>
  //       {props.children}
  //     </NoteContext.Provider>
  //   );
};

export default NoteState;
