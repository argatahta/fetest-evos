import {
    CLEAR_STARSHIPS,
    SAVE_STARSHIPS,
    SAVE_SEARCH_TEXT,
    ADD_SEARCHED,
    REMOVE_SEARCHED
} from "../constants/types"

const INITIAL_STATE = {
    data: [],
    search: "",
    searchedItems: [],
    page: 0,
    totalResult: 0
}

const starshipsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SAVE_STARSHIPS:
            return {
                ...state,
                data: action.payload.data,
                page: parseInt(action.payload.page),
                totalResult: parseInt(action.payload.totalResult)
            }
        case SAVE_SEARCH_TEXT:
            return {
                ...state,
                search: action.payload,
                page: 0
            }
        case CLEAR_STARSHIPS:
            return {
                ...state,
                data: [],
                page: 0,
                totalResult: 0
            }
        case ADD_SEARCHED:
            return {
                ...state,
                searchedItems: action.payload
            }
        case REMOVE_SEARCHED:
            return {
                ...state,
                searchedItems: action.payload
            }
        default:
            return {
                ...state,
            }
    }
}

export default starshipsReducer;