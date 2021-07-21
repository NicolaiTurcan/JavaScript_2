'use strict';
const products = [
    { id: 1, title: 'Notebook', price: 1000 },
    { id: 2, title: 'Mouse', price: 100 },
    { id: 3, title: 'Keyboard', price: 250 },
    { id: 4, title: 'Gamepad', price: 150 },
];

const renderProduct = (title, price, image = "https://picsum.photos/seed/9/200", altImage = "Pictures") => {
    return `<div class="product-item">
                <img src="${image}" alt="${altImage}">
                <h3>${title}</h3>
                <p>Price: ${price}</p>
                <button class="by-btn">Добавить</button>
              </div>`;
}

// const renderProducts = (list) => {
//     const productList = list.map((item) => {
//         return renderProduct(item.title, item.price);
//     });

//     console.log(productList);

////add cycle for every element and eliminate ","
//     for (let i = 0; i < productList.length; i++) {
//         document.querySelector('.products').insertAdjacentHTML('afterbegin', productList[i]);
//     }
// }

const renderProducts = (list) => {
    list.forEach(element => {
        document.querySelector('.products').insertAdjacentHTML('afterbegin',
            renderProduct(element.title, element.price));
    });
}
renderProducts(products);
