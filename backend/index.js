const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const http = require("http");
const yargs = require("yargs");
const {Server}=require("socket.io");
const mainRouter = require("./routes/main.router");


const {hideBin}=require("yargs/helpers");

const {addRepo}=require("./controllers/add");
const {initRepo}=require("./controllers/init");
const {commitRepo}=require("./controllers/commit");
const {pushRepo}=require("./controllers/push");
const {pullRepo}=require("./controllers/pull");
const {revertRepo}=require("./controllers/revert");

dotenv.config();

yargs(hideBin(process.argv))
.command("start","Start the server", {}, startServer)
.command("init","Initialize the repository", {}, initRepo)
.command("add <file>","Add a new file", (yargs)=>{
    yargs.positional("file", {
        describe: "The file to add",
        type: "string"
        
    })
},(argv)=>{addRepo(argv.file)})
.command("commit <message>","Commit changes", (yargs)=>{
    yargs.positional("message", {
        describe: "Commit message",
        type: "string"
    })
},  (argv) => {
      commitRepo(argv.message);
    })
.command("push","Push changes to the remote repository", {}, pushRepo)
.command("pull","Pull changes from the remote repository", {},pullRepo)
 .command(
    "revert <commitID>",
    "Revert to a specific commit",
    (yargs) => {
      yargs.positional("commitID", {
        describe: "Comit ID to revert to",
        type: "string",
      });
    },
    (argv) => {
      revertRepo(argv.commitID);
    }
  )
.demandCommand(1,"You must provide a command").help().argv;
   

function startServer(){
const app = express();
const port=process.env.PORT || 3000;
app.use (bodyParser.json());
app.use(express.json());
const mongoURI= process.env.MONGODB_URI 
mongoose.connect(mongoURI).then(()=>(
  console.log("Connected to MongoDB")
)).catch((err)=>(
  console.error("Error connecting to MongoDB:", err) ));
app.use(cors({origin: "*"}));

app.use("/", mainRouter);

let user="test";
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }});

  io.on("connection",(socket)=>{
    socket.on("joinroom",(userID)=>{
     user=userID;
     console.log("====");
      console.log(user);
      console.log("====");
      socket.join(userID);
    })
  })
const db= mongoose.connection;
db.once("open", () => {
  console.log("CRUD operations are ready to be performed")})

  httpServer.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}
