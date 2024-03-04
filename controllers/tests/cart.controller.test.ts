import { addProductToCart, getCart } from "../cart.controller"

describe('Cart Controller', () => {

    describe('getCart', () => {

        test('should response with empty cart when request is empty', () => {
            const mockSend = jest.fn()
            expect(mockSend).not.toHaveBeenCalled()

            getCart({}, {send: mockSend})

            expect(mockSend).toHaveBeenCalled()
            expect(mockSend).toHaveBeenCalledWith({"products": {}})
        })

        test('should return the json parsed of the cookie value in request', () => {
            const mockSend = jest.fn()
            expect(mockSend).not.toHaveBeenCalled()

            getCart({cookies: {cart: JSON.stringify({"products": {moshe: 111}})}}, {send: mockSend})

            expect(mockSend).toHaveBeenCalled()
            expect(mockSend).toHaveBeenCalledWith({"products": {moshe: 111}})
        })

        test('should return empty cart when cookies cart does not contain products', () => {
            const mockSend = jest.fn()
            expect(mockSend).not.toHaveBeenCalled()

            getCart({cookies: {cart: JSON.stringify({a: 5, b: 6})}}, {send: mockSend})

            expect(mockSend).toHaveBeenCalledWith({"products": {}})
        })
    })

    describe('addProductToCart', () => {

        test('should be executed', async () => {
            const sendMock = jest.fn();
            expect(addProductToCart(
                { params: { productId: 'demo-product-id' } },
                { send: sendMock }
            )).toBeUndefined()
        })

        test('should return a response', () => {
            const sendMock = jest.fn();
            expect(addProductToCart(
                { params: { productId: 'demo-product-id' } },
                { send: sendMock }
            )).toBeUndefined()

            expect(sendMock).toHaveBeenCalled()
            expect(sendMock).toHaveBeenCalledWith({products: {}})
        })

        test('should return empty cart when cart from cookies is undefined', () => {
            const sendMock = jest.fn();
            const INVALID_CART_OBJECT = JSON.stringify({

            })
            expect(addProductToCart(
                { 
                    params: { productId: 'demo-product-id' }, 
                    cookies: { cart: INVALID_CART_OBJECT }
                 },
                { send: sendMock }
            )).toBeUndefined()

            expect(sendMock).toHaveBeenCalled()
            expect(sendMock).toHaveBeenCalledWith({products: {}})
        })
        test('should return empty cart when cart from cookies is string', () => {
            const sendMock = jest.fn();
            const INVALID_CART_OBJECT_2 = JSON.stringify({
                products: 'demo string products'
            })

            expect(addProductToCart(
                { 
                    params: { productId: 'demo-product-id' }, 
                    cookies: { cart: INVALID_CART_OBJECT_2 }
                 },
                { send: sendMock }
            )).toBeUndefined()

            expect(sendMock).toHaveBeenCalledWith({products: {}})
        })
        test('should return empty cart when cart from cookies is array', () => {
            const sendMock = jest.fn();
            const INVALID_CART_OBJECT_3 = JSON.stringify({
                products: [1,2,3,4]
            })

            expect(addProductToCart(
                { 
                    params: { productId: 'demo-product-id' }, 
                    cookies: { cart: INVALID_CART_OBJECT_3 }
                 },
                { send: sendMock }
            )).toBeUndefined()

            expect(sendMock).toHaveBeenCalledWith({products: {}})
        })

        test('should set the cookie when productId and cart cookie are valid', () => {
            const sendMock = jest.fn();
            const cookieMock = jest.fn();
            const VALID_CART_OBJECT = JSON.stringify({
                products: {}
            })
            expect(addProductToCart(
                { 
                    params: { productId: 'demo-product-id' },
                    cookies: { cart: VALID_CART_OBJECT }
                },
                { send: sendMock, cookie: cookieMock }
            )).toBeUndefined()

            expect(cookieMock).toHaveBeenCalled()
            expect(cookieMock).toHaveBeenCalledWith('cart', "{\"products\":{\"demo-product-id\":{\"amount\":1,\"productId\":\"demo-product-id\"}}}")

            expect(sendMock).toHaveBeenCalledWith({
                products: {
                    'demo-product-id': {
                        amount: 1,
                        productId: 'demo-product-id'
                    }
                }
            })

        })


        test('should increment amount of existing product in cart', () => {
            const sendMock = jest.fn();
            const cookieMock = jest.fn();
            const VALID_CART_OBJECT = JSON.stringify({
                    products: {
                        'demo-product-id': {
                            amount: 5,
                            productId: 'demo-product-id'
                        }
                }
            })
        
            expect(addProductToCart(
                { 
                    params: { productId: 'demo-product-id' },
                    cookies: { cart: VALID_CART_OBJECT }
                },
                { send: sendMock, cookie: cookieMock }
            )).toBeUndefined()


            expect(sendMock).toHaveBeenCalledWith({
                products: {
                    'demo-product-id': {
                        amount: 6,
                        productId: 'demo-product-id'
                    }
                }
            })

        })

    })

})