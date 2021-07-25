const express=require('express')
const mongoose=require('mongoose')
const csvtojson=require('csvtojson')
const multer=require('multer')
const question = require('./model/questModel')
const ejs=require('ejs')





const app=express() 
app.set('view engine','ejs')
app.use(express.json())
app.use(express.urlencoded({extended:false}))


app.get("/",function(req,res){
 // res.sendFile(__dirname+'/index.html');
 res.render('index')
});

/////////////uploading file through multer//////////
const fileStorageEngine=multer.diskStorage({
  destination: function(req,file,callback){
    callback(null,'./uploads');
  },
  filename: function(req,file,callback){
    callback(null,file.originalname);
  }
});

const upload=multer({storage:fileStorageEngine});


//////////converting csv to json//////////////////// 
async function data(filePath){  
  try{
    console.log(filePath)
    const data=await csvtojson().fromFile(filePath);
 //  insert through mongoDb
 ////
   question.insertMany(data,(err,res)=>{
     if(err)
     console.log(err)
    })
console.log(data)
  }catch(err)
  {
    console.log(err)
  }
}

app.post("/",upload.single('selectedFile'),(req,res)=>{
 
  //console.log(req.file)
  data(req.file.path)
res.send('file uploaded')

});
  

////connecting to the database

let url='mongodb+srv://chandan:chandan47@cluster0.2ben8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const ConnectDb = async () => {
 
  try {
    const conn = await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,

      useCreateIndex: true,
    });
    console.log(`mongodb connected ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error ${error.message}`);
    process.exit(1);
  }
};

ConnectDb();
///////////////////////////////////////////////////////////////


const port =  8000;
app.listen(port, console.log(`server running on port ${port}`));
