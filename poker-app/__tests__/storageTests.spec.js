const { saveCurrentGame,
  retrieveCurrentGame,
  removeCurrentGame,
  retrieveData,
  removeData,
  saveTags,
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