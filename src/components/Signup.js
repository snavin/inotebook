import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'

const Signup = (props) => {
    const host = "http://localhost:5000";
    const [credentials,setcredentials] = useState({name:"",email:"",password:"",confirmpassword:""});
      let navigate=useNavigate();
    const handleSubmit=async (e)=>{
          e.preventDefault();
          // So here I am using destructing concept so it is as below used as credentials but without destructing check the use of object in login js
          const {name,email,password} = credentials;
          //Api Call
          const response = await fetch(`${host}/api/auth/createuser`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // So here I am using destructing concept and add it in the body the parameters but without destructing check the use of object in login js 
          body: JSON.stringify({ name,email,password})
        });
        const json =await response.json();
        console.log(json);
        if(json.success)
        {
          //Save the authToken and redirect
          localStorage.setItem("token",json.authToken)
          
          navigate("/");
          props.showAlert("Account created successfully","success")
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
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" id="name" name="name" aria-describedby="name"  onChange={onChange}/>
        </div>
        <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" name="email" aria-describedby="email" onChange={onChange}/>
        </div>
        <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" name="password" id="password" onChange={onChange}/>
        </div>
        <div className="mb-3">
            <label htmlFor="confirmpassword" className="form-label">Confirm Password</label>
            <input type="confirmpassword" className="form-control" name="confirmpassword" id="confirmpassword" onChange={onChange}/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>
  )
}

export default Signup
