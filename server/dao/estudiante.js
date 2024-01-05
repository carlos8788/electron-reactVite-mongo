const Estudiante = require('../db/models/estudiante');

class EstudianteDao {
    constructor() {
        this.EstudianteModel = Estudiante;
    }

    async getAll() {
        try {
            return await this.EstudianteModel.find();
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getById(id) {
        try {
            return await this.EstudianteModel.findById(id);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async create(estudiante) {
        try {
            return await this.EstudianteModel.create(estudiante);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async update(id, estudiante) {
        try {
            return await this.EstudianteModel.findByIdAndUpdate(id, estudiante, { new: true });
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async delete(id) {
        try {
            await this.EstudianteModel.findByIdAndDelete(id);
            return { success: 'Estudiante deleted successfully' };
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = EstudianteDao;
