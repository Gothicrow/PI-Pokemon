import React from 'react'
import { Link } from 'react-router-dom'

function HomeButton() {
  return (
    <div>
        <Link to={'/home'}>
            <h2>Home</h2>
        </Link>
    </div>
  )
}

export default HomeButton