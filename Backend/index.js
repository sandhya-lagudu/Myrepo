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
const cors=require("cors");

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

DBConnection();

app.get("/",(req,res)=>{
    res.send("welcome");
});

/*app.get("/home",(req,res)=>{
    res.send("This is home");
});*/

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

    //generate a jwt token for user and send it
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
        const { email, password } = req.body;

        //validate all the data - check all data is entered or not
        if(!( email && password )){
            return res.status(200).send("Enter all data");
        }

        //check if user already exists or not in database
        const user = await User.findOne({email});
        if (!user) {
            return res.status(200).send("User doesn't exist!");
        }

        //match the password
        const checkPassword = await bcrypt.compare(password,user.password);
        if(!checkPassword){
            return res.status(200).send("The password is incorrect!");
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
        res.status(200).send("Good");

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
       res.status(200).json(problems);
    //    res.status(200).send("Problems have loaded");
    } catch (error) {
        console.log("Error in problemlist:",error.message);
    }
});

app.get("/viewProblem/:uid/:probId",async(req,res)=>{
    // console.log({reqparam:req.params});
    try {
        const problem=await Problem.findById(req.params.probId);
        if(!problem){
            res.status(200).send("No problem exists!");
        }
        res.status(200).send(problem);
    } catch (error) {
        console.log("Error in problem:",error.message);
    }
});

app.post("/viewProblem/:uid/:probId/run",async(req,res)=>{
    try {
        const uid=req.params.uid;
        const probId=req.params.probId;
        const {lang,sol,verdict} = req.body;
        if(!(lang && sol && verdict)){
            return res.status(200).send("Solution not saved in DB successfully!");
        }
        /*const solution = await Solution.create({
            uid,
            probId,
            lang,
            sol,
            verdict
        });*/
        const filePath = await generateFile(lang,sol);
        const output = await executeCpp(filePath);
        res.status(200).json({filePath,output});
        // res.status(200).send("Run solution successfully");
    } catch (error) {
        console.log("Error in problem:",error.message);
    }
});



app.listen(PORT,()=>{
    console.log(`Server is listening on port ${PORT}`);
});