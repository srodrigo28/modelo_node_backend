const express = require('express')
const bcrypt = require('bcryptjs')
const Usuario = require('./models/Usuario')
const Conta = require('./models/conta')

const app = express()

app.use(express.json())

// Login
app.post('/login', async (req, res) => {
    //Recebe a consulta do banco
    const usuario = await Usuario.findOne({ 
        //attributes: ['id', 'name', 'email', 'password'],
        where: { email: req.body.email }
    })
    // Valida se o email
    if( usuario === null ){
        return res.status(400).json({
            erro: true,
            mensagem: ":( Erro: usuário não encontrado"
        })
    }
    // Valida a senha
    if(!(await bcrypt.compare(req.body.password, usuario.password))){
        return res.status(400).json({
            erro: true,
            mensagem: " :( Erro: senha inválida"
        })
    }
    // Caso chega aqui passou
    return res.json({
        erro: false,
        mensagem: ":) Seja bem vindo!"
    })
})

// lista todos
app.get("/users", async (req, res) => {
    await Usuario.findAll()
    .then((users) => {
        return res.json({
            erro: false,
            users
        })
    })
    .catch(() => {
        return res.status(400).json({
            erro: true,
            mensagem: "Listar usuários :( errooooooooooooo"
        })
    })
})

// Argumentos e campos
app.get("/users1", async (req, res) => {
    await Usuario.findAll(
        {attributes: ['name'], 
        order: [['id', 'desc']]
        }
    )
    .then((users) => {
        return res.json({
            erro: false,
            users
        })
    })
    .catch(() => {
        return res.status(400).json({
            erro: true,
            mensagem: "Listar usuários :( errooooooooooooo"
        })
    })
})

// Visualizar somente 1
app.get("/user/:id", async (req, res) => {
    const { id } = req.params
    //await Usuario.findAll( { where: {id} } )
    await Usuario.findByPk(id)
    .then((users) => {
        return res.json({
            erro: false,
            users
        })
    })
    .catch(() => {
        return res.status(400).json({
            erro: true,
            mensagem: "Listar usuários :( errooooooooooooo"
        })
    })
})

// Cadastrar
app.post("/user", async (req, res) => {
    const dados = req.body
    dados.password = await bcrypt.hash(dados.password, 4)

    await Usuario.create(dados)
    .then(() => {
        return res.json({
            erro: false,
            mensagem: "Usuario cadastro com sucesso"
        })
    })
    .catch(() => {
        return res.status(400).json({
            erro: true,
            mensagem: ":( errooooooooooooo"
        })
    })
})

// Atualizar
app.put("/user", async (req, res) => {
    const { id } = req.body

    await Usuario.update(req.body, {where: {id} })
    .then(() => {
        return res.json({
            erro: false,
            mensagem: "Usuario atualizado com sucesso"
        })
    })
    .catch(() => {
        return res.status(400).json({
            erro: true,
            mensagem: ":( errooooooooooooo"
        })
    })
})

// Atualizar senha
app.put("/user-senha", async (req, res) => {
    const { id, password } = req.body

    var passwordCrypt = await bcrypt.hash(password, 4)
    await Usuario.update({ password: passwordCrypt}, {where: {id} })
    .then(() => {
        return res.json({
            erro: false,
            mensagem: ":) Senha atualizada com sucesso"
        })
    })
    .catch(() => {
        return res.status(400).json({
            erro: true,
            mensagem: ":( errooooooooooooo"
        })
    })
})

// Apagar
app.delete("/user/:id", async (req, res) => {
    const { id } = req.params

    await Usuario.destroy({ where: {id}})
    .then(() =>{
        return res.status(400).json({
            erro: false,
            mensagem: "Sucesso: :) usuário apagado"
        })
    })
    .catch(() =>{
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: :( usuário não apagado"
        })
    })
})

/************** Contas **************/
app.post("/conta", async (req, res) => {
    const { descricao, valor } = req.body
    await Conta.create(req.body)
    .then(() => {
        return res.json({
            erro: false,
            mensagem: "Conta cadastrada com sucesso"
        })
    })
    .catch(() => {
        return res.status(400).json({
            erro: true,
            mensagem: "Conta :( errooooooooooooo"
        })
    })
})


app.listen(8080, () => {
    console.log("Rodando")
})