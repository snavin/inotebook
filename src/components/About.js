import React,{useContext, useEffect} from "react";
import noteContext from "../context/notes/noteContext";

const About = () => {
  const a = useContext(noteContext); //props drilling
  useEffect(()=>{
      a.update();
  }) 
  return (<div>This is About {a.state.name} an class {a.state.class}</div>);
};

export default About;
