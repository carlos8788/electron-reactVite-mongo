const { ipcMain } = require('electron');
const NotaController = require('../controller/nota');


const setupNotaIPC = () => {

  ipcMain.handle('get-notas', async (event) => {
    try {
      const users = await NotaController.getTurnos()
      return JSON.stringify(users);
    } catch (error) {
      throw JSON.stringify(new Error(error));
    }
  });

  ipcMain.handle('get-notas', async (event, id) => {
    try {

      const turno = await NotaController.getTurno(id)
      return JSON.stringify(turno);
    } catch (error) {
      throw JSON.stringify(new Error(error));
    }
  });

  ipcMain.handle('create-nota', async (event, data) => {
    try {
      const turnoData = JSON.parse(data);
      console.log(turnoData)
      const turno = await NotaController.createTurno(turnoData)
      return JSON.stringify(turno);
    } catch (error) {
      throw JSON.stringify(new Error(error));
    }
  });

  ipcMain.handle('create-notas', async (event, dataString) => {
    try {
      const turnosData = JSON.parse(dataString);
      const turnos = await NotaController.createTurnos(turnosData)
      return JSON.stringify(turnos);
    } catch (error) {
      throw JSON.stringify(new Error(error));
    }
  });

  ipcMain.handle('update-nota', async (event, data) => {
    try {
      const turnoData = JSON.parse(data);
      console.log(turnoData)
      const { _id, ...turnoInfo } = turnoData
      const user = await NotaController.updateTurno(_id, turnoInfo)
      return JSON.stringify(user);
    } catch (error) {
      throw JSON.stringify(new Error(error));
    }
  });

  ipcMain.handle('delete-nota', async (event, id) => {
    try {
      const result = await NotaController.deleteTurno(id)
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
