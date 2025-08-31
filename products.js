function newMessage(description, linkto) {
    if (window.innerWidth > 768) {
        let closeMessage = document.createElement('div');
        closeMessage.innerHTML = '<i class="fa-solid fa-xmark"></i>';
        closeMessage.classList.add('close-btn');

        let message = document.createElement('div');
        message.classList.add('message');

        let text = document.createElement('span');
        text.innerHTML = description;

        let link = document.createElement('a');
        link.textContent = 'View More';
        link.href = linkto;
        link.classList.add('messageLink');

        message.append(closeMessage, text, link);
        document.body.append(message);

        message.style.display = 'flex';
        message.style.animation = 'messageOn 0.5s ease forwards';

        setTimeout(() => {
            message.style.animation = 'messageOff 0.5s ease forwards';
            setTimeout(() => message.remove(), 500);
        }, 2000);

        closeMessage.onclick = () => {
            message.style.animation = 'messageOff 0.5s ease forwards';
            setTimeout(() => message.remove(), 500);
        };
    }
}


class Product {
    constructor(id, name, price, oldPrice, description, sku, category, tags, [...images], style) {
        this.id = id,
            this.name = name,
            this.price = price,
            this.description = description,
            this.sku = sku,
            this.category = category,
            this.tags = tags,
            this.images = images,
            this.style = style,
            this.oldPrice = oldPrice
    }
}

var FeaturedProducts = [
    new Product('1', '4K Smart Monitor Vantablack Expo GPS-8377366J',
        '$1,150', '', 'Lorem ipsum odor amet, consectetuer adipiscing elit. Ac varius cubilia pretium eleifend cubilia fringilla. Pharetra nec blandit magnis dolor mauris feugiat. Pretium odio fringilla cubilia turpis eros ridiculus mauris.',
        '11', 'Computers', 'Computers, Equipment',
        ['https://gizmos.qodeinteractive.com/wp-content/uploads/2022/08/shop-img-11.jpg', 'https://gizmos.qodeinteractive.com/wp-content/uploads/2022/08/shop-img-11-4.jpg', 'https://gizmos.qodeinteractive.com/wp-content/uploads/2022/08/shop-img-11-1.jpg', 'https://gizmos.qodeinteractive.com/wp-content/uploads/2022/08/shop-img-11-2.jpg', 'https://gizmos.qodeinteractive.com/wp-content/uploads/2022/08/shop-img-11-3.jpg'],
        '--isnew:true'),

    new Product('2', 'SX-2357 Closed-Back Wireless Headphones',
        '$630', '', 'Lorem ipsum odor amet, consectetuer adipiscing elit. Ac varius cubilia pretium eleifend cubilia fringilla. Pharetra nec blandit magnis dolor mauris feugiat. Pretium odio fringilla cubilia turpis eros ridiculus mauris.',
        '06', 'Audio', 'USB, Wireless',
        ['https://gizmos.qodeinteractive.com/wp-content/uploads/2022/08/shop-img-10.jpg', 'https://gizmos.qodeinteractive.com/wp-content/uploads/2022/08/shop-img-10-2.jpg', 'https://gizmos.qodeinteractive.com/wp-content/uploads/2022/08/shop-img-10-3.jpg', 'https://gizmos.qodeinteractive.com/wp-content/uploads/2022/08/shop-img-10-1.jpg', 'https://gizmos.qodeinteractive.com/wp-content/uploads/2022/08/shop-img-10-4.jpg'],
        ''),

    new Product('3', 'BX-2357 Closed-Back Wireless Headphones',
        '$700', '', 'Lorem ipsum odor amet, consectetuer adipiscing elit. Ac varius cubilia pretium eleifend cubilia fringilla. Pharetra nec blandit magnis dolor mauris feugiat. Pretium odio fringilla cubilia turpis eros ridiculus mauris.',
        '09', 'Audio', 'USB, Wireless',
        ['https://gizmos.qodeinteractive.com/wp-content/uploads/2022/08/shop-img-9.jpg', 'https://gizmos.qodeinteractive.com/wp-content/uploads/2022/08/shop-img-9-4.jpg', 'https://gizmos.qodeinteractive.com/wp-content/uploads/2022/08/shop-img-9-1.jpg', 'https://gizmos.qodeinteractive.com/wp-content/uploads/2022/08/shop-img-9-2.jpg', 'https://gizmos.qodeinteractive.com/wp-content/uploads/2022/08/shop-img-9-3.jpg'],
        ''),


    new Product('4', 'Fixed-Wing Hybrid VTOL Surveillance Drone',
        `$1,100`, `$1,450`, 'Lorem ipsum odor amet, consectetuer adipiscing elit. Ac varius cubilia pretium eleifend cubilia fringilla. Pharetra nec blandit magnis dolor mauris feugiat. Pretium odio fringilla cubilia turpis eros ridiculus mauris.',
        '08', 'Digital Tech', 'USB, Wireless',
        ['https://gizmos.qodeinteractive.com/wp-content/uploads/2022/08/shop-img-8.jpg', 'https://gizmos.qodeinteractive.com/wp-content/uploads/2022/08/shop-img-8-4.jpg', 'https://gizmos.qodeinteractive.com/wp-content/uploads/2022/08/shop-img-8-1.jpg', 'https://gizmos.qodeinteractive.com/wp-content/uploads/2022/08/shop-img-8-2.jpg', 'https://gizmos.qodeinteractive.com/wp-content/uploads/2022/08/shop-img-8-3.jpg'],
        ''),

    new Product('5', 'Business Inkjet All In One Printer 752-DLLW-888',
        `$750`, ``, 'Lorem ipsum odor amet, consectetuer adipiscing elit. Ac varius cubilia pretium eleifend cubilia fringilla. Pharetra nec blandit magnis dolor mauris feugiat. Pretium odio fringilla cubilia turpis eros ridiculus mauris.',
        '07', 'Printers', 'Computers, Equipment',
        ['https://gizmos.qodeinteractive.com/wp-content/uploads/2022/08/shop-img-7.jpg', 'https://gizmos.qodeinteractive.com/wp-content/uploads/2022/08/shop-img-7-1.jpg', 'https://gizmos.qodeinteractive.com/wp-content/uploads/2022/08/shop-img-7-2.jpg', 'https://gizmos.qodeinteractive.com/wp-content/uploads/2022/08/shop-img-7-4.jpg', 'https://gizmos.qodeinteractive.com/wp-content/uploads/2022/08/shop-img-7-3.jpg'],
        ''),

    new Product('6', 'Led 4K Smart TV Vantablack Expo GSM-8547366J',
        `$990`, ``, 'Lorem ipsum odor amet, consectetuer adipiscing elit. Ac varius cubilia pretium eleifend cubilia fringilla. Pharetra nec blandit magnis dolor mauris feugiat. Pretium odio fringilla cubilia turpis eros ridiculus mauris.',
        '06', 'Computers', 'USB, Wireless',
        ['https://gizmos.qodeinteractive.com/wp-content/uploads/2022/08/shop-img-6.jpg', 'https://gizmos.qodeinteractive.com/wp-content/uploads/2022/08/shop-img-6-1.jpg', 'https://gizmos.qodeinteractive.com/wp-content/uploads/2022/08/shop-img-6-3.jpg', 'https://gizmos.qodeinteractive.com/wp-content/uploads/2022/08/shop-img-6-4.jpg', 'https://gizmos.qodeinteractive.com/wp-content/uploads/2022/08/shop-img-6-2.jpg'],
        ''),

    new Product('7', 'Electric Scooter B&W TP58921XM Prisma XX Series',
        `$450`, ``, 'Lorem ipsum odor amet, consectetuer adipiscing elit. Ac varius cubilia pretium eleifend cubilia fringilla. Pharetra nec blandit magnis dolor mauris feugiat. Pretium odio fringilla cubilia turpis eros ridiculus mauris.',
        '02', 'Electronics', 'USB, Wireless',
        ['https://gizmos.qodeinteractive.com/wp-content/uploads/2022/08/shop-img-2.jpg', 'https://gizmos.qodeinteractive.com/wp-content/uploads/2022/08/shop-img-2-1.jpg', 'https://gizmos.qodeinteractive.com/wp-content/uploads/2022/08/shop-img-2-3.jpg', 'https://gizmos.qodeinteractive.com/wp-content/uploads/2022/08/shop-img-2-2.jpg', 'https://gizmos.qodeinteractive.com/wp-content/uploads/2022/08/shop-img-2-4.jpg'],
        ''),

    new Product('8', 'Optical Mouse Pro XS-85477PGT Carbon Black',
        `$120`, `$170`, 'Lorem ipsum odor amet, consectetuer adipiscing elit. Ac varius cubilia pretium eleifend cubilia fringilla. Pharetra nec blandit magnis dolor mauris feugiat. Pretium odio fringilla cubilia turpis eros ridiculus mauris.',
        '01', 'Other', 'Computers, Equipment',
        ['https://gizmos.qodeinteractive.com/wp-content/uploads/2022/08/shop-img-1.jpg', 'https://gizmos.qodeinteractive.com/wp-content/uploads/2022/08/shop-img-1-4.jpg', 'https://gizmos.qodeinteractive.com/wp-content/uploads/2022/08/shop-img-1-4.jpg', 'https://gizmos.qodeinteractive.com/wp-content/uploads/2022/08/shop-img-1-2.jpg', 'https://gizmos.qodeinteractive.com/wp-content/uploads/2022/08/shop-img-1-3.jpg'],
        ''),
]
var FeaturedProducts2 = [
    new Product('9', 'Robot Vacuum Cleaner Samba W',
        '$890', '', 'Lorem ipsum odor amet, consectetuer adipiscing elit. Ac varius cubilia pretium eleifend cubilia fringilla. Pharetra nec blandit magnis dolor mauris feugiat. Pretium odio fringilla cubilia turpis eros ridiculus mauris.',
        '12', 'Robotic', '',
        ['https://gizmos.qodeinteractive.com/wp-content/uploads/2022/09/shop-img-12.jpg', 'https://gizmos.qodeinteractive.com/wp-content/uploads/2022/09/shop-img-12-1.jpg', 'https://gizmos.qodeinteractive.com/wp-content/uploads/2022/09/shop-img-12-2.jpg', 'https://gizmos.qodeinteractive.com/wp-content/uploads/2022/09/shop-img-12-3.jpg', 'https://gizmos.qodeinteractive.com/wp-content/uploads/2022/09/shop-img-12-3.jpg'],
        '--isnew:true'),

    new Product('10', 'Air Purifier Mika Clean Pro-559',
        '$1,390', '', 'Lorem ipsum odor amet, consectetuer adipiscing elit. Ac varius cubilia pretium eleifend cubilia fringilla. Pharetra nec blandit magnis dolor mauris feugiat. Pretium odio fringilla cubilia turpis eros ridiculus mauris.',
        '13', 'Other', '',
        ['https://gizmos.qodeinteractive.com/wp-content/uploads/2022/09/shop-img-13.jpg', 'https://gizmos.qodeinteractive.com/wp-content/uploads/2022/09/shop-img-13-1.jpg', 'https://gizmos.qodeinteractive.com/wp-content/uploads/2022/09/shop-img-13-2.jpg', 'https://gizmos.qodeinteractive.com/wp-content/uploads/2022/09/shop-img-13-3.jpg', 'https://gizmos.qodeinteractive.com/wp-content/uploads/2022/09/shop-img-13-4.jpg'],
        ''),

    new Product('11', 'Universal Black Smartphone Case',
        '$80', '', 'Lorem ipsum odor amet, consectetuer adipiscing elit. Ac varius cubilia pretium eleifend cubilia fringilla. Pharetra nec blandit magnis dolor mauris feugiat. Pretium odio fringilla cubilia turpis eros ridiculus mauris.',
        '15', 'Smartphones', '',
        ['https://gizmos.qodeinteractive.com/wp-content/uploads/2022/09/shop-img-14.jpg', 'https://gizmos.qodeinteractive.com/wp-content/uploads/2022/09/shop-img-14-4.jpg', 'https://gizmos.qodeinteractive.com/wp-content/uploads/2022/09/shop-img-14-1.jpg', 'https://gizmos.qodeinteractive.com/wp-content/uploads/2022/09/shop-img-14-2.jpg', 'https://gizmos.qodeinteractive.com/wp-content/uploads/2022/09/shop-img-14-3.jpg'],
        ''),


    new Product('12', 'Bluetooth Speaker GS-99 Silver',
        `$290`, `$1,450`, 'Lorem ipsum odor amet, consectetuer adipiscing elit. Ac varius cubilia pretium eleifend cubilia fringilla. Pharetra nec blandit magnis dolor mauris feugiat. Pretium odio fringilla cubilia turpis eros ridiculus mauris.',
        '16', 'Bluetooth', '',
        ['https://gizmos.qodeinteractive.com/wp-content/uploads/2022/09/shop-img-15.jpg', 'https://gizmos.qodeinteractive.com/wp-content/uploads/2022/09/shop-img-15-4.jpg', 'https://gizmos.qodeinteractive.com/wp-content/uploads/2022/09/shop-img-15-1.jpg', 'https://gizmos.qodeinteractive.com/wp-content/uploads/2022/09/shop-img-15-2.jpg', 'https://gizmos.qodeinteractive.com/wp-content/uploads/2022/09/shop-img-15-3.jpg'],
        ''),

    new Product('13', 'Profeus Drawing Tablet S Series QW-55815 Professional',
        `$930`, `$1,090`, 'Lorem ipsum odor amet, consectetuer adipiscing elit. Ac varius cubilia pretium eleifend cubilia fringilla. Pharetra nec blandit magnis dolor mauris feugiat. Pretium odio fringilla cubilia turpis eros ridiculus mauris.',
        '14', 'Tablet', '',
        ['https://gizmos.qodeinteractive.com/wp-content/uploads/2022/08/shop-img-4.jpg', 'https://gizmos.qodeinteractive.com/wp-content/uploads/2022/08/shop-img-4-4.jpg', 'https://gizmos.qodeinteractive.com/wp-content/uploads/2022/08/shop-img-4-3.jpg', 'https://gizmos.qodeinteractive.com/wp-content/uploads/2022/08/shop-img-4-1.jpg', 'https://gizmos.qodeinteractive.com/wp-content/uploads/2022/08/shop-img-4-2.jpg'],
        ''),

    new Product('14', 'High Definition Webcam SX-555',
        `$140`, ``, 'Lorem ipsum odor amet, consectetuer adipiscing elit. Ac varius cubilia pretium eleifend cubilia fringilla. Pharetra nec blandit magnis dolor mauris feugiat. Pretium odio fringilla cubilia turpis eros ridiculus mauris.',
        '19', 'Camera', '',
        ['https://gizmos.qodeinteractive.com/wp-content/uploads/2022/09/shop-img-18.jpg', 'https://gizmos.qodeinteractive.com/wp-content/uploads/2022/09/shop-img-18-1.jpg', 'https://gizmos.qodeinteractive.com/wp-content/uploads/2022/09/shop-img-18-2.jpg', 'https://gizmos.qodeinteractive.com/wp-content/uploads/2022/09/shop-img-18-4.jpg', 'https://gizmos.qodeinteractive.com/wp-content/uploads/2022/09/shop-img-18-3.jpg'],
        ''),

    new Product('15', 'Waterproof Smart Watch Black',
        `$230`, ``, 'Lorem ipsum odor amet, consectetuer adipiscing elit. Ac varius cubilia pretium eleifend cubilia fringilla. Pharetra nec blandit magnis dolor mauris feugiat. Pretium odio fringilla cubilia turpis eros ridiculus mauris.',
        '18', 'Watch', '',
        ['https://gizmos.qodeinteractive.com/wp-content/uploads/2022/09/shop-img-17.jpg', 'https://gizmos.qodeinteractive.com/wp-content/uploads/2022/09/shop-img-17-1.jpg', 'https://gizmos.qodeinteractive.com/wp-content/uploads/2022/09/shop-img-17-2.jpg', 'https://gizmos.qodeinteractive.com/wp-content/uploads/2022/09/shop-img-17-4.jpg', 'https://gizmos.qodeinteractive.com/wp-content/uploads/2022/09/shop-img-17-3.jpg'],
        ''),

    new Product('16', 'Led 4K Smart TV Expo GSX White',
        `$1,590`, ``, 'Lorem ipsum odor amet, consectetuer adipiscing elit. Ac varius cubilia pretium eleifend cubilia fringilla. Pharetra nec blandit magnis dolor mauris feugiat. Pretium odio fringilla cubilia turpis eros ridiculus mauris.',
        '20', 'Computer', '',
        ['https://gizmos.qodeinteractive.com/wp-content/uploads/2022/09/shop-img-19.jpg', 'https://gizmos.qodeinteractive.com/wp-content/uploads/2022/08/shop-img-6-3.jpg', 'https://gizmos.qodeinteractive.com/wp-content/uploads/2022/08/shop-img-6-1.jpg', 'https://gizmos.qodeinteractive.com/wp-content/uploads/2022/08/shop-img-6.jpg', 'https://gizmos.qodeinteractive.com/wp-content/uploads/2022/08/shop-img-6-4.jpg'],
        '')
]


var FeaturedProducts_box = document.querySelector('.FeaturedProducts_box')
FeaturedProducts.map((product) => {
    const Product = document.createElement('div');
    Product.classList.add('Product');
    Product.setAttribute('style', product.style);

    Product.innerHTML = `
        <button id="shoppingButton"><svg class="qodef-svg--dropdown-cart" xmlns="http://www.w3.org/2000/svg" width="16.665" height="18" viewBox="0 0 16.665 18"><path d="M15.816 3.962a.85.85 0 0 0-.848.848v4.4a1 1 0 0 1-1 1H5.511a1 1 0 0 1-1-1V2.26a.848.848 0 0 0-.468-.759L1.222.092A.854.854 0 0 0 .085.473a.85.85 0 0 0 .381 1.138l2.349 1.174V9.21a2.7 2.7 0 0 0 2.694 2.7h8.461a2.7 2.7 0 0 0 2.7-2.7v-4.4a.85.85 0 0 0-.854-.848Z"></path><path d="M6.534 13.073a2.464 2.464 0 1 0 2.464 2.463 2.465 2.465 0 0 0-2.464-2.463Zm0 3.231a.768.768 0 1 1 .768-.768.769.769 0 0 1-.768.768Z"></path><path d="M14.018 13.073a2.464 2.464 0 1 0 2.464 2.463 2.465 2.465 0 0 0-2.464-2.463Zm0 3.231a.768.768 0 1 1 .768-.768.768.768 0 0 1-.768.768Z"></path></svg></button>
        <div class="productTop">
            <span>${product.category}</span>
            <button class="like" data-product-id="${product.id}">
                <i class="fa-regular fa-heart"></i>
            </button>
        </div>
        <div class="swiper mySwiper2">
            <div class="swiper-wrapper"></div>
        </div>
        <div class="productBottom">
            <a href="./details/details.html">${product.name.length > 30 ? product.name.substring(0, 30) + '...' : product.name}</a>
            <div class="productPrice">
                <h2>${product.price}</h2>
                <span>${product.oldPrice ? product.oldPrice : ''}</span>
            </div>
        </div>
    `;

    const productLink = Product.querySelector('.productBottom a');
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

    FeaturedProducts_box.append(Product);

    product.images.map((image) => {
        var galleryimgslide = document.createElement('div');
        galleryimgslide.classList.add('swiper-slide');
        galleryimgslide.innerHTML = `<img src="${image}" loading="lazy"/>`;
        Product.querySelector('.swiper-wrapper').append(galleryimgslide);
    });

    //////////////////////////////////////////////////////////////////////////////////////


    let likeButton = Product.querySelector('.like');
    let productId = product.id;
    let likes = JSON.parse(localStorage.getItem('likes')) || [];
    let isLiked = likes.some(item => item.id === productId);
    likeButton.style.color = isLiked ? 'red' : 'black';


    likeButton.onclick = () => {
        let likes = JSON.parse(localStorage.getItem('likes')) || [];

        if (isLiked) {
            likes = likes.filter(item => item.id !== productId);
        } else {
            likes.push(product);
            newMessage(`Product added to likes <i class="fa-regular fa-heart"></i>`, './like/like.html')
        }
        localStorage.setItem('likes', JSON.stringify(likes));


        likeButton.style.color = isLiked ? 'black' : 'red';
        isLiked = !isLiked;
    };

    ////////////////////////////////////////////////////////////////////////////////////////

    let cartButton = Product.querySelector('#shoppingButton');

    function updateCartState() {
        let carts = JSON.parse(localStorage.getItem('carts')) || [];
        let isAddedCart = carts.some(item => item.id === productId);
        cartButton.style.display = isAddedCart ? 'none' : 'block';
    }

    updateCartState();

    cartButton.onclick = () => {
        let carts = JSON.parse(localStorage.getItem('carts')) || [];
        let isAddedCart = carts.some(item => item.id === productId);

        if (isAddedCart) {
            carts = carts.filter(item => item.id !== productId);
        } else {
            carts.push(product);
            cartButton.style.animation = 'cartOn 0.5s ease forwards';
            newMessage('Product added to cart', './cart/cart.html');
        }

        localStorage.setItem('carts', JSON.stringify(carts));
        updateCartState();
    };
});

var FeaturedProducts_box2 = document.querySelector('.FeaturedProducts_box2')
FeaturedProducts2.map((product) => {
    const Product = document.createElement('div');
    Product.classList.add('Product');
    Product.setAttribute('style', product.style);

    Product.innerHTML = `
        <button id="shoppingButton"><svg class="qodef-svg--dropdown-cart" xmlns="http://www.w3.org/2000/svg" width="16.665" height="18" viewBox="0 0 16.665 18"><path d="M15.816 3.962a.85.85 0 0 0-.848.848v4.4a1 1 0 0 1-1 1H5.511a1 1 0 0 1-1-1V2.26a.848.848 0 0 0-.468-.759L1.222.092A.854.854 0 0 0 .085.473a.85.85 0 0 0 .381 1.138l2.349 1.174V9.21a2.7 2.7 0 0 0 2.694 2.7h8.461a2.7 2.7 0 0 0 2.7-2.7v-4.4a.85.85 0 0 0-.854-.848Z"></path><path d="M6.534 13.073a2.464 2.464 0 1 0 2.464 2.463 2.465 2.465 0 0 0-2.464-2.463Zm0 3.231a.768.768 0 1 1 .768-.768.769.769 0 0 1-.768.768Z"></path><path d="M14.018 13.073a2.464 2.464 0 1 0 2.464 2.463 2.465 2.465 0 0 0-2.464-2.463Zm0 3.231a.768.768 0 1 1 .768-.768.768.768 0 0 1-.768.768Z"></path></svg></button>
        <div class="productTop">
            <span>${product.category}</span>
            <button class="like" data-product-id="${product.id}">
                <i class="fa-regular fa-heart"></i>
            </button>
        </div>
        <div class="swiper mySwiper2">
            <div class="swiper-wrapper"></div>
        </div>
        <div class="productBottom">
            <a href="./details/details.html">${product.name.length > 30 ? product.name.substring(0, 30) + '...' : product.name}</a>
            <div class="productPrice">
                <h2>${product.price}</h2>
                <span>${product.oldPrice ? product.oldPrice : ''}</span>
            </div>
        </div>
    `;

    FeaturedProducts_box2.append(Product);

    product.images.map((image) => {
        var galleryimgslide = document.createElement('div');
        galleryimgslide.classList.add('swiper-slide');
        galleryimgslide.innerHTML = `<img src="${image}" loading="lazy"/>`;
        Product.querySelector('.swiper-wrapper').append(galleryimgslide);
    });

    ////////////////////////////////////////////////////////////

    let likeButton = Product.querySelector('.like');
    let productId = product.id;
    let likes = JSON.parse(localStorage.getItem('likes')) || [];
    let isLiked = likes.some(item => item.id === productId);
    likeButton.style.color = isLiked ? 'red' : 'black';


    likeButton.onclick = () => {
        let likes = JSON.parse(localStorage.getItem('likes')) || [];

        if (isLiked) {
            likes = likes.filter(item => item.id !== productId);
        } else {
            likes.push(product);
            newMessage(`Product added to likes <i class="fa-regular fa-heart"></i>`, './like/like.html')
        }
        localStorage.setItem('likes', JSON.stringify(likes));


        likeButton.style.color = isLiked ? 'black' : 'red';
        isLiked = !isLiked;
    };

    let cartButton = Product.querySelector('#shoppingButton');

    function updateCartState() {
        let carts = JSON.parse(localStorage.getItem('carts')) || [];
        let isAddedCart = carts.some(item => item.id === productId);
        cartButton.style.display = isAddedCart ? 'none' : 'block';
    }

    updateCartState();

    cartButton.onclick = () => {
        let carts = JSON.parse(localStorage.getItem('carts')) || [];
        let isAddedCart = carts.some(item => item.id === productId);

        if (isAddedCart) {
            carts = carts.filter(item => item.id !== productId);
        } else {
            carts.push(product);
            cartButton.style.animation = 'cartOn 0.5s ease forwards';
            newMessage('Product added to cart', './cart/cart.html');
        }

        localStorage.setItem('carts', JSON.stringify(carts));
        updateCartState();
    };
});

////////////////////////////////////////////////////////////////////////////////////////// 