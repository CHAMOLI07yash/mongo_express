const mongoose=require("mongoose")
const Chat =require("./models/chat.js")


main()
    .then((res)=>{
        console.log("connection successful");
    })
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
  }


  

  let allChats=[
    {
        from:"yash",
        to:"arjun",
        msg:"tell me about tommorow assignment",
        created_at:new Date()
    },
    {
        from:"shyam",
        to:"ram",
        msg:"teach me react",
        created_at:new Date()
    },

    {
        from:"mohit",
        to:"sohit",
        msg:"send me todays work",
        created_at:new Date()
    },
    {
        from:"rohan",
        to:"sohit",
        msg:"let play football",
        created_at:new Date()
    },
    {
        from:"elon",
        to:"shashank",
        msg:"happy birthday to you",
        created_at:new Date()
    }         
]

Chat.insertMany(allChats)
