var express = require("express");
var app = express();
app.use(express.static("./public"));
app.set("view engine","ejs");
app.set("views","./views");

var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(process.env.PORT || 3000);

var mangUsers=[];

io.on("connection", function(socket){
    console.log(socket.id + " Vừa kết nối");
    socket.on("disconnect",function(){
        console.log(socket.id + " Ngat ket noi !!!!!");
        mangUsers.splice(mangUsers.indexOf(socket.username),1);
        socket.emit("logout-success");
        socket.broadcast.emit("server-send-data-Users", mangUsers);
    });
    socket.on("Client-send-username", function(username){
        if(mangUsers.indexOf(username)>=0){
            socket.emit("registration-failed");
        }else{
            mangUsers.push(username);
            socket.Username = username;
            socket.emit("registration-success",username);
            io.sockets.emit("server-send-data-Users", mangUsers);
        };
    });
    socket.on("Client-Log-Out", function(){
        console.log(socket.id + " Vừa ngắt kết nối");
        mangUsers.splice(mangUsers.indexOf(socket.username),1);
        socket.emit("logout-success");
        socket.broadcast.emit("server-send-data-Users", mangUsers);
    });
    socket.on("Client-Send-Message", function(content1,content2){
        socket.emit("server-send-content-User",{username:socket.Username,content:content1});
        socket.broadcast.emit("server-send-content-Users",{username:socket.Username,content:content2});
    });
});

app.get("/", function(req,res){
    res.render("trangchu");
});