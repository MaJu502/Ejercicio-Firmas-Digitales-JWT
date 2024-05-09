from flask import Flask, request, jsonify, render_template
from db_handler import *
import jwt
import datetime
from functools import wraps

SECRET_KEY = 'mi_nombre_es_marco_carnet_20308'

app = Flask(__name__)

def generate_token(user_id, email):
    payload = {
        'usuario_id': user_id,
        'email': email,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=10)
    }
    token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')
    return token

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.args.get('token')
        if not token:
            return jsonify({'message': 'Authorization token is missing!'}), 403
        try:
            decoded = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
            request.user = decoded
        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Token has expired'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'message': 'Invalid token'}), 401
        return f(*args, **kwargs)
    return decorated

@app.route('/protected', methods=['GET'])
@token_required
def protected():
    try:
        data = load_protected_data()
        return jsonify(data)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/display-protected')
@token_required
def display_protected():
    data = load_protected_data()
    token = request.args.get('token')
    if token:
        try:
            decoded_token = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
            expiration_time = datetime.datetime.utcfromtimestamp(decoded_token['exp'])
            remaining_time = expiration_time - datetime.datetime.utcnow()
            # Formato de tiempo restante amigable
            remaining_str = f"{remaining_time.days} days, {remaining_time.seconds // 3600} hours, {(remaining_time.seconds // 60) % 60} minutes, {remaining_time.seconds % 60} seconds"
            return render_template('display_protected.html', data=data, token=token, remaining_time=remaining_str)
        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Token has expired'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'message': 'Invalid token'}), 401

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
    token = generate_token(user_id=username, email=email)
    print('token: ', token)
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

if __name__ == '__main__':
    app.run(debug=True)
