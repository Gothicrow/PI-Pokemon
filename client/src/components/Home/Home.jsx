import React, { useEffect, useState} from 'react'
import {getPokemons, getTypes} from '../../redux/actions/actions'
import {useDispatch, useSelector} from 'react-redux'
import PokeHome from '../Pokemon/PokeHome'
import {Link} from 'react-router-dom'

function Home() {

  const paginas = []

  const [pagina, setPagina] = useState(1)
  const [orden, setOrden] = useState('A-Z')
  const [tipo, setTipo] = useState('')
  const [origen,setOrigen] = useState('all')

  const dispatch = useDispatch()

  const types = useSelector((state)=>state.types)
  useEffect(()=>{
    dispatch(getTypes())
  },[dispatch])

  const allPokemons = useSelector((state)=>state.pokemons)
  useEffect(()=> {
    dispatch(getPokemons(),console.log(allPokemons))
  },[dispatch,allPokemons])

  let pokeRender = allPokemons

  function selectOrden(o){
    if(o==='A-Z'||o==='Z-A'||o==='strong'||o==='weak'){
      if(o==='Z-A'){
        setOrden('Z-A')
      }else if(o==='strong'){
        setOrden('strong')
      }else if(o==='weak'){
        setOrden('weak')
      }else{
        setOrden('A-Z')
      }
    }else{
      setOrden('A-Z')
      console.log('Deja de harcodearme :c')
    }
  }

  function selectType(t){
    if(t!==''){
      const type = types.find(tipo=>tipo.name === t)
      if(type){
        setTipo(type.name)
      }else{
        setTipo('')
        console.log('no me harcodees.. -.-"')
      }
    }else{
      setTipo('')
    }
  }

  function selectOrigen(o){
    if(o==='all'||o==='org'||o==='crt'){
      if(o==='org'){
        setOrigen('org')
      }else if(o==='crt'){
        setOrigen('crt')
      }else{
        setOrigen('all')
      }
    }else{
      o='all'
      setOrigen('all')
      console.log('No me harcodees!! >:(')
    }
  }

  function selectPage(n){
    if(n<paginas.length+1){
      setPagina(n)
    }else{
      console.log('._.')
    }
    console.log(pagina)
  }

  function filtrado(){
    if(origen!=='all'){
      if(origen==='org'){
        pokeRender = pokeRender.filter(p=>p.id<15000)
      }else if(origen==='crt'){
        pokeRender = pokeRender.filter(p=>!(p.id<15000))
      }
    }
    if(tipo!==''){
      pokeRender = pokeRender.filter(p=>p.type2?p.type2===tipo||p.type1===tipo:p.type1===tipo)
    }
  }

  function ordenamiento(){
    if(orden==='A-Z'){
      pokeRender = pokeRender.sort((a,b)=>a.name.localeCompare(b.name))
    }else if(orden==='Z-A'){
      pokeRender = pokeRender.sort((a,b)=>b.name.localeCompare(a.name))
    }else if(orden==='strong'){
      pokeRender = pokeRender.sort((a,b)=>b.attack-a.attack)
    }else if(orden==='weak'){
      pokeRender = pokeRender.sort((a,b)=>a.attack-b.attack)
    }
  }

  function paginado(){
    let cantPages = Math.ceil(pokeRender.length/12)
    let inicio = 0
    for(let i=0;i<cantPages;i++){
      let cadaPag = 
      {
        page: i,
        pokes: pokeRender.slice(inicio,inicio+12)
      }
      inicio = inicio+12
      paginas.push(cadaPag)
    }
  }

  if(pokeRender.length>0){
    filtrado()
    if(pokeRender.length>0){
      ordenamiento()
    }
    paginado()
  }
  
  return (
    <div>
      <div>
        <h1>Pokemon</h1>
        <input type="text" name="" id="" />
        <button type="submit">Buscar</button>
        <Link to={'/create/pokemon'}>
          <h2>Crear Pokemon</h2>
        </Link>
      </div>
      <div>
        <h3>Filtrar por tipo: </h3>
        <select key='types' name="types" onChange={(t)=>selectType(t.target.value)}>
          <option value=''>Seleccionar el Tipo</option>
          {
            types.map(t=>(
              <option key={t.name} value={`${t.name}`}>{`${t.name}`}</option>
            ))
          }
        </select>
        <h3>Filtrar por origen: </h3>
        <select key='origen' name="origen" onChange={(o)=>selectOrigen(o.target.value)} >
          <option value="all">Todos</option>
          <option value="org">Original</option>
          <option value="crt">Creado</option>
        </select>
        <h3>Filtrar por orden:</h3>
        <select key='orden' name="orden" onChange={(o)=>selectOrden(o.target.value)} >
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
          <option value="strong">Mas fuerte</option>
          <option value="weak">Mas debil</option>
        </select>
      </div>
      <div>
        <div>
          {
            paginas.length>0?
            paginas.map(p=>{
              return (
                <button 
                  key={`${p.page}`} 
                  value={p.page+1}
                  onClick={(n)=>selectPage(n.target.value)}>
                </button>
              )
              
            })
            :
            console.log('mal')
          }
        </div>
        <div>
          {
            paginas.length>0?
            paginas[pagina-1].pokes.map(p=>(
              <PokeHome key={p.id} id={p.id} name={p.name} image={p.image} type1={p.type1} type2={p.type2}/>
            ))
            :
            allPokemons.length>0?
            <p>No hay pokemons disponibles.</p>:
            <p>Cargando...</p>
          }
        </div>
        
      </div>
    </div>
  )
}

export default Home