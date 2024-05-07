import json

def load_json_file(filename):
    with open(filename, 'r') as file:
        data = json.load(file)
    return data

def save_json_file(data, filename):
    with open(filename, 'w') as file:
        json.dump(data, file, indent=4)

def load_users():
    data = load_json_file('users.json')
    return data['usuarios']

def save_users(users):
    save_json_file({"usuarios": users}, 'users.json')

def load_protected_data():
    data = load_json_file('data.json')
    return data['data']

def add_user(username, password, email):
    users = load_users()
    users[username] = {'password': password, 'email': email}
    save_users(users)

def validate_user(username, password):
    users = load_users()
    return username in users and users[username]['password'] == password

def get_user_email(username):
    users = load_users()
    if username in users:
        return users[username]['email']
    return None
