const firstButton = document.querySelector('#firstButton')
const firstResult = document.querySelector('#firstResult') // Text

firstButton.addEventListener('click', async () => {
    const version = await window.api.getNodeVersion()

    firstResult.innerText = version
})

const secondButton = document.querySelector('#secondButton')
const secondResult = document.querySelector('#secondResult') // List

secondButton.addEventListener('click', async () => {
    const data = await window.api.getSystemInfo()
    
    secondResult.innerHTML = ''

    Object.entries(data).forEach(([key, value]) => {
        const li = document.createElement('li')
        li.textContent = `${key}: ${value}`
        secondResult.appendChild(li)
    })
})