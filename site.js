let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
} 

document.getElementById('search-icon').addEventListener('click', function(event) {
  event.preventDefault();
  var searchBar = document.getElementById('search-bar');
  if (searchBar.classList.contains('visible')) {
      searchBar.classList.remove('visible');
  } else {
      searchBar.classList.add('visible');
  }
});


document.addEventListener('DOMContentLoaded', () => {
  const cartItemsContainer = document.querySelector('.cart-items');
  const totalPriceElement = document.getElementById('total-price');

  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  function renderCart() {
      cartItemsContainer.innerHTML = '';
      let total = 0;

      cart.forEach((item, index) => {
          const cartItem = document.createElement('div');
          cartItem.classList.add('cart-item');

          cartItem.innerHTML = `
              <img src="${item.image}" alt="${item.name}">
              <div class="cart-item-details">
                  <div class="cart-item-name">${item.name}</div>
                  <div class="cart-item-price">${item.price} $.</div>
              </div>
              <div class="cart-item-remove" data-index="${index}">Delete</div>
          `;

          cartItemsContainer.appendChild(cartItem);
          total += item.price;
      });

      totalPriceElement.textContent = total;
  }

  cartItemsContainer.addEventListener('click', (e) => {
      if (e.target.classList.contains('cart-item-remove')) {
          const index = e.target.getAttribute('data-index');
          cart.splice(index, 1);
          localStorage.setItem('cart', JSON.stringify(cart));
          renderCart();
      }
  });

  renderCart();
});