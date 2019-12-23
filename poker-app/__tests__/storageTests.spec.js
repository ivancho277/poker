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
} = require('../components/AsyncStorageController.js')
import AsyncStorage from "react-native"

//const storage = jest.mock('react-native-asyncstorage')

test('look', () => {
    expect((2 + 2)).toBe(4);
})

test('storage', async () => {
    let launch = await firstTimeLauching().then(res =>{
        expect(res).toBe(true)
    }) 
})

test('inner', async () => {
    await firstTimeLauching().then(res => {
        expect(res).toBe(false)
    })
})

// test('twp', async () => {
//     let a = await storage.getItem('tester');
//     expect(a).toBe('tester')
// })