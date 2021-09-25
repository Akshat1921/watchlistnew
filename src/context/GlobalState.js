/* eslint-disable no-unused-vars */
import React, {createContext,useReducer,useEffect} from 'react';
import AppReducer from './AppReducer';

// initial state
const initialState = {
    watched : localStorage.getItem('watched')?JSON.parse(localStorage.getItem('watched')):[],
    watchlist : localStorage.getItem('watchlist') ? JSON.parse(localStorage.getItem('watchlist')):[]
}

export const GlobalContext = createContext(initialState);

export const GlobalProvider = (props) => {
    const [state,dispatch] = useReducer(AppReducer,initialState);

    useEffect(()=>{
        localStorage.setItem('watchlist',JSON.stringify(state.watchlist));
        localStorage.setItem('watched',JSON.stringify(state.watched));
    },[state]);

    // actions
    const addMovieToWatchlist = movie =>{
        dispatch({type:'ADD_MOVIE_TO_WATCHLIST', payload:movie })
    }
    // remove from watchlist
    const removeMovieFromWatchlist = (id) =>{
        dispatch({type:'REMOVE_MOVIE_FROM_WATCHLIST',payload: id});
    }
    // add movie to watched
    const addMovieToWatched = (movie) =>{
        dispatch({type:'ADD_MOVIE_TO_WATCHED',payload: movie});
    }

    const moveToWatchList = movie =>{
        dispatch({type:'MOVE_TO_WATCHLIST',payload:movie})
    }

    const removeFromWatched = id=>{
        dispatch({type:'REMOVE_FROM_WATCHED',payload:id})
    }

    return(
    <GlobalContext.Provider
    value = {
        {
            watchlist:state.watchlist,
            watched: state.watched,
            addMovieToWatchlist,
            removeMovieFromWatchlist,
            addMovieToWatched,
            moveToWatchList,
            removeFromWatched,
        }
    }
    
    >
        {props.children}
    </GlobalContext.Provider>
);
}

