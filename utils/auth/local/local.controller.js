const { getUserByEmail } = require ('../../../api/users/users.services');
const { signToken } = require ('../auth.services');


const handlerLoginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await getUserByEmail(email);
    if (!user) {
        return res.status(401).json({ message: 'Invalid data' });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid data' });
    }
    const token = signToken(user.profile);
    return res.status(200).json({ userId: user._id, token });
};


module.exports = { handlerLoginUser };