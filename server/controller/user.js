const UserDao = require('../dao/user');

const user = new UserDao();

const UserController = {
    getUsers: async () => {
        try {
            return await user.getAll();
        } catch (error) {
            throw error;
        }
    },
    getOneUser: async (username) => {
        try {
            return await user.getByUsername(username);
        } catch (error) {
            throw error;
        }
    },
    createUser: async (userData) => {
        try {
            return await user.create(userData);
        } catch (error) {
            throw error;
        }
    },
    updateUser: async (id, userData) => {
        try {
            return await user.update(id, userData);
        } catch (error) {
            throw error;
        }
    },
    deleteUser: async (id) => {
        try {
            return await user.delete(id);
        } catch (error) {
            throw error;
        }
    },
    findByField: async (field, value) => {
        try {
            let query = {}
            query[field] = value;
            return await user.findByField(query);
        } catch (error) {
            throw error;
        }
    }
};

module.exports = UserController;