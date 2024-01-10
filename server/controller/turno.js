const TurnoDao = require('../dao/turno');

const turno = new TurnoDao();

const TurnoController = {
    getTurnos: async () => {
        try {
            return await turno.getAll();
        } catch (error) {
            throw error;
        }
    },
    getTurno: async (turnoname) => {
        try {
            return await turno.getById(turnoname);
        } catch (error) {
            throw error;
        }
    },
    createTurno: async (turnoData) => {
        try {
            return await turno.create(turnoData);
        } catch (error) {
            throw error;
        }
    },
    createTurnos: async (list) => {
        try {
            return await turno.create(list);
        } catch (error) {
            throw error;
        }
    },
    updateTurno: async (id, turnoData) => {
        try {
            return await turno.update(id, turnoData);
        } catch (error) {
            throw error;
        }
    },
    deleteTurno: async (id) => {
        try {
            return await turno.delete(id);
        } catch (error) {
            throw error;
        }
    },
    findByField: async (field, value) => {

        try {
            return await turno.findByField(field, value);
        } catch (error) {
            throw error;
        }
    }
    ,
    getTurnosOfDate: async (date) => {
        try {
            return await turno.getAllByDate(date);
        } catch (error) {
            throw error;
        }
    }
};

module.exports = TurnoController;