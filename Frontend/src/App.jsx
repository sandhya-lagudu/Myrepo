import {ProblemTable} from "./components/ProblemTable";
import {Header} from "./components/Header";
import { useEffect, useState } from "react";
import Axios from "axios";


function App() {
  const [problems,setProblems]=useState([]);
  const getProbs = async()=>{
    const probs=await Axios.get("http://localhost:8080/problemList");
    setProblems(probs);
  }
  useEffect(()=>{
    getProbs();
  },[]);
  return (
    <>
      <Header />
      {/* <pre>{JSON.stringify(problems.data, null, 2)}</pre> */}
      <ProblemTable pr={JSON.stringify(problems.data, null, 2)} />
    </>
  )
}

export default App
