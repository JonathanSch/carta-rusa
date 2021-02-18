const express = require('express');
const router = express.Router();
const Partida = require('../models/partida')
const {nanoid} = require('nanoid');

router.get('/find/:id',async (req,res)=>{
    try {
        const partida = await Partida.findOne({partidaId:req.params.id})
        res.send({partida}).status(200);
    } catch (error) {
        res.send(error).status(400);
    }
})

router.post('/crear',async (req,res)=>{
    try {
        const id = nanoid(10);
    const newPartida = new Partida({
        partidaId:id,
    });
    await newPartida.save();
    res.send(newPartida).status(201);
    } catch (error) {
        res.send(error).status(400);
    }
    
}) 

router.patch('/addPlayer',async(req,res)=>{
    try {
        const partidaCambiada = await Partida.updateOne({partidaId:req.body.partidaId,},{$push:{jugadores:req.body.nombre}});
        res.send({partidaCambiada}).status(200);
    } catch (error) {
        res.send({error}).status(400);
    }
})

router.patch('/addCarta',async(req,res)=>{
    try {
        const partida = await Partida.findOne({partidaId:req.body.partidaId})
        const length = partida.cartas.length;
        const carta={
            texto:"",
            numero : length
        };
        const partidaCambiada = await Partida.updateOne({partidaId:req.body.partidaId},{$push:{cartas:carta}})
        res.send({partidaCambiada}).status(200);
    } catch (error) {
        res.send(error).status(400);
    }
})

router.put('/rolarCarta',async (req,res)=>{
    try {
        const nuevoNumeroCarta = parseInt(req.body.numero) + 1;
        const updateCarta = await Partida.updateOne({partidaId:req.body.partidaId,"cartas.numero":req.body.numero},
        {$set:{"cartas.$.numero":nuevoNumeroCarta}});
        res.send({updateCarta}).status(200);
    } catch (error) {
        res.send(error).status(400)
    }
})

router.put('/modificarTexto',async (req,res)=>{
    try{
        const partida = await Partida.findOne({partidaId:req.body.partidaId,"cartas.numero":req.body.numero});
        const texto = partida.cartas[req.body.numero].texto;
        console.log(texto)

        const actualizarTexto = await Partida.updateOne({partidaId:req.body.partidaId,"cartas.numero":req.body.numero},
        {$set:{"cartas.$.texto":texto + " " + req.body.texto}})

        res.send({actualizarTexto}).status(200);
    }
    catch(error){
        res.send(error).status(400);
    }
})

module.exports = router;