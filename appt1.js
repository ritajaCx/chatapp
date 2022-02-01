// - Create chat app using socket io
// - 3 forms needed (Send txt msg, share location, share emojis)

const express = require('express')
const http = require('http')
const port = process.env.PORT || 8099
const app = express()
const server = http.createServer(app)
const io = require('socket.io')(server)
const emoji= require('node-emoji')

const path = require('path')

app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/chatindex.html')
})


//buttons and inputs
var name = "";                   //for global access of usernames
//var emoji="";



//socket connection
io.on('connection', (socket) => {

  
    //subject, body
    socket.on('joining message', (username) =>
    {
        name = username
        console.log("New User "+name+" arrived !")
        
        io.emit('chat message', " "+name+" has Joined !" )  //send information to other sockets
    })


    socket.on('chat message', (msg) => {
        // send the message to all socket expect the sending socket
        socket.broadcast.emit('chat message', msg)
    })

    //sending emoji
    socket.on('chat emoji', (msg)=>{
       // var emoji=emo;
        socket.broadcast.emit('chat emoji', msg)
    })

    //sending location
    socket.on('chat location', (msg) => {
       
        socket.broadcast.emit('chat location', msg)
    })
   


})

server.listen(port, () => {
    console.log("Connected to server at ", port)
})