const firstButton = document.querySelector('#firstButton')
const firstResult = document.querySelector('#firstResult')

firstButton.addEventListener('click', async () => {
    const version = await window.api.getNodeVersion()

    firstResult.innerText = version
})