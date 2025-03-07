// src/lib/api.ts
export async function fetchProducts() {
    const res = await fetch('http://localhost:5000/api/products');
    if (!res.ok) throw new Error('Failed to fetch products');
    return res.json();
  }
  
  export async function createProduct(product: { name: string; price: number; image: string }) {
    const res = await fetch('http://localhost:5000/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    if (!res.ok) throw new Error('Failed to add product');
    return res.json();
  }
  
  export async function deleteProduct(id: string) {
    const res = await fetch(`http://localhost:5000/api/products/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete product');
    return res.json();
  }
  
  export async function fetchCart() {
    const res = await fetch('http://localhost:5000/api/cart');
    if (!res.ok) throw new Error('Failed to fetch cart');
    return res.json();
  }
  
  export async function addToCart(productId: string) {
    const res = await fetch('http://localhost:5000/api/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ product_id: productId }),
    });
    if (!res.ok) throw new Error('Failed to add to cart');
    return res.json();
  }
  
  export async function removeFromCart(cartItemId: string) {
    const res = await fetch(`http://localhost:5000/api/cart/${cartItemId}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to remove from cart');
    return res.json();
  }
  