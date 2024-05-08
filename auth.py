import jwt
import datetime
from flask import jsonify, request
from functools import wraps

SECRET_KEY = 'mi_nombre_es_marco_carnet_20308'

def generate_token(user_id, email):
    payload = {
        'usuario_id': user_id,
        'email': email,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(days=30)
    }
    token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')
    return token

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({'message': 'Authorization token is missing!'}), 403
        if token.startswith('Bearer '):
            token = token.split(" ")[1]  # Remueve el prefijo 'Bearer'
        try:
            decoded = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
            request.user = decoded
        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Token has expired'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'message': 'Invalid token'}), 401
        return f(*args, **kwargs)
    return decorated
