/**
 * * Initialization Object for our Store
 */

export const initialState = {
    data: {
        loading: false,
        allGames: null,
        savedGames: null,
        currentGame: null,
        allTags: null,
        actions: null,
    },
    calculatedData: {
        loading: false,
        totals: null,
        positionTotals: null,
        positionCount: null,
    },
    allGamesArray: [],
    gamesObj: null,
    liveGame: null,
    loading: false,
    liveGameLoading: false,
    foundGamesArray: [],
    thereIsSavedData: true, 
    error: null,
    MAX_POSITION: 8,
    MIN_POSITION: 0,
    currentTime: new Date(),
    previousTime: new Date(),
    testModeOn: false,
    testNewSecureStore: [],
};