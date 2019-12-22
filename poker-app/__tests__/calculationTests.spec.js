const { findTag,
    findManyTags,
    calculateTotalStats,
    calculateStatsByTag,
    calculateByPosition,
    getPercentages,
    includesAllTags,
    calcTotalsPerPosition,
    calcTotalsPerAction,
    calcPercentByPosition,
    calcCurrentGamePercentages,
    isEmpty
} = require('../components/statscalculation.js')


const EmptyTest = {};
const NonExsistant = undefined;
const NullTest = null;
const gameObj1 = {}
const gameObj2 = {}


describe('Test my is Empty function', () => {
    const obj1 = {}
    const obj2 = {
        name: 'paul',
        age: 23
    }
    test('test if empty object function', () => {
        expect(isEmpty(obj1)).toBe(true);
    }),
        test('test2', () => {
            expect(isEmpty(obj2)).toBe(false);
        }),


        expect.extend({
            isEmpty1() {
                const pass = true
                if (pass) {
                    return {
                        message: () => 'Yes the object is empty',
                        pass: true
                    }
                }
                else {
                    return {
                        message: () => 'NOT EMPTY OBJECT',
                        pass: false
                    }
                }
            }
        })

        test('test 3 extend', () => {

        })
        
})









    describe('Tests for calculation functions for app data', () => {


        test('Searchs is a tag exsists in all current games', () => {

        })



    });




