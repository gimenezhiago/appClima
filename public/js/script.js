const cidadeBtn = document.querySelector('#cidade-btn')

cidadeBtn.addEventListener('click', async function getTempo() {
    const cidade = document.querySelector('#cidade-input')
    const tempoRes = document.querySelector('#tempo-res')

    if (!cidade.value) {
        tempoRes.innerHTML = '<p>Insira uma cidade</p>'
        return
    }

    try {
        const response = await fetch(`/tempo?city=${cidade}`)
        const data = await response.json()

        if (data.erro) {
            tempoRes.innerHTML = `<p>${data.erro}</p>`
        } else {
            tempoRes.innerHTML = `
                        <h2>Clima em ${data.city}</h2>
                        <p>Temperatura: ${data.temperature}°C</p>
                        <p>Descrição: ${data.description}</p>
                        <p>Umidade: ${data.humidity}%</p>`
        }
    } catch (erro) {
        tempoRes.innerHTML = '<p>Erro ao buscar os dados</p>'
    }
    
})