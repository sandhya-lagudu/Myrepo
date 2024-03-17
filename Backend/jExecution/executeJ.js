// const path = require("path");
// const fs = require("fs");
// const {exec} = require("child_process");

// const classFiles = path.join(__dirname,"classes");

// if(!fs.existsSync(classFiles)){
//     fs.mkdirSync(classFiles);
// }

// const executeJ = async(jFilePath,jInputFilePath)=>{
//    const jobId = path.basename(jFilePath).split(".")[0];
//    const classFileName = `${jobId}`;
//    const classFilePath = path.join(classFiles,classFileName);
//     return new Promise((resolve,reject)=>{
//         exec(`javac ${jFilePath} && java ${jobId} < ${jInputFilePath}`,(error,stdout,stderr)=>{
//             if(error){
//                 reject({error,stderr});
//             }
//             if(stderr){
//                 reject(stderr);
//             }
//             resolve(stdout);
//         });
//     });
// };

// module.exports = {
//     executeJ
// }