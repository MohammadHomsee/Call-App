const fs = require('fs');

const WebSocket = require('ws')

const PORT = 8000

const wws = new WebSocket.Server({port: PORT})
console.log(`server listenning on port ${PORT}....`)

var users = []

wws.on('connection', (ws) => {
  users.push(ws)

  ws.on('message', (message) => {
    console.log('received %s', message)
    users.forEach(user => {
      if (user == ws) return;
      user.send(message)
    });
    // fs.readFile('test_record.mp3', (err, data) => {
    //   ws.send(data)
    // })
  })

  console.log('new client connected.')
})