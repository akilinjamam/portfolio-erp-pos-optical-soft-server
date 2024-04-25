const User = require("./registration.model");

const createRegistrationService = async (data) => {

    const user = await User.findOne({ email: data.email });

    if (user) return {
        status: 409,
        result: 'user data already Exists'
    }

    const newUser = new User(data);
    await newUser.save();
    return {
        status: 201,
        result: newUser
    }
}

module.exports = {
    createRegistrationService
}
