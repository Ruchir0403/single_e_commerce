from flask import Flask, request, jsonify, session
from flask_cors import CORS
from pymongo import MongoClient
from bson.objectid import ObjectId
import os
from dotenv import load_dotenv
from werkzeug.security import generate_password_hash, check_password_hash
import datetime

load_dotenv()

app = Flask(__name__)
CORS(app, supports_credentials=True)

app.secret_key = os.getenv('SECRET_KEY', 'your_secret_key')

# Connect to MongoDB (adjust the URI as needed)
MONGO_URI = os.getenv('MONGO_URI', 'mongodb://localhost:27017/')
client = MongoClient(MONGO_URI)
db = client['ecommerce']
products_collection = db['products']
cart_collection = db['cart']
users_collection = db['users']

@app.route('/api/admin/register', methods=['POST'])
def register_admin():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    phone = data.get('phone')
    
    if not email or not password or not phone:
        return jsonify({'error': 'All fields required'}), 400

    if users_collection.find_one({'email': email}):
        return jsonify({'error': 'Email already in use'}), 400
    
    hashed_password = generate_password_hash(password)
    user = {'email': email, 'password': hashed_password, 'phone': phone, 'role': 'admin'}
    users_collection.insert_one(user)
    return jsonify({'message': 'Admin user created'}), 201

@app.route('/api/admin/login', methods=['POST'])
def login_admin():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = users_collection.find_one({'email': email, 'role': 'admin'})
    if not user or not check_password_hash(user['password'], password):
        return jsonify({'error': 'Invalid credentials'}), 401

    # On successful login, store the admin's email in the session.
    session['admin'] = email
    return jsonify({'message': 'Admin login successful'}), 200

# Logout endpoint: clears the session.
@app.route('/api/admin/logout', methods=['POST'])
def logout_admin():
    session.pop('admin', None)
    return jsonify({'message': 'Logged out successfully'}), 200

@app.route('/api/admin/check-auth', methods=['GET'])
def check_auth():
    if 'admin' in session:
        return jsonify({'authenticated': True}), 200
    return jsonify({'error': 'Not authenticated'}), 401

# User Registration
@app.route('/api/user/register', methods=['POST'])
def register_user():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    phone = data.get('phone')

    if not email or not password or not phone:
        return jsonify({'error': 'All fields required'}), 400

    if users_collection.find_one({'email': email}):
        return jsonify({'error': 'Email already in use'}), 400

    hashed_password = generate_password_hash(password)
    user = {'email': email, 'password': hashed_password, 'phone': phone, 'role': 'user'}
    users_collection.insert_one(user)
    return jsonify({'message': 'User created successfully'}), 201

# User Login
@app.route('/api/user/login', methods=['POST'])
def login_user():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = users_collection.find_one({'email': email, 'role': 'user'})
    if not user or not check_password_hash(user['password'], password):
        return jsonify({'error': 'Invalid credentials'}), 401

    # Store user email in session
    session['user'] = email
    return jsonify({'message': 'User login successful'}), 200

# User Logout
@app.route('/api/user/logout', methods=['POST'])
def logout_user():
    session.pop('user', None)
    return jsonify({'message': 'User logged out successfully'}), 200

# Check User Authentication
@app.route('/api/user/check-auth', methods=['GET'])
def check_user_auth():
    if 'user' in session:
        return jsonify({'authenticated': True}), 200
    return jsonify({'error': 'Not authenticated'}), 401

# Retrieve all products (Public endpoint)
@app.route('/api/products', methods=['GET'])
def get_products():
    products = list(products_collection.find())
    for product in products:
        product['_id'] = str(product['_id'])
    return jsonify(products)

# Add a new product (Protected endpoint)
@app.route('/api/products', methods=['POST'])
def add_product():
    data = request.get_json()
    name = data.get('name')
    price = data.get('price')
    image = data.get('image')
    if not name or not price or not image:
        return jsonify({'error': 'Missing product data'}), 400
    product = {'name': name, 'price': price, 'image': image}
    result = products_collection.insert_one(product)
    product['_id'] = str(result.inserted_id)
    return jsonify(product), 201

# Delete a product (Protected endpoint)
@app.route('/api/products/<product_id>', methods=['DELETE'])
def delete_product(product_id):
    result = products_collection.delete_one({'_id': ObjectId(product_id)})
    if result.deleted_count:
        return jsonify({'message': 'Product deleted'})
    else:
        return jsonify({'error': 'Product not found'}), 404

# Retrieve the cart items (Public endpoint)
@app.route('/api/cart', methods=['GET'])
def get_cart():
    cart_items = list(cart_collection.find())
    for item in cart_items:
        item['_id'] = str(item['_id'])
    return jsonify(cart_items)

# Add a product to the cart (Public endpoint)
@app.route('/api/cart', methods=['POST'])
def add_to_cart():
    data = request.get_json()
    product_id = data.get('product_id')
    if not product_id:
        return jsonify({'error': 'No product ID provided'}), 400
    product = products_collection.find_one({'_id': ObjectId(product_id)})
    if not product:
        return jsonify({'error': 'Product not found'}), 404
    cart_item = {
        'product_id': product_id,
        'name': product['name'],
        'price': product['price'],
        'image': product['image']
    }
    result = cart_collection.insert_one(cart_item)
    cart_item['_id'] = str(result.inserted_id)
    return jsonify(cart_item), 201

# Remove an item from the cart (Public endpoint)
@app.route('/api/cart/<cart_item_id>', methods=['DELETE'])
def remove_from_cart(cart_item_id):
    result = cart_collection.delete_one({'_id': ObjectId(cart_item_id)})
    if result.deleted_count:
        return jsonify({'message': 'Item removed from cart'})
    else:
        return jsonify({'error': 'Item not found in cart'}), 404

if __name__ == '__main__':
    app.run(debug=True)
