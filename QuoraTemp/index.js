const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const methodOverride = require("method-override");
const { v4: uuidv4 } = require('uuid');
uuidv4();

app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));
app.use(methodOverride('_method'));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

let posts = [
    {
        id : uuidv4(),
        username:"Janmesh",
        College:"IIITP"
    },
    {
        id : uuidv4(),
        username:"Jatin",
        College:"JSS"
    },
    {
        id : uuidv4(),
        username:"Avni",
        College:"IIITDM"
    }
];


app.get("/posts",(req,res)=>{
    res.render("index.ejs", {posts});
})


app.get("/posts/new", (req,res)=>{
    res.render("new.ejs");
})

app.post("/posts",(req,res)=>{
    let {username, College} = req.body;
    let id = uuidv4();
    posts.push({id,username,College});  
    res.redirect("http://localhost:8080/posts");
})

app.get("/posts/:id",(req, res)=>{
    let {id} = req.params;
    let post = posts.find((p)=> id === p.id);
    res.render("show.ejs", {post});
    // console.log(post)
})

app.patch("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let newCollege = req.body.College;
    let post = posts.find((p)=> id === p.id);
    post.College = newCollege;

    console.log(post);
    res.redirect("/posts");
})

app.get("/posts/:id/edit",(req,res)=>{
    let{id} = req.params;
    let post = posts.find((p)=> id === p.id);
    res.render("edit.ejs", {post});
})

app.delete("/posts/:id",(req,res)=>{
    let{id} = req.params;
    posts = posts.filter((p)=> id !== p.id);
    res.redirect("/posts");
})

app.listen(port,()=>{
    console.log("Listening to port : 8080");
});