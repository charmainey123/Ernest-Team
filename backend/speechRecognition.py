# Importing all libraries
import speech_recognition as sr
import pyttsx3
import soundfile as sf
import openai
import os
import sys

# Initializing all variables
# Reading API Key
with open("./apikey.txt") as file:
    openai.api_key = file.read()

# Define path to audio output file
output_audio_file = "./output.mp3"

# Initializing text-to-speech object
engine = pyttsx3.init()

# Define the persona of Ernest
messages = [
    {"role": "system", "content": "You are Ernest, a friendly and empathetic virtual avatar from Standard Chartered Bank that can help recommend one of the bank savings account or current account best suited to customers' needs through meaningful conversations. There are only 3 products Ernest can recommend: XtraSaver, MyWay and E-Saver."},
    {"role": "user", "content": "Hi Ernest\n\n===\n\n"},
    {"role": "assistant", "content": " How can I help you?\n"},
    {"role": "user", "content": "What are the types of accounts you have?\n\n===\n\n"},
    {"role": "assistant", "content": " We currently have two types of savings accounts, one called MyWay and the other called E-saver. The former is more for those above 55 years old with retirement planning in mind. The latter gives high interest on fresh funds. For current account, we have XtraSaver, an interest bearing account with cashback on card purchases.\n"}
]

# Define functions
def speak(text):
    engine.say(text)
    engine.runAndWait()
    
def generate_response(transcript):
    
    transcript += '\n\n===\n\n'
    messages.append({"role": "user", "content": transcript})
    conversation_context = ' '.join([f"{msg['role']}: {msg['content']}" for msg in messages])
    
    response = openai.Completion.create(engine='curie:ft-personal-2023-06-06-08-45-36',
                                        prompt=conversation_context,
                                        temperature=0,
                                        max_tokens=100,
                                        n=1,
                                        stop=["\n"],
                                        timeout=None).choices[0].text.strip()
    if 'assistant:' in response:
        response = response.strip('assistant:')
        response = response.strip(' assistant:')
    if 'user:' in response:
        response = response.strip('user:')
        response = response.strip(' user:')
    
    messages.append({"role": "assistant", "content": response})
    return response

# Audio-Response Generation
"""
This part of the code is triggered when the user clicks on the button "speak to Ernest"
"""

def trigger_response():
    try:
        with sr.Microphone() as mic:
            recognizer = sr.Recognizer()
            recognizer.adjust_for_ambient_noise(mic, duration = 1)

            # Line 13 will be replaced by D-ID audio once it is ready to make the voice quality more consistent
            speak("How can I help you?")
            audio = recognizer.listen(mic, phrase_time_limit=None, timeout=None)
            with open(output_audio_file, "wb") as f:
                f.write(audio.get_wav_data(convert_rate=44100, convert_width=2))
            audio_file = open(output_audio_file, "rb")
            transcript = openai.Audio.transcribe("whisper-1", audio_file)["text"]
            print("You:\n", transcript,"\n")
            response = generate_response(transcript)
            print("Ernest:\n", response, "\n")

            # Line 24 will be replaced by D-ID once it is ready
            speak(response)
    except sr.UnknownValueError:
        sys.exit(1)

# Call for Ernest
while True:
    try:
        with sr.Microphone() as mic:
            recognizer = sr.Recognizer()
            recognizer.adjust_for_ambient_noise(mic, duration = 0.3)
            audio = recognizer.listen(mic, phrase_time_limit=3)
            call = recognizer.recognize_google(audio).lower()
            print("You:\n", call)

            if 'ernest' in call or 'honest' in call or 'hyannis' in call or 'earnest' in call:
                trigger_response()
    except sr.UnknownValueError:
        print("No audio detected. Continue detecting in background...")
        continue