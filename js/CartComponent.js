"use strict";
Vue.component('cart', {
    data() {
        return {
            cartItems: [],
            isVisibleCart: false,
            imgCart: 'https://via.placeholder.com/50x100',
            bascketUrl: '/getBasket.json',
        }
    },
    methods: {
        addItem(product) {
            this.$parent.getJson(`${API}/addToBasket.json`).then((json) => {
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
            this.$parent.getJson(`${API}/deleteFromBasket.json`).then((json) => {
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
    mounted() {
        this.$parent.getJson(`${API + this.bascketUrl}`)
            .then(data => {
                this.cartItems = data.contents;
            });
    },
    template: `
    <div>
        <button class="btn-cart" type="button" @click="isVisibleCart = !isVisibleCart">Корзина</button>
        <div class="cart-block" v-show="isVisibleCart">
            <p v-if="!cartItems.length">Корзина пуста</p>
            <cartElement class="cart-item" 
                v-for="item of cartItems" 
                :key="item.id_product"
                :cartItem="item" 
                :img="imgCart"
                @deleteItem="deleteItem">
            </cartElement>
        </div>
    </div>`
});

Vue.component('cartElement', {
    props: ['cartItem', 'img'],
    template: `
        <div class="cart-item"> 
            <div class="product-bio">
                <img :src="img" alt="Picture">
                <div class="product-desc">
                    <p class="product-title">{{cartItem.product_name}}</p>
                    <p class="product-quantity">Количество: {{cartItem.quantity}}</p>
                    <p class="product-single-price">{{cartItem.price}}₽ за единицу</p>
                </div>
            </div>
            <div class="right-block">
                <p class="product-price">{{cartItem.quantity*cartItem.price}}₽</p>
                <button class="del-btn" @click="$emit('deleteItem', cartItem)">&times;</button>
            </div>
        </div>`
});