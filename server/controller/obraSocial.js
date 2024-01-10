const ObraSocialDao = require('../dao/obraSocial');

const obraSocial = new ObraSocialDao();

const ObraSocialController = {
    getOSocials: async () => {
        try {
            return await obraSocial.getAll();
        } catch (error) {
            throw error;
        }
    },
    getOneOSocial: async (obraSocialname) => {
        try {
            return await obraSocial.getByObraSocialname(obraSocialname);
        } catch (error) {
            throw error;
        }
    },
    createOSocial: async (obraSocialData) => {
        try {
            return await obraSocial.create(obraSocialData);
        } catch (error) {
            throw error;
        }
    },
    updateOSocial: async (id, obraSocialData) => {
        try {
            return await obraSocial.update(id, obraSocialData);
        } catch (error) {
            throw error;
        }
    },
    deleteOSocial: async (id) => {
        try {
            return await obraSocial.delete(id);
        } catch (error) {
            throw error;
        }
    },
    findByField: async (field, value) => {

        try {
            return await obraSocial.findByField(field, value);
        } catch (error) {
            throw error;
        }
    }
};

module.exports = ObraSocialController;