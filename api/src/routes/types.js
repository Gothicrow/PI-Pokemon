const { Router } = require('express');
const axios = require('axios');
const { modules } = require('./pokemon');
const {Type} = require('../db')

const router = Router();


router.get('/', async (req,res,next)=>{
    try{
        const arrayTypes = await Type.findAll()
        const typesApi = await axios.get('https://pokeapi.co/api/v2/type')
        if(arrayTypes.length<1){
            const types = [];
            let id = 1
            for(i=0;i<typesApi.data.results.length;i++){
                const type = {
                    id: id,
                    name: typesApi.data.results[i].name
                }
                types.push(type)
                Type.create({
                    id: id++,
                    name: typesApi.data.results[i].name
                })
            }
            res.send(types)
        }else{
            res.send(arrayTypes)
        }
    }catch(error){
        next(error)
    }
})

module.exports = router;