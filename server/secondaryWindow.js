const { BrowserWindow } = require('electron');
const path = require('path');
function createSecondaryWindow() {
    let secondaryWindow = new BrowserWindow({
        width: 800,
        height: 1200,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')  // Asegúrate de ajustar la ruta según tu estructura de directorios
        }
    });

    // Carga el archivo HTML o una URL para la ventana
    secondaryWindow.loadURL('http://localhost:8081/lista-turnos');

    // Opcional: Abre las herramientas de desarrollo.
    // secondaryWindow.webContents.openDevTools();

    // Evento al cerrar la ventana
    secondaryWindow.on('closed', () => {
        secondaryWindow = null;
    });
}

module.exports = { createSecondaryWindow };
