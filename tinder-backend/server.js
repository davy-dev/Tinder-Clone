import express from "express"
import mongoose from "mongoose"
import Cards from "./dbCard.js"
import Cors from "cors"


// App Config
const app = express();
const port = process.env.PORT || 8000
const connection_url="mongodb+srv://dav-dev:godisgood971@cluster0.2kwyz.mongodb.net/tinderDB?retryWrites=true&w=majority"
// MiddleWare
app.use(express.json())
app.use(Cors())

// DB config
mongoose.connect(connection_url,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true   
})

// API Enpoints

app.get("/", (req,res)=>{
res.status(200).send("HELLO WORLD !")
})

app.post("/tinder/cards",(req,res)=>{
    const dbCard=req.body
    Cards.create(dbCard, (err,data)=>{
        if(err){
            res.status(500).send(err)
        }else{
            res.status(201).send(data)
        }
    })
})

app.get("/tinder/cards", (req, res)=>{
    Cards.find((err,data)=>{
        if(err){
            res.status(500).send(err)
        }else{
            res.status(200).send(data)
        }
    })
})
//listener
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})