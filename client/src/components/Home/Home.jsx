import React, { useEffect, useState} from 'react'
import {getPokemons, getTypes} from '../../redux/actions/actions'
import {useDispatch, useSelector} from 'react-redux'
import PokeHome from '../Pokemon/PokeHome'
import style from './Home.module.css'
import { Link } from 'react-router-dom'

function Home() {

  const paginas = []

  const [pagina, setPagina] = useState(1)
  const [orden, setOrden] = useState('A-Z')
  const [tipo, setTipo] = useState('')
  const [origen,setOrigen] = useState('all')
  const [nombre,setNombre] = useState('')
  const [search,setSearch] = useState('')

  const dispatch = useDispatch()

  const types = useSelector((state)=>state.types)
  useEffect(()=>{
    dispatch(getTypes())
  },[dispatch])

  const allPokemons = useSelector((state)=>state.pokemons)
  useEffect(()=> {
    dispatch(getPokemons(orden))
  },[dispatch,orden])

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
        setPagina(1)
      }else{
        setTipo('')
        setPagina(1)
        console.log('no me harcodees.. -.-"')
      }
    }else{
      setTipo('')
      setPagina(1)
    }
  }

  function selectOrigen(o){
    if(o==='all'||o==='org'||o==='crt'){
      if(o==='org'){
        setOrigen('org')
        setPagina(1)
      }else if(o==='crt'){
        setOrigen('crt')
        setPagina(1)
      }else{
        setOrigen('all')
        setPagina(1)
      }
    }else{
      o='all'
      setOrigen('all')
      setPagina(1)
      console.log('No me harcodees!! >:(')
    }
  }

  function selectPage(n){
    if(n<paginas.length+1){
      setPagina(n)
    }else{
      console.log('._.')
    }
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
    filtroNombre()
    filtrado()
    paginado()
  }

  function filtroNombre(){
    if(pokeRender.length>0){
      if(search){
        const pokeFiltro = pokeRender.find(p=>p.name===search)
        if(pokeFiltro){
          pokeRender = []
          pokeRender.push(pokeFiltro)
        }
      }
    }
  }

  function nameSearch(p){
    if(/^[a-zA-Z]+$/.test(p)){
      setNombre(p.toLowerCase())
    }else{
      setNombre('')
      setSearch('')
    }
  }

  function handleOnSubmit(e){
    e.preventDefault()

    setSearch(nombre)
  }
  
  return (
    <div className={style.home} >
      <div className={style.main}>
        <h1 className={style.title}>Pokemon</h1>
        <form onSubmit={handleOnSubmit}>
          <input 
            className={style.input}
            type="text" 
            name="nameSearch"
            placeholder='Buscar pokemon'
            onChange={(e)=>nameSearch(e.target.value)} 
          />
          <button className={style.search} type="submit">Buscar</button>
        </form>
        <Link className={style.create} to={'/create/pokemon'}>
          <h2>Crear Pokemon</h2>
        </Link>
      </div>
      <div className={style.filtros}>
        <div className={style.filtro}>
        <h3 className={style.h3}>Filtrar por tipo: </h3>
        <select className={style.select} key='types' name="types" onChange={(t)=>selectType(t.target.value)}>
          <option value=''>Seleccionar el Tipo</option>
          {
            types.map(t=>(
              <option key={t.name} value={`${t.name}`}>{`${t.name}`}</option>
            ))
          }
        </select>
        </div>
        <div className={style.filtro}>
          <h3 className={style.h3}>Filtrar por origen: </h3>
          <select className={style.select} key='origen' name="origen" onChange={(o)=>selectOrigen(o.target.value)} >
            <option value="all">Todos</option>
            <option value="org">Original</option>
            <option value="crt">Creado</option>
          </select>
        </div>
        <div className={style.filtro}>
        <h3 className={style.h3}>Filtrar por orden:</h3>
        <select className={style.select} key='orden' name="orden" onChange={(o)=>selectOrden(o.target.value)} >
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
          <option value="strong">Mas fuerte</option>
          <option value="weak">Mas debil</option>
        </select>
        </div>
      </div>
      <div className={style.paginas}>
        {
          paginas.length>0?
          paginas.map(p=>{
            return (
              <button 
                className={style.botonPag}
                key={`${p.page}`} 
                value={p.page+1}
                onClick={(n)=>selectPage(n.target.value)}>
              {`${p.page+1}`}</button>
            )
          })
          :
          console.log('Cargando pokemons.')
        }
      </div>
      <div className={style.pokes}>
        {
          paginas.length>0?
          paginas[pagina-1].pokes.map(p=>(
            <div key={p.id}>
              <Link className={style.pokemon} to={`/home/${p.id}`}>
                <PokeHome id={p.id} name={p.name} image={p.image} type1={p.type1} type2={p.type2}/>
              </Link>
            </div>
          ))
          :
          allPokemons.length>0?
          <p className={style.msj}>No hay pokemons disponibles.</p>:
          <p className={style.msj}>Cargando...</p>
        }
      </div>
    </div>
  )
}

export default Home