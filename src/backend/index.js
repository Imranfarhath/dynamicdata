const express=require('express');
const app=express();
const cors=require('cors');
app.use(cors());
app.use(express.json());

app.post('/getdetails',(req,res)=>{
    const {data}=req.body;
    const {limit,searchkey,pageindex}=data;
    
})

app.listen(3000,()=>{
    console.log("server running in port 3000");
})