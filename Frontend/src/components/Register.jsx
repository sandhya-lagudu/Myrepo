import Axios from 'axios';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

export function Register(){
    const [firstName,setFirstName]=useState("");
    const [lastName,setLastName]=useState("");
    const [userName,setUserName]=useState("");
    const [email,setEmail]=useState("");
    const [phone,setPhone]=useState(0);
    const [password,setPassword]=useState("");
    const url=`http://localhost:8080/register`;
    const navigate=useNavigate();
    const sendCode=async (funcUrl)=>{
        const payload={
          firstName,
        lastName,
        userName,
        email,
        phone,
        password
        };
        try{
          const {data} = await Axios.post(`${funcUrl}`,payload);
          // if(data.message!=undefined){
          //   navigate("/login");
          // }
          console.log(data);
        }
        catch(error){
          console.log(error.response);
        }
      };
    return (
        <>
        <div className="flex items-center justify-center">
        <form className="h-screen flex flex-col justify-center w-4/12">
          <h1>Create your account</h1>
          <br />
          <input
            type="text"
            name="fname"
            id="fname"
            placeholder="First Name"
            onChange={e=>{setFirstName(e.target.value)}}
            // value={user.firstName}
          />
          <br />
          
          <input
            type="text"
            name="lname"
            id="lname"
            placeholder="Last Name"
            onChange={e=>{setLastName(e.target.value)}}
            // value={user.lname}
          />
          <br />
          <input
            type="text"
            name="uname"
            id="uname"
            placeholder="UserName"
            onChange={e=>{setUserName(e.target.value)}}
            // value={user.lname}
          />
          <br />
          
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            onChange={e=>{setEmail(e.target.value)}}
            // value={user.email}
          />
          <br />
          
          <input
            type="phone"
            name="phone"
            id="phone"
            placeholder="Phone"
            onChange={e=>{setPhone(e.target.value)}}
            // value={user.email}
          />
          <br />
          
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            onChange={e=>{setPassword(e.target.value)}}
            // value={user.password}
          />
          <br />
          
          <button onClick={()=>{sendCode(url)}}>
            Register
          </button>
        </form>
      </div>
        </>
    );
}