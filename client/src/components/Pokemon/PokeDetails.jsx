import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { getDetails, clearPage } from '../../redux/actions/actions'
import style from './PokeDetails.module.css'

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

  function volver(e){
    e.preventDefault()
    window.history.back()
  }

  return (
    <div className={style.main}>
      {
        p.name ?
          p.type2 ?
          <div className={style.contenido}>
            <div className={style.izq}>
              <h1 className={style.name}>{p.name}</h1>
              <h5 className={style.id}>id: {p.id}</h5>
              <img className={style.img} src={p.image} alt="" />
            </div>
            <div className={style.der}>
              <div className={style.button}>
                <Link className={style.return} type="button" onClick={e=>volver(e)} to='' >x</Link>
              </div>
              <div className={style.stats}>
                <div className={style.stat}>
                  <h3 className={style.h3}>Vida: {p.hp}</h3>
                  <h3 className={style.h3}>Fuerza: {p.attack}</h3>
                  <h3 className={style.h3}>Defensa: {p.defense}</h3>
                </div>
                <div className={style.stat}>
                  <h3 className={style.h3}>Velocidad: {p.speed}</h3>
                  <h3 className={style.h3}>Altura: {p.height}</h3>
                  <h3 className={style.h3}>Peso: {p.weight}</h3>
                </div>
                <div className={style.stat}>
                  <h3 className={style.h3}>Tipo 1: {p.type1}</h3>
                  <h3 className={style.h3}>Tipo 2: {p.type2}</h3>
                </div>
              </div>
            </div>
          </div>
          : 
          <div className={style.contenido}>
            <div className={style.izq}>
              <h1 className={style.name}>{p.name}</h1>
              <h5 className={style.id}>id: {p.id}</h5>
              <img className={style.img} src={p.image} alt="" />
            </div>
            <div className={style.der}>
              <div className={style.button}>
                <Link className={style.return} type="button" onClick={e=>volver(e)} to=''>x</Link>
              </div>
              <div className={style.stats}>
                <div className={style.stat}>
                  <h3 className={style.h3}>Vida: {p.hp}</h3>
                  <h3 className={style.h3}>Fuerza: {p.attack}</h3>
                  <h3 className={style.h3}>Defensa: {p.defense}</h3>
                </div>
                <div className={style.stat}>
                  <h3 className={style.h3}>Velocidad: {p.speed}</h3>
                  <h3 className={style.h3}>Altura: {p.height}</h3>
                  <h3 className={style.h3}>Peso: {p.weight}</h3>
                </div>
                <div className={style.stat}>
                  <h3 className={style.h3}>Tipo 1: {p.type1}</h3>
                </div>
              </div>
            </div>
          </div>
        :
        <p>Cargando...</p>
      }
    </div>
  )
}

export default PokeDetails