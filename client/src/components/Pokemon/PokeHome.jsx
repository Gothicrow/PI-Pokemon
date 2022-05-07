import React from 'react'
import { Link } from 'react-router-dom'

function PokeHome({id,name,image,type1,type2}) {
  return (
    <div>
      <img src={image} alt="" />
        <Link to={`/home/${id}`}>
          <h2>{name}</h2>
        </Link>
        <h4>{type1} {type2}</h4>
    </div>
  )
}

export default PokeHome