const userModel = require('../db/models/users');

class UserDao {
    constructor() {
        this.userModel = userModel;
    }

    async getAll() {
        try {
            return await this.userModel.find().populate('obraSocial', 'nombre');
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async getByUsername(username) {
        try {
            return await this.userModel.findOne({ username });
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async getByDNI(dniData) {
        try {
            return await this.userModel.findOne({ dni: dniData });
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async create(user) {
        try {
            return await this.userModel.create(user);
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async update(id, user) {
        try {
            return await this.userModel.findByIdAndUpdate({ _id: id }, user, { new: true });
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async delete(id) {
        try {
            await this.userModel.findByIdAndDelete({ _id: id });
            return await this.getAll();
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async findByField(field, value) {
        try {
            const query = {};
            const data = value.replace(/\+/g, '\\+');
            const regex = new RegExp(data, 'i');            
            query[field] = { $regex: regex }; // Insensible a mayúsculas y minúsculas
            const result = await this.userModel.find(query).populate('obraSocial', 'nombre');
            return result;
        } catch (error) {
            console.log(error)
            throw new Error(error.message)
        }
    }

}

module.exports = UserDao