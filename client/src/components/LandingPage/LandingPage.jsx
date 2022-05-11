import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import style from './LandingPage.module.css'

export default class LandingPage extends Component {
  render() {
    return (
      <div className={style.background} >
        <Link to='/home'>
          <button className={style.button} >Comenzar</button>
        </Link>
      </div>
    )
  }
}
