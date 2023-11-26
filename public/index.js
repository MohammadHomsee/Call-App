var recordButton
var recording = false

const recordButtonCoreClass = "mic-button"

function start() {
  recordButton = document.getElementById('record-button')
  recordButton.setAttribute('class', getRecordButtonStyle())
  recordButton.onclick = OnClickMicButton
}

function onClickReconnect() {
  connect()
}

function getRecordButtonStyle() {
  return `${recordButtonCoreClass} ${
    recording ? "record-button-enable" : "record-button-disable"
  }`
}

function onReceiveChunkFromClient(chunk) {
  blob = new Blob([chunk])
  playAudio(blob)
}

function onReceiveChunkFromMic(audioChunk) {
  if (websocket != null)
    websocket.send(audioChunk)
}

function OnClickMicButton() {
  recording = !recording
  recordButton.setAttribute('class', getRecordButtonStyle())

  if (recording) startRecording()
  else stopRecording()
}

start()