import {Problems} from "./components/Problems";

import { Route, Routes } from "react-router-dom";
import {CurProblem} from "./components/CurProblem";



function App() {
  
  return (
    <>
     
     
      
      <Routes>
        <Route path='/' element={<Problems />} />
        <Route path='/problem' element={<CurProblem />} />
      </Routes>
    </>
  )
}

export default App
