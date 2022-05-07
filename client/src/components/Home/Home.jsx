import React, { useEffect} from 'react'
import {getPokemons} from '../../redux/actions/actions'
import {useDispatch, useSelector} from 'react-redux'
import PokeHome from '../Pokemon/PokeHome'
import {Link} from 'react-router-dom'

function Home() {

  const dispatch = useDispatch()
  const allPokemons = useSelector((state)=>state.pokemons)
  useEffect(()=>{
    dispatch(getPokemons())
  },[dispatch])

  console.log(allPokemons)
  return (
    <div>
      <h1>Pokemon</h1>
      <Link to={'/create/pokemon'}>
        <h2>Crear Pokemon</h2>
      </Link>
      {
        allPokemons.length>0?
        allPokemons.map(p=>(
          <PokeHome key={p.id} id={p.id} name={p.name} image={p.image} type1={p.type1} type2={p.type2}/>
        ))
        :
        <p>Cargando...</p>
      }
    </div>
  )
}

export default Home