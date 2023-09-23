class SpeechToText {
    constructor() {
        this.recognition = null;
        this.stream = null;
        this.state = false;
    }

    start(previous, callback) {
        if (this.state) return;

        this.state = true;
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            console.error('getUserMedia not supported on your browser!');
            return;
        }

        navigator.mediaDevices.getUserMedia({ audio: true })
        .then((audioStream) => {
            this.recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

            if (!this.recognition) {
                console.error('SpeechRecognition not supported on your browser!');
                return;
            }

            this.stream = audioStream;
            this.recognition.lang = 'en-US';

            this.recognition.onstart = () => {
                if (!this.state) this.stop();
                console.log('Listening...');
            };

            this.recognition.onresult = (event) => {                
                this.stop();
                const text = event.results[0][0].transcript;
                if (callback) callback(previous + " " + text);
            };

            this.recognition.onerror = (event) => {
                if (!this.state) return;
                this.start(callback);
                console.error(`Speech recognition error: ${event.error}`);
            };

            this.recognition.start();

        })
        .catch((error) => {
            error(`Error getting microphone stream: ${error}`);
        });
    }

    stop() {
        this.state = false;
        if (this.recognition) {
            console.log("Stop")
            this.recognition.stop();
        }
        if (this.stream) {
            console.log("Stop")
            this.stream.getTracks().forEach(track => track.stop());
        }
    }
}

module.exports = SpeechToText;
