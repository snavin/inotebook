import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'

const Login = (props) => {
  const host = "http://localhost:5000";
  const [credentials,setcredentials] = useState({email:"",password:""});
    let navigate=useNavigate();
  const handleSubmit=async (e)=>{
        e.preventDefault();
        
        //Api Call
        const response = await fetch(`${host}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // So here I am not using destructing concept so it is as below as an object but check the signup js it is use destructing
        body: JSON.stringify({ email: credentials.email, password: credentials.password })
      });
      const json =await response.json();
      console.log(json);
      if(json.success)
      {
        //Save the authToken and redirect
        localStorage.setItem("token",json.authToken)
        props.showAlert("Logged in successfully","success");
        navigate("/");
        
        //props.showAlert()
      }
      else{
        props.showAlert("Invalid Credentials","danger")
      }
  }

  const onChange = (e) =>{
    //here the spread operator will append new name and value on the change of desc,title
    setcredentials({...credentials,[e.target.name]:e.target.value}) 
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" name="email" value={credentials.email} aria-describedby="emailHelp" onChange={onChange}/>
        </div>
        <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" value={credentials.password}  name="password" onChange={onChange}/>
        </div>
        <button type="submit" className="btn btn-primary" >Submit</button>
      </form>
    </div>
  )
}

export default Login
