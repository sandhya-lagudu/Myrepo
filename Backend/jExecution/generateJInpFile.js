// const {v4:uuid} = require("uuid");
// const path = require("path");
// const fs = require("fs");

// const inputs = path.join(__dirname,"inputs");

// if(!fs.existsSync(inputs)){
//     fs.mkdirSync(inputs);
// }

// const generateJInpFile = async(inp)=>{
//     const jobId = uuid();
//     const inpFileName = `${jobId}.txt`;
//     const inpFilePath = path.join(inputs,inpFileName);
//     fs.writeFileSync(inpFilePath,inp);
//     return inpFilePath;
// };

// module.exports = {
//     generateJInpFile
// };