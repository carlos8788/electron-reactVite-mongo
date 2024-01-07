const electron = require('electron');
const connectToDatabase = require('./db/connect');
const setupUserIPC = require('./ipc/user');
const path = require('path');
const setupObraSocialIPC = require('./ipc/obraSocial');

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow;
function createWindow() {
    // Crear la ventana del navegador.

    // setupUserIPC();
    mainWindow = new BrowserWindow({
        width: 1280,
        height: 720,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true, // Mantén activada la aislación de contexto
            // nodeIntegration: false, // No es necesario si contextIsolation está activado
        }
    });
    setupUserIPC();
    setupObraSocialIPC();

    if (app.isPackaged) {
        // Cargar la versión compilada de index.html en producción.
        mainWindow.loadFile('dist/index.html');
    } else {
        // Cargar desde el servidor de desarrollo de Vite.
        mainWindow.loadURL('http://localhost:5173');
        mainWindow.webContents.openDevTools('detach');
    }

    // Emitido cuando la ventana es cerrada.
    mainWindow.on('closed', () => {
        // Desreferencia el objeto de la ventana, usualmente se almacenarían las ventanas
        // en un array si tu aplicación soporta múltiples ventanas, este es el momento
        // cuando deberías borrar el elemento correspondiente.
        mainWindow = null;
    });

}

// Este método será llamado cuando Electron haya finalizado
// la inicialización y esté listo para crear ventanas del navegador.
// Algunas APIs solo pueden ser usadas después de que este evento ocurra.
app.on('ready', createWindow);

// Salir cuando todas las ventanas estén cerradas.
app.on('window-all-closed', () => {
    // En macOS es común para las aplicaciones y sus barras de menú
    // que estén activas hasta que el usuario salga explícitamente con Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // En macOS es común volver a crear una ventana en la aplicación cuando el
    // icono del dock es clickeado y no hay otras ventanas abiertas.
    if (mainWindow === null) {
        createWindow();
    }
});

// En este archivo puedes incluir el resto del código específico del proceso principal de tu aplicación.
// También puedes ponerlos en archivos separados y requerirlos aquí.
app.whenReady()
    .then(() => {
        connectToDatabase();

    })
