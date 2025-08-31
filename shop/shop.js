function newMessage(description, linkto) {
  if (window.innerWidth > 768) {
    const closeMessage = document.createElement('div');
    closeMessage.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    closeMessage.classList.add('close-btn');

    const message = document.createElement('div');
    message.classList.add('message');

    const text = document.createElement('span');
    text.innerHTML = description;

    const link = document.createElement('a');
    link.textContent = 'View More';
    link.href = linkto;
    link.classList.add('messageLink');

    message.append(closeMessage, text, link);
    document.body.append(message);

    message.style.display = 'flex';
    message.style.animation = 'messageOn 0.5s ease forwards';

    const close = () => {
      message.style.animation = 'messageOff 0.5s ease forwards';
      setTimeout(() => message.remove(), 500);
    };

    setTimeout(close, 2000);
    closeMessage.onclick = close;
  }
}

const productBox = document.querySelector('.productBox');
const filtersContainer = document.querySelector('#categoryFilters');

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function getCheckedCategories() {
  return [...filtersContainer.querySelectorAll('input[type="checkbox"]:checked')]
    .map(el => el.value);
}

function renderProducts(products) {
  productBox.innerHTML = '';
  const frag = document.createDocumentFragment();

  if (products.length === 0) {
    const msg = document.createElement('div');
    msg.textContent = 'No products found';
    productBox.append(msg);
    return;
  }

  products.forEach(product => {
    const productEl = document.createElement('div');
    productEl.classList.add('Product');
    if (product.style) productEl.setAttribute('style', product.style);

    productEl.innerHTML = `
      <button id="shoppingButton" data-product-id="${product.id}">
        <svg class="qodef-svg--dropdown-cart" xmlns="http://www.w3.org/2000/svg" width="16.665" height="18" viewBox="0 0 16.665 18">
          <path d="M15.816 3.962a.85.85 0 0 0-.848.848v4.4a1 1 0 0 1-1 1H5.511a1 1 0 0 1-1-1V2.26a.848.848 0 0 0-.468-.759L1.222.092A.854.854 0 0 0 .085.473a.85.85 0 0 0 .381 1.138l2.349 1.174V9.21a2.7 2.7 0 0 0 2.694 2.7h8.461a2.7 2.7 0 0 0 2.7-2.7v-4.4a.85.85 0 0 0-.854-.848Z"></path>
          <path d="M6.534 13.073a2.464 2.464 0 1 0 2.464 2.463 2.465 2.465 0 0 0-2.464-2.463Zm0 3.231a.768.768 0 1 1 .768-.768.769.769 0 0 1-.768.768Z"></path>
          <path d="M14.018 13.073a2.464 2.464 0 1 0 2.464 2.463 2.465 2.465 0 0 0-2.464-2.463Zm0 3.231a.768.768 0 1 1 .768-.768.768.768 0 0 1-.768.768Z"></path>
        </svg>
      </button>

      <div class="productTop">
        <span>${product.category}</span>
        <button class="like" data-product-id="${product.id}">
          <i class="fa-regular fa-heart"></i>
        </button>
      </div>

      <div class="swiper mySwiper">
        <div class="swiper-wrapper"></div>
      </div>

      <div class="productBottom">
        <a href="../details/details.html">
          ${product.name.length > 30 ? product.name.substring(0, 30) + '…' : product.name}
        </a>
        <div class="productPrice">
          <h2>${product.price}</h2>
          <span>${product.oldPrice ? product.oldPrice : ''}</span>
        </div>
      </div>
    `;

    const productLink = productEl.querySelector('.productBottom a');
    if (productLink) {
      productLink.addEventListener('click', (ev) => {
        ev.preventDefault(); // նախ sessionStorage, հետո նավիգացիա

        const payload = {
          id: product.id,
          name: product.name,
          price: product.price,
          oldPrice: product.oldPrice || '',
          category: product.category,
          images: product.images || [],
          description: product.description || '',
          meta: {
            sku: product.sku || product.code || '',
            style: product.style || ''
          }
        };

        sessionStorage.setItem('selectedProduct', JSON.stringify(payload));
        window.location.href = productLink.href;
      });
    }


    const wrapper = productEl.querySelector('.swiper-wrapper');
    const imgs = Array.isArray(product.images) && product.images.length ? product.images : ['placeholder.jpg'];
    imgs.forEach(src => {
      const slide = document.createElement('div');
      slide.classList.add('swiper-slide');
      slide.innerHTML = `<img src="${src}" alt="${product.name}" loading="lazy" >`;
      wrapper.append(slide);
    });

    const likeBtn = productEl.querySelector('.like');
    const pid = product.id;
    if (!pid) console.warn('Product without id detected:', product);

    const getLikes = () => JSON.parse(localStorage.getItem('likes')) || [];
    const setLikes = likes => localStorage.setItem('likes', JSON.stringify(likes));

    const paintLike = () => {
      const likes = getLikes();
      const liked = likes.some(item => item.id === pid);
      likeBtn.classList.toggle('liked', liked);
      likeBtn.style.color = liked ? 'red' : 'black';
    };
    paintLike();

    likeBtn.onclick = () => {
      let likes = getLikes();
      const idx = likes.findIndex(it => it.id === pid);
      if (idx > -1) {
        likes.splice(idx, 1);
      } else {
        likes.push(product);
        newMessage(`Product added to likes <i class="fa-regular fa-heart"></i>`, '../like/like.html');
      }
      setLikes(likes);
      paintLike();
    };

    /* ---- Cart (localStorage: 'carts') ---- */
    const cartBtn = productEl.querySelector('#shoppingButton');

    const getCarts = () => JSON.parse(localStorage.getItem('carts')) || [];
    const setCarts = carts => localStorage.setItem('carts', JSON.stringify(carts));

    const paintCart = () => {
      const carts = getCarts();
      const inCart = carts.some(item => item.id === pid);
      cartBtn.style.display = inCart ? 'none' : 'block';
    };
    paintCart();

    cartBtn.onclick = () => {
      let carts = getCarts();
      const idx = carts.findIndex(it => it.id === pid);
      if (idx > -1) {
        carts.splice(idx, 1);
      } else {
        carts.push(product);
        cartBtn.style.animation = 'cartOn 0.5s ease forwards';
        newMessage('Product added to cart', '../cart/cart.html');
      }
      setCarts(carts);
      paintCart();
    };

    frag.append(productEl);
  });

  productBox.append(frag);
}

function parsePrice(val) {
  if (val == null) return NaN;
  if (typeof val === 'number') return val;
  const normalized = String(val).replace(/[^\d.]/g, '');
  return normalized === '' ? NaN : parseFloat(normalized);
}

const lowerSlider = document.querySelector('#lower');
const upperSlider = document.querySelector('#upper');
const inputOne = document.querySelector('#one');
const inputTwo = document.querySelector('#two');

function getCheckedCategories() {
  const el = document.querySelector('#categoryFilters');
  if (!el) return [];
  return [...el.querySelectorAll('input[type="checkbox"]:checked')].map(x => x.value);
}

function applyFilterAndRender() {
  const a = Number(lowerSlider.value) || 0;
  const b = Number(upperSlider.value) || 0;
  const minPrice = Math.min(a, b);
  const maxPrice = Math.max(a, b);

  const checked = getCheckedCategories();
  const base = checked.length ? allProducts.filter(p => checked.includes(p.category)) : allProducts;

  console.log('All candidates for filtering (id, rawPrice, parsed):',
    base.map(p => ({ id: p.id, name: p.name, raw: p.price, parsed: parsePrice(p.price) }))
  );

  const filtered = base.filter(p => {
    const priceNum = parsePrice(p.price);
    if (Number.isNaN(priceNum)) return false;
    return priceNum >= minPrice && priceNum <= maxPrice;
  });

  console.log('Filtered length:', filtered.length, 'range:', minPrice, '-', maxPrice);
  renderProducts(shuffleArray(filtered));
}

function updateInputsFromSliders() {
  if (inputOne) inputOne.value = lowerSlider.value;
  if (inputTwo) inputTwo.value = upperSlider.value;
}
function updateSlidersFromInputs() {
  const v1 = Number(inputOne.value) || 0;
  const v2 = Number(inputTwo.value) || 0;
  if (!isNaN(v1)) lowerSlider.value = Math.max(Number(lowerSlider.min || 0), Math.min(Number(lowerSlider.max || 7500), v1));
  if (!isNaN(v2)) upperSlider.value = Math.max(Number(upperSlider.min || 0), Math.min(Number(upperSlider.max || 7500), v2));
}

/* Events */
lowerSlider.addEventListener('input', () => {
  if (Number(lowerSlider.value) > Number(upperSlider.value)) {
    const tmp = lowerSlider.value;
    lowerSlider.value = upperSlider.value;
    upperSlider.value = tmp;
  }
  updateInputsFromSliders();
  applyFilterAndRender();
});

upperSlider.addEventListener('input', () => {
  if (Number(upperSlider.value) < Number(lowerSlider.value)) {
    const tmp = upperSlider.value;
    upperSlider.value = lowerSlider.value;
    lowerSlider.value = tmp;
  }
  updateInputsFromSliders();
  applyFilterAndRender();
});

if (inputOne) {
  inputOne.addEventListener('change', () => {
    updateSlidersFromInputs();
    applyFilterAndRender();
  });
}
if (inputTwo) {
  inputTwo.addEventListener('change', () => {
    updateSlidersFromInputs();
    applyFilterAndRender();
  });
}

renderProducts(shuffleArray([...allProducts]));

filtersContainer.addEventListener('change', applyFilterAndRender);
lowerSlider.addEventListener('input', applyFilterAndRender);
upperSlider.addEventListener('input', applyFilterAndRender);





////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const scrollTopBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    scrollTopBtn.classList.add("show");
  } else {
    scrollTopBtn.classList.remove("show");
  }
});

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});



////////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const inputField = document.querySelector('.chosen-value');
const dropdown = document.querySelector('.value-list');
const dropdownArray = [...document.querySelectorAll('li')];
console.log(typeof dropdownArray)

let valueArray = [];
dropdownArray.forEach(item => {
  valueArray.push(item.textContent);
});

const closeDropdown = () => {
  dropdown.classList.remove('open');
}

inputField.addEventListener('input', () => {
  dropdown.classList.add('open');
  let inputValue = inputField.value.toLowerCase();
  let valueSubstring;
  if (inputValue.length > 0) {
    for (let j = 0; j < valueArray.length; j++) {
      if (!(inputValue.substring(0, inputValue.length) === valueArray[j].substring(0, inputValue.length).toLowerCase())) {
        dropdownArray[j].classList.add('closed');
      } else {
        dropdownArray[j].classList.remove('closed');
      }
    }
  } else {
    for (let i = 0; i < dropdownArray.length; i++) {
      dropdownArray[i].classList.remove('closed');
    }
  }
});

dropdownArray.forEach(item => {
  item.addEventListener('click', (evt) => {
    inputField.value = item.textContent;
    dropdownArray.forEach(dropdown => {
      dropdown.classList.add('closed');
    });
  });
})

inputField.addEventListener('focus', () => {
  inputField.placeholder = 'Type to filter';
  dropdown.classList.add('open');
  dropdownArray.forEach(dropdown => {
    dropdown.classList.remove('closed');
  });
});

inputField.addEventListener('blur', () => {
  inputField.placeholder = 'All Categories';
  dropdown.classList.remove('open');
});

document.addEventListener('click', (evt) => {
  const isDropdown = dropdown.contains(evt.target);
  const isInput = inputField.contains(evt.target);
  if (!isDropdown && !isInput) {
    dropdown.classList.remove('open');
  }
});

document.getElementById('navButton').addEventListener('click', function () {
  document.querySelector('nav').classList.toggle('active');
  document.querySelector('#navButton').classList.toggle('btnactive')
})

/////////////////////////////////////////////////////////////////////////////////////////

let searchbox = document.querySelector('.search');
let searchBar = document.querySelector('.searchBar');

document.getElementById('searchButton').addEventListener('click', function () {


  searchBar.style.display = 'block'
  searchbox.style.display = 'flex'
  searchbox.style.opacity = '1'

  let search = document.getElementById('search')
  search.focus()
})

document.getElementById('searchClose').addEventListener('click', function () {
  let search = document.getElementById('search').value = ''

  searchBar.style.display = 'none'
  searchbox.style.display = 'none'
})


////////////////////////////////////////////////////////////////////////////////////////
var cartProductArr = JSON.parse(localStorage.getItem('carts')) || [];

let cartProductsLenght = document.getElementById('cartProductsLenght')
cartProductsLenght.textContent = `${cartProductArr.length}`

////////////////////////////////////////////////////////////////////////////////////////

let savedPrice = localStorage.getItem("productsAllPrice") || 0;
let priceAll = document.getElementById('priceAll');
priceAll.textContent = savedPrice;

///////////////////////////////////////////////////////////////////////////////////////

document.querySelector('#two').value = upperSlider.value;
document.querySelector('#one').value = lowerSlider.value;

var lowerVal = parseInt(lowerSlider.value);
var upperVal = parseInt(upperSlider.value);

upperSlider.oninput = function () {
  lowerVal = parseInt(lowerSlider.value);
  upperVal = parseInt(upperSlider.value);

  if (upperVal < lowerVal + 1) {
    lowerSlider.value = upperVal - 1;
    if (lowerVal == lowerSlider.min) {
      upperSlider.value = 1;
    }
  }
  document.querySelector('#two').value = this.value
};

lowerSlider.oninput = function () {
  lowerVal = parseInt(lowerSlider.value);
  upperVal = parseInt(upperSlider.value);
  if (lowerVal > upperVal - 1) {
    upperSlider.value = lowerVal + 1;
    if (upperVal == upperSlider.max) {
      lowerSlider.value = parseInt(upperSlider.max) - 1;
    }
  }
  document.querySelector('#one').value = this.value
};


////////////////////////////////////////////////////////////////////////////////////////////////////////////////

document.getElementById('navButton').addEventListener('click', function () {
  document.querySelector('nav').classList.toggle('active');
  document.querySelector('#navButton').classList.toggle('btnactive')
})