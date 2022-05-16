const express = require("express"); 
const app = express();
const port = 3001; // react의 기본값은 3000이니까 3000이 아닌 아무 수
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql"); // mysql 모듈 사용

var connection = mysql.createConnection({
    host : "localhost",
    user : "root", //mysql의 id
    password : "xinurocks", //mysql의 password
    database : "Ako", //사용할 데이터베이스
});

connection.connect();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.post("/mint", (req,res)=>{
    connection.query("INSERT INTO Ako(likes) values(0)",
    function(err,rows,fields){
        if(err){
            console.log("create row fail");
            //console.log(err);
        }else{
            console.log("create row success");
            // console.log(rows);
        };
    });
});

app.post("/likes", (req,res)=>{
    const id = req.body.id;
    connection.query("SELECT * FROM Ako WHERE id=(?)",[id],
    function(err,rows,fields){
        if(err){
            console.log("load likes fail");
        }else{
            console.log("load likes success");
            res.send(rows[0]);
        }
    })
})

/*app.post("/delete", (req,res)=>{
    const totalSupply = req.body.totalSupply;
    connection.query("delete from Ako where id > (?)",[totalSupply],
    function(err,rows,fields){
        if(err){
            console.log("delete fail");
            //console.log(err);
        }else{
            console.log("delete success");
        }
    })
})

app.post("/set", (req,res)=>{
    connection.query("ALTER TABLE Ako AUTO_INCREMENT = 0",
    function(err,rows,fields){
        if(err){
            console.log("set fail");
            //console.log(err);
        }else{
            console.log("set success");
        }
    })
})*/

app.post("/plus", (req,res)=>{
    const id = req.body.id;
    connection.query("Update Ako set likes=likes+1 where id=(?)",[id],
    function(err,rows,fields){
        if(err){
            console.log("plus fail");
            //console.log(err);
        }else{
            console.log("plus success");
        }
    })
})

app.listen(port, ()=>{
    console.log(`Connect at http://localhost:${port}`);
})