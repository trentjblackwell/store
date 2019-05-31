module.exports = function Cart(initCart) {
    this.items = initCart.items || {};
    this.numItems = initCart.numItems || 0;
    this.total = initCart.total || 0;

    this.add = function(item, id) {
        var itemInCart = this.items[id];
        if (!itemInCart) {
            itemInCart = this.items[id] = {item: item, qty: 0, price: 0};
        }
        itemInCart.qty++;
        itemInCart.price = itemInCart.item.price * itemInCart.qty;
        this.numItems++;
        this.total += itemInCart.item.price;
    }

    this.cartArray = function() {
        var array = [];
        for (var id in this.items) {
            array.push(this.items[id]);
        }
        return array;
    };
    // this.remove = function(item, id) {
    //     var itemInCart = this.items[id];
    //     array = Cart.cartArray;
    //     array.slice(itemInCart);
    // }
};