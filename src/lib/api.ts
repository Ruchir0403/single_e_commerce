export async function fetchProducts() {
  const res = await fetch('http://localhost:5000/api/products', {
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}

export async function createProduct(product: { name: string; price: number; image: string }) {
  const res = await fetch('http://localhost:5000/api/products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',  // include cookies for session authentication
    body: JSON.stringify(product),
  });
  if (!res.ok) throw new Error('Failed to add product');
  return res.json();
}

export async function deleteProduct(id: string) {
  const res = await fetch(`http://localhost:5000/api/products/${id}`, {
    method: 'DELETE',
    credentials: 'include',  // include credentials so that session is sent
  });
  if (!res.ok) throw new Error('Failed to delete product');
  return res.json();
}

export async function fetchCart() {
  const res = await fetch('http://localhost:5000/api/cart', {
    credentials: 'include',  // even if public, it's good to include if needed
  });
  if (!res.ok) throw new Error('Failed to fetch cart');
  return res.json();
}

export async function addToCart(productId: string) {
  const res = await fetch('http://localhost:5000/api/cart', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    // Cart endpoints may be public, so credentials may not be required here,
    // but include them if your backend needs them.
    credentials: 'include',
    body: JSON.stringify({ product_id: productId }),
  });
  if (!res.ok) throw new Error('Failed to add to cart');
  return res.json();
}

export async function removeFromCart(cartItemId: string) {
  const res = await fetch(`http://localhost:5000/api/cart/${cartItemId}`, {
    method: 'DELETE',
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Failed to remove from cart');
  return res.json();
}
