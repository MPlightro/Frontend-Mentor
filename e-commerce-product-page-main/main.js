// main.js for static e-commerce product page

// Product data
const product = {
  name: 'Fall Limited Edition Sneakers',
  manufacturer: 'Sneaker Company',
  description: `These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they’ll withstand everything the weather can offer.`,
  price: 250,
  discount: 0.5,
  images: [
    {
      original: 'src/assets/images/image-product-1.jpg',
      thumbnail: 'src/assets/images/image-product-1-thumbnail.jpg',
    },
    {
      original: 'src/assets/images/image-product-2.jpg',
      thumbnail: 'src/assets/images/image-product-2-thumbnail.jpg',
    },
    {
      original: 'src/assets/images/image-product-3.jpg',
      thumbnail: 'src/assets/images/image-product-3-thumbnail.jpg',
    },
    {
      original: 'src/assets/images/image-product-4.jpg',
      thumbnail: 'src/assets/images/image-product-4-thumbnail.jpg',
    },
  ],
};

// Cart state
let cart = [];
let quantity = 0;

// Elements
const mainImage = document.getElementById('main-image');
const thumbnails = document.querySelectorAll('.thumbnail');
const quantitySpan = document.getElementById('quantity');
const increaseQtyBtn = document.getElementById('increase-qty');
const decreaseQtyBtn = document.getElementById('decrease-qty');
const addToCartBtn = document.getElementById('add-to-cart');
const cartBtn = document.getElementById('cart-btn');
const cartModal = document.getElementById('cart-modal');
const cartItemsDiv = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const checkoutBtn = document.getElementById('checkout-btn');

// Gallery logic
thumbnails.forEach((thumb, idx) => {
  thumb.addEventListener('click', () => {
    mainImage.src = product.images[idx].original;
    thumbnails.forEach(t => t.classList.remove('selected'));
    thumb.classList.add('selected');
  });
});

// Quantity logic
increaseQtyBtn.addEventListener('click', () => {
  quantity++;
  quantitySpan.textContent = quantity;
});
decreaseQtyBtn.addEventListener('click', () => {
  if (quantity > 0) quantity--;
  quantitySpan.textContent = quantity;
});

// Add to cart logic
addToCartBtn.addEventListener('click', () => {
  if (quantity === 0) return;
  // Only one product type in this demo
  const finalPrice = (product.price * (1 - product.discount)).toFixed(2);
  const item = {
    name: product.name,
    image: product.images[0].thumbnail,
    finalPrice: finalPrice,
    quantity: quantity,
  };
  cart = [item];
  updateCartDisplay();
  cartCount.textContent = quantity;
  cartCount.style.display = 'flex';
  quantity = 0;
  quantitySpan.textContent = quantity;
});

// Cart modal logic
cartBtn.addEventListener('click', () => {
  cartModal.style.display = cartModal.style.display === 'none' ? 'flex' : 'none';
});

document.addEventListener('click', (e) => {
  if (!cartModal.contains(e.target) && e.target !== cartBtn && !cartBtn.contains(e.target)) {
    cartModal.style.display = 'none';
  }
});

function updateCartDisplay() {
  cartItemsDiv.innerHTML = '';
  if (cart.length === 0) {
    cartItemsDiv.innerHTML = '<p class="empty-cart">Your cart is empty.</p>';
    checkoutBtn.style.display = 'none';
    cartCount.style.display = 'none';
    return;
  }
  const item = cart[0];
  const itemDiv = document.createElement('div');
  itemDiv.className = 'cart-item-row';
  itemDiv.innerHTML = `
    <img src="${item.image}" alt="Product thumbnail" class="cart-thumb" style="width:50px;height:50px;border-radius:4px;" />
    <div class="cart-item-info">
      <span class="cart-item-name">${item.name}</span><br>
      <span class="cart-item-price text-grey-500">$${item.finalPrice} x ${item.quantity}</span>
      <span class="cart-item-total"> $${(item.finalPrice * item.quantity).toFixed(2)}</span>
    </div>
    <button class="remove-cart-item" aria-label="Remove from cart"><img src="src/assets/images/icon-delete.svg" alt="Remove" /></button>
  `;
  cartItemsDiv.appendChild(itemDiv);
  checkoutBtn.style.display = 'block';
  // Remove logic
  itemDiv.querySelector('.remove-cart-item').addEventListener('click', () => {
    cart = [];
    updateCartDisplay();
  });
}

// Lightbox logic (basic: click main image to open overlay)
mainImage.addEventListener('click', () => {
  openLightbox();
});

function openLightbox() {
  const lightboxRoot = document.getElementById('lightbox-root');
  lightboxRoot.innerHTML = `
    <div class="lightbox-overlay" style="position:fixed;inset:0;background:rgba(0,0,0,0.8);display:flex;align-items:center;justify-content:center;z-index:200;">
      <div class="lightbox-content" style="position:relative;max-width:550px;">
        <button class="lightbox-close" style="position:absolute;top:-40px;right:0;background:none;border:none;cursor:pointer;"><img src='src/assets/images/icon-close.svg' alt='Close' style='width:24px;'/></button>
        <img src="${mainImage.src}" alt="Product large" style="width:100%;border-radius:15px;" />
        <div class="lightbox-thumbnails" style="display:flex;gap:16px;margin-top:24px;justify-content:center;">
          ${product.images.map((img, idx) => `<img src="${img.thumbnail}" alt="Thumb" class="lightbox-thumb${mainImage.src === img.original ? ' selected' : ''}" data-index="${idx}" style="width:88px;height:88px;border-radius:10px;cursor:pointer;border:2px solid ${mainImage.src === img.original ? 'var(--color-orange-500)' : 'transparent'};opacity:${mainImage.src === img.original ? '0.5' : '1'};" />`).join('')}
        </div>
      </div>
    </div>
  `;
  // Close logic
  lightboxRoot.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
  lightboxRoot.querySelector('.lightbox-overlay').addEventListener('click', (e) => {
    if (e.target === lightboxRoot.querySelector('.lightbox-overlay')) closeLightbox();
  });
  // Thumbnail logic
  lightboxRoot.querySelectorAll('.lightbox-thumb').forEach((thumb, idx) => {
    thumb.addEventListener('click', (e) => {
      e.stopPropagation();
      mainImage.src = product.images[idx].original;
      thumbnails.forEach(t => t.classList.remove('selected'));
      thumbnails[idx].classList.add('selected');
      openLightbox(); // re-render
    });
  });
}
function closeLightbox() {
  document.getElementById('lightbox-root').innerHTML = '';
} 