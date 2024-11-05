const mongoose = require("mongoose");

const supplierSchema = mongoose.Schema(
    {
        supplierName: {
            type: String,
            requrired: true,
        },
        address: {
            type: String,
            required: true,
        },
        mobile: {
            type: String,
            requrired: true,
        },
        img: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

const Supplier = mongoose.model("Supplier", supplierSchema);

module.exports = Supplier;
