const filtering = require('../../filtering/filtering');
const Employee = require('./employee.model')


const createEmployee = async (data) => {
  const result = await Employee.insertMany(data);
  return {
    status: 201,
    result
  }

};


const getEmployees = async (queryValue, from, to) => {

  const fields = ['employeeName', 'joiningDate', 'address', 'mobile', 'nid', 'employeeId', 'basicSalary', 'createdAt']

  if (queryValue) {
    const search = await filtering(Employee, fields, queryValue)
    return {
      status: 200,
      total: search?.length,
      result: search
    }
  }

  if (from && to) {
    const range = await Employee.aggregate([
      // converting value from string to number
      {
        $addFields: {
          convertedBasicSalaryFromStringToNumber: { $toDouble: "$basicSalary" }
        }
      },
      {
        $match: {
          convertedBasicSalaryFromStringToNumber: {
            $gte: from ? parseFloat(from) : 0,
            $lte: to ? parseFloat(to) : Number.MAX_VALUE
          }
        }
      }
    ])

    return {
      status: 200,
      total: range?.length,
      result: range
    }
  }



  const result = await Employee.find({})
  return {
    status: 201,
    result
  }

};
const updateEmployees = async (id, data) => {
  const result = await Employee.updateOne({ _id: id }, { $set: data }, { runValidator: true })
  return {
    status: 201,
    result
  }
};

const deleteEmployees = async (ids) => {
  const result = await Employee.deleteMany({ _id: { $in: ids } });
  return {
    status: 200,
    result
  }
}

module.exports = {
  createEmployee,
  getEmployees,
  updateEmployees,
  deleteEmployees
};
