import { Action, Game, GameStats } from '../components/gameObjects.js';
const utils = require('underscore')

let tags = []
let gameBaseActions = [new Action('call'), new Action('fold'), new Action('raise')]
let gameBase = new Game(gameBaseActions, tags, 0, "1.0.5", new Date());

let tags1 = ['home', 'holdem'];
let gameActions1 = [new Action('call', 9, { 0: 1, 1: 2, 2: 0, 3: 1, 4: 3, 5: 1, 6: 0, 7: 0, 8: 1, }), 
                    new Action('fold', 8, { 0: 0, 1: 0, 2: 3, 3: 1, 4: 1, 5: 0, 6: 2, 7: 1, 8: 0, }),
                    new Action('raise', 10, { 0: 0, 1: 0, 2: 3, 3: 1, 4: 1, 5: 0, 6: 2, 7: 0, 8: 2, })]
let game1 = new Game(gameActions1, tags1, 0, "1.0.5", new Date());

let tags2 = ['home'];
let gameActions2 = [new Action('call', 10, { 0: 1, 1: 2, 2: 1, 3: 1, 4: 3, 5: 1, 6: 0, 7: 0, 8: 1, }), 
                    new Action('fold', 8, { 0: 0, 1: 0, 2: 3, 3: 1, 4: 1, 5: 0, 6: 2, 7: 1, 8: 0, }),
                    new Action('raise', 10, { 0: 0, 1: 0, 2: 3, 3: 1, 4: 1, 5: 0, 6: 2, 7: 0, 8: 2, })]
let game2 = new Game(gameActions1, tags1, 0, "1.0.5", new Date());

let actionList = ['call', 'fold', 'raise', 'reraise']

console.log("game1: ", game1);
console.log(game1.getCurrentStats());
console.log();

describe('test games', () => {
    it('test 1', () => {
        expect(game1.actions[0].actionName).toEqual('call');
    });
    

});

describe('test increments of actions', () => {
    gameBase.actions[0].incrementActionAtPosition(0);
    gameBase.actions[1].incrementActionAtPosition(1);
    gameBase.actions[0].incrementActionAtPosition(2);
    gameBase.actions[2].incrementActionAtPosition(3);
    gameBase.actions[0].incrementActionAtPosition(4);
    gameBase.actions[2].incrementActionAtPosition(5);
    gameBase.actions[0].incrementActionAtPosition(6);
    gameBase.actions[0].incrementActionAtPosition(7);
    gameBase.actions[1].incrementActionAtPosition(8);
    console.log('after round:', gameBase.actions);
    it('test increments', ()=> {
        expect(gameBase.actions[0].count).toEqual(5)
    });
    it('test increments1', ()=> {
        expect(gameBase.actions[1].count).toEqual(2)
    });
    it('test increments2', ()=> {
        expect(gameBase.actions[2].count).toEqual(2)
    });

})

describe('test creating ation instances', () => {
    console.log("the list: ", actionList);
    const newgame = new Game(actionList, [], 0, '1.0.5', new Date());
    console.log(newgame);
    it('check if antion instances are created', () => {
        expect(newgame.actions.every(action => {return action instanceof Action})).toEqual(true)
    })
})


describe('test adding actions', () => {
    
})
