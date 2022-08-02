const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user'
    },
    movies: [{
        type: Schema.Types.ObjectId,
        ref: 'Movie'
    }]
}
, {
    timestamps: true,
    versionKey: false
});

UserSchema.pre('save', async function (next) {
    try{
        const user = this;
        if (!user.isModified('password')) {
            return next();
        }
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(user.password, salt);
        user.password = hash;
        return next();
    } catch (err) {
        return next(err);
    }
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
    const user = this;
    const isMatch = await bcrypt.compare(candidatePassword, user.password);
    if (!isMatch) {
        throw new Error('something went wrong');
    }
    return isMatch;
}

UserSchema.virtual('profile').get(function () {
    const { name, lastName, email, role } = this;
    return { fullname: `${name} ${lastName}`, email, role };
});


const User = mongoose.model('User', UserSchema);
module.exports = User;
