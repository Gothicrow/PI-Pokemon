import {GET_POKEMONS, GET_DETAILS, CLEAR_PAGE, GET_TYPES, SEARCH_NAME} from './actionTypes'
import axios from 'axios'

export function getPokemons(orden){
    return async dispatch => {
        const pokemones = await axios.get('/pokemon?search=&&order1=id&&order2=asc&&tipo=')
        let pokemons
        if(orden==='A-Z'){
            pokemons = pokemones.data.sort((a,b)=>a.name.localeCompare(b.name))
          }else if(orden==='Z-A'){
            pokemons = pokemones.data.sort((a,b)=>b.name.localeCompare(a.name))
          }else if(orden==='strong'){
            pokemons = pokemones.data.sort((a,b)=>b.attack-a.attack)
          }else if(orden==='weak'){
            pokemons = pokemones.data.sort((a,b)=>a.attack-b.attack)
          }
        return dispatch({type: GET_POKEMONS, payload: pokemons})
    }
}

export function getDetails(id){
    return async dispatch => {
        const details = await axios.get(`/pokemons/${id}`)
        return dispatch({type: GET_DETAILS, payload: details.data})
    }
}

export function getTypes(){
    return async dispatch=> {
        const types = await axios.get('/types')
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
        const post = await axios.post('/pokemons', data)
        return post
    }
}

export function searchName(nombre){
    return async dispatch => {
        const search = await axios.get(`/pokemons?name=${nombre}`)
        return dispatch({type: SEARCH_NAME, payload: search.data})
    }
}