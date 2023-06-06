from flask import Flask, request
import psycopg2

app = Flask(__name__)

# Replace with your PostgreSQL connection details
connection_params = {
    'host': 'localhost',
    'database': 'scverse',
    'user': 'postgres',
    'password': 'root',
    'port': 5432,
}

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

    try:
        conn = psycopg2.connect(**connection_params)
        cursor = conn.cursor()

        query = "insert into application (full_name, email_address, mobile_number, account_currency_code, id_number, country_of_tax_residence, tax_identification_number, purpose_of_account) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)"
        values = (name, email, mobile, currency, id, country, taxId, purpose)

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

if __name__ == '__main__':
    app.run()
