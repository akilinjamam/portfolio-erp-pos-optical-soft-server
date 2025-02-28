const mongoose = require('mongoose');
const Schema = require('mongoose');


const glassTypeSchema = mongoose.Schema({

    glassType: {
        type: String,
        required: true

    }
},
    {
        timestamps: true,
    }
)

const GlassType = mongoose.model("GlassType", glassTypeSchema);

module.exports = GlassType;