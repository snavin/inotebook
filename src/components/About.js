import React,{useContext, useEffect} from "react";
import noteContext from "../context/notes/noteContext";

const About = () => {
  const a = useContext(noteContext); //props drilling
  useEffect(()=>{
      a.getNotes();
  }) 
  return (<div>This is About {a.notes.title} an class {a.notes.description}</div>);
};

export default About;
