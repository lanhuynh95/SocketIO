var socket = io("https://pldochat.herokuapp.com");

socket.on("registration-failed",function(){
    alert("Username already exists");
});

socket.on("registration-success",function(username){
    alert("registration success");
    $(".username").append("<span style='background-color:yellow;font-size:20px;font-weight:bold'><i>"+username+" !!!!</i></span>");
    $("#register").hide(2000);
    $("#chat").show(2000);
});

socket.on("server-send-data-Users",function(mangUsers){
    $(".dataUsers").html("");
    mangUsers.forEach(function(i){
        $(".dataUsers").append("<div class='user'>"+ i +"</div><br/>");
    });
});

socket.on("server-send-content-Users",function(content){
        $("#content").append("<div class='d-flex justify-content-end mb-4'><div class='msg_cotainer_send'><span class='msg_time_send'>00:00 AM, Today </span>"+ content.username + " : " + content.content +"</div></div>");
});

socket.on("server-send-content-User",function(content){
    $("#content").append("<div class='d-flex justify-content-start mb-4'><div class='msg_cotainer_send'><span class='msg_time_send'>00:00 AM, Today </span>"+ content.username + " : " + content.content +"</div></div>");
});

$(document).ready(function () {
    $("#register").show();
    $("#chat").hide();

    $("#btnRegister").click(function () { 
        let username=$("#TextRegister").val();
        socket.emit("Client-send-username",username);   
    });

    $("#btnLogOut").click(function () { 
        socket.emit("Client-Log-Out");  
        $("#register").show(2000); 
        $("#chat").hide(2000);
    });

    $("#btnSend").click(function () { 
        content1=$("textarea[name=content]").val();
        content2=$("textarea[name=content]").val();
        $("textarea[name=content]").val("");
        socket.emit("Client-Send-Message",content1,content2);  
    });
});