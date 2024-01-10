const { ipcMain } = require('electron');
const ObraSocialController = require('../controller/obraSocial');

const setupObraSocialIPC = () => {

  ipcMain.handle('get-obraSocials', async (event) => {
    try {

      const obraSocials = await ObraSocialController.getOSocials();
      return JSON.stringify(obraSocials);
    } catch (error) {
      throw JSON.stringify(new Error(error));
    }
  });

  ipcMain.handle('get-obraSocial', async (event, obraSocial) => {
    try {

      const obraSocialResult = await ObraSocialController.getOneOSocial(obraSocial);
      return JSON.stringify(obraSocialResult);
    } catch (error) {
      throw JSON.stringify(new Error(error));
    }
  });

  ipcMain.handle('create-obraSocial', async (event, obraSocialDataString) => {
    try {
      const obraSocialData = JSON.parse(obraSocialDataString);
      const obraSocial = await ObraSocialController.createOSocial(obraSocialData);
      return JSON.stringify(obraSocial);
    } catch (error) {
      throw JSON.stringify(new Error(error));
    }
  });

  ipcMain.handle('update-obraSocial', async (event, id, obraSocialInfo) => {
    try {
      const obraSocialData = JSON.parse(obraSocialInfo);
      const obraSocial = await ObraSocialController.updateOSocial(id, obraSocialData);
      return JSON.stringify(obraSocial);
    } catch (error) {
      throw JSON.stringify(new Error(error));
    }
  });

  ipcMain.handle('delete-obraSocial', async (event, id) => {
    try {
      const result = await ObraSocialController.deleteOSocial(id);
      return JSON.stringify(result);
    } catch (error) {
      throw JSON.stringify(new Error(error));
    }
  });

  ipcMain.handle('get-obraSocial-filter', async (event, data) => {

    try {
      const result = await ObraSocialController.findByField(data.filter, data.value);
      return JSON.stringify(result);
    } catch (error) {
      throw JSON.stringify(new Error(error));
    }
  });

  ipcMain.handle('get-obraSocial-byName', async (event, data) => {
    try {

      const result = await ObraSocialController.getOneOSocial(data.toUpperCase());
      return JSON.stringify(result);
    } catch (error) {
      throw JSON.stringify(new Error(error));
    }
  });

};

module.exports = setupObraSocialIPC;
