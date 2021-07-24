'use strict';

class GoodsItem {
    constructor(title, price, image = "https://picsum.photos/seed/9/200", altImage = "Pictures") {
        this.title = title;
        this.price = price;
        this.image = image;
        this.altImage = altImage;
    }
    rendredProduct() {
        return `<div class="product-item">
                    <img src="${this.image}" alt="${this.altImage}">
                    <h3>${this.title}</h3>
                    <p>Price: ${this.price}</p>
                    <button class="by-btn">Добавить</button>
                </div>`;
    }
}

class GoodsList {
    constructor() {
        this.goods = [];
    }
    fetchGoods() {
        this.goods = [
            { title: 'Shirt', price: 150 },
            { title: 'Socks', price: 50 },
            { title: 'Jacket', price: 350 },
            { title: 'Shoes', price: 250 },
        ];
    }
    render() {
        let listHtml = '';
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.title, good.price);
            listHtml += goodItem.rendredProduct();
        });
        document.querySelector('.products').innerHTML = listHtml;
    }
    // Lesson 2.2(Добавьте для GoodsList метод, определяющий суммарную стоимость всех товаров.)
    getTotalPrice() {
        let totalPrice = 0;
        this.goods.forEach(good => {
            totalPrice += good.price;
        });
        console.log(totalPrice);
    }
}

const list = new GoodsList();
list.fetchGoods();
list.render();
list.getTotalPrice();

class Cart {
    constructor() {
        this.items = [];
    }
    render() {

    }
    addItem() {

    }
    deleteItem() {

    }
    getTotalPrice() {

    }
}
class CartItem {
    constructor(name, price, img = "https://picsum.photos/seed/9/200") {
        this.name = name;
        this.price = price;
        this.img = img;
    }
    render() {

    }
}
