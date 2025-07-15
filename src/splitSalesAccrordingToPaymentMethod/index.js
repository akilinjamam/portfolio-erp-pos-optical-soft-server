module.exports.splitSalesValueWithPaymentMethod = async (value) => {

    const result = await value.map(item => {
        const advancePayment = item.paymentHistory.split('+').filter(Boolean).map(Number)?.[0];
        const advancePymentMethod = item.paymentMethodHistory.split('+').filter(Boolean)?.[0]
        const payments = item.paymentHistory.split('+').slice(2).map(Number);
        const methods = item.paymentMethodHistory.split('+').slice(2);

        const methodTotals = {
            Cash: 0,
            Bank: 0,
            Bkash: 0,
            Nogod: 0
        };


        for (let i = 0; i < payments.length; i++) {
            const method = methods[i];
            const amount = payments[i];

            if (method && methodTotals.hasOwnProperty(method)) {
                methodTotals[method] += amount;
            }
        }

        const { Bank: dueBank, Bkash: dueBkash, Nogod: dueNogod, Cash: dueCash } = methodTotals
        const { ...remaining } = item;
        return {
            ...remaining,
            advancePayment,
            advancePymentMethod,
            dueCash,
            dueBank,
            dueBkash,
            dueNogod,
            total: payments.reduce((a, b) => a + b, 0) + advancePayment
        };

    });

    return await result

}