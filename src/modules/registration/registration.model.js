const mongoose = require('mongoose');


const registrationSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
},
    {
        timestamps: true,
    }
)

const User = mongoose.model("User", registrationSchema);

module.exports = User;