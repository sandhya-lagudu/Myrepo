import { useState,useEffect } from "react";
import Axios from "axios";
import { useNavigate } from 'react-router-dom';

export function Login(){
    const [userName,setUserName] = useState("");
    const [password,setPassword]=useState("");
    const [check,setCheck]=useState(0);
    // console.log(check);
    const navigate=useNavigate();
    const url=`http://localhost:8080/login`;
    
    // const checkUser=()=>{
    //     const payload={
    //         userName,
    //         password
    //     };
    //     // const payload={
    //     //     userName,
    //     //     password
    //     // };
    //     // try{
    //     //     // setCheck(1);
    //     //     const {data} = await Axios.post(`${funcUrl}`,payload);
    //     //     setCheck(data.message);
    //     //     console.log(check);
    //     // //   if(data===1){
    //     // //     navigate("/problemlist");
    //     // //   }
    //     // }
    //     // catch(error){
    //     //   console.log(error.response);
    //     // }
    //     // await setCheck(1);
    //     console.log(payload);
    //   };
      const handleSubmit = async event => {
        event.preventDefault();
        const request = { userName, password };
        await Axios
          .post(url, request)
          .then(res => {
            console.log(res);
            if(res.data.message==="Good"){
            // localStorage.setItem("jwtToken", res.data.token);
            navigate("/problemlist");
            }
          })
          .catch(error => {
            console.log("Error occurred in Login API", error);
            // toast.error(error.response.data.message, {
            //   duration: 10000
            // });
          });
      };
    return(
        <>
         <div className="flex items-center justify-center">
        <form className="h-screen flex flex-col justify-center w-4/12" onSubmit={handleSubmit}>
          <h1>Login to your account</h1>
          <br />
          <input
            type="text"
            name="uname"
            id="uname"
            placeholder="UserName"
            onChange={e=>{setUserName(e.target.value)}}
            value={userName}
          />
          <br />
          
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            onChange={e=>{setPassword(e.target.value)}}
            value={password}
          />
          <br />
          
          <button type="submit">
            Login
          </button>
        </form>
      </div>
        </>
    );
}