const obraSocialModel = require('../db/models/obraSocial');

class ObraSocialDao {
    constructor() {
        this.obraSocialModel = obraSocialModel;
    }

    async getAll() {
        try {
            return await this.obraSocialModel.find();
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getById(id) {
        try {
            return await this.obraSocialModel.findById(id);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async create(obraSocial) {
        try {
            return await this.obraSocialModel.create(obraSocial);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async update(id, obraSocial) {
        try {
            return await this.obraSocialModel.findByIdAndUpdate({ _id: id }, obraSocial, { new: true });
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async delete(id) {
        try {
            await this.obraSocialModel.findByIdAndDelete({ _id: id });
            return { success: 'Obra Social deleted successfully' };
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async findByField(field, value) {
        try {
            const query = {};
            query[field] = { $regex: new RegExp(value, 'i') }; // Insensible a mayúsculas y minúsculas
            const result = await this.obraSocialModel.find(query);
            return result;
        } catch (error) {
            console.log(error)
            throw new Error(error.message)
        }
    }

    async getByObraSocialname(obraSocialname) {
        try {

            return await this.obraSocialModel.findOne({nombre: obraSocialname})
        } catch (error) {
            console.log(error)
            throw new Error(error.message) 
        }
    }
}

module.exports = ObraSocialDao;

