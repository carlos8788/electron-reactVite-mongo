// preload.js
const { contextBridge, ipcRenderer } = require('electron');
console.log('Se cargó el preload')
contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    send: (channel, data) => ipcRenderer.send(channel, data),
    on: (channel, func) => ipcRenderer.on(channel, (event, ...args) => func(...args)),
    once: (channel, func) => ipcRenderer.once(channel, (event, ...args) => func(...args)),
    removeAllListeners: (channel) => ipcRenderer.removeAllListeners(channel),
    invoke: (channel, data) => ipcRenderer.invoke(channel, data),
  }
});
