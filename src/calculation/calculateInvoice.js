const invoiceCalculation = (saleData) => {
    const allLeftZeros = '00000';
    const totalSalesLength = saleData?.toString()?.length;
    const dependentSalesLenght = totalSalesLength > 5 ? 5 : totalSalesLength
    const invoiceNumber = `${allLeftZeros.slice(0, (allLeftZeros?.length - dependentSalesLenght))}${saleData?.toString()}`
    console.log(invoiceNumber);

    return invoiceNumber
}

module.exports = invoiceCalculation;