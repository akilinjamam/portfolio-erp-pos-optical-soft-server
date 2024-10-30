const Employee = require('./employee.model')


const createEmployee = async (data) => {
  const result = await Employee.insertMany(data);
  return {
    status: 201,
    result
  }

};


const getEmployees = async () => {
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
