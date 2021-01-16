import axios from 'axios';
import { CHANGE_SEARCH_TERM, MODAL_LOADED, ERROR, FETCH_WORDS, FINISH_LOADING, CLEAR_SEARCH_TERM, CLOSE_INPUT_MODAL, SHOW_INPUT_MODAL, ADD_WORD, MODAL_LOADING, SHOW_WORD, CLOSE_WORD } from './types';

export const fetchWords = () => async (dispatch) => {
    try{
        const res = await axios.get(`/api/words`);
        if(res.data) {
            dispatch({type: FETCH_WORDS,payload: res.data.words});
            dispatch({type: FINISH_LOADING});
        }
    }
    catch(err) {
        dispatch({type: ERROR});
    }
}

export const changeSearch = (data) => (dispatch) => {
    dispatch({type: CHANGE_SEARCH_TERM, payload: data});
}

export const clearSearch = () => (dispatch) => {
    dispatch({type: CLEAR_SEARCH_TERM});
}

export const showInputModal = () => (dispatch) => {
    dispatch({type: SHOW_INPUT_MODAL});
}

export const closeInputModal = () => (dispatch) => {
    dispatch({type: CLOSE_INPUT_MODAL});
}

export const addWord = (data) => async (dispatch) => {
    try{
        const res = await axios.post(`/api/words`, {
            word: data
        });
        if(res.data) {
            dispatch({type: ADD_WORD, payload: res.data.word});
            dispatch({type: MODAL_LOADED, payload: "Word added"});
        }
    }
    catch(err) {
        const text = err.response?err.response.data?err.response.data.message:"Something went wrong. Try again later":"Something went wrong. Try again later";
        dispatch({type: MODAL_LOADED, payload: text});
    }
}

export const modalLoading = () => (dispatch) => {
    dispatch({type: MODAL_LOADING});
}

export const showWord = (data) => (dispatch) => {
    dispatch({type: SHOW_WORD, payload: data});
}

export const closeWord = () => (dispatch) => {
    dispatch({type: CLOSE_WORD});
}