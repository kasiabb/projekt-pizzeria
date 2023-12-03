import { settings, select } from './settings.js';
import Product from './components/product.js';
import Cart from './components/Card.js';

const app = {
  initData: function () {
    const thisApp = this;
    thisApp.data = {};
    const url = settings.db.url + '/' + settings.db.products;
    fetch(url)
      .then(function (rawResponse) {
        return rawResponse.json();
      })
      .then(function (parsedResponse) {
        console.log('parsedResponse', parsedResponse);

        thisApp.data.products = parsedResponse;

        thisApp.initMenu();
      });
  },
  initMenu: function () {
    const thisApp = this;
    console.log('thisApp.data:', thisApp.data);
    for (let productData in thisApp.data.products) {
      new Product(productData, thisApp.data.products[productData]);
    }
  },
  initCart: function () {
    const thisApp = this;
    const cartElem = document.querySelector(select.containerOf.cart);
    thisApp.cart = new Cart(cartElem);
    console.log('Initialized cart:', thisApp.cart);
  },

  init: function () {
    const thisApp = this;
    console.log('*** App starting ***');
    console.log('thisApp:', thisApp);
    console.log('classNames:', classNames);
    console.log('settings:', settings);
    console.log('templates:', templates);
    thisApp.initData();
    thisApp.initCart();
  },
};
app.init();
