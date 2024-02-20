const { ipcMain } = require('electron');
const NotaController = require('../controller/nota');


const setupNotaIPC = () => {

  ipcMain.handle('get-notas', async (event) => {
    try {
      const notas = await NotaController.getNotas()
      return JSON.stringify(notas);
    } catch (error) {
      throw JSON.stringify(new Error(error));
    }
  });

  ipcMain.handle('get-nota', async (event, id) => {
    try {

      const nota = await NotaController.getNota(id)
      return JSON.stringify(nota);
    } catch (error) {
      throw JSON.stringify(new Error(error));
    }
  });

  ipcMain.handle('create-nota', async (event, data) => {
    try {
      const notaData = JSON.parse(data);
      console.log(notaData)
      const nota = await NotaController.createNota(notaData)
      return JSON.stringify(nota);
    } catch (error) {
      throw JSON.stringify(new Error(error));
    }
  });

  ipcMain.handle('create-notas', async (event, dataString) => {
    try {
      const notasData = JSON.parse(dataString);
      const turnos = await NotaController.createNotas(notasData)
      return JSON.stringify(turnos);
    } catch (error) {
      throw JSON.stringify(new Error(error));
    }
  });

  ipcMain.handle('update-nota', async (event, data) => {
    try {
      const notaData = JSON.parse(data);
      console.log(notaData)
      const { _id, ...notaInfo } = notaData
      const nota = await NotaController.updateNota(_id, notaInfo)
      return JSON.stringify(nota);
    } catch (error) {
      throw JSON.stringify(new Error(error));
    }
  });

  ipcMain.handle('delete-nota', async (event, id) => {
    try {
      const result = await NotaController.deleteNota(id)
      return JSON.stringify(result);
    } catch (error) {
      throw JSON.stringify(new Error(error));
    }
  });

  ipcMain.handle('get-turno-nota', async (event, data) => {
    try {
      const result = await NotaController.findByField(data)
      return JSON.stringify(result);
    } catch (error) {
      console.log(error);
      throw JSON.stringify(new Error(error));
    }
  });
};


module.exports = setupNotaIPC;
