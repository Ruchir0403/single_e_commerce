from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from bson.objectid import ObjectId
import os
from dotenv import load_dotenv 

load_dotenv() 

app = Flask(__name__)
CORS(app)

# Connect to MongoDB (adjust the URI as needed)
MONGO_URI = os.getenv('MONGO_URI', 'mongodb://localhost:27017/')
client = MongoClient(MONGO_URI)
db = client['ecommerce']
products_collection = db['products']
cart_collection = db['cart']

# Retrieve all products
@app.route('/api/products', methods=['GET'])
def get_products():
    products = list(products_collection.find())
    for product in products:
        product['_id'] = str(product['_id'])
    return jsonify(products)

# Add a new product
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

# Delete a product
@app.route('/api/products/<product_id>', methods=['DELETE'])
def delete_product(product_id):
    result = products_collection.delete_one({'_id': ObjectId(product_id)})
    if result.deleted_count:
        return jsonify({'message': 'Product deleted'})
    else:
        return jsonify({'error': 'Product not found'}), 404

# Retrieve the cart items
@app.route('/api/cart', methods=['GET'])
def get_cart():
    cart_items = list(cart_collection.find())
    for item in cart_items:
        item['_id'] = str(item['_id'])
    return jsonify(cart_items)

# Add a product to the cart
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
    # Add the generated _id to the cart_item object so the front-end can use it immediately
    cart_item['_id'] = str(result.inserted_id)
    return jsonify(cart_item), 201

# Remove an item from the cart
@app.route('/api/cart/<cart_item_id>', methods=['DELETE'])
def remove_from_cart(cart_item_id):
    result = cart_collection.delete_one({'_id': ObjectId(cart_item_id)})
    if result.deleted_count:
        return jsonify({'message': 'Item removed from cart'})
    else:
        return jsonify({'error': 'Item not found in cart'}), 404

if __name__ == '__main__':
    app.run(debug=True)
