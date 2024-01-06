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
            return { success: 'User deleted successfully' }
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async findByField(query) {
        try {
            const result = await this.userModel.find(query);
            return result
        } catch (error) {
            throw new Error(error.message)
        }
    }

}

module.exports = UserDao