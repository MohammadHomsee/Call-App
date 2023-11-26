var https = require('https');

const express = require('express')
const app = express()

const { readFile } = require('fs/promises')
const fs = require('fs')
const path = require('path')


const WebSocket = require('ws')

const SOCKET_PORT = 8888
const EXPRESS_PORT = 3333

function main() {
  runSocketServer()
  runExpressServer()
}

function runExpressServer() {
  app.use(express.static(__dirname + '/public'))
  app.use('/', async (req, res) => {
    res.send(await readFile('frontend/index.html', 'utf8'))
  })

  var secureServer = https.createServer({
    key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem'))
  }, app);

  secureServer.listen(EXPRESS_PORT, () => console.log(`Secure Server on port ${EXPRESS_PORT}`))
}

function runSocketServer() {
  const wws = new WebSocket.Server({port: SOCKET_PORT})
  console.log(`server listenning on port ${SOCKET_PORT}....`)
  
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
}

main()