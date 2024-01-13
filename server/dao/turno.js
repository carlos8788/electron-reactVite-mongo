const TurnoModel = require('../db/models/turno');

class TurnoDao {
    constructor() {
        this.turnoModel = TurnoModel;
    }

    async getAll() {
        try {
            return await this.turnoModel.find().populate({
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
            this.turnoModel.findById(id).populate({
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
            const result = await this.turnoModel.find({ fecha: { $regex: new RegExp(date, 'i') } });
            return result;
        } catch (error) {
            console.log(error)
            throw new Error(error.message)
        }
    }

    async create(turno) {
        try {
            return await this.turnoModel.create(turno);
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async update(id, turno) {
        try {
            return await this.turnoModel.findByIdAndUpdate({ _id: id }, turno, { new: true });
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async delete(id) {
        try {
            await this.turnoModel.findByIdAndDelete({ _id: id });
            return await this.getAll();
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async findByField(data) {
        try {
            const query = {};
            query[data.filter] = new RegExp(data.value, 'i');
            const result = await this.turnoModel.find(query).populate({
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

module.exports = TurnoDao