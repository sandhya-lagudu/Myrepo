// const {v4:uuid} = require("uuid");
// const path = require("path");
// const fs = require("fs");

// const jDir = path.join(__dirname,"jCodes");

// if(!fs.existsSync(jDir)){
//     fs.mkdirSync(jDir);
// }

// const generateJFile = async(lang,code)=>{
//     const jobId = uuid();
//     const jFileName = `${jobId}.${lang}`;
//     const jFilePath = path.join(jDir,jFileName);
//     await fs.writeFileSync(jFilePath,code);
//     return jFilePath;
// };

// module.exports = {
//     generateJFile
// };