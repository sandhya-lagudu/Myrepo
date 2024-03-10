const express=require("express");
require('dotenv').config();
const User = require("./model/User");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const {DBConnection} = require('./database/db');
const PORT=process.env.PORT || 8000;
const app=express();
const cookieParser=require("cookie-parser");
const Problem=require("./model/Problem");
const Solution=require("./model/Solution");
const {generateFile} = require("./generateFile");
const {executeCpp}=require("./executeCpp.js");
const {generateInpFile} = require("./generateInpFile.js");
const cors=require("cors");
const { ObjectId } = require("mongodb");

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

DBConnection();

app.get("/",(req,res)=>{
    res.send("welcome");
});


app.post("/register",async(req,res)=>{
    
    try {
        //get all data from frontend
    const { firstName, lastName, userName , email, phone, password } = req.body;

    //validate all the data
    if(!(firstName && lastName && userName && email && phone && password)){
        return res.status(400).send("Enter all data");
    }

    //check if user already exists or not
    const isUserExists = await User.findOne({email});
    if (isUserExists) {
        return res.status(200).send("User already exists!");
    }
    

    //encrypt password
    const hashedpassword=await bcrypt.hash(password,10);

    //Save user data into the database
    const userData = await User.create({
        firstName,
        lastName,
        userName,
        email,
        phone,
        password:hashedpassword
    });

    // generate a jwt token for user and send it
    // const token=jwt.sign({id:userData._id,email},process.env.SECRET_KEY,{
    //     expiresIn:'1h'
    // });

    // userData.token=token;
    userData.password=undefined;
    res.status(200).json({
        message:"You have registered successfully",
        userData
    });
    } catch (error) {
        console.log("Error :",error.message);
    }

});

app.post("/login",async(req,res)=>{
    try {
        
        //get all data from frontend
        const { userName, password } = req.body;

        //validate all the data - check all data is entered or not
        if(!( userName && password )){
            return res.status(400).send("Enter all data");
        }

        //check if user already exists or not in database
        const user = await User.findOne({userName});
        if (!user) {
            return res.status(400).send("User doesn't exist!");
        }

        //match the password
        const checkPassword = await bcrypt.compare(password,user.password);
        if(!checkPassword){
            return res.status(400).send("The password is incorrect!");
        }

        //create the jwt token
        // const token=jwt.sign({id:user._id,email},process.env.SECRET_KEY,{
        //     expiresIn:'1h'
        // });
        // user.token=token;
        user.password=undefined;
        
        //store cookies into browser
        // const options={
        //     expires:new Date(Date.now()+1*24*60*60*1000),
        //     httpOnly:true,//only manipulate by server not by client or frontend or user
        // };

        //send the token
        // res.status(200).cookie("token",token,options).json({
        //     message:"You have successfully loggedIn",
        //     success:true,
        //     token
        // });
        console.log("User exists!");
        res.status(200).json({
            message:"Good",
            user
        });

    } catch (error) {
        console.log("Error :",error.message);
    }
});

app.post("/addProblems",async(req,res)=>{
    try {
        const { title, problemDescription,difficulty,testcases } = req.body;
        if(!(title && problemDescription && difficulty && testcases)){
            return res.status(400).send("Enter all problem data");
        }
        const isProblemExists=await Problem.findOne({title});
        if(isProblemExists){
            return res.status(400).send("Problem already exists");
        }
        const problem=await Problem.create({
            title,
            problemDescription,
            difficulty,
            testcases
        });
        res.status(200).send("Problem Data added");
    } catch (error) {
        console.log("Error :",error.message);
    }
});

app.get("/problemList",async(req,res)=>{
    try {
       const problems=await Problem.find({});
       if(!problems){
        res.status(200).send("no problems in DB");
       }
       res.status(200).json({problems});
    //    res.status(200).send("Problems have loaded");
    } catch (error) {
        console.log("Error in problemlist:",error.message);
    }
});


//to run 
app.post("/viewProblem/:probId/run",async(req,res)=>{
    try {
        const probId=req.params.probId;
        const {lang,code,inp} = req.body;
        if(!(lang && code && inp)){
            return res.status(400).send("Solution is not being compiled");
        }
        const filePath = await generateFile(lang,code);
       const inputFilePath = await generateInpFile(inp);
        const output = await executeCpp(filePath,inputFilePath);
        res.json({output});
        // res.status(200).send("Run solution successfully");
    } catch (error) {
        console.log("Error in problem:",error.message);
    }
});


//to submit
app.post("/viewProblem/:probId/submit",async(req,res)=>{
    try {
        const probId=req.params.probId;
        const {lang,code} = req.body;
        if(!(lang && code)){
            return res.status(400).send("Solution is not being compiled");
        }
        const isProblemExists=await Problem.findById(probId);
        // console.log(isProblemExists.title);
        const testcaseArray=isProblemExists.testcases;
        const l=testcaseArray.length;
        var i;
        var verdict="Solution worked on 100% testcases";
        for(i=0;i<l;i++){
            const filePath = await generateFile(lang,code);
            const inputFilePath = await generateInpFile(testcaseArray[i].input);
            const output = await executeCpp(filePath,inputFilePath);
            const dbOutput=testcaseArray[i].output;
            console.log(output);
            if(output!=dbOutput){
                verdict="Solution is incorrect";
            }
        }
        // console.log(verdict);
        res.json({verdict});
        // res.status(200).send("Run solution successfully");
    } catch (error) {
        console.log("Error in problem:",error.message);
    }
});





app.listen(PORT,()=>{
    console.log(`Server is listening on port ${PORT}`);
});