
const {isValidTag, validActionAdd, validActionRemove} = require('../utils/validators.js')

describe('testing for my validators', () => {
    const tagsEmpty = [];
    const undef = undefined;
    const nothing = null;
    const tags1 = ['home']
    const tags2 = ['friend', 'vegas']
    const tags3 = ['home', 'vegas', 'holdem', 'taco']

    const emptyTag = '';
    const tag = 'home'
    const tag1 = 'vegas'
    const tag2 = 'ivan'
    const tag3 = 'taco'

    test('teset empty input string', () => {
        expect(isValidTag(emptyTag, tags3)).toBe(false)
    })

    test('test already included', () => {
        expect(isValidTag(tag, tags3)).toBe(false);
    })

    test('test already included', ()=>{
        expect(isValidTag(tag, tags1)).toBe(false);
    })

    test('test valid input', () => {
        expect(isValidTag(tag3, tags2)).toBe(true);
    })
})
