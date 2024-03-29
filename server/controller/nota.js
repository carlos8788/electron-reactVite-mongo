const NotaDao = require('../dao/nota');

const nota = new NotaDao();

const NotaController = {
    getNotas: async () => {
        try {
            return await nota.getAll();
        } catch (error) {
            throw error;
        }
    },
    getNota: async (data) => {
        try {
            return await nota.getById(data);
        } catch (error) {
            throw error;
        }
    },
    createNota: async (data) => {
        try {
            return await nota.create(data);
        } catch (error) {
            throw error;
        }
    },
    createNotas: async (list) => {
        try {
            return await nota.create(list);
        } catch (error) {
            throw error;
        }
    },
    updateNota: async (id, data) => {
        try {
            return await nota.update(id, data);
        } catch (error) {
            throw error;
        }
    },
    deleteNota: async (id) => {
        try {
            return await nota.delete(id);
        } catch (error) {
            throw error;
        }
    },
    findByField: async (data) => {

        try {
            return await nota.findByField(data);
        } catch (error) {
            throw error;
        }
    }
    ,
    getNotasOfDate: async (date) => {
        try {
            return await nota.getAllByDate(date);
        } catch (error) {
            throw error;
        }
    }
};

module.exports = NotaController;