/* ==========================================================================
   SUPRABATH RESTAURANT - INTERACTIVE CLIENT SIDE LOGIC
   ========================================================================== */

// Global Cart State
let cart = [];

document.addEventListener('DOMContentLoaded', () => {

  // 1. Sticky Navigation Scroll Effect
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // 2. Scrollspy - Highlight Active Section in Navbar
  const navLinkElems = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');
  
  function highlightSection() {
    let scrollPosition = window.scrollY + 150; // offset for nav height

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPosition >= top && scrollPosition < top + height) {
        navLinkElems.forEach(link => {
          link.classList.remove('active-section');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active-section');
          }
        });
      }
    });
  }
  window.addEventListener('scroll', highlightSection);

  // 3. Mobile Menu Navigation Drawer
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  const links = document.querySelectorAll('.nav-link');

  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  links.forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });

  // 4. Interactive Full Menu Category Filtering
  const tabButtons = document.querySelectorAll('.menu-tab-btn');
  const menuItems = document.querySelectorAll('.menu-item-card');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      tabButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filterCategory = button.getAttribute('data-category');

      menuItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        
        // Hide card first for transition reset
        item.style.opacity = '0';
        item.style.transform = 'translateY(15px)';

        setTimeout(() => {
          if (filterCategory === 'all' || itemCategory === filterCategory) {
            item.style.display = 'flex';
            requestAnimationFrame(() => {
              item.style.opacity = '1';
              item.style.transform = 'translateY(0)';
            });
          } else {
            item.style.display = 'none';
          }
        }, 250);
      });
    });
  });

  // 5. Testimonials Carousel Slider
  const testimonialTrack = document.getElementById('testimonialTrack');
  const dots = document.querySelectorAll('.dot');
  let currentSlide = 0;
  let autoplayTimer;

  function goToSlide(index) {
    if (index < 0) index = dots.length - 1;
    if (index >= dots.length) index = 0;

    currentSlide = index;
    testimonialTrack.style.transform = `translateX(-${index * 100}%)`;
    
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
  }

  function startAutoplay() {
    autoplayTimer = setInterval(() => {
      goToSlide(currentSlide + 1);
    }, 6000);
  }

  function resetAutoplay() {
    clearInterval(autoplayTimer);
    startAutoplay();
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const slideIndex = parseInt(dot.getAttribute('data-slide'));
      goToSlide(slideIndex);
      resetAutoplay();
    });
  });

  startAutoplay();

  // 6. Gallery Lightbox Modal
  const lightbox = document.getElementById('galleryLightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxCloseBtn = document.getElementById('lightboxClose');
  const lightboxOverlay = document.getElementById('lightboxOverlay');
  const galleryItems = document.querySelectorAll('.gallery-item');

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const placeholder = item.querySelector('.gallery-placeholder-img');
      const caption = item.querySelector('.gallery-caption').textContent;

      if (img) {
        lightboxImg.src = img.src;
        lightboxImg.style.display = 'block';
      } else if (placeholder) {
        // Fallback for visual cards: show gradient mock in lightbox
        lightboxImg.style.display = 'none';
      }

      lightboxCaption.textContent = caption;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden'; // Stop background scrolling
    });
  });

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  lightboxCloseBtn.addEventListener('click', closeLightbox);
  lightboxOverlay.addEventListener('click', closeLightbox);

  // 7. Online Reservation Modal Controls & Ticket Submission
  const reserveModal = document.getElementById('reserveModal');
  const reserveOverlay = document.getElementById('reserveOverlay');
  const modalCloseBtn = document.getElementById('modalClose');
  const reserveTriggers = document.querySelectorAll('.reserve-trigger');
  
  const reserveFormContainer = document.getElementById('modalFormContainer');
  const reserveSuccessContainer = document.getElementById('modalSuccessContainer');
  const bookingForm = document.getElementById('bookingForm');
  const modalDismissBtn = document.getElementById('modalDismiss');

  // Set minimum date picker to today's date
  const dateInput = document.getElementById('booking-date');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
  }

  function openReserveModal() {
    reserveModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeReserveModal() {
    reserveModal.classList.remove('active');
    document.body.style.overflow = '';
    
    // Reset modal content state
    setTimeout(() => {
      reserveFormContainer.style.display = 'block';
      reserveFormContainer.style.opacity = '1';
      reserveFormContainer.style.transform = 'translateY(0)';
      reserveSuccessContainer.style.display = 'none';
      bookingForm.reset();
    }, 400);
  }

  reserveTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      openReserveModal();
    });
  });

  modalCloseBtn.addEventListener('click', closeReserveModal);
  modalDismissBtn.addEventListener('click', closeReserveModal);
  reserveOverlay.addEventListener('click', closeReserveModal);

  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const guests = document.getElementById('guests').value;
    const zoneValue = document.getElementById('zone').value;
    const date = document.getElementById('booking-date').value;
    const time = document.getElementById('booking-time').value;
    const name = document.getElementById('client-name').value;
    
    let zoneLabel = 'Heritage Dining Hall';
    if (zoneValue === 'veranda') zoneLabel = 'Saffron Veranda';
    if (zoneValue === 'cellar') zoneLabel = 'Royal Cellar';

    const formattedDate = new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });

    const ticketCode = 'SUP-' + Math.floor(1000 + Math.random() * 9000);

    // Populate Receipt Details
    document.getElementById('sum-name').textContent = name;
    document.getElementById('sum-guests').textContent = `${guests} Guests`;
    document.getElementById('sum-zone').textContent = zoneLabel;
    document.getElementById('sum-datetime').textContent = `${formattedDate} @ ${time}`;
    document.getElementById('sum-code').textContent = ticketCode;

    // Transition Form to Receipt Success view
    reserveFormContainer.style.opacity = '0';
    reserveFormContainer.style.transform = 'translateY(-15px)';
    
    setTimeout(() => {
      reserveFormContainer.style.display = 'none';
      reserveSuccessContainer.style.display = 'block';
      
      reserveSuccessContainer.style.opacity = '0';
      reserveSuccessContainer.style.transform = 'translateY(15px)';
      
      requestAnimationFrame(() => {
        reserveSuccessContainer.style.opacity = '1';
        reserveSuccessContainer.style.transform = 'translateY(0)';
      });
    }, 300);
  });

  // 8. Contact Form Submission
  const contactForm = document.getElementById('contactForm');
  const contactSuccess = document.getElementById('contactSuccess');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    contactForm.style.opacity = '0.5';
    contactForm.style.pointerEvents = 'none';

    setTimeout(() => {
      contactForm.reset();
      contactForm.style.opacity = '1';
      contactForm.style.pointerEvents = 'auto';
      contactSuccess.style.display = 'block';
      setTimeout(() => {
        contactSuccess.style.display = 'none';
      }, 5000);
    }, 800);
  });

  // 9. Newsletter Form Submission
  const newsletterForm = document.getElementById('newsletterForm');
  const newsletterSuccess = document.getElementById('newsletterSuccess');

  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    newsletterForm.style.opacity = '0.5';
    newsletterForm.style.pointerEvents = 'none';
    
    setTimeout(() => {
      newsletterForm.reset();
      newsletterForm.style.display = 'none';
      newsletterSuccess.style.display = 'block';
      newsletterSuccess.style.opacity = '1';
    }, 600);
  });

  // 10. Checkout Modal Control (Order Form Submission)
  const checkoutModal = document.getElementById('checkoutModal');
  const checkoutOverlay = document.getElementById('checkoutOverlay');
  const checkoutCloseBtn = document.getElementById('checkoutClose');
  const checkoutDismissBtn = document.getElementById('checkoutDismiss');
  
  const checkoutFormContainer = document.getElementById('checkoutFormContainer');
  const checkoutSuccessContainer = document.getElementById('checkoutSuccessContainer');
  const checkoutForm = document.getElementById('checkoutForm');
  const btnOpenCheckout = document.getElementById('btnOpenCheckout');

  function openCheckoutModal() {
    // Set total order price in success screen pre-population
    const totalElement = document.getElementById('cartTotal');
    document.getElementById('ord-amount').textContent = totalElement.textContent;
    
    checkoutModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeCheckoutModal() {
    checkoutModal.classList.remove('active');
    document.body.style.overflow = '';
    
    setTimeout(() => {
      checkoutFormContainer.style.display = 'block';
      checkoutFormContainer.style.opacity = '1';
      checkoutFormContainer.style.transform = 'translateY(0)';
      checkoutSuccessContainer.style.display = 'none';
      checkoutForm.reset();
    }, 400);
  }

  if (btnOpenCheckout) {
    btnOpenCheckout.addEventListener('click', openCheckoutModal);
  }
  checkoutCloseBtn.addEventListener('click', closeCheckoutModal);
  checkoutDismissBtn.addEventListener('click', () => {
    closeCheckoutModal();
    // Clear cart after dismissing success screen
    cart = [];
    renderCart();
  });
  checkoutOverlay.addEventListener('click', closeCheckoutModal);

  checkoutForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('del-name').value;
    const address = document.getElementById('del-address').value;
    
    const trackingCode = 'ORD-' + Math.floor(1000 + Math.random() * 9000);
    const eta = 35 + Math.floor(Math.random() * 15); // 35-50 mins

    // Populate order success details
    document.getElementById('ord-name').textContent = name;
    document.getElementById('ord-address').textContent = address;
    document.getElementById('ord-code').textContent = trackingCode;
    document.getElementById('ord-eta').textContent = `${eta} mins`;

    // Transition Checkout form to checkout success screen
    checkoutFormContainer.style.opacity = '0';
    checkoutFormContainer.style.transform = 'translateY(-15px)';
    
    setTimeout(() => {
      checkoutFormContainer.style.display = 'none';
      checkoutSuccessContainer.style.display = 'block';
      
      checkoutSuccessContainer.style.opacity = '0';
      checkoutSuccessContainer.style.transform = 'translateY(15px)';
      
      requestAnimationFrame(() => {
        checkoutSuccessContainer.style.opacity = '1';
        checkoutSuccessContainer.style.transform = 'translateY(0)';
      });
    }, 300);
  });

  // 11. Floating Cart trigger - scrolls to Ordering section
  const cartTrigger = document.getElementById('cartTrigger');
  cartTrigger.addEventListener('click', () => {
    const orderingSection = document.getElementById('ordering');
    orderingSection.scrollIntoView({ behavior: 'smooth' });
  });

  // ESC Key close modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (reserveModal.classList.contains('active')) closeReserveModal();
      if (checkoutModal.classList.contains('active')) closeCheckoutModal();
      if (lightbox.classList.contains('active')) closeLightbox();
    }
  });

});

// 12. Cart Operations (Global scope for onclick triggers in HTML)
function addToCart(id, name, price) {
  const existingItemIndex = cart.findIndex(item => item.id === id);

  if (existingItemIndex > -1) {
    cart[existingItemIndex].qty += 1;
  } else {
    cart.push({ id, name, price, qty: 1 });
  }

  // Trigger floating cart animation badge pulse
  const trigger = document.getElementById('cartTrigger');
  if (trigger) {
    trigger.classList.add('pulse');
    setTimeout(() => trigger.classList.remove('pulse'), 500);
  }

  renderCart();
}

function changeQty(id, delta) {
  const itemIndex = cart.findIndex(item => item.id === id);
  if (itemIndex > -1) {
    cart[itemIndex].qty += delta;
    if (cart[itemIndex].qty <= 0) {
      cart.splice(itemIndex, 1);
    }
    renderCart();
  }
}

function removeFromCart(id) {
  const itemIndex = cart.findIndex(item => item.id === id);
  if (itemIndex > -1) {
    cart.splice(itemIndex, 1);
    renderCart();
  }
}

function renderCart() {
  const cartList = document.getElementById('cartList');
  const cartEmptyMsg = document.getElementById('cartEmptyMsg');
  const cartItemsContainer = document.getElementById('cartItemsContainer');
  const cartBadgeCount = document.getElementById('cartBadgeCount');
  
  const subtotalEl = document.getElementById('cartSubtotal');
  const deliveryEl = document.getElementById('cartDelivery');
  const totalEl = document.getElementById('cartTotal');

  // Calculate Badge Count
  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
  cartBadgeCount.textContent = totalQty;

  // Toggle Visibility of Badge
  if (totalQty > 0) {
    cartBadgeCount.style.display = 'flex';
  } else {
    cartBadgeCount.style.display = 'none';
  }

  // Handle Cart Empty State
  if (cart.length === 0) {
    cartEmptyMsg.style.display = 'block';
    cartItemsContainer.style.display = 'none';
    return;
  }

  cartEmptyMsg.style.display = 'none';
  cartItemsContainer.style.display = 'block';

  // Render Items List
  cartList.innerHTML = '';
  let subtotal = 0;

  cart.forEach(item => {
    const itemTotal = item.price * item.qty;
    subtotal += itemTotal;

    const cartItemDiv = document.createElement('div');
    cartItemDiv.className = 'cart-item';
    cartItemDiv.innerHTML = `
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">$${itemTotal.toFixed(2)}</div>
      </div>
      <div class="cart-item-controls">
        <button class="cart-qty-btn" onclick="changeQty('${item.id}', -1)">&minus;</button>
        <span class="cart-qty-num">${item.qty}</span>
        <button class="cart-qty-btn" onclick="changeQty('${item.id}', 1)">&plus;</button>
        <button class="cart-remove-btn" onclick="removeFromCart('${item.id}')" title="Remove Item">&times;</button>
      </div>
    `;
    cartList.appendChild(cartItemDiv);
  });

  // Calculate Delivery and Total
  // Delivery is free ($0) if subtotal exceeds $50.00, otherwise $5.00
  const deliveryFee = subtotal >= 50.00 ? 0.00 : 5.00;
  const grandTotal = subtotal + deliveryFee;

  subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
  deliveryEl.textContent = deliveryFee === 0.00 ? 'FREE' : `$${deliveryFee.toFixed(2)}`;
  totalEl.textContent = `$${grandTotal.toFixed(2)}`;
}
