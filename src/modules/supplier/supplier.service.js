const filtering = require('../../filtering/filtering');
const Supplier = require('./supplier.model');



const createSupplier = async (data) => {
    const result = await Supplier.insertMany(data);
    return {
        status: 201,
        result
    }

};


const getSupplier = async (queryValue) => {

    const fields = ['supplierName', 'address', 'mobile', 'createdAt']

    if (queryValue) {
        const search = await filtering(Supplier, fields, queryValue)
        return {
            status: 200,
            total: search?.length,
            result: search
        }
    }
    const result = await Supplier.find({})
    return {
        status: 201,
        result
    }

};
const updateSupplier = async (id, data) => {
    const result = await Supplier.updateOne({ _id: id }, { $set: data }, { runValidator: true })
    return {
        status: 201,
        result
    }
};

const deleteSupplier = async (ids) => {
    const result = await Supplier.deleteMany({ _id: { $in: ids } });
    return {
        status: 200,
        result
    }
}

module.exports = {
    createSupplier,
    getSupplier,
    updateSupplier,
    deleteSupplier
};
