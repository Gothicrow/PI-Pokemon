import { CLEAR_PAGE, GET_DETAILS, GET_POKEMONS, GET_TYPES, SEARCH_NAME } from "../actions/actionTypes"

const initialState = {
    pokeDetalles: [],
    pokemons: [],
    types: [],
}

export default function reducer(state = initialState, {type, payload}){
    console.log(state)
    switch(type){
        case GET_POKEMONS: return {
            ...state,
            pokemons: payload
        }
        case GET_DETAILS: return {
            ...state,
            pokeDetalles: payload
        }
        case CLEAR_PAGE: return{
            ...state,
            pokeDetalles: []
        }
        case GET_TYPES: return{
            ...state,
            types: payload
        }
        case SEARCH_NAME: return{
            ...state,
            pokeDetalles: payload
        }
        default: return state
    }
}