
function getCartData(req) {
    let cartData;
    try {
        cartData = JSON.parse(req.cookies.cart);
        if (cartData && typeof cartData.products === "object") {
            cartData = {
                products: cartData.products
            }
        }
    } catch {
        cartData = {
            products: {}
        }
    }

    return cartData;
}

export function getCart(req, res) {
    try {
        const cartData = JSON.parse(req.cookies.cart);
        if (typeof cartData.products !== 'object') {
            throw new Error('yo')
        }
        res.send(cartData)
    } catch {
        res.send({
            products: {}
        })
    }
}

export function addProductToCart(req, res) {
    const productId = req.params.productId;

    const cartData = getCartData(req)

    try {
        const existingProduct = cartData.products[productId] || { amount: 0, productId }
        existingProduct.amount++;

        cartData.products[productId] = existingProduct;

        res.cookie('cart', JSON.stringify(cartData))

        res.send(cartData)
    } catch {
        res.send({
            products: {}
        })
    }
}

export function removeProductFromCart(req, res) {
    const productId = req.params.productId;

    const cartData = getCartData(req)

    const existingProduct = cartData.products[productId];

    if (!existingProduct) {
        return res.send(cartData);
    }

    existingProduct.amount--;

    if (existingProduct.amount <= 0) {
        delete cartData.products[productId]
    }

    res.cookie('cart', JSON.stringify(cartData))
    res.send(cartData)
}