const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('api', {
    getNodeVersion: () => ipcRenderer.invoke('get-node-version')
})