const User = require("./registration.model");

const createRegistrationService = async (data) => {

    const username = await User.findOne({ username: data.username });
    const email = await User.findOne({ email: data.email });

    if (username && email) return {
        status: 409,
        result: 'username and email already Exist'
    }

    if (username) return {
        status: 409,
        result: 'username already Exists'
    }
    if (email) return {
        status: 409,
        result: 'email already Exists'
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
