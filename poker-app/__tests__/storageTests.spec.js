const { saveCurrentGame,
  retrieveCurrentGame,
  removeCurrentGame,
  retrieveData,
  removeData,
  saveTags,
  saveData,
  retrieveTags,
  removeTags,
  saveActions,
  retrieveActions,
  resetActions,
  firstTimeLauching
} = require('../components/AsyncStorageController.js');
import { Action, Game, GameStats } from '../components/gameObjects.js';
import { AsyncStorage } from "react-native"
//import MockStorage from './MockStorage.js';
jest.mock("@react-native-community/async-storage", () => ({ AsyncStorage: { clear: jest.fn().mockName("clear"), getAllKeys: jest.fn().mockName("getAllKeys"), getItem: jest.fn().mockName("getItem"), removeItem: jest.fn().mockName("removeItem"), setItem: jest.fn().mockName("setItem") } }));


//import React from 'react';
//import Index from '../index.android.js';
// Note: test renderer must be required after react-native.

//create some games for storage testing
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
let game2 = new Game(gameActions2, tags2, 0, "1.0.5", new Date());

let allTags = ['home', 'vegas', 'holdem', 'taco'];
let allActions = ['call', 'fold', 'raise'];

allGames = {}



describe('test out Async controller modules', () => {
  it('Mock Async Storage working', () => {
    //expect.assertions(1);
    AsyncStorage.setItem('myKey', 'myValue')
    AsyncStorage.getItem('myKey').then(res => {
      return expect(res).toeEqual('myValue');
    })
  })
  it('Test First Launch when ture', () => {
    firstTimeLauching().then(res => {
      return expect(res).toeEqual(true);
    })
  })

  it('Test first launch after called once', () => {
    firstTimeLauching().then(res => {
      return expect(res).toeEqual(false);
    })
  })



});

describe('test results when storage is empty', () => {
    it('test get empty data', () => {
      retrieveData().then(res => {
        return expect(res).toThrow(Error)
      })
    });

    it('test get empty tags', () => {
      retrieveTags().then(res => {
        return expect(res).toeEqual(null);
      }) 
    });
    
    it('test get empty actions', () => {
      retrieveActions().then(res => {
        return expect(res).toThrow(Error);
      })
    });

    it('test get empty current game', () => {
      retrieveCurrentGame().then(res => {
        return expect(res).toeEqual(null);
      })
    });
})

describe('setting and getting tests', () => {
  saveData()
})

//const storage = jest.mock('react-native-asyncstorage')






// describe('storage controls', () => {
//     test('look', () => {
//         expect((2 + 2)).toBe(4);
//     })

//     test('storage', async () => {
//         let launch = await firstTimeLauching().then(res =>{
//             expect(res).toBe(true)
//         }) 
//     })
//         test('inner', async () => {
//             await firstTimeLauching(res => {
//                 expect(test).toBe(false)          
//             })

//        })



// })


// test('twp', async () => {
//     let a = await storage.getItem('tester');
//     expect(a).toBe('tester')
// })