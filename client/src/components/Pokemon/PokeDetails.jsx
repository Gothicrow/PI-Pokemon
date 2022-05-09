import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getDetails, clearPage } from '../../redux/actions/actions'

function PokeDetails() {

  const {id} = useParams()

  const dispatch = useDispatch()
  const p = useSelector(state=>state.pokeDetalles)
  useEffect(()=>{
    dispatch(getDetails(id))

    return () => {
      dispatch(clearPage())
    }
  },[dispatch,id])

  return (
    <div>
      {
        p.name ?
          p.type2 ?
          <>
            <h1>{p.name}</h1>
            <h5>id: {p.id}</h5>
            <img src={p.image} alt="" />
            <h3>Vida: {p.hp}</h3>
            <h3>Fuerza: {p.attack}</h3>
            <h3>Defensa: {p.defense}</h3>
            <h3>Velocidad: {p.speed}</h3>
            <h3>Altura: {p.height}</h3>
            <h3>Peso: {p.weight}</h3>
            <h3>Tipo 1: {p.type1}</h3>
            <h3>Tipo 2: {p.type2}</h3>
          </>
          : 
          <>
            <h1>{p.name}</h1>
            <h5>id: {p.id}</h5>
            <img src={p.image} alt="" />
            <h3>Vida: {p.hp}</h3>
            <h3>Fuerza: {p.attack}</h3>
            <h3>Defensa: {p.defense}</h3>
            <h3>Velocidad: {p.speed}</h3>
            <h3>Altura: {p.height}</h3>
            <h3>Peso: {p.weight}</h3>
            <h3>Tipo 1: {p.type1}</h3>
          </>
        :
        <p>Cargando...</p>
      }
    </div>
  )
}

export default PokeDetails