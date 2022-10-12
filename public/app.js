const userStatus = document.getElementById("userStatus")
const messages = document.getElementById("messages")
const msgForm = document.getElementById("msgForm")
const input = document.getElementById("input")

const ws = new WebSocket("ws://localhost:3000")
ws.binaryType = "arraybuffer"


function setStatus(value) {
  userStatus.textContent = value
}

function printMessage(value) {
  const li = document.createElement("li")
  li.innerHTML = value
  messages.appendChild(li)
}

msgForm.addEventListener("submit", e => {
  e.preventDefault()
  ws.send(input.value.toString())
  input.value = ""
})

ws.onopen = _ => setStatus("ONLINE")

ws.onclose = () => setStatus("DISCONNECTED")

ws.onmessage = response => printMessage(response.data)