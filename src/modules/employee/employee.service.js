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

module.exports = {
  createEmployee,
  getEmployees
};
