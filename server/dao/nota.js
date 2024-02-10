const NotaModel = require('../db/models/nota');
require('../db/models/users');
require('../db/models/obraSocial');
class NotaDao {
    constructor() {
        this.notaModel = NotaModel;
    }

    async getAll() {
        try {
            return await this.notaModel.find().populate({
                path: 'paciente',
                model: 'User',
                populate: {
                    path: 'obraSocial',
                    model: 'ObraSocial'
                }
            });
            
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async getById(id) {
        try {
            this.notaModel.findById(id).populate({
                path: 'paciente',
                model: 'User',
                populate: {
                    path: 'obraSocial',
                    model: 'ObraSocial'
                }
            });
        } catch (error) {
            throw new Error(error.message)
        }

    }

    async getAllByDate(date) {
        try {
            const result = await this.notaModel.find({ fecha: { $regex: new RegExp(date, 'i') } });
            return result;
        } catch (error) {
            console.log(error)
            throw new Error(error.message)
        }
    }

    async create(nota) {
        try {
            return await this.notaModel.create(nota);
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async update(id, nota) {
        try {
            return await this.notaModel.findByIdAndUpdate({ _id: id }, nota, { new: true });
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async delete(id) {
        try {
            await this.notaModel.findByIdAndDelete({ _id: id });
            return await this.getAll();
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async findByField(data) {
        try {
            const query = {};
            query[data.filter] = new RegExp(data.value, 'i');
            const result = await this.notaModel.find(query).populate({
                path: 'paciente',
                model: 'User',
                populate: {
                    path: 'obraSocial',
                    model: 'ObraSocial'
                }
            });
            return result;
        } catch (error) {
            console.log(error)
            throw new Error(error.message)
        }
    }

}

module.exports = NotaDao