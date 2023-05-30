const connectToMongo=require('./db')
const express=require('express')

connectToMongo()

const app=express()
const port=5000

//middleware to use req.body
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))



app.listen(port,()=>{
    console.log(`http://localhost:${port}`)
})








