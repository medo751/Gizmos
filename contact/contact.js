const form = document.getElementById("contactForm");
const errorDiv = document.getElementById("errorMessages");

form.addEventListener("submit", function (e) {
  e.preventDefault(); // prevent page refresh

  // Clear old errors
  errorDiv.innerHTML = "";
  errorDiv.style.color = "red";

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  let errors = [];

  // Name validation
  if (!name) {
    errors.push("Name is required.");
  } else if (/\d/.test(name)) {
    errors.push("Name cannot contain numbers.");
  }

  // Email validation
  if (!email) {
    errors.push("Email is required.");
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.push("Invalid email format. Example: user@example.com");
    }
  }

  // Message validation
  if (!message) {
    errors.push("Message is required.");
  }

  // Show errors
  if (errors.length > 0) {
    errors.forEach((err) => {
      const p = document.createElement("p");
      p.textContent = err;
      errorDiv.appendChild(p);
    });
  } else {
    // Success message
    const p = document.createElement("p");
    p.textContent = "Form submitted successfully!";
    p.style.color = "green";
    errorDiv.appendChild(p);

    setTimeout(() => {
      window.location.reload();
    }, 2000);

    // Here you can send the form data with AJAX
  }
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const btn = document.getElementById('submit');

btn.addEventListener('click', (e) => {
  const old = btn.querySelector('.ripple');
  if (old) old.remove();

  const rect = btn.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const span = document.createElement('span');
  span.className = 'ripple';
  span.style.width = span.style.height = size + 'px';

  const x = e.clientX - rect.left - size / 2;
  const y = e.clientY - rect.top - size / 2;
  span.style.left = x + 'px';
  span.style.top = y + 'px';

  btn.appendChild(span);

  span.addEventListener('animationend', () => span.remove());
});


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

////////////////////////////////////////////////////////////////////////////

var cartProductArr = JSON.parse(localStorage.getItem('carts')) || [];

let cartProductsLenght = document.getElementById('cartProductsLenght')
cartProductsLenght.textContent = `${cartProductArr.length}`

////////////////////////////////////////////////////////////////////////////

let savedPrice = localStorage.getItem("productsAllPrice") || 0;
let priceAll = document.getElementById('priceAll');
priceAll.textContent = savedPrice;

////////////////////////////////////////////////////////////////////////////