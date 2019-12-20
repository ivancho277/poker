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
    test('matcher test', ()=>{
        expect.extend({
            isEmpty(obj1) {
                const pass = true
                if(pass){
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
    })
   




})


    // describe('Tests for calculation functions for app data', () => {
    //     test('Searchs is a tag exsists in all current games', () => {

    //     })



    // });




