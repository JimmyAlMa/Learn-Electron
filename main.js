const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

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
        "node": process.versions.node,
        "chrome": process.versions.chrome,
        "version": process.versions.electron,
        "platfrom": process.versions.platfrom
    }
})

app.whenReady().then(createWindow)