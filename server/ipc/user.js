const { ipcMain } = require('electron');
const UserController = require('../controller/user');

const setupUserIPC = () => {
  console.log('setup')
  ipcMain.handle('get-users', async (event) => {
    try {
      return await UserController.getUsers();
    } catch (error) {
      throw new Error(error);
    }
  });

  ipcMain.handle('get-user', async (event, username) => {
    try {
      return await UserController.getOneUser(username);
    } catch (error) {
      throw new Error(error);
    }
  });

  ipcMain.handle('create-user', async (event, userData) => {
    try {
      console.log(userData);
      const user = await UserController.createUser(userData);
      event.reply('user-created', user);
    } catch (error) {
      throw new Error(error);
    }
  });

  ipcMain.handle('update-user', async (event, username) => {
    try {
      return await UserController.updateUser(username);
    } catch (error) {
      throw new Error(error);
    }
  });

  ipcMain.handle('delete-user', async (event, id) => {
    try {
      return await UserController.deleteUser(id);
    } catch (error) {
      throw new Error(error);
    }
  });
  // Repite para actualizar y eliminar usuario...
};

module.exports = setupUserIPC;
