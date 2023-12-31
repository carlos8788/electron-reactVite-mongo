const ipcConnect = {
    getUsers: () => {
      window.electron.ipcRenderer.send('get-users');
    },
    getOneUser: (userId) => {
      window.electron.ipcRenderer.send('get-user', userId);
    },
    createUser: (userData) => {
      window.electron.ipcRenderer.send('create-user', userData);
    },
    updateUser: (userId, userData) => {
      window.electron.ipcRenderer.send('update-user', userId, userData);
    },
    deleteUser: (userId) => {
      window.electron.ipcRenderer.send('delete-user', userId);
    },
    setupListeners: (callback) => {
      window.electron.ipcRenderer.on('users-list', (users) => {
        callback(users);
      });
      window.electron.ipcRenderer.on('user-detail', (user) => {
        callback(user);
      });
    },
    removeListeners: () => {
      window.electron.ipcRenderer.removeAllListeners('users-list');
      window.electron.ipcRenderer.removeAllListeners('user-detail');
    }
  };
  
  export default ipcConnect;
  