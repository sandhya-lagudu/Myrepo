import { useLocation } from "react-router-dom";
import Editor from 'react-simple-code-editor';
import {useState} from "react";
import {highlight, languages} from 'prismjs/components//prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css';
import Axios from "axios";


export function CurProblem(){
    // console.log("This is curproblem jsx");
    const location=useLocation();
    const problem=location.state;
    const [lang,setLang] = useState('cpp');
    const [inp,setInp]=useState(`//Input here to run and check`);
    const [out,setOut]=useState(`Output will appear here`);
    const [code, setCode] = useState(`#include <iostream> 
    using namespace std;
    // Define the main function
    int main() { 
        // Declare variables
        int num1, num2, sum;
        // Prompt user for input
        cin >> num1 >> num2;  
        // Calculate the sum
        sum = num1 + num2;  
        // Output the result
        cout << "The sum of the two numbers is: " << sum;  
        // Return 0 to indicate successful execution
        return 0;  
    }`);
    const sendCode=async ()=>{
      const payload={
        lang,
        code,
        inp
      };
      try{
        const {responseFromBackend} = await Axios.post(`http://localhost:8080/viewProblem/${problem._id}/run`.payload);
        setOut(responseFromBackend.output);
      }
      catch(error){
        console.log(error.response);
      }
    };
    return (
      <>
    <div className="flex-horizontal pt-0 pl-20 bg-red-50">

<div className="flex px-10 max-w-screen-xl aspect-video items-stretch">
  <div className="container border-collapse place-items-center px-10 py-24 max-w-screen-sm">
    <h1 className="text-3xl">Problem Description</h1>
    <br />
    <h2 className="text-xl text-wrap">{problem.title}</h2>
    <br />
    <p className="leading-relaxed">{problem.problemDescription}</p>
    <br />
    <h3>Input:</h3>
    
     <pre className="code-badge-pre bg-slate-500 text-wrap">
      <code className="hljs text-white">
         {problem.testcases[0].input} 
        
      </code>
    </pre> 

  
    <br />
    <h3>Output:</h3>
    <pre className="code-badge-pre bg-slate-500 text-wrap">
      <code className="hljs text-white">
        {problem.testcases[0].output}
      </code>
    </pre>
  </div>
  
  <div className="max-w-screen-sm px-10 py-10">
  <div className="col-sm-8">
                <select className="form-control" id="languages" onChange={(e)=>setLang(e.target.value)}>
                  <option value="C">C</option>
                  <option value="cpp" selected="">C++</option>
                  <option value="java">Java</option>
                  <option value="pypy3">Python 3</option>
                </select>
              </div>
  <div className="bg-gray-100 shadow-md w-full max-w-lg pt-10 items-stretch" style={{ width: '800px', height: '600px', overflowY: 'auto' }}>
          <Editor
            value={code}
            onValueChange={code => setCode(code)}
            highlight={code => highlight(code, languages.js)}
            padding={10}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 12,
              outline: 'none',
              border: 'none',
              backgroundColor: '#f7fafc',
              height: '100%',
              overflowY: 'auto'
            }}
          />
        </div>
        <div className="space-x-4">
        <button type="button" onClick={sendCode} className="text-center mt-4 bg-gradient-to-br from-pink-500 to-orange-400 hover:from-pink-600 hover:to-orange-500 focus:outline-none text-white font-medium rounded-lg text-sm px-5 py-2.5">
          Run
        </button>
        <button type="button" className="text-center mt-4 bg-gradient-to-br from-pink-500 to-orange-400 hover:from-pink-600 hover:to-orange-500 focus:outline-none text-white font-medium rounded-lg text-sm px-5 py-2.5">
          Submit
        </button>
        </div>
  </div>
  </div>
  <div className="container pl-72 py-10 items-center">
    <div className="container content-evenly">
  <h3>Input:</h3>
  <input
            type="text"
            // value={this.state.value}
            onChange={e=>{setInp(e.target.value)}}
         />
    <br />
    <h3>Output:</h3>
    <pre className="code-badge-pre bg-slate-500 w-1/2">
      <code className="hljs text-white">
        {out}
      </code>
    </pre>
    </div>
    </div>
</div>
</>
    );
};

// export default CurProblem;