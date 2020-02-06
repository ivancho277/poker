//import { StoreActionApi } from 'react-sweet-state';
import { defaults } from 'react-sweet-state';
import { produce } from 'immer';
import { AsyncStorageController as storage } from '../components/storageAPI/AsyncStorageController'


async function fetchData() {
    const dataResponse = await storage.retrieveData().then(res => { return JSON.parse(res) })
    const actionsResponse = await storage.retrieveActions().then(res => { return JSON.parse(res) })
    const tagsResponse = await storage.retrieveTags().then(res => { return JSON.parse(res) })
    const CurrentGameResponse = await storage.retrieveCurrentGame().then(res => { return JSON.parse(res) })
    return { allGames: dataResponse, actions: actionsResponse, tags: tagsResponse, CurrentGame: CurrentGameResponse }

}










const setLoading = () => ({ setState }) => {
    setState({ loading: true });
};



const setData = data => ({ setState }) => {
    setState({ loading: false, data });
};
defaults.mutator = (currentState, producer) => produce(currentState, producer);

const setError = msg => ({ setState }) => {
    setState({ error: msg });
}

export const load = () => async ({ getState, dispatch }, { fetchData }) => {
    if (getState().loading === true) return;

    dispatch(setLoading());

    const data = await fetchData();
    console.log("load action: ", data);


    setData({
        loading: false,
        data: data
    })
    dispatch(setData({
        loading: false,
        data: data
    }))

}





    //dispatch({error: null})
    // } catch(err) {

    //     setData(data);

    //     dispatch(setError({"error with data": string}));


    // }


