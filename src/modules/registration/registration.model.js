const mongoose = require('mongoose');


const registrationSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        // unique: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user'
    },
    accept_by_admin: {
        type: Boolean,
        default: false
    },
    pos: {
        type: Boolean,
        default: false
    },
    sales_record: {
        type: Boolean,
        default: false
    },
    stock: {
        type: Boolean,
        default: false
    },
    sales_invoice: {
        type: Boolean,
        default: false
    },
    controll_user_access: {
        type: Boolean,
        default: false
    },
    employee_list: {
        type: Boolean,
        default: false
    },
    payroll: {
        type: Boolean,
        default: false
    },
    user_list: {
        type: Boolean,
        default: false
    },
    product_entry: {
        type: Boolean,
        default: false
    },
    product_list: {
        type: Boolean,
        default: false
    },
    customer_list: {
        type: Boolean,
        default: false
    },
},
    {
        timestamps: true,
    }
)

const User = mongoose.model("User", registrationSchema);

module.exports = User;