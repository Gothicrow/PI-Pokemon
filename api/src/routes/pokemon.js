const { Router } = require('express');
const axios = require('axios');
const {Pokemon,Type} = require('../db')

const router = Router();

router.get('/',async (req,res,next)=>{
    try{
        const {name} = req.query;
        if(name){
            const pokeapi = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=40')
            let pokename = pokeapi.data.results.find(e => e.name === name)
            let pokemon = ''
            if(!pokename){
                let pokeBD = await Pokemon.findAll({
                    where: {
                        name: name
                    },
                    include:{
                        model: Type
                    }
                })
                if(pokeBD[0].types.length>1){
                    pokemon = {
                        id: pokeBD[0].id,
                        name: pokeBD[0].name,
                        hp: pokeBD[0].hp,
                        attack: pokeBD[0].attack,
                        defense: pokeBD[0].defense,
                        speed: pokeBD[0].speed,
                        height: pokeBD[0].height,
                        weight: pokeBD[0].weight,
                        image: pokeBD[0].image,
                        type1: pokeBD[0].types[0].dataValues.name,
                        type2: pokeBD[0].types[1].dataValues.name
                    }
                }else{
                    pokemon = {
                        id: pokeBD[0].id,
                        name: pokeBD[0].name,
                        hp: pokeBD[0].hp,
                        attack: pokeBD[0].attack,
                        defense: pokeBD[0].defense,
                        speed: pokeBD[0].speed,
                        height: pokeBD[0].height,
                        weight: pokeBD[0].weight,
                        image: pokeBD[0].image,
                        type1: pokeBD[0].types[0].dataValues.name
                    }
                }
                if(!pokemon){
                    res.send('No existe el pokemon')
                }else{
                    res.send(pokemon)
                }
            }else{
                const pokeinfo = await axios.get(pokename.url)
                if(pokeinfo.data.types.length>1){
                    pokemon = {
                        id: pokeinfo.data.id,
                        name: pokeinfo.data.name,
                        hp: pokeinfo.data.stats[0].base_stat,
                        attack: pokeinfo.data.stats[1].base_stat,
                        defense: pokeinfo.data.stats[2].base_stat,
                        speed: pokeinfo.data.stats[5].base_stat,
                        height: pokeinfo.data.height,
                        weight: pokeinfo.data.weight,
                        image: pokeinfo.data.sprites.other.dream_world.front_default,
                        type1: pokeinfo.data.types[0].type.name,
                        type2: pokeinfo.data.types[1].type.name
                    }
                    res.send(pokemon)
                }else{
                    pokemon = {
                        id: pokeinfo.data.id,
                        name: pokeinfo.data.name,
                        hp: pokeinfo.data.stats[0].base_stat,
                        attack: pokeinfo.data.stats[1].base_stat,
                        defense: pokeinfo.data.stats[2].base_stat,
                        speed: pokeinfo.data.stats[5].base_stat,
                        height: pokeinfo.data.height,
                        weight: pokeinfo.data.weight,
                        image: pokeinfo.data.sprites.other.dream_world.front_default,
                        type1: pokeinfo.data.types[0].type.name
                    }
                    res.send(pokemon)
                }
            }
        }else{
            const pokemons = [];
            const pokeapi = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=40')
            const pokeBD = await Pokemon.findAll({
                include:{
                    model: Type
                }
            })
            
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
            const pokemonsBD = pokeBD.map(p=>{
                if(p.types.length>1){
                    return{
                        id: p.dataValues.id,
                        name: p.dataValues.name,
                        hp: p.dataValues.hp,
                        attack: p.dataValues.attack,
                        defense: p.dataValues.defense,
                        speed: p.dataValues.speed,
                        height: p.dataValues.height,
                        weight: p.dataValues.weight,
                        image: p.dataValues.image,
                        type1: p.dataValues.types[0].dataValues.name,
                        type2: p.dataValues.types[1].dataValues.name
                    }
                }else{
                    return{
                        id: p.dataValues.id,
                        name: p.dataValues.name,
                        hp: p.dataValues.hp,
                        attack: p.dataValues.attack,
                        defense: p.dataValues.defense,
                        speed: p.dataValues.speed,
                        height: p.dataValues.height,
                        weight: p.dataValues.weight,
                        image: p.dataValues.image,
                        type1: p.dataValues.types[0].dataValues.name
                    }
                }
            })
            const pokeAll = pokemons.concat(pokemonsBD)
            res.send(pokeAll)
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
        }else{
            let pokeBD = await Pokemon.findAll({
                where: {
                    id: id
                },
                include:{
                    model: Type
                }
            })
            if(pokeBD[0].types.length>1){
                pokemon = {
                    id: pokeBD[0].id,
                    name: pokeBD[0].name,
                    hp: pokeBD[0].hp,
                    attack: pokeBD[0].attack,
                    defense: pokeBD[0].defense,
                    speed: pokeBD[0].speed,
                    height: pokeBD[0].height,
                    weight: pokeBD[0].weight,
                    image: pokeBD[0].image,
                    type1: pokeBD[0].types[0].dataValues.name,
                    type2: pokeBD[0].types[1].dataValues.name
                }
                res.send(pokemon)
            }else{
                pokemon = {
                    id: pokeBD[0].id,
                    name: pokeBD[0].name,
                    hp: pokeBD[0].hp,
                    attack: pokeBD[0].attack,
                    defense: pokeBD[0].defense,
                    speed: pokeBD[0].speed,
                    height: pokeBD[0].height,
                    weight: pokeBD[0].weight,
                    image: pokeBD[0].image,
                    type1: pokeBD[0].types[0].dataValues.name
                }
                res.send(pokemon)
            }
            res.send('ID invalido')
        }
    }catch(error){
        next(error)
    }
})

router.post('/', async (req,res,next)=>{
    try{
        const {name,hp,attack,defense,speed,height,weight,image,type1,type2} = req.body
        
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
            let type = await Type.findAll({
                where:{
                    name: type1
                }
            })
            await newPokemon.addType(type[0].dataValues.id)
            if(type2){ 
                type = await Type.findAll({
                    where:{
                        name: type2
                    }
                })
                await newPokemon.addType(type[0].dataValues.id)
            }
            res.send('Pokemon creado correctamente.')
        }
        
    }catch(error){
        next(error)
    }
})

module.exports = router;