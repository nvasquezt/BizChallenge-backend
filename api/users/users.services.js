const users = require('./users.model')

const getUserById = async (id) => {
    const user = await users.findById(id);
    return user;
}

const getUserByEmail = async (email) => {
    const user = await users.findOne({ email });
    return user;
}

const createUser = async (user) => {
    const newUser = await users.create(user);
    return newUser;
}

const updateUser = async (id, user) => {
    const updatedUser = await users.findByIdAndUpdate(id, user, { new: true });
    return updatedUser;
}


module.exports = {
    getUserById,
    getUserByEmail,
    createUser,
    updateUser
}
