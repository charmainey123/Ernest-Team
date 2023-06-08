from flask import Flask, request
from flask_cors import CORS
import psycopg2
import subprocess
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

app = Flask(__name__)
CORS(app)
limiter = Limiter(get_remote_address, app=app)

# Define connection parameters
connection_params = {
    'host': 'localhost',
    'database': 'scverse',
    'user': 'postgres',
    'password': 'root',
    'port': 5432,
}

# Define routes and logic below
@app.route('/')
def home():
    return 'Hello, World!'

@app.route('/insert_data', methods=['POST'])
def insert_data():
    data = request.get_json()
    name = data['name']
    email = data['email']
    mobile = data['mobile']
    currency = data['currency']
    id = data['id']
    country = data['country']
    taxId = data['taxId']
    purpose = data['purpose']
    type = data['type']

    try:
        conn = psycopg2.connect(**connection_params)
        cursor = conn.cursor()

        query = "insert into application (full_name, email_address, mobile_number, account_currency_code, id_number, country_of_tax_residence, tax_identification_number, purpose_of_account, product_type) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)"
        values = (name, email, mobile, currency, id, country, taxId, purpose, type)

        cursor.execute(query, values)
        conn.commit()

        return {'message': 'Data inserted successfully'}
    except (Exception, psycopg2.Error) as error:
        print('Error inserting data:', error)
        return {'message': 'Error inserting data'}, 500
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()

@app.route('/execute_voice_recognition', methods=['POST'])
@limiter.limit("1/minute")
def execute_voice_recognition():
    try:
        subprocess.call(['python', './backend/speechRecognition.py'])
        return 'Python script executed successfully!'
    except Exception as e:
        return f'Error executing Python script: {str(e)}'

if __name__ == '__main__':
    app.run()