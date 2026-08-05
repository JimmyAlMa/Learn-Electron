const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const path = require('path')
const fs = require('fs')

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false
        }
    })

    win.loadFile('index.html')
}

ipcMain.handle('get-node-version', async (event) => {
    return process.versions.node
})

ipcMain.handle('get-system-info', async (event) => {
    return {
        node: process.versions.node,
        chrome: process.versions.chrome,
        version: process.versions.electron,
        platfrom: process.platform
    }
})

ipcMain.handle('open-file', async () => {
    const result = await dialog.showOpenDialog({
        properties: ['openFile'],
        filters: [{ name: 'Text files', extensions: ['txt', 'json'] }]
    })

    // If user cancel
    if (result.canceled || result.filePaths.length === 0) {
        return { canceled: true }
    }

    const filePath = result.filePaths[0]

    const dataFile = fs.readFileSync(filePath, 'utf-8')

    return { canceled: false, filePath, content: dataFile }
})

app.whenReady().then(createWindow)