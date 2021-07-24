"use strict";
// Напишите программу, рассчитывающую стоимость и калорийность гамбургера.
// Размер
// Маленький (50 рублей, 20 калорий).
// Большой (100 рублей, 40 калорий).

//Начинки
// С сыром (+10 рублей, +20 калорий).
// С салатом (+20 рублей, +5 калорий).
// С картофелем (+15 рублей, +10 калорий).

//Добавки
// Дополнительно гамбургер можно посыпать приправой (+15 рублей, +0 калорий) и полить майонезом (+20 рублей, +5 калорий). 

class Hamburger {
    constructor(size, stuffing) {
        this.size = size;
        this.stuffing = stuffing;
        this.toppings = [];
        this.sizeArr = {};
        this.stuffingArr = {};
        this.toppingArr = {};
        this.totalPrice = 0;
        this.totalCalories = 0;

        this.init();
    }
    init() {
        this.sizeArr = {
            small: { size: 'small', price: 50, calories: 20 },
            big: { size: 'big', price: 100, calories: 40 },
        };
        this.stuffingArr = {
            chease: { name: "chease", price: 10, calories: 20 },
            salat: { name: "salat", price: 20, calories: 5 },
            potato: { name: "potato", price: 15, calories: 10 }
        };
        this.toppingArr = {
            seasoning: { name: "seasoning", price: 15, calories: 0 },
            mayo: { name: "mayo", price: 20, calories: 5 }
        };
    }
    addTopping(topping) {
        this.toppings.push(this.toppingArr[topping]);
    }
    removeTopping(topping) {
        for (let i = 0; i < this.toppings.length; i++) {
            if (this.toppings[i].name == topping) {
                this.toppings.splice(i, 1);
            }
        }
    }
    getToppings() {
        return this.toppings;
    }
    getSize() {
        return this.size;
    }
    getStuffing() {
        return this.stuffing;
    }
    calculatePrice() {
        this.totalPrice = this.sizeArr[this.size].price + this.stuffingArr[this.stuffing].price;
        this.toppings.forEach(item => {
            this.totalPrice += item.price;
        });
    }
    calculateCalories() {
        this.totalCalories = this.sizeArr[this.size].calories + this.stuffingArr[this.stuffing].calories;
        this.toppings.forEach(item => {
            this.totalCalories += item.calories;
        });
    }
}

let hamburger = new Hamburger("small", "chease");

hamburger.addTopping("seasoning");
hamburger.addTopping("mayo");
hamburger.removeTopping("mayo");

hamburger.calculatePrice();
hamburger.calculateCalories();

console.log(hamburger);