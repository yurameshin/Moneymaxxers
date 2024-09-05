from flask import Flask, request, jsonify
import mysql.connector
from flask_cors import CORS


app = Flask(__name__)
CORS(app)


db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="TextMoneyDB"
)


cursor = db.cursor(dictionary=True)


@app.route('/add-entry', methods=['POST'])
def add_entry():
    data = request.get_json()
    text_input = data['text_input']
    money_input = float(data['money'])


    cursor.execute("SELECT * FROM Entries WHERE text_input = %s", (text_input,))
    result = cursor.fetchone()

    if result:

        new_money = float(result['money']) + money_input
        cursor.execute("UPDATE Entries SET money = %s WHERE text_input = %s", (new_money, text_input))
        db.commit()
        return jsonify({'status': 'updated', 'total': new_money})
    else:

        cursor.execute("INSERT INTO Entries (text_input, money) VALUES (%s, %s)", (text_input, money_input))
        db.commit()
        return jsonify({'status': 'inserted', 'total': money_input})


@app.route('/entries', methods=['GET'])
def get_entries():
    cursor.execute("SELECT * FROM Entries")
    entries = cursor.fetchall()
    return jsonify(entries)


if __name__ == '__main__':
    app.run(debug=True)
