const audioContext = new (window.AudioContext || window.webkitAudioContext)();

function main() {
  setupMediaRecorder()
}

function verifyMediaSupported() {
  return navigator.mediaDevices && navigator.mediaDevices.getUserMedia;
}

function setupMediaRecorder() {
  if (!verifyMediaSupported()) {
    console.log('meida not supported!')
    return
  }

  console.log('media supported')
  navigator.mediaDevices.getUserMedia({audio: true}).then(stream => {
    mediaRecorder = new MediaRecorder(stream)
    mediaRecorder.ondataavailable = (e) => {
      onReceiveChunkFromMic(e.data)
      console.log('data available!')
      // chunks.push(e.data)
    }

    // mediaRecorder.onstop = () => {
    //   for (var i = 0; i < chunks.length; i++) {
    //     playAudio(chunks[i])
    //   }
    // }
  })

  setInterval(requester, 500)
}

function startRecording() {
  mediaRecorder.start()
}

function stopRecording() {
  mediaRecorder.stop()
}

function requester() {
  if (recording) {
    stopRecording()
    startRecording()
  }
}

function playAudio(blob) {
  var fileReader = new FileReader()
  fileReader.onload = (event) => {
    const arrayBuffer = event.target.result
    // var buffer;
    audioContext.decodeAudioData(arrayBuffer, function(audioBuffer) {
          // Create an audio buffer source
          const source = audioContext.createBufferSource();

          // Set the buffer of the source to the decoded audio buffer
          source.buffer = audioBuffer;

          // Connect the source to the audio context's destination (speakers)
          source.connect(audioContext.destination);

          // Start playing the audio
          source.start();
    })
  }
  fileReader.readAsArrayBuffer(blob)
}

main()

