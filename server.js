const express = require("express")
const WebSocket = require("ws")
const http = require("http")

const app = express()

app.use(express.static("public"))

const server = http.createServer(app)

const wss = new WebSocket.Server({ server })

let viewers = []

wss.on("connection",(ws,req)=>{

    console.log("Client connected")

    ws.on("message",(data)=>{

        // broadcast frame ke semua viewer
        viewers.forEach(v=>{
            if(v.readyState===WebSocket.OPEN){
                v.send(data)
            }
        })

    })

    ws.on("close",()=>{
        console.log("Client disconnected")
    })

})

server.listen(process.env.PORT || 8080,()=>{
    console.log("Server running")
})
