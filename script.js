window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

/////////////////////////////////////

var shopBtn = document.querySelectorAll('.shopBtn')
console.log(shopBtn);


shopBtn.forEach((e) => {
  e.onmouseover = () => {
    e.innerHTML = 'SHOP NOW <i class="fa-solid fa-plus"></i>'
  }
  e.onmouseout = () => {
    e.innerHTML = 'SHOP NOW <i class="fa-solid fa-angle-right"></i>'
  }
})

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