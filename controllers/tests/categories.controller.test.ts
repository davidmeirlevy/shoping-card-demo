describe('categories controller', () => {
    describe('getAllCategories', () => {

        let getAllCategories;
        let CategoryModelMock;

        beforeEach(async () => {
            jest.mock('../../models/category.model');
            CategoryModelMock = (await import('../../models/category.model')).default
            const controller = await import('../categories.controller')

            getAllCategories = controller.getAllCategories
        })

        afterEach(() => {
            jest.unmock('../../models/category.model');
            jest.clearAllMocks()
        })

        test('should be a function', () => {
            expect(typeof getAllCategories).toBe('function');
            expect(typeof CategoryModelMock.find).toEqual('function')
        })

        test('should be exectued', () => {
            const sendMock = jest.fn();
            getAllCategories(
                { query: {} },
                { send: sendMock }
            )
        })

        test('should call the model with empty query when q is undefined', () => {
            const sendMock = jest.fn();
            getAllCategories(
                { query: {} },
                { send: sendMock }
            )

            expect(CategoryModelMock.find).toHaveBeenCalledTimes(1)
            expect(CategoryModelMock.find).toHaveBeenCalledWith({})
        })


        test('should call the model with regex of "bla" when q is "bla"', () => {
            const sendMock = jest.fn();
            getAllCategories(
                { query: {q: 'bla'} },
                { send: sendMock }
            )

            expect(CategoryModelMock.find).toHaveBeenCalledTimes(1)
            expect(CategoryModelMock.find).toHaveBeenCalledWith({
                name: /bla/i
            })
        })

        test('should call the model with object query when q is a string with length < 2', () => {
            const sendMock = jest.fn();
            getAllCategories(
                { query: {q: 'a'} },
                { send: sendMock }
            )

            expect(CategoryModelMock.find).toHaveBeenCalledTimes(1)
            expect(CategoryModelMock.find).toHaveBeenCalledWith({})
        })

        test('should call the model with object query when q is an array', () => {
            const sendMock = jest.fn();
            getAllCategories(
                { query: { q: ['1','2','3'] } },
                { send: sendMock }
            )

            expect(CategoryModelMock.find).toHaveBeenCalledTimes(1)
            expect(CategoryModelMock.find).toHaveBeenCalledWith({})
        })
    })
})