const filtering = async (Model, fields, queryValue) => {

    const search = await Model.aggregate([
        {
            $match: {
                $or: fields?.map((item) => {
                    return { [item]: { $regex: queryValue, $options: 'i' } }
                }),
            },
        },
    ])

    return search
}

module.exports = filtering