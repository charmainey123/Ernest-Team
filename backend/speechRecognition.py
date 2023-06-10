# Importing all libraries
import speech_recognition as sr
import pyttsx3
import soundfile as sf
import openai
import os
import sys
import psycopg2
from datetime import datetime

# Initializing all variables
# Reading API Key
with open("./backend/apikey.txt") as file:
    openai.api_key = file.read()

# Define path to audio output file
output_audio_file = "./backend/output.mp3"

# Initializing text-to-speech object
engine = pyttsx3.init()

# Define the persona of Ernest
messages = [
    {"role": "system", "content": "You are Ernest, a friendly and empathetic virtual avatar from Standard Chartered Bank that can help recommend one of the bank savings account or current account best suited to customers' needs through meaningful conversations. There are only 3 products Ernest can recommend: XtraSaver, MyWay and E-Saver."},
    {"role": "user", "content": "Hi Ernest"},
    {"role": "assistant", "content": " How can I help you?"},
    {"role": "user", "content": "What are the types of accounts you have?"},
    {"role": "assistant", "content": " We currently have two types of savings accounts, one called MyWay and the other called E-saver. The former is more for those above 55 years old with retirement planning in mind. The latter gives high interest on fresh funds. For current account, we have XtraSaver, an interest bearing account with cashback on card purchases."},
    {"role": "user", "content": "Can you tell me more about MyWay?"},
    {"role": "assistant", "content": "Definitely! MyWay is our savings account. It offers a lifestyle programme for 55 years and above to enjoy a world of exclusive dining, travel and healthcare privileges. You may enjoy interest rates of up to 0.30%per annum with the MyWay Savings Account, access to income generating wealth solutions and enjoy privileges at selected merchants on travel and health."},
    {"role": "user", "content":"How about the other savings account?"},
    {"role": "assistant", "content": "You are right, we also have E-saver. With E-saver, you can earn up to 3.40% per annum interest on eligible deposit balance up to $2 million with no lock-in period. Enjoy the flexibility to access funds at any point. It is suitabe for people who wants to grow their savings while need access to their funds at any time."},
    {"role": "user", "content": "Tell me more about the last account you have."},
    {"role": "assistant", "content": "The last product we have is a current account called XtraSaver. XtraSaver is our interest bearing current account that allows you to earn Cashback on your debit card purchases. You may earn up to 15% CashBack on petrol on top of prevailing station discounts and receive up to 3% CashBack on your MasterCard transactions, anywhere in the world."}
]

# Get today's date
conversation_id = int(datetime.now().strftime("%Y%m%d%H%M%S"))

# Define functions
def speak(text):
    engine.say(text)
    engine.runAndWait()

def generate_response(transcript):
    transcript += '\n\n===\n\n'
    messages.append({"role": "user", "content": transcript})
    
    response = openai.ChatCompletion.create(model='gpt-3.5-turbo',
                                            messages=messages,
                                            temperature=0,
                                            max_tokens=100,
                                            n=1,
                                            stop=["\n"],
                                            timeout=None)['choices'][0]['message']['content']
    if 'assistant:' in response:
        response = response.strip('assistant:')
        response = response.strip(' assistant:')
    if 'user:' in response:
        response = response.strip('user:')
        response = response.strip(' user:')
    
    messages.append({"role": "assistant", "content": response})
    return response

def post_to_database(conversation_id, role_id, response):
    try:
        connection = psycopg2.connect(user='postgres', 
                                      password='root',
                                      host='localhost',
                                      port=5432,
                                      database='scverse')

        cursor = connection.cursor()
        query = "insert into conversations (conversation_id, role_id, response) values ({}, '{}', '{}')".format(conversation_id, role_id, response)
        cursor.execute(query)
        connection.commit()
        cursor.close()
        connection.close()
    except:
        print("Error posting results to database. Please check your connection.")

# Audio-Response Generation
def trigger_response():
    while True:
        try:
            with sr.Microphone() as mic:
                recognizer = sr.Recognizer()
                recognizer.adjust_for_ambient_noise(mic, duration = 1)

                # Line 13 will be replaced by D-ID audio once it is ready to make the voice quality more consistent
                audio = recognizer.listen(mic, phrase_time_limit=None, timeout=None)
                with open(output_audio_file, "wb") as f:
                    f.write(audio.get_wav_data(convert_rate=44100, convert_width=2))
                audio_file = open(output_audio_file, "rb")
                transcript = openai.Audio.transcribe("whisper-1", audio_file)["text"]
                post_to_database(conversation_id, 'user', transcript)
                print("You:\n", transcript,"\n")
                response = generate_response(transcript)
                with open('./public/response.txt', 'w') as file:
                    file.write(response)
                post_to_database(conversation_id, 'assistant', response)
                print("Ernest:\n", response, "\n")
                break
        except sr.UnknownValueError:
            continue

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
                speak("I heard you called me. I can help with bank account recommendations. Please let me know more about yourself, especially your needs and lifestyle. This way, I can recommend one of our bank accounts that best complements your needs.")
                trigger_response()
                break
    except sr.UnknownValueError:
        print("No audio detected. Continue detecting in background...")
        continue

# Delete the audio file
os.remove("./backend/output.mp3")
