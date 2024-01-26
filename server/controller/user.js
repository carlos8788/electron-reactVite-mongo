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

    getOneDNI: async (dni) => {
        try {
            return await user.getByDNI(dni);
        } catch (error) {
            return undefined;
        }
    },
    createUser: async (userData) => {
        try {
            return await user.create(userData);
        } catch (error) {
            throw error;
        }
    },
    createManyUsers: async (users = []) => {
        const usersOK = [];
        const usersError = [];

        for (const data of users) {
            try {
                const checkUser = await user.create(data);
                
                if (checkUser) {
                    usersOK.push(checkUser);
                } else {

                    usersError.push(data); 
                }
            } catch (error) {
                usersError.push(data); 
            }
        }

        console.log(usersError, 'users error')
        return { usersOK, usersError };
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
            return await user.findByField(field, value);
        } catch (error) {
            throw error;
        }
    }
};

module.exports = UserController;