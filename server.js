const WebSocket = require("ws")

const clients = new Map()
let id = 1

const server = new WebSocket.Server({ port: 3000 })

server.on("connection", (socket, request) => {
  clients.set(socket, id++)

  socket.on("message", (message, isBinary) => {
    server.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        const clientId = clients.get(client)

        client.send(message, { binary: isBinary })
      }
    })
  })

  socket.send(`Добро пожаловать в чат. Ваш id: ${id}`)
})
