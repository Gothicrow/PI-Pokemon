const { Router } = require('express');
const axios = require('axios');
const {Pokemon} = require('../db')

const router = Router();

router.get('/',async (req,res,next)=>{
    try{
        const {name} = req.query;
        if(name){
            const pokeapi = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=40')
            const pokename = pokeapi.data.results.find(e => e.name === name)

            if(!pokename){
                res.send('No existe el pokemon')
            }else{
                const pokemon = await axios.get(pokename.url)

                if(pokemon.data.types.length>1){
                    const pokeinfo = {
                        id: pokemon.data.id,
                        name: pokemon.data.name,
                        hp: pokemon.data.stats[0].base_stat,
                        attack: pokemon.data.stats[1].base_stat,
                        defense: pokemon.data.stats[2].base_stat,
                        speed: pokemon.data.stats[5].base_stat,
                        height: pokemon.data.height,
                        weight: pokemon.data.weight,
                        image: pokemon.data.sprites.other.dream_world.front_default,
                        type1: pokemon.data.types[0].type.name,
                        type2: pokemon.data.types[1].type.name
                    }
                    res.send(pokeinfo)

                }else{
                    const pokeinfo = {
                        id: pokemon.data.id,
                        name: pokemon.data.name,
                        hp: pokemon.data.stats[0].base_stat,
                        attack: pokemon.data.stats[1].base_stat,
                        defense: pokemon.data.stats[2].base_stat,
                        speed: pokemon.data.stats[5].base_stat,
                        height: pokemon.data.height,
                        weight: pokemon.data.weight,
                        image: pokemon.data.sprites.other.dream_world.front_default,
                        type1: pokemon.data.types[0].type.name
                    }
                    res.send(pokeinfo)

                }
            }
        }else{
            const pokemons = [];
            const pokeapi = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=40')
            
            for(i=0;i<pokeapi.data.results.length;i++){
                const pokemon = await axios.get(pokeapi.data.results[i].url)

                if(pokemon.data.types.length>1){
                    const pokeinfo = {
                        id: pokemon.data.id,
                        name: pokemon.data.name,
                        hp: pokemon.data.stats[0].base_stat,
                        attack: pokemon.data.stats[1].base_stat,
                        defense: pokemon.data.stats[2].base_stat,
                        speed: pokemon.data.stats[5].base_stat,
                        height: pokemon.data.height,
                        weight: pokemon.data.weight,
                        image: pokemon.data.sprites.other.dream_world.front_default,
                        type1: pokemon.data.types[0].type.name,
                        type2: pokemon.data.types[1].type.name
                    }
                    pokemons.push(pokeinfo)
                }else{
                    const pokeinfo = {
                        id: pokemon.data.id,
                        name: pokemon.data.name,
                        hp: pokemon.data.stats[0].base_stat,
                        attack: pokemon.data.stats[1].base_stat,
                        defense: pokemon.data.stats[2].base_stat,
                        speed: pokemon.data.stats[5].base_stat,
                        height: pokemon.data.height,
                        weight: pokemon.data.weight,
                        image: pokemon.data.sprites.other.dream_world.front_default,
                        type1: pokemon.data.types[0].type.name
                    }
                    pokemons.push(pokeinfo)
                }
            }
            res.send(pokemons)
        }
    }catch(error){
        next(error)
    }
})
 
router.get('/:id', async (req,res,next)=>{
    try{
        const {id} = req.params;
        if(id>0&&id<899||id>10000&&id<10229){
            const pokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
            const pokeinfo = {
                id: pokemon.data.id,
                name: pokemon.data.name,
                hp: pokemon.data.stats[0].base_stat,
                attack: pokemon.data.stats[1].base_stat,
                defense: pokemon.data.stats[2].base_stat,
                speed: pokemon.data.stats[5].base_stat,
                height: pokemon.data.height,
                weight: pokemon.data.weight,
                image: pokemon.data.sprites.other.dream_world.front_default,
                type1: pokemon.data.types[0].type.name
            }
            res.send(pokeinfo)
        }else{
            res.send('ID invalido')
        }
    }catch(error){
        next(error)
    }
})

router.post('/', async (req,res,next)=>{
    try{
        const {name,hp,attack,defense,speed,height,weight,image,type1,type2} = req.body

        console.log(req)
        console.log(name,hp,attack,defense,speed,height,weight,image,type1,type2)

        if(!name||!hp||!attack||!defense||!speed||!height||!weight||!image||!type1){
            res.send('Hay un campo invalido.')
        }else{
            const newPokemon = await Pokemon.create({
                name,
                hp,
                attack,
                defense,
                speed,
                height,
                weight,
                image
            })
            res.send('Pokemon creado correctamente.')
        }
        
    }catch(error){
        next(error)
    }
})

module.exports = router;