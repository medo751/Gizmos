var likeProductsSection = document.getElementById('likeProductsSection');
var likesProductArr = JSON.parse(localStorage.getItem('likes')) || [];

if (likesProductArr.length === 0) {
  likeProductsSection.innerHTML = `<p>No products added to the wishlist</p>`
} else {
  likeProductsSection.innerHTML = `
    <h1 class="likedProductsName">My Wishlist</h1>
    <div id="likedProducts"></div>`
}

// assume likeProductsSection already rendered above as you had

var likedProducts = document.getElementById('likedProducts');
likedProducts.innerHTML = ''; // clear if needed

// Use forEach so closure captures "product" cleanly
likesProductArr.forEach((product, index) => {
  const likeProduct = document.createElement('div');
  likeProduct.classList.add('likeProduct');
  likeProduct.setAttribute('data-index', index);

  // use class "add-to-cart" instead of duplicate id
  likeProduct.innerHTML = `
        <button class="hideButton" data-index="${index}"><i class="fa-solid fa-xmark"></i></button>
        <img src="${product.images[0]}" loading="lazy"></img>
        <a href="../details/details.html">${product.name.length > 30 ? product.name.substring(0, 30) + '...' : product.name}</a>
        <div class="productPrice">
            <h2>${product.price}</h2>
            <span>${product.oldPrice ? product.oldPrice : ''}</span>
        </div>
        <h2 class="inStock">In stock</h2>
        <button class="button add-to-cart" data-product-id="${product.id}">
            <span class="button-content">ADD TO <svg class="qodef-svg--dropdown-cart" xmlns="http://www.w3.org/2000/svg" width="15" height="21.224" viewBox="0 0 19.65 21.224"> <path d="M1762.1,1077.5a1,1,0,0,0-1,1v5.184a1.18,1.18,0,0,1-1.178,1.177h-9.971a1.18,1.18,0,0,1-1.178-1.177v-8.2a1,1,0,0,0-.551-.894l-3.327-1.662a1,1,0,0,0-1.339.449.987.987,0,0,0-.054.763,1,1,0,0,0,.5.579l2.77,1.384v7.577a3.18,3.18,0,0,0,3.177,3.177h9.971a3.181,3.181,0,0,0,3.178-3.177V1078.5A1,1,0,0,0,1762.1,1077.5Z" transform="translate(-1743.452 -1072.831)"></path> <path d="M1751.156,1088.244a2.906,2.906,0,1,0,2.906,2.9A2.908,2.908,0,0,0,1751.156,1088.244Zm0,3.811a.906.906,0,1,1,.906-.907A.907.907,0,0,1,1751.156,1092.055Z" transform="translate(-1743.452 -1072.831)"></path> <path d="M1759.981,1088.244a2.906,2.906,0,1,0,2.906,2.9A2.908,2.908,0,0,0,1759.981,1088.244Zm0,3.811a.906.906,0,1,1,.906-.907A.907.907,0,0,1,1759.981,1092.055Z" transform="translate(-1743.452 -1072.831)"></path> </svg></span>
        </button>
    `;

  likedProducts.append(likeProduct);

  const productLink = likeProduct.querySelector('a');
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

  // --- Cart logic per liked item ---
  const addBtn = likeProduct.querySelector('.add-to-cart');

  function updateAddBtnState() {
    const carts = JSON.parse(localStorage.getItem('carts')) || [];
    const already = carts.some(item => item.id === product.id);
    addBtn.style.display = already ? 'none' : 'inline-flex'; // hide if already in cart
  }

  updateAddBtnState();

  addBtn.addEventListener('click', () => {
    const carts = JSON.parse(localStorage.getItem('carts')) || [];
    const already = carts.some(item => item.id === product.id);

    if (!already) {
      carts.push(product);
      localStorage.setItem('carts', JSON.stringify(carts));
      newMessage('Product added to cart');
      addBtn.style.display = 'none';
    } else {
      // Optional: remove from cart if you want toggle behaviour
      // const filtered = carts.filter(item => item.id !== product.id);
      // localStorage.setItem('carts', JSON.stringify(filtered));
      // newMessage('Product removed from cart');
      // updateAddBtnState();
    }
  });
});


let blurBackground = document.getElementById('blurBackground');
let hideButtons = document.querySelectorAll('.hideButton');

hideButtons.forEach((button) => {
  button.onclick = () => {
    blurBackground.style.display = 'flex';
    blurBackground.style.animation = 'backgroundOn 0.3s ease forwards';

    // Сохраняем индекс удаляемого элемента
    blurBackground.setAttribute('data-delete-index', button.dataset.index);
  };
});

let deleteBlurBackground = document.getElementById('deleteBlurBackground');
deleteBlurBackground.onclick = function () {
  let index = blurBackground.getAttribute('data-delete-index');

  if (index !== null) {
    likesProductArr.splice(index, 1);
    localStorage.setItem('likes', JSON.stringify(likesProductArr));
    newMessage('Product removed from wishlist');

    blurBackground.style.animation = 'backgroundOff 0.3s ease forwards'
    setTimeout(() => {
      blurBackground.style.display = 'none';
      location.reload();
      newMessage('Product removed from wishlist');
    }, 3300);

  }

  blurBackground.style.animation = 'backgroundOff 0.3s ease forwards'
  setTimeout(() => {
    blurBackground.style.display = 'none';
  }, 500);
};

console.log(likesProductArr.map(p => p.style));

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
/////////////////////////////////////////////////////////////////

document.getElementById('navButton').addEventListener('click', function () {
  document.querySelector('nav').classList.toggle('active');
  document.querySelector('#navButton').classList.toggle('btnactive')
})

////////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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