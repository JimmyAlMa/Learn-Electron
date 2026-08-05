const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('api', {
    getNodeVersion: () => ipcRenderer.invoke('get-node-version'),
    getSystemInfo: () => ipcRenderer.invoke('get-system-info')
})

contextBridge.exposeInMainWorld('fileApi', {
    openFile: () => ipcRenderer.invoke('open-file'),
})