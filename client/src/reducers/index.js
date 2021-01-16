import {combineReducers} from 'redux';
import { CLOSE_INPUT_MODAL, MODAL_LOADED, MODAL_LOADING, ADD_WORD, CLOSE_WORD, CLOSE_MESSAGE_MODAL, FETCH_WORDS, FINISH_LOADING, SHOW_INPUT_MODAL, SHOW_MESSAGE_MODAL, SHOW_WORD, ERROR, CHANGE_SEARCH_TERM, CLEAR_SEARCH_TERM } from "../actions/types";

const initialState = {
    currentWord: {},
    modalMessage: null,
    showModal: false,
    showWord: false,
    words: [],
    loading: true,
    error: false,
    searchTerm: '',
    modalLoad: false,
    inputForm: true
}

const words = (state=initialState,action) => {
    switch(action.type) {
        case SHOW_WORD: return {...state, showWord: true, currentWord: action.payload};
        case SHOW_INPUT_MODAL: return {...state, showModal: true, inputForm: true};
        case SHOW_MESSAGE_MODAL: return {...state, showModal: true, modalMessage: action.payload, inputForm: false};
        case FETCH_WORDS: return {...state, words: action.payload};
        case FINISH_LOADING: return {...state, loading: false};
        case CLOSE_INPUT_MODAL: return {...state, showModal: false, inputForm: false};
        case CLOSE_MESSAGE_MODAL: return {...state, showModal: false, modalMessage: null};
        case CLOSE_WORD: return {...state, currentWord: {}, showWord: false};
        case ERROR: return {...initialState, error: true, loading: false};
        case CHANGE_SEARCH_TERM: return {...state, searchTerm: action.payload};
        case CLEAR_SEARCH_TERM: return {...state, searchTerm: ''};
        case ADD_WORD: return {...state, words: [...state.words, action.payload]};
        case MODAL_LOADING: return {...state, showModal: true, modalLoad: true, inputForm: true, modalMessage: null};
        case MODAL_LOADED: return {...state, showModal: true, modalLoad: false, inputForm: false, modalMessage: action.payload};
        default: return state;
    }
}

export default combineReducers({
    state: words
});