import React from 'react'
import style from './PokeHome.module.css'

function PokeHome({id,name,image,type1,type2}) {
  return (
      <div className={style.div} >
        <img className={style.image} src={image} alt=""/>
        <h2 className={style.name} >{name}</h2>
        {
          type2?
        <div className={style.types}>
          <h4 className={style.type}>{type1}</h4>
          <h4 className={style.type}>{type2}</h4>
        </div>:
        <div className={style.types}>
          <h4 className={style.type}>{type1}</h4>
        </div>
        }
      </div>
  )
}

export default PokeHome