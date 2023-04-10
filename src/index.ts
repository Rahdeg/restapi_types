import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from  'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose'
import router from './routers'

const app = express();

app.use(cors({
    credentials:true,
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(8080,()=>{
    console.log("server running on http://localhost:8080/");
})



const DB_URI = "mongodb+srv://tithe:tithe@cluster0.eqcfh.mongodb.net/?retryWrites=true&w=majority"

mongoose.Promise= Promise;
mongoose.connect(DB_URI,{dbName: "Types"});
mongoose.connection.on("error",(error:Error)=>console.log(error));

app.use('/',router());