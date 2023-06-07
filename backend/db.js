const mongoose=require('mongoose')

const mongoURL="mongodb://localhost:27017/inotebook"

//using promises
const connectToMongo=()=>{
    
    mongoose.connect(mongoURL)
    .then((res)=>{
        console.log('connected to mongodb')
    })
    .catch((err)=>{
        console.log('error while connecting to db')
    })
}
//------OR----------------
//using async await
/*
const connectToMongo=async()=>{
    try{
        await mongoose.connect(mongoURL,{ useUnifiedTopology:true})
        console.log('db connected successfullyy')
    }
    catch(error){
        console.log('error while connecting db', error.message);
    }
}
*/

module.exports=connectToMongo;
