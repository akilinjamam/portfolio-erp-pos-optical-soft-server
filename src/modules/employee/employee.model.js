const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema(
  {
    employeeName: {
      type: String,
      requrired: true,
    },
    joiningDate: {
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
    nid: {
      type: String,
      requrired: true,
    },
    employeeId: {
      type: String,
      required: true,
    },
    basicSalary: {
      type: String,
      requried: true,
    },
    img: {
      type: String,
      default: 'not added'
    },
  },
  {
    timestamps: true,
  }
);

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
