"use strict";
const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        catalogUrl: '/catalogData.json',
        bascketUrl: '/getBasket.json',
        products: [],
        imgCatalog: 'https://via.placeholder.com/200x150',
        imgCart: 'https://via.placeholder.com/50x100',
        searchLine: '',
        filtered: [],
        isVisibleCart: false,
        cartItems: []
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })
        },
        addProduct(product) {
            console.log(product);
        },
        filterGoods() {
            // this.filtered = this.products.filter(item => {
            //     item.product_name.includes(this.searchLine);
            // });
            let regexp = new RegExp(this.searchLine, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        },
        addItem(product) {
            this.getJson(`${API}/addToBasket.json`).then((json) => {
                if (json.result === 1) {
                    if (this.cartItems.filter(e => e.id_product === product.id_product).length > 0) {
                        this.cartItems.find(cartItem => cartItem.id_product === product.id_product).quantity++;
                    } else {
                        let item = Object.assign({ quantity: 1 }, product);
                        this.cartItems.push(item);
                    }
                }
                else alert('No products in stock');
            });
        },
        deleteItem(item) {
            this.getJson(`${API}/deleteFromBasket.json`).then((json) => {
                if (json.result === 1) {
                    if (item.quantity > 1) item.quantity--;
                    else {
                        this.cartItems.splice(this.cartItems.indexOf(item), 1);
                    }
                }
                else alert('Erorr');
            });
        }
    },
    created() {
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                this.products = data;
                this.filtered = data;
            });
        this.getJson(`${API + this.bascketUrl}`)
            .then(data => {
                this.cartItems = data.contents;
            });
    },
});
