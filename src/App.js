import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, {useState} from 'react'
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import Signup from "./components/Signup";
import Login from "./components/Login";

function App() {
  const [alert,setAlert] = useState(null);

  const showAlert = (msg,type)=>{
    setAlert({
      type : type,
      msg: msg
    })
    setTimeout(() =>{
      setAlert(null);
    },2000);
  }
  return (
    <>
    {/* Here the Notestate is written because using the notecontext and data from notestate we prop drill to different components */}
      <NoteState> 
        <BrowserRouter>
          <Navbar/>
          <Alert alert={alert}></Alert>
          {/* <Alert message="This is good"/> */}
          <div className="container my-2">
            <Routes>
              <Route exact path="/"  showAlert={showAlert} element={<Home showAlert={showAlert} />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/login"  element={<Login showAlert={showAlert}/>} />
              <Route exact path="/signup"  element={<Signup showAlert={showAlert}/>} />
            </Routes>
          </div>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
