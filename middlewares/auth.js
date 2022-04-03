require('dotenv').config()
const jwt = require('jsonwebtoken')
const { promisify } = require('util')

module.exports = {
    eAdmin: async function(req, res, next){
        const autHeader = req.headers.authorization
        const [barer, token ] = autHeader.split(' ');
    
        if(!token){
           return res.status(400).json({
               erro: true,
               mensagem: "Erro token não encontrado"
           })
        }
        try{
            const decoded = await promisify(jwt.verify)(token, process.env.SECRET)
            req.usuarioID = decoded.id;
            return next()
        }catch(err){
            return res.status(400).json({
                erro: true,
                mensagem: "Erro token inválido"
            })
        }
    }
}