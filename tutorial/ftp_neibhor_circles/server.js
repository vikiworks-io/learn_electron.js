const WebSocket = require('ws')

const wss = new WebSocket.Server({ port: 10000 })

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    console.log(`Received message => ${message}`)
  })
  ws.send('[ SERVER_MESSAGE ] CONNECTION SUCCESS')
})
