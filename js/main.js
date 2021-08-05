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
    constructor(product_name, price, image = "https://picsum.photos/seed/9/200", altImage = "Pictures") {
        this.product_name = product_name;
        this.price = price;
        this.image = image;
        this.altImage = altImage;
    }
    renderedProduct() {
        return `<div class="product-item">
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
            })
            .catch((error) => {
                console.log(error)
            });
    }
    render() {
        let listHtml = '';
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.product_name, good.price);
            listHtml += goodItem.renderedProduct();
        });
        document.querySelector('.products').innerHTML = listHtml;
    }
}

const list = new GoodsList();


// getJson(url){
//     return fetch(url ? url : `${API + this.url}`)
//       .then(result => result.json())
//       .catch(error => {
//         console.log(error);
//       })
//   }



class Cart {
    constructor() {
        this.items = [];
        this.url = '/getBasket.json';
        this.getProductsList()
    }
    render() {

    }
    addItem() {

    }
    deleteItem() {

    }
    getTotalPrice() {

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
    constructor(name, price, img = "https://picsum.photos/seed/9/200") {
        this.name = name;
        this.price = price;
        this.img = img;
    }
    render() {

    }
}
