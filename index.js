const  express= require("express");
const app=express()
const mongoose=require("mongoose")
const path=require("path")
const Chat =require("./models/chat.js")
const methodeOverride=require("method-override")

app.set("views",path.join(__dirname,"views"))
app.set("view engine","ejs")
app.use(express.static(path.join(__dirname,"public")))
app.use(express.urlencoded({extended:true}))
app.use(methodeOverride("_method"))

main()
    .then((res)=>{
        console.log("connection successful");
    })
    .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}


// let chat1=new Chat({
//     from:"yash",
//     to:"elon",
//     msg:"send me your notes",
//     created_at:new Date()
// })


// chat1.save().then((res)=>{
//     console.log(res)
// })

app.listen(8080,()=>{
    console.log("server connected at port 8080")
})

app.get("/",(req,res)=>{
    res.send("we are in home page")
})

//index route
app.get("/chats",async(req,res)=>{
    let chats = await Chat.find();
    // console.log(chats)
    res.render("index.ejs",{chats})
})

//new route
app.get("/chats/new",(req,res)=>{
    res.render("new.ejs");
})

//create route
app.post("/chats",(req,res)=>{
    let {from ,to, msg} =req.body
    let  newChat=new Chat({
        from:from,
        to:to,
        msg:msg,
        created_at:new Date()
    })

    newChat.save().then((res)=>{
        console.log("chat is saved")
    })
    .catch((err)=>{
        console.log(err)
        res.send("some error in db")
    });
  res.redirect("/chats")
})

//edit route
app.get("/chats/:id/edit",async(req,res)=>{
    let {id}=req.params;

    let chat= await Chat.findById(id);

    res.render("edit.ejs",{chat});  
})
//update route
app.put("/chats/:id",async (req,res)=>{
    let {id}=req.params;

    let {msg:newMsg}=req.body

    let updatedchat=await Chat.findByIdAndUpdate(id,{msg:newMsg},{runValidators: true ,new :true})

   console.log(updatedchat)
  res.redirect("/chats")

})

app.delete("/chats/:id",async(req,res)=>{
    let {id}=req.params;
   let deletedchat= await Chat.findByIdAndDelete(id)
 console.log(deletedchat)
 res.redirect("/chats")

})