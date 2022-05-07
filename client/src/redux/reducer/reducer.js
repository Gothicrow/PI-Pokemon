import { CLEAR_PAGE, GET_DETAILS, GET_POKEMONS, GET_TYPES, POST_FORM } from "../actions/actionTypes"

const initialState = {
    pokemons: [],
    types: [],
    pokeDetalles: {}
}

export default function reducer(state = initialState, {type, payload}){
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
            pokeDetalles: {}
        }
        case GET_TYPES: return{
            ...state,
            types: payload
        }
        default: return state
    }
}