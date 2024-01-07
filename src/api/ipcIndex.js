const ipcConnect = {
  get: (channel) => {
    return window.electron.ipcRenderer.invoke(channel)
      .then(response => JSON.parse(response))
      .catch(error => {
        console.error('Error recibido del proceso principal:', error);
        throw error;
      });
  },
  getOne: (channel, id) => {
    return window.electron.ipcRenderer.invoke(channel, id)
      .then(response => JSON.parse(response))
      .catch(error => {
        console.error('Error recibido del proceso principal:', error);
        throw error;
      });
  },
  create: (channel, data) => {
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
  update: (channel,id, data) => {
    return window.electron.ipcRenderer.invoke(channel, id, JSON.stringify(data))
      .then(response => JSON.parse(response))
      .catch(error => {
        console.error('Error recibido del proceso principal:', error);
        throw error;
      });
  },
  delete: (channel, id) => {
    return window.electron.ipcRenderer.invoke(channel, id)
      .then(response => JSON.parse(response))
      .catch(error => {
        console.error('Error recibido del proceso principal:', error);
        throw error;
      });
  },
  filterData: (channel, filter, value) => {
    console.log(channel, filter, value)
    return window.electron.ipcRenderer.invoke(channel, {filter, value})
      .then(response => JSON.parse(response))
      .catch(error => {
        console.error('Error recibido del proceso principal:', error);
        throw error;
      });
  }
};

export default ipcConnect;