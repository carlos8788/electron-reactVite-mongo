const ipcConnect = {
  getUsers: () => {
    return window.electron.ipcRenderer.invoke('get-users')
      .then(response => JSON.parse(response))
      .catch(error => {
        console.error('Error recibido del proceso principal:', error);
        throw error;
      });
  },
  getOneUser: (userId) => {
    return window.electron.ipcRenderer.invoke('get-user', userId)
      .then(response => JSON.parse(response))
      .catch(error => {
        console.error('Error recibido del proceso principal:', error);
        throw error;
      });
  },
  createUser: (userData) => {
    return window.electron.ipcRenderer.invoke('create-user', JSON.stringify(userData))
      .then(response => {
        console.log('Respuesta del proceso principal:', response);
        return JSON.parse(response);
      })
      .catch(error => {
        console.error('Error recibido del proceso principal:', error);
        throw error;
      });
  },
  updateUser: (userId, userData) => {
    return window.electron.ipcRenderer.invoke('update-user', userId, JSON.stringify(userData))
      .then(response => JSON.parse(response))
      .catch(error => {
        console.error('Error recibido del proceso principal:', error);
        throw error;
      });
  },
  deleteUser: (userId) => {
    return window.electron.ipcRenderer.invoke('delete-user', userId)
      .then(response => JSON.parse(response))
      .catch(error => {
        console.error('Error recibido del proceso principal:', error);
        throw error;
      });
  },
};

export default ipcConnect;
