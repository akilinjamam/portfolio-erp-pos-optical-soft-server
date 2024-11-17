const Employee = require("../employee/employee.model");
const Payroll = require("./payroll.model")

const createPayrollService = async (data) => {

    const payrollData = await Payroll.find({ employeeName: data.employeeName });

    if (payrollData.length === 0) {
        const findEmployee = await Employee.findOne({ _id: data.employeeName });

        const { totalPaid, paid, due, advance, ...remainingData } = data

        if (Number(advance) > 0) {
            throw new Error('Advance amount can be paid after giving full basic salary')
        }

        if (Number(paid) > Number(findEmployee.basicSalary)) {
            throw new Error('Paid amount can not be given more than basic salary')
        }

        const dueInNumber = Number(findEmployee.basicSalary) - Number(paid);
        const dueInString = dueInNumber.toString();

        const firstData = {
            totalPaid: paid,
            paid,
            due: dueInString,
            netSalary: findEmployee.basicSalary,
            ...remainingData,
        }
        const result = await Payroll.create(firstData);

        return {
            status: 201,
            result
        }

    }

    const { employeeName, prevDue, paid, totalPaid, due, advance, prevAdvance, ...remainingData } = data;


    const lastPayroll = await Payroll.findOne({ employeeName: employeeName }).sort({ createdAt: -1 }).populate('employeeName');

    if ((Number(advance) > 0) && (Number(lastPayroll.advance) === 0)) {

        if (Number(lastPayroll.totalPaid) !== Number(lastPayroll.netSalary)) {
            throw new Error('Advance amount can be paid after giving full basic salary')
        }
    }

    if (Number(advance) > ((Number(lastPayroll.netSalary) * 70) / 100)) {
        throw new Error('advance amount can not be more than 70% of basic salary')
    }
    const newAdvance = advance ? advance : '0'

    if ((Number(lastPayroll.advance) + Number(newAdvance)) > ((Number(lastPayroll.employeeName.basicSalary) * 70) / 100)) {
        throw new Error('total advance amount can not be more than 70% of basic salary')
    }



    const netSalary = Number(lastPayroll.totalPaid === lastPayroll.netSalary ? lastPayroll.employeeName.basicSalary : lastPayroll.netSalary) - (Number(newAdvance))



    if (Number(paid) > netSalary) {
        throw new Error('Paid amount can not be more than Basic Salary')
    }



    if ((Number(paid) + Number(lastPayroll.totalPaid)) > netSalary) {
        if (Number(lastPayroll.due) !== 0) {
            throw new Error('total paid amount can not be more than basic salary')
        }
    }
    let conditionalTotalPaid = '0';
    if (lastPayroll.totalPaid !== lastPayroll.netSalary) {
        conditionalTotalPaid = ((Number(lastPayroll.totalPaid) - Number(lastPayroll.advance)) === netSalary) ? '0' : lastPayroll.totalPaid
    }

    console.log(conditionalTotalPaid)

    const totalPaidInNumber = Number(conditionalTotalPaid) + Number(paid)
    const totalPaidInString = totalPaidInNumber.toString();
    const dueInNumber = netSalary - totalPaidInNumber;
    const dueInString = dueInNumber.toString();

    if (Number(advance) > 0) {
        if (Number(paid) > 0) {
            throw new Error('You can not give payment and advance together')
        }
    }

    const conditionalDue = Number(advance) > 0 ? '0' : dueInString;

    const accumulatedAdvanceInNumber = Number(advance) + Number(lastPayroll.advance)


    const conditionalAdvance = Number(paid) > 0 ? '0' : accumulatedAdvanceInNumber;

    const prevAdvanceInNumber = Number(lastPayroll.advance)
    const prevAdnvaceInString = prevAdvanceInNumber.toString();

    const conditionalPrevAdvance = Number(paid) > 0 ? '0' : prevAdnvaceInString;

    const newData = {
        employeeName: employeeName,
        prevDue: lastPayroll.due,
        paid: paid,
        totalPaid: totalPaidInString,
        due: conditionalDue,
        advance: conditionalAdvance,
        prevAdvance: conditionalPrevAdvance,
        netSalary,
        ...remainingData
    }

    const result = await Payroll.create(newData)

    return {
        status: 201,
        result: result
    }

}

const getSinglePayrollService = async (employeeName) => {

    const result = await Payroll.findOne({ employeeName: employeeName }).sort({ createdAt: -1 }).populate('employeeName');

    return {
        status: 201,
        result
    }
}

const getPayrollService = async (employeeName, year, month) => {


    let conditionValue = '';
    let conditionalEmployeeName = ''

    if (year && month) {
        conditionValue = { $regex: `^${year}-${month}` }
    }

    if (year) {
        conditionValue = { $regex: `^${year}` }
    }

    if (!employeeName) {
        return {
            status: 201,
            result: []
        }
    }



    const result = await Payroll.find({ employeeName: employeeName, date: conditionValue }).sort({ createdAt: -1 });

    console.log(result)

    return {
        status: 201,
        result
    }
}

const updatePayrollService = async (id, body) => {
    const result = await Payroll.updateOne({ _id: id }, { $set: body }, { runValidator: true })
    return {
        status: 200,
        result
    }
}

const deletePayrollService = async (ids) => {
    const result = await Payroll.deleteMany({ _id: { $in: ids } });
    return {
        status: 200,
        result
    }
}


module.exports = {
    createPayrollService,
    getSinglePayrollService,
    getPayrollService,
    updatePayrollService,
    deletePayrollService
}