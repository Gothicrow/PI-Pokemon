import {GET_POKEMONS, GET_DETAILS, CLEAR_PAGE, GET_TYPES} from './actionTypes'
import axios from 'axios'

export function getPokemons(){
    return async dispatch => {
        const pokemones = await axios.get('http://localhost:3001/pokemons')
        return dispatch({type: GET_POKEMONS, payload: pokemones.data})
    }
}

export function getDetails(id){
    return async dispatch => {
        const details = await axios.get(`http://localhost:3001/pokemons/${id}`)
        return dispatch({type: GET_DETAILS, payload: details.data})
    }
}

export function getTypes(){
    return async dispatch=> {
        const types = await axios.get('http://localhost:3001/types')
        return dispatch({type: GET_TYPES, payload: types.data})
    }
}

export function clearPage(){
    return{
        type: CLEAR_PAGE
    }
}

export function postForm(data){
    return async () => {
        const post = await axios.post('http://localhost:3001/pokemons', data)
        console.log(data)
        console.log(post)
        return post
    }
}