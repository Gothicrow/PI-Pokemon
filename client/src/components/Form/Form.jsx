import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTypes, postForm } from '../../redux/actions/actions'

function Form() {

  const dispatch = useDispatch()
  const types = useSelector((state)=>state.types)
  useEffect(()=>{
    dispatch(getTypes())
  },[dispatch])

  const [name,setName] = useState('')
  const [hp,setHp] = useState(0)
  const [attack, setAttack] = useState(0)
  const [defense, setDefense] = useState(0)
  const [speed, setSpeed] = useState(0)
  const [height, setHeight] = useState(0)
  const [weight, setWeight] = useState(0)
  const [image, setImage] = useState('')
  const [type1,setType1] = useState('')
  const [type2,setType2] = useState('')

  const [error,setError] = useState('')

  const [disabled, setDisabled] = useState(true)

  useEffect(()=>{
    if(name && hp && attack && defense && speed && height && weight && image && type1 && !error){
      setDisabled(false)
    }else{
      setDisabled(true)
    }
  },[name,hp,attack,defense,speed,height,weight,image,type1,error,disabled])

  function validateName(name){
    if(!/^[a-zA-Z]+$/.test(name)){
      setError('El nombre solo debe contener letras.')
    }else{
      setError('')
    }
    setName(name)
  }

  function validateHp(hp){
    if(!/^[0-9]+$/.test(hp)){
      setError('La vida solo debe contener numeros.')
    }else{
      setError('')
    }
    setHp(hp)
  }

  function validateAttack(attack){
    if(!/^[0-9]+$/.test(attack)){
      setError('El ataque solo debe contener numeros.')
    }else{
      setError('')
    }
    setAttack(attack)
  }

  function validateDefense(defense){
    if(!/^[0-9]+$/.test(defense)){
      setError('La defensa solo debe contener numeros.')
    }else{
      setError('')
    }
    setDefense(defense)
  }

  function validateSpeed(speed){
    if(!/^[0-9]+$/.test(speed)){
      setError('La velocidad solo debe contener numeros.')
    }else{
      setError('')
    }
    setSpeed(speed)
  }

  function validateHeight(height){
    if(!/^[0-9]+$/.test(height)){
      setError('La altura solo debe contener numeros.')
    }else{
      setError('')
    }
    setHeight(height)
  }

  function validateWeight(weight){
    if(!/^[0-9]+$/.test(weight)){
      setError('El peso solo debe contener numeros.')
    }else{
      setError('')
    }
    setWeight(weight)
  }

  function validateImage(image){
    if(!/(https?:\/\/.*\.(?:png|jpg|jpeg|png))/.test(image)){
      setError('La imagen debe ser una URL con formato PNG o JPG.')
    }else{
      setError('')
    }
    setImage(image)
  }

  function validateType1(type1){
    const esTipo = types.find(t=>t.name===type1)
    if(!esTipo){
      setError('Debes seleccionar un tipo valido')
    }else{
      setError('')
    }
    setType1(type1)
  }

  if(type2){
    
  }
  function validateType2(type2){
    if(type2===''){
      setType2(type2)
    }else{
      const esTipo = types.find(t=>t.name===type2)
      if(!esTipo){
        setError('Debes seleccionar un tipo valido')
      }else{
        setError('')
      }
      setType2(type2)
    }
    
  }

  function handleOnSubmit(e){
    e.preventDefault()
    if(name && hp && attack && defense && speed && height && weight && image && type1 && !error){
      if(type2.length>0){
        const newPokemon ={
          name: name,
          hp: hp,
          attack: attack,
          defense: defense,
          speed: speed,
          height: height,
          weight: weight,
          image: image,
          type1: type1,
          type2: type2
        }
        dispatch(postForm(newPokemon))
      }else{
        const newPokemon ={
          name: name,
          hp: hp,
          attack: attack,
          defense: defense,
          speed: speed,
          height: height,
          weight: weight,
          image: image,
          type1: type1
        }
        dispatch(postForm(newPokemon))
      }
    }else{
      alert('Debes completar todos los campos obligatorios')
    }
  }

  return (
    <div>
    {
      types.length>0?
      <form onSubmit={handleOnSubmit}>
          <label>
            Nombre: 
            <input 
            key='name'
            type="text" 
            name="name" 
            value={name}
            placeholder='Ingrese el nombre del Pokemon' 
            onChange={(e)=> validateName(e.target.value)} 
            required
            />
          </label>
        <br/>
          <label>
            Vida: 
            <input 
            key='hp'
            type="number" 
            name="hp" 
            min={0}
            value={hp}
            placeholder='Ingrese un valor numerico para la vida' 
            onChange={(e)=> validateHp(e.target.value)}
            required
            />
          </label>
        <br/>
          <label>
            Fuerza: 
            <input 
            key='attack'
            type="number" 
            name="attack" 
            min={0}
            value={attack}
            placeholder='Ingrese un valor numerico para el ataque' 
            onChange={(e)=> validateAttack(e.target.value)} 
            required
            />
          </label>
        <br/>
          <label>
            Defensa: 
            <input 
            key='defense'
            type="number" 
            name="defense" 
            min={0}
            value={defense}
            placeholder='Ingrese un valor numerico para la defensa' 
            onChange={(e)=> validateDefense(e.target.value)} 
            required
            />
          </label>
        <br/>
          <label>
            Velocidad: 
            <input 
            key='speed'
            type="number" 
            name="speed" 
            min={0}
            value={speed}
            placeholder='Ingrese un valor numerico para la velocidad' 
            onChange={(e)=> validateSpeed(e.target.value)} 
            required
            />
          </label>
        <br/>
          <label>
            Altura: 
            <input 
            key='height'
            type="number" 
            name="height" 
            min={0}
            value={height}
            placeholder='Ingrese un valor numerico para la altura' 
            onChange={(e)=> validateHeight(e.target.value)} 
            required
            />
          </label>
        <br/>
          <label>
            Peso: 
            <input 
            key='weight'
            type="number" 
            name="weight" 
            min={0}
            value={weight}
            placeholder='Ingrese un valor numerico para el peso' 
            onChange={(e)=> validateWeight(e.target.value)} 
            required
            />
          </label>
        <br/>
          <label>
            Imagen: 
            <input 
            key='image'
            type="text" 
            name="image" 
            min={0}
            value={image}
            placeholder='URL de la imagen en formato png o jpg' 
            onChange={(e)=> validateImage(e.target.value)} 
            required
            />
          </label>
        <br/>
          <label>
            Tipo 1: 
            <select key='type1' name="type1" id="" onChange={(e)=>validateType1(e.target.value)} required>
              <option value=''>Seleccionar el Tipo</option>
              {
                types.map(t=>(
                  <option key={t.name} value={`${t.name}`}>{`${t.name}`}</option>
                ))
              }
            </select>
          </label>
        <br/>
          <label>
            Tipo 2: 
            <select key='type2' name="type2" id="" onChange={(e)=>validateType2(e.target.value)}>
                <option value=''>Seleccionar el tipo</option>
              {
                types.map(t=>(
                  <option key={t.name} value={`${t.name}`}>{`${t.name}`}</option>
                ))
              }
            </select>
          </label>
        <br/>
        <button disabled={disabled} type="submit">Enviar</button>
      </form>
      :
      <p>Cargando...</p>
    }
      
    </div>
  )
}

export default Form