const express = require('express')
const axios = require('axios')
require('dotenv').config()

const app = express()
const porta = process.env.PORTA

app.use(express.static('public'));

app.get('/tempo', async (req, res) => {
    const cidade = req.query.cidade
    const chaveApi = process.env.CHAVE_API
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&appid=${chaveApi}`

    try {
        const response = await axios.get(apiUrl)
        const data = response.data

        res.json({
            city: data.name,
            temperature: data.main.temp,
            description: data.weather[0].description,
            humidity: data.main.humidity
        })
    } catch (erro) {
        res.status(404).json({ erro: 'Cidade não existente' })
    }
})

app.listen(porta, () => {
    console.log('Servidor rodando')
    console.log(`http://localhost:${porta}`)
})