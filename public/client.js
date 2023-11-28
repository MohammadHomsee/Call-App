var websocket

const PORT = 8888

function connect() {
  url = `wss://www.graphicron.com:${PORT}`

  websocket = new WebSocket(url)
  websocket.binaryType = 'arraybuffer'

  websocket.onopen = (event) => {
    console.log(`connected on ${PORT}`)
  }

  websocket.onclose = (event) => {
    console.log(`disconnected`)
  }

  websocket.onmessage = (e) => {
    console.log(`message received: ${e.data}`)
    onReceiveChunkFromClient(e.data.slice(0))
  }
}