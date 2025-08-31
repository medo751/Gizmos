let error = document.getElementById('error')
var signUp = document.getElementById('signUp')
var signIn = document.getElementById('signIn')
var allUsers = JSON.parse(localStorage.getItem('allusers')) || [];

if (!Array.isArray(allUsers)) {
    allUsers = [];
}
console.log(allUsers);

var firstname = lastname = email = Password = '';

// Check if user is already logged in on page load
window.onload = function () {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        signUp.style.display = 'none';
        signIn.style.display = 'none';
        displayUserData(currentUser);
    }
}

document.getElementById('signupOrsignin').onclick = function () {
    signIn.style.display = 'none'
    signUp.style.display = 'flex'
}

document.getElementById('signupOrsignin2').onclick = function () {
    signUp.style.display = 'none'
    signIn.style.display = 'flex'
}

class User {
    constructor(firstname, lastname, email, password) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
    }
}

function displayUserData(user) {
    var userDataDiv = document.getElementById('userData')
    userDataDiv.style.display = 'flex'
    userDataDiv.style.alignItems = 'center'
    userDataDiv.style.justifyContent = 'center'
    userDataDiv.style.flexDirection = 'column'

    document.getElementById('firstNameDisplay').innerText = `${user.firstname} ${user.lastname}`
    document.getElementById('emailDisplay').innerText = user.email
}

function Register() {
    var firstName = document.getElementById('firstName').value
    var lastName = document.getElementById('lastName').value
    var email = document.getElementById('email').value
    var password = document.getElementById('password').value

    var firstNameInp = document.getElementById('firstName')
    var lastNameInp = document.getElementById('lastName')
    var emailInp = document.getElementById('email')
    var passwordInp = document.getElementById('password')


    var validationName = /[.,\/@¬:~]/;
    var validationLast = /[.,\/@¬:~]/;
    var validationEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    function name() {   //...........................FIRST NAME........................//
        if (firstName == '') {
            firstNameInp.style.animation = 'shakeError 2s linear forwards'
            setTimeout(() => {
                firstNameInp.style.animation = ''
            }, 700);
        } else if (!isNaN(+firstName)) {
            firstNameInp.style.animation = 'shakeError 2s linear forwards'
            setTimeout(() => {
                firstNameInp.style.animation = ''
            }, 700);
        } else if (validationName.test(firstName)) {
            firstNameInp.style.animation = 'shakeError 2s linear forwards'
            setTimeout(() => {
                firstNameInp.style.animation = ''
            }, 700);
        } else {
            firstNameInp.style.animation = 'shakeTrue 2s linear forwards'
            setTimeout(() => {
                firstNameInp.style.animation = ''
            }, 2000);
            firstname = firstName
        }
    }
    name()


    function surname() {    //.......................LAST NAME..........................//
        if (lastName == '') {
            lastNameInp.style.animation = 'shakeError 2s linear forwards'
            setTimeout(() => {
                lastNameInp.style.animation = ''
            }, 700);
        } else if (!isNaN(+lastName)) {
            lastNameInp.style.animation = 'shakeError 2s linear forwards'
            setTimeout(() => {
                lastNameInp.style.animation = ''
            }, 700);
        } else if (validationLast.test(lastName)) {
            lastNameInp.style.animation = 'shakeError 2s linear forwards'
            setTimeout(() => {
                lastNameInp.style.animation = ''
            }, 700);
        } else {
            lastNameInp.style.animation = 'shakeTrue 2s linear forwards'
            setTimeout(() => {
                lastNameInp.style.animation = ''
            }, 2000);
            lastname = lastName
        }
    }
    surname()


    function em() {      //.......................EMAIL..........................//
        if (email == '') {
            emailInp.style.animation = 'shakeError 2s linear forwards'
            setTimeout(() => {
                emailInp.style.animation = ''
            }, 700);
        } else if (!isNaN(+email)) {
            emailInp.style.animation = 'shakeError 2s linear forwards'
            setTimeout(() => {
                emailInp.style.animation = ''
            }, 700);
        } else if (!validationEmail.test(email)) {
            emailInp.style.animation = 'shakeError 2s linear forwards'
            setTimeout(() => {
                emailInp.style.animation = ''
            }, 700);
        } else {
            emailInp.style.animation = 'shakeTrue 2s linear forwards'
            setTimeout(() => {
                emailInp.style.animation = ''
            }, 2000);

            this.email = email
        }
    }
    em()

    function pass() {      //.......................PASSWORD..........................//
        if (password == '') {
            passwordInp.style.animation = 'shakeError 2s linear forwards'
            setTimeout(() => {
                passwordInp.style.animation = ''
            }, 700);
        } else if (password.length <= 6) {
            passwordInp.style.animation = 'password1 2s linear forwards'
            setTimeout(() => {
                passwordInp.style.animation = ''
            }, 2000);
        } else if (password.length <= 10) {
            passwordInp.style.animation = 'password2 2s linear forwards'
            setTimeout(() => {
                passwordInp.style.animation = ''
            }, 2000);
        } else {
            passwordInp.style.animation = 'shakeTrue 2s linear forwards'
            setTimeout(() => {
                passwordInp.style.animation = ''
            }, 2000);

            password = password
        }
    }
    pass()

    if (firstName !== '' && lastName !== '' && email !== '' && password !== '') {
        var user = new User(firstName, lastName, email, password);
        allUsers.push(user);
        localStorage.setItem('allusers', JSON.stringify(allUsers))
        localStorage.setItem('currentUser', JSON.stringify(user))

        signUp.style.display = 'none';
        signIn.style.display = 'none';
        displayUserData(user);
    }
}

function login() {
    document.getElementById('userData').style.display = 'none'
    var loginFirstName = document.getElementById('loginfirstName').value
    var password = document.getElementById('loginpassword').value

    var loggedInUser = allUsers.find(user => user.firstname === loginFirstName && user.password === password);
    loggedInUser.loginTime = new Date().toLocaleString();
    console.log(loggedInUser);
    if (loggedInUser) {
        error.innerText = "Thank's for logining";
        console.log(loggedInUser);
        setTimeout(() => {
            buttons.style.display = 'none';
            signIn.style.display = 'none';
            displayUserData(loggedInUser)
            localStorage.setItem('currentUser', JSON.stringify(loggedInUser));
            window.location.reload();
        }, 2000);
    } else {
        error.innerText = 'User is undifined, please try again';
    }
}

window.Register = Register;
window.login = login;

/////////////////////////////////////////////////////////////////////////////////////
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

////////////////////////////////////////////////////////////////

const btn = document.querySelector('.submit');

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

////////////////////////////////////////////////////////////////