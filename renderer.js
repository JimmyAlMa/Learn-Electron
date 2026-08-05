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

const openFileButton = document.querySelector('#openFile')
const saveFileButton = document.querySelector('#saveFile')
const status = document.querySelector('#statusText')
const textArea = document.querySelector('#textArea')

openFileButton.addEventListener('click', async () => {
    const response = await window.fileApi.openFile()

    if (!response.canceled) {
        textArea.value = response.content
        status.innerText = `Status: Open file: ${response.filePath}`
    } else {
        status.innerText = `Status: Open file canceled`
    }
})

saveFileButton.addEventListener('click', async () => {
    const text = textArea.value
    const response = await window.fileApi.saveFile(text)

    if (!response.success) {
        status.innerText = `Status: ${response.reason}`
    } else {
        status.innerText = `Status: File successfully saved at: ${response.filePath}`
    }
})