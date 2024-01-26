const { ipcMain } = require('electron');
const UserController = require('../controller/user');
const { readExcel } = require('../db/files/excel');

const setupUserIPC = () => {
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

  ipcMain.handle('get-user-dni', async (event, dni) => {
    try {
      const user = await UserController.getOneDNI(dni);
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

  ipcMain.handle('create-users', async (event, dataString) => {
    try {
      const usersData = JSON.parse(dataString);
      const users = await UserController.createManyUsers(usersData);
      return JSON.stringify([users]);
    } catch (error) {
      throw JSON.stringify(new Error(error));
    }
  });

  ipcMain.handle('update-user', async (event, data) => {
    try {
      const userData = JSON.parse(data);
      const { _id, ...userInfo } = userData
      const user = await UserController.updateUser(_id, userInfo);
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

  ipcMain.handle('get-data-filter', async (event, data) => {
    try {
      const result = await UserController.findByField(data.filter, data.value);
      return JSON.stringify(result);
    } catch (error) {
      console.log(error);
      throw JSON.stringify(new Error(error));
    }
  });
};
ipcMain.handle('excel', async (event, data = 0) => {
  try {
    return JSON.stringify(readExcel(data));
  } catch (error) {
    throw JSON.stringify(new Error(error));
  }
});

module.exports = setupUserIPC;
