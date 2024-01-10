const { ipcMain } = require('electron');
const UserController = require('../controller/user');
const { readExcel } = require('../db/files/excel');

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

  ipcMain.handle('create-users', async (event, dataString) => {
    console.log(dataString, 'dataString');
    try {
      const usersData = JSON.parse(dataString);
      const users = await UserController.createManyUsers(usersData);
      return JSON.stringify(users);
    } catch (error) {
      console.log(error)
      throw JSON.stringify(new Error(error));
    }
  });

  ipcMain.handle('update-user', async (event, data) => {
    try {
      const userData = JSON.parse(data);
      const { id, ...userInfo } = userData
      const user = await UserController.updateUser(id, userInfo);
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
    console.log(data, 'handle', data.filter, data.value);
    try {
      const result = await UserController.findByField(data.filter, data.value);
      console.log(result)
      return JSON.stringify(result);
    } catch (error) {
      console.log(error);
      throw JSON.stringify(new Error(error));
    }
  });
};
ipcMain.handle('excel', async (event, data = 0) => {
  try {
    // console.log(event)
    return JSON.stringify(readExcel(data));
  } catch (error) {
    throw JSON.stringify(new Error(error));
  }
});

module.exports = setupUserIPC;
