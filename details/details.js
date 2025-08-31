(function () {
  const $ = sel => document.querySelector(sel);
  const qs = (sel, ctx = document) => ctx.querySelector(sel);
  const qsa = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  const mainImageWrap = $('#productMainImage');
  const galleryWrap = $('#productGallery');
  const titleEl = $('#productTitle');
  const priceEl = $('#productPrice');
  const oldPriceEl = $('#productOldPrice');
  const descEl = $('#productDescription');
  const skuEl = $('#productSKU');
  const catEl = $('#productCategory');
  const tagsEl = $('#productTags');

  const qtyDec = $('#qtyDec');
  const qtyInc = $('#qtyInc');
  const qtyInput = $('#qtyInput');
  const addToCartBtn = $('#addToCartBtn');
  const wishBtn = $('#wishBtn');

  let raw = sessionStorage.getItem('selectedProduct');
  if (!raw) {
    console.warn('No selectedProduct in sessionStorage');
    document.body.insertAdjacentHTML('afterbegin', '<div style="padding:20px;color:#a00;">No product selected. Go back to shop.</div>');
    return;
  }

  let product;
  try {
    product = JSON.parse(raw);
  } catch (e) {
    console.error('Error parsing selectedProduct', e);
    return;
  }


  function renderMainImage(src) {
    mainImageWrap.innerHTML = '';
    const img = document.createElement('img');
    img.src = src || (product.images && product.images[0]) || 'placeholder.jpg';
    img.alt = product.name || 'Product image';
    img.loading = 'lazy';
    mainImageWrap.appendChild(img);
  }

  function renderGallery(images) {
    galleryWrap.innerHTML = '';
    (images && images.length ? images : ['placeholder.jpg']).forEach((src, idx) => {
      const img = document.createElement('img');
      img.src = src;
      img.alt = `${product.name} — ${idx + 1}`;
      img.setAttribute('data-index', idx);
      img.role = 'listitem';
      if (idx === 0) img.classList.add('active');
      img.addEventListener('click', () => {
        // switch main
        renderMainImage(src);
        // active thumb
        qsa('img', galleryWrap).forEach(i => i.classList.remove('active'));
        img.classList.add('active');
      });
      galleryWrap.appendChild(img);
    });
  }


  titleEl.textContent = product.name || '';
  priceEl.textContent = product.price || '';
  oldPriceEl.textContent = product.oldPrice || '';
  descEl.textContent = product.description || '';
  skuEl.textContent = (product.meta && product.meta.sku) || '';
  catEl.textContent = product.category || '';
  tagsEl.textContent = (product.tags && product.tags.join(', ')) || (product.meta && product.meta.tags) || '';

  renderMainImage((product.images && product.images[0]) || '');
  renderGallery(product.images || []);

  const sanitizeQty = (v) => {
    const n = Number(v) || 1;
    return Math.max(1, Math.floor(n));
  };
  qtyInput.value = sanitizeQty(qtyInput.value);

  qtyDec && qtyDec.addEventListener('click', () => {
    qtyInput.value = sanitizeQty(Number(qtyInput.value) - 1);
  });
  qtyInc && qtyInc.addEventListener('click', () => {
    qtyInput.value = sanitizeQty(Number(qtyInput.value) + 1);
  });
  qtyInput && qtyInput.addEventListener('change', () => {
    qtyInput.value = sanitizeQty(qtyInput.value);
  });

  const getCarts = () => {
    try { return JSON.parse(localStorage.getItem('carts') || '[]'); } catch (e) { return []; }
  };
  const setCarts = (c) => localStorage.setItem('carts', JSON.stringify(c || []));

  const getLikes = () => {
    try { return JSON.parse(localStorage.getItem('likes') || '[]'); } catch (e) { return []; }
  };
  const setLikes = (v) => localStorage.setItem('likes', JSON.stringify(v || []));


  addToCartBtn.addEventListener('click', () => {
    const qty = sanitizeQty(qtyInput.value);
    const carts = getCarts();
    const existingIdx = carts.findIndex(it => it.id === product.id);
    if (existingIdx > -1) {
      carts[existingIdx].qty = (Number(carts[existingIdx].qty) || 0) + qty;
    } else {
      carts.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images && product.images[0],
        qty: qty
      });
    }
    setCarts(carts);

    addToCartBtn.textContent = 'ADDED';
    addToCartBtn.disabled = true;
    setTimeout(() => {
      addToCartBtn.textContent = 'ADD TO CART';
      addToCartBtn.disabled = false;
    }, 900);

  });

  function paintWish() {
    const likes = getLikes();
    const liked = likes.some(it => it.id === product.id);
    wishBtn.setAttribute('aria-pressed', String(!!liked));
    wishBtn.textContent = liked ? '♥ In wishlist' : '♡ Add to wishlist';
  }

  wishBtn.addEventListener('click', () => {
    let likes = getLikes();
    const idx = likes.findIndex(it => it.id === product.id);
    if (idx > -1) {
      likes.splice(idx, 1);
    } else {
      likes.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images && product.images[0]
      });
    }
    setLikes(likes);
    paintWish();
  });

  paintWish();

  console.info('Loaded product details:', product);
})();


////////////////////////////////////////////////////////////////////////////////////////////////////////////////














const scrollTopBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    scrollTopBtn.classList.add("show");
  } else {
    scrollTopBtn.classList.remove("show");
  }
});

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

document.getElementById('navButton').addEventListener('click', function () {
  document.querySelector('nav').classList.toggle('active');
  document.querySelector('#navButton').classList.toggle('btnactive')
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////



























////////////////////////////////////////////////////////////////////////////////////

const inputField = document.querySelector('.chosen-value');
const dropdown = document.querySelector('.value-list');
const dropdownArray = [...document.querySelectorAll('li')];
console.log(typeof dropdownArray)
// dropdown.classList.add('open');
// inputField.focus(); // Demo purposes only
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

////////////////////////////////////////////////////////////////////////////

var cartProductArr = JSON.parse(localStorage.getItem('carts')) || [];

let cartProductsLenght = document.getElementById('cartProductsLenght')
cartProductsLenght.textContent = `${cartProductArr.length}`

////////////////////////////////////////////////////////////////////////////

let savedPrice = localStorage.getItem("productsAllPrice") || 0;
let priceAll = document.getElementById('priceAll');
priceAll.textContent = savedPrice;