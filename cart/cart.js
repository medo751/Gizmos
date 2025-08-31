var cartProductsSection = document.getElementById('cartProductsSection');
var cartProductArr = JSON.parse(localStorage.getItem('carts')) || [];

if (cartProductArr.length === 0) {
  cartProductsSection.innerHTML = `
    <h1>Your cart is currently empty</h1>
    <button id="toShop">Return to shop <i class="fa-solid fa-angle-right"></i></button>
  `;
} else {
  cartProductsSection.innerHTML = `
    <h1>Cart</h1>
    <table id="cartProducts"></table>
    <div class="resultBox">
      <h2 id="cartTotal">Cart Total - 0</h2>
      <button>Proceed to checkout <svg class="qodef-svg--dropdown-cart" xmlns="http://www.w3.org/2000/svg" width="15" height="21.224" viewBox="0 0 19.65 21.224"> <path d="M1762.1,1077.5a1,1,0,0,0-1,1v5.184a1.18,1.18,0,0,1-1.178,1.177h-9.971a1.18,1.18,0,0,1-1.178-1.177v-8.2a1,1,0,0,0-.551-.894l-3.327-1.662a1,1,0,0,0-1.339.449.987.987,0,0,0-.054.763,1,1,0,0,0,.5.579l2.77,1.384v7.577a3.18,3.18,0,0,0,3.177,3.177h9.971a3.181,3.181,0,0,0,3.178-3.177V1078.5A1,1,0,0,0,1762.1,1077.5Z" transform="translate(-1743.452 -1072.831)"></path> <path d="M1751.156,1088.244a2.906,2.906,0,1,0,2.906,2.9A2.908,2.908,0,0,0,1751.156,1088.244Zm0,3.811a.906.906,0,1,1,.906-.907A.907.907,0,0,1,1751.156,1092.055Z" transform="translate(-1743.452 -1072.831)"></path> <path d="M1759.981,1088.244a2.906,2.906,0,1,0,2.906,2.9A2.908,2.908,0,0,0,1759.981,1088.244Zm0,3.811a.906.906,0,1,1,.906-.907A.907.907,0,0,1,1759.981,1092.055Z" transform="translate(-1743.452 -1072.831)"></path> </svg></button>
    </div>
  `;
}

let toShopBtn = document.getElementById('toShop');
if (toShopBtn) {
  toShopBtn.onclick = () => {
    window.location.href = '../shop/shop.html';
  };
}

function parsePrice(priceStr) {
  if (!priceStr) return 0;
  const cleaned = priceStr.replace(/[^0-9.,-]+/g, '').replace(/,/g, '');
  const num = Number(cleaned);
  return isNaN(num) ? 0 : num;
}

function extractSymbol(priceStr) {
  const m = priceStr && priceStr.match(/^\s*[^\d-.,\s]+/);
  return m ? m[0].trim() : '';
}

function formatPrice(num, symbol) {
  const formatted = Number.isInteger(num) ? num.toLocaleString() : num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return (symbol || '') + formatted;
}

var cartTable = document.querySelector('#cartProducts');
var cartTbody = cartTable.querySelector('tbody');
if (!cartTbody) {
  cartTbody = document.createElement('tbody');
  cartTable.appendChild(cartTbody);
}

cartTbody.innerHTML = '';

function updateCartTotal() {
  let total = 0;
  let symbol = '';
  document.querySelectorAll('.subtotal').forEach(el => {
    total += parseFloat(el.getAttribute('data-subtotal')) || 0;
    if (!symbol) {
      const parentRow = el.closest('tr');
      if (parentRow) {
        const priceDiv = parentRow.querySelector('.unit-price');
        if (priceDiv) symbol = extractSymbol(priceDiv.textContent);
      }
    }
  });
  let productsAllPrice = `$${formatPrice(total, symbol)}`
  localStorage.setItem("productsAllPrice", productsAllPrice);
  document.getElementById('cartTotal').textContent = `Cart Total - ${productsAllPrice}`;
}

cartProductArr.forEach((product, index) => {
  const row = document.createElement('tr');
  row.setAttribute('data-index', index);

  const unitPriceNum = parsePrice(product.price);
  const currency = extractSymbol(product.price);
  const initialSubtotal = unitPriceNum * 1;

  row.innerHTML = `
    <td>
      <button class="hideButton" data-index="${index}"><i class="fa-solid fa-xmark"></i></button>
      <img src="${product.images[0]}" width="80px"> 
      <a href="../details/details.html" class="cart-product-name">${product.name.length > 30 ? product.name.substring(0, 30) + '...' : product.name}</a>
    </td>
    <td class="pricetd">
    <div class="subtotal" data-subtotal="${initialSubtotal}">${formatPrice(initialSubtotal, currency)}</div>
      <div class="qty-wrap">
        <input type="number" class="cart-qty" value="1" min="1" inputmode="numeric">
        <div>
          <button type="button" class="qty-btn plus" aria-label="Increase quantity">+</button>
          <button type="button" class="qty-btn minus" aria-label="Decrease quantity">−</button>
        </div>
      </div>
    </td>
  `;

  cartTbody.appendChild(row);

  const productLink = row.querySelector('a');
  if (productLink) {
    productLink.addEventListener('click', (ev) => {
      ev.preventDefault();

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

  const qtyInput = row.querySelector('.cart-qty');
  const subtotalDiv = row.querySelector('.subtotal');

  const minusBtn = row.querySelector('.qty-btn.minus');
  const plusBtn = row.querySelector('.qty-btn.plus');

  function clampQty(q) {
    q = parseInt(q, 10);
    return (isNaN(q) || q < 1) ? 1 : (q > 90 ? 90 : q);
  }

  function setQty(q) {
    const val = clampQty(q);
    qtyInput.value = String(val);
    // disable minus when 1
    if (minusBtn) minusBtn.disabled = val <= 1;
    recalcSubtotal();
  }

  // clicks
  minusBtn && minusBtn.addEventListener('click', () => {
    setQty((parseInt(qtyInput.value, 10) || 1) - 1);
  });

  plusBtn && plusBtn.addEventListener('click', () => {
    setQty((parseInt(qtyInput.value, 10) || 1) + 1);
  });

  // typing
  qtyInput.addEventListener('input', () => {
    // թողնում ենք միայն թվեր
    qtyInput.value = qtyInput.value.replace(/[^\d]/g, '');
  });
  qtyInput.addEventListener('change', () => setQty(qtyInput.value));

  // initial
  setQty(qtyInput.value);



  function recalcSubtotal() {
    let q = parseInt(qtyInput.value, 10);
    if (isNaN(q) || q < 1) {
      q = 1;
      qtyInput.value = '1';
    }
    const newSubtotal = unitPriceNum * q;
    subtotalDiv.setAttribute('data-subtotal', String(newSubtotal));
    subtotalDiv.textContent = formatPrice(newSubtotal, currency);
    updateCartTotal();
  }

  qtyInput.addEventListener('input', recalcSubtotal);
  qtyInput.addEventListener('change', recalcSubtotal);
});

updateCartTotal();

let blurBackground = document.getElementById('blurBackground');
let hideButtons = document.querySelectorAll('.hideButton');

hideButtons.forEach((button) => {
  button.onclick = () => {
    blurBackground.style.display = 'flex';
    blurBackground.style.animation = 'backgroundOn 0.3s ease forwards';
    blurBackground.setAttribute('data-delete-index', button.dataset.index);
  };
});

let deleteBlurBackground = document.getElementById('deleteBlurBackground');
deleteBlurBackground.onclick = function () {
  let index = blurBackground.getAttribute('data-delete-index');

  if (index !== null) {
    cartProductArr.splice(index, 1);
    localStorage.setItem('carts', JSON.stringify(cartProductArr));
    newMessage('Product removed from cart');

    blurBackground.style.animation = 'backgroundOff 0.3s ease forwards'
    setTimeout(() => {
      blurBackground.style.display = 'none';
      location.reload();
    }, 3300);
  }

  blurBackground.style.animation = 'backgroundOff 0.3s ease forwards'
  setTimeout(() => {
    blurBackground.style.display = 'none';
  }, 500);
};

let cartProductsLenght = document.getElementById('cartProductsLenght')
cartProductsLenght.textContent = `${cartProductArr.length}`


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

document.getElementById('navButton').addEventListener('click', function () {
  document.querySelector('nav').classList.toggle('active');
  document.querySelector('#navButton').classList.toggle('btnactive')
})

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////


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

let cancelBlurBackground = document.getElementById('cancelBlurBackground')
cancelBlurBackground.onclick = () => {
  blurBackground.style.animation = 'backgroundOff 0.3s ease forwards'
  setTimeout(() => {
    blurBackground.style.display = 'none';
  }, 500);
}



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

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let savedPrice = localStorage.getItem("productsAllPrice") || 0;
let priceAll = document.getElementById('priceAll');
priceAll.textContent = savedPrice;