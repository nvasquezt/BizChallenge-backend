const fs = require('fs');
const cloudinary = require('cloudinary').v2;

const {
    createUser,
    getUserById,
    getUserByEmail,
    updateUser,
} = require('./users.services');

const uploadImage = async (image) => {
    try {
        const result = cloudinary.uploader.upload(image);
        return result;
    } catch (err) {
        throw new Error(err);
    } finally {
        fs.unlinkSync(image);
    }
};

const handlerCreateUser = async (req, res) => {
    try {
        const { file } = req;
        if (file) {
            try {
                const size = file.size / 1024 / 1024;
                if (size > 5) {
                    return res.status(400).json({
                        message: 'Image size must be less than 5MB',
                    });
                }
            } catch (err) {
                res.status(500).json(err);
            }
        }
        const result = await uploadImage(file.path);
        const image = result.url;
        req.body.image = image;
        const user = await createUser(req.body);
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
};


const handlerGetUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await getUserById(userId);
        if (!user) {
            return res.status(404).json({
                message: 'Something went wrong',
            });
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
}

const handlerGetUserByEmail = async (req, res) => {
    try {
        const email = req.params.email;
        const user = await getUserByEmail(email);
        if (!user) {
            return res.status(404).json({
                message: 'Something went wrong',
            });
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
}


const handlerUpdateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await updateUser(userId, req.body);
        if (!user) {
            return res.status(404).json({
                message: 'Update failed',
            });
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
}


module.exports = {
    handlerCreateUser,
    handlerGetUserById,
    handlerGetUserByEmail,
    handlerUpdateUser,
};
