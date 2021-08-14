'use strict';
const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

let getRequest = (url) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status !== 200) {
                    reject("failure");
                } else {
                    resolve(xhr.responseText);
                }
            }
        }
        xhr.send();
    });
}


class GoodsItem {
    constructor(id_product, product_name, price, image = "https://picsum.photos/seed/9/200", altImage = "Pictures") {
        this.id_product = id_product;
        this.product_name = product_name;
        this.price = price;
        this.image = image;
        this.altImage = altImage;

    }
    renderedProduct() {
        return `<div class="product-item" data-id="${this.id_product}">
                    <img src="${this.image}" alt="${this.altImage}">
                    <h3>${this.product_name}</h3>
                    <p>Price: ${this.price}</p>
                    <button class="by-btn">Добавить</button>
                </div>`;
    }
}

class GoodsList {
    constructor() {
        this.goods = [];
        this._getProducts();
    }
    _getProducts() {
        return getRequest(`${API}/catalogData.json`)
            .then(response => {
                this.goods = JSON.parse(response);
                this.render();
                const productButtons = document.querySelectorAll('.by-btn');

                productButtons.forEach((button) => {
                    button.addEventListener('click', (event) => {
                        cart.addItem(+event.target.parentNode.dataset.id);
                    });
                })
            })
            .catch((error) => {
                console.log(error)
            });
    }
    render() {
        let listHtml = '';
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.id_product, good.product_name, good.price);
            listHtml += goodItem.renderedProduct();
        });
        document.querySelector('.products').innerHTML = listHtml;
    }
}


class Cart {
    constructor() {
        this.allProducts = [];
        this.items = [];
        this.url = '/getBasket.json';
        this.amount = 0;
        this.countGoods = 0;
        this.getProductsList().then((data) => {
            data.contents.forEach((el => {
                const cartItem = new CartItem(el.id_product, el.product_name, el.price, el.quantity);
                this.items.push(cartItem);
            }))
            this.amount = data.amount;
            this.countGoods = data.countGoods;
            this.render();
        });
        this.getAllProducts().then((data) => {
            data.forEach((el => {
                const cartItem = new GoodsItem(el.id_product, el.product_name, el.price);
                this.allProducts.push(cartItem);
            }))
        });
    }
    getJson(url) {
        return fetch(url ? url : `${API + this.url}`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }
    render() {
        let listHtml = '';
        this.items.forEach(item => {
            listHtml += item.render();
        });
        document.querySelector('.cart_list').innerHTML = listHtml;
        document.querySelectorAll('.del-button').forEach((el) => {
            el.addEventListener('click', (event) => this.deleteItem(event));
        });
    }
    addItem(productId) {
        this.getJson(`${API}/addToBasket.json`).then((json) => {
            if (json.result === 1) {
                let addedProd = this.allProducts.find(product => product.id_product === productId);
                if (this.items.filter(e => e.id_product === productId).length > 0) {
                    this.items.find(cartItem => cartItem.id_product === productId).quantity++;
                } else {
                    let item = new CartItem(productId, addedProd.product_name, addedProd.price, 1);
                    this.items.push(item);
                }
                this.render();
            }
            else alert('No products');
        });
    }
    deleteItem(event) {
        this.getJson(`${API}/deleteFromBasket.json`).then((json) => {
            if (json.result === 1) {
                let itemId = +event.target.dataset.id;
                let deletedItem = this.items.find((cartItem) => cartItem.id_product === itemId);
                if (deletedItem.quantity > 1) deletedItem.quantity--;
                else {
                    this.items.splice(this.items.indexOf(deletedItem), 1);
                    let a = document.querySelector(`.cart_list-product[data-id="${itemId}"]`)
                    a.remove();
                }
                this.render();
            }
            else alert('Erorr');
        });
    }
    getTotalPrice() {

    }
    getAllProducts() {
        return fetch(`${API}/catalogData.json`)
            .then(response => response.json())
            .catch(error => {
                console.log(error);
            });
    }
    getProductsList() {
        return fetch(`${API + this.url}`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            });
    }
}

class CartItem {
    constructor(id_product, name, price, quantity, img = "https://picsum.photos/seed/9/200") {
        this.id_product = id_product;
        this.name = name;
        this.price = price;
        this.img = img;
        this.quantity = quantity;
    }
    render() {
        return `<div class="cart_list-product" data-id="${this.id_product}">
                    <div class="cart_product-left">
                        <div class="cart_list-img">
                            <img src="${this.img}" alt="pic">
                        </div>
                        <div class="cart_list-description">
                            <h2>${this.name}</h2>
                            <p>Количество: <span>${this.quantity}</span></p>
                            <p>${this.price}</p>
                        </div>
                    </div>
                    <div class="cart_product-right">
                        <p class="total_price">${this.getTotalPrice()} rub</p>
                        <button class="del-button" data-id="${this.id_product}">x</button>
                    </div>
                </div>`
    }
    getTotalPrice() {
        return (this.price * this.quantity);
    }
}
const list = new GoodsList();
let cart = new Cart();


const cartButton = document.querySelector('.btn-cart');
const cartList = document.querySelector('.cart_list');

cartButton.addEventListener('click', () => {
    cartList.classList.toggle('hiden')
});