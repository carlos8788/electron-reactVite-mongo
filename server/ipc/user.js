const { ipcMain } = require('electron');
const UserController = require('../controller/user');

const setupUserIPC = () => {
  console.log('setup')
  ipcMain.handle('get-users', async (event) => {
    try {
      const users = await UserController.getUsers();
      return JSON.stringify(users);
    } catch (error) {
      throw JSON.stringify(new Error(error));
    }
  });

  ipcMain.handle('get-user', async (event, username) => {
    try {

      const user = await UserController.getOneUser(username);
      return JSON.stringify(user);
    } catch (error) {
      throw JSON.stringify(new Error(error));
    }
  });

  ipcMain.handle('create-user', async (event, userDataString) => {
    try {
      const userData = JSON.parse(userDataString);
      const user = await UserController.createUser(userData);
      return JSON.stringify(user);
    } catch (error) {
      throw JSON.stringify(new Error(error));
    }
  });

  ipcMain.handle('update-user', async (event, id, userInfo) => {
    try {
      const userData = JSON.parse(userInfo);
      const user = await UserController.updateUser(id, userData);
      return JSON.stringify(user);
    } catch (error) {
      throw JSON.stringify(new Error(error));
    }
  });

  ipcMain.handle('delete-user', async (event, id) => {
    try {
      const result = await UserController.deleteUser(id);
      return JSON.stringify(result);
    } catch (error) {
      throw JSON.stringify(new Error(error));
    }
  });
};

module.exports = setupUserIPC;
