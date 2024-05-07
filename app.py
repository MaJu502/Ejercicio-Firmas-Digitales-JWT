from flask import Flask, request, jsonify, render_template
from auth import generate_token, token_required
from db_handler import *

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('login.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'GET':
        return render_template('register.html')
    data = request.get_json()
    username = data['username']
    password = data['password']
    email = data.get('email', '')
    if username in load_users():
        return jsonify({'message': 'User already exists!'}), 409
    add_user(username, password, email)
    token = generate_token(user_id=username, email=email)  # Genera el token tras registro exitoso
    return jsonify({'token': token, 'message': 'User registered successfully!'}), 201

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'GET':
        return render_template('login.html')
    data = request.get_json()
    username = data['username']
    password = data['password']
    if not validate_user(username, password):
        return jsonify({'message': 'Invalid credentials!'}), 401
    token = generate_token(user_id=username, email=get_user_email(username))
    return jsonify({'token': token})

@app.route('/protected', methods=['GET'])
@token_required
def protected():
    data = load_protected_data()
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
