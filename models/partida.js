const mongoose = require('mongoose');

const partidaSchema = new mongoose.Schema({
    partidaId:{
        type:String,
        required:true,
    },
    jugadores:{
        type:Array,
        default:[],
    },
    cartas:{
        type:Array,
        default:[],
    }
})

const partida = mongoose.model('Partida',partidaSchema);

module.exports = partida;