import { CLEAR_STARSHIPS, SAVE_STARSHIPS, SAVE_SEARCH_TEXT, ADD_SEARCHED, REMOVE_SEARCHED } from "../constants/types";
import { configureStore } from "../store";

export const saveStarships = ({ data = [], page = 1, totalResult }) => ({
    type: SAVE_STARSHIPS,
    payload: {
        data,
        page,
        totalResult
    }
})

export const addSearchedItem = (search) => {
    const store = configureStore();
    let searchedItems = store.getState().starships.searchedItems || []
    let isSearchAlreadyAdded = searchedItems.includes(search)

    if(!isSearchAlreadyAdded) {
        if (searchedItems.length == 5) {
            searchedItems.pop()
        }
        searchedItems.unshift(search);
    }
    
    return {
        type: ADD_SEARCHED,
        payload: searchedItems
    }
}

export const saveSearch = (txt) => ({
    type: SAVE_SEARCH_TEXT,
    payload: txt
})

export const clearStarship = () => ({
    type: CLEAR_STARSHIPS
})
