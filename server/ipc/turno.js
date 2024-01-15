const { ipcMain } = require('electron');
const TurnoController = require('../controller/turno');


const setupTurnoIPC = () => {

  ipcMain.handle('get-turnos', async (event) => {
    // try {
      const users = await TurnoController.getTurnos()
      return JSON.stringify(users);
    // } catch (error) {
      // throw JSON.stringify(new Error(error));
    // }
  });

  ipcMain.handle('get-turno', async (event, id) => {
    try {

      const turno = await TurnoController.getTurno(id)
      return JSON.stringify(turno);
    } catch (error) {
      throw JSON.stringify(new Error(error));
    }
  });

  ipcMain.handle('create-turno', async (event, data) => {
    // try {
      const turnoData = JSON.parse(data);
      console.log(turnoData)
      const turno = await TurnoController.createTurno(turnoData)
      return JSON.stringify(turno);
    // } catch (error) {
    //   throw JSON.stringify(new Error(error));
    // }
  });

  ipcMain.handle('create-turnos', async (event, dataString) => {
    try {
      const turnosData = JSON.parse(dataString);
      const turnos = await TurnoController.createTurnos(turnosData)
      return JSON.stringify(turnos);
    } catch (error) {
      throw JSON.stringify(new Error(error));
    }
  });

  ipcMain.handle('update-turno', async (event, data) => {
    try {
      const turnoData = JSON.parse(data);
      console.log(turnoData)
      const { _id, ...turnoInfo } = turnoData
      const user = await TurnoController.updateTurno(_id, turnoInfo)
      return JSON.stringify(user);
    } catch (error) {
      throw JSON.stringify(new Error(error));
    }
  });

  ipcMain.handle('delete-turno', async (event, id) => {
    try {
      const result = await TurnoController.deleteTurno(id)
      return JSON.stringify(result);
    } catch (error) {
      throw JSON.stringify(new Error(error));
    }
  });

  ipcMain.handle('get-turno-filter', async (event, data) => {
    try {
      const result = await TurnoController.findByField(data)
      return JSON.stringify(result);
    } catch (error) {
      console.log(error);
      throw JSON.stringify(new Error(error));
    }
  });
};


module.exports = setupTurnoIPC;
