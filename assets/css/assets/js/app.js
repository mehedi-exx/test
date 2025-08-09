 // প্রোডাক্ট ডেটা
const products = [
  { id: 1, name: "T-Shirt", price: 500 },
  { id: 2, name: "Jeans", price: 1200 },
  { id: 3, name: "Shoes", price: 2000 },
  { id: 4, name: "Watch", price: 1500 },
  { id: 5, name: "Cap", price: 300 },
  { id: 6, name: "Bag", price: 800 },
];

// কার্ট ভ্যারিয়েবল
let cart = [];

// DOM এলিমেন্টস
const productListEl = document.getElementById('productList');
const cartItemsEl = document.getElementById('cartItems');
const cartTotalEl = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');

// প্রোডাক্ট লোড ফাংশন
function loadProducts() {
  productListEl.innerHTML = '';
  
  products.forEach(product => {
    const productEl = document.createElement('div');
    productEl.className = 'product-card';
    productEl.innerHTML = `
      <h3>${product.name}</h3>
      <p>${product.price} TK</p>
    `;
    
    productEl.addEventListener('click', () => addToCart(product));
    productListEl.appendChild(productEl);
  });
}

// কার্টে প্রোডাক্ট অ্যাড ফাংশন
function addToCart(product) {
  const existingItem = cart.find(item => item.id === product.id);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      ...product,
      quantity: 1
    });
  }
  
  updateCart();
}

// কার্ট আপডেট ফাংশন
function updateCart() {
  cartItemsEl.innerHTML = '';
  
  if (cart.length === 0) {
    cartItemsEl.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
  } else {
    cart.forEach(item => {
      const cartItemEl = document.createElement('div');
      cartItemEl.className = 'cart-item';
      cartItemEl.innerHTML = `
        <span>${item.name} (${item.quantity})</span>
        <span>${item.price * item.quantity} TK</span>
      `;
      cartItemsEl.appendChild(cartItemEl);
    });
  }
  
  // টোটাল ক্যালকুলেট
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  cartTotalEl.textContent = total.toFixed(2);
}

// চেকআউট ফাংশন
function checkout() {
  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }
  
  alert(`Checkout successful! Total: ${cartTotalEl.textContent} TK`);
  cart = [];
  updateCart();
}

// ইভেন্ট লিসেনার
checkoutBtn.addEventListener('click', checkout);

// ইনিশিয়াল লোড
loadProducts();
updateCart();

// সার্ভিস ওয়ার্কার রেজিস্ট্রেশন
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('ServiceWorker registration successful');
      })
      .catch(err => {
        console.log('ServiceWorker registration failed: ', err);
      });
  });
}
