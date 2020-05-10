const WebSocket = require('ws')
const url = 'ws://localhost:10000/'
const connection = new WebSocket(url)

connection.onopen = () => {
  connection.send('[ CLIENT MESSAGE ] CONNECTION SUCCESS') 
}

connection.onerror = (error) => {
  console.log(`WebSocket error: ${error}`)
}

connection.onmessage = (e) => {
  console.log(e.data)
}
