# Import libraries
from flask import Flask
from flask_socketio import SocketIO
from subprocess import Popen, PIPE

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins='*')

@socketio.on('connect')
def handle_connect():
    # Start the Python script in the background and capture the output
    process = Popen(['python', "./speechRecognition.py"], stdout=PIPE, stderr=PIPE)
    
    # Continuously send the output to the frontend
    while True:
        output = process.stdout.readline().decode().strip()
        if output:
            socketio.emit('script_output', output)

if __name__ == '__main__':
    socketio.run(app)