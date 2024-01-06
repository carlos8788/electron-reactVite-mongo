const ipcConnect = {
  get: (channel) => {
    return window.electron.ipcRenderer.invoke(channel)
      .then(response => JSON.parse(response))
      .catch(error => {
        console.error('Error recibido del proceso principal:', error);
        throw error;
      });
  },
  getOne: (id, channel) => {
    return window.electron.ipcRenderer.invoke(channel, id)
      .then(response => JSON.parse(response))
      .catch(error => {
        console.error('Error recibido del proceso principal:', error);
        throw error;
      });
  },
  create: (data, channel) => {
    return window.electron.ipcRenderer.invoke(channel, JSON.stringify(data))
      .then(response => {
        console.log('Respuesta del proceso principal:', response);
        return JSON.parse(response);
      })
      .catch(error => {
        console.error('Error recibido del proceso principal:', error);
        throw error;
      });
  },
  update: (id, data, channel) => {
    return window.electron.ipcRenderer.invoke(channel, id, JSON.stringify(data))
      .then(response => JSON.parse(response))
      .catch(error => {
        console.error('Error recibido del proceso principal:', error);
        throw error;
      });
  },
  delete: (id, channel) => {
    return window.electron.ipcRenderer.invoke(channel, id)
      .then(response => JSON.parse(response))
      .catch(error => {
        console.error('Error recibido del proceso principal:', error);
        throw error;
      });
  },
  filterData: (channel, filter, data) => {
    return window.electron.ipcRenderer.invoke(channel, filter, data)
      .then(response => JSON.parse(response))
      .catch(error => {
        console.error('Error recibido del proceso principal:', error);
        throw error;
      });
  }
};

export default ipcConnect;