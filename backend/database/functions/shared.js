/**
 * Sets the specified date's time to midnight.
 * @param {*} date The date object to be converted into midnight format.
 * @returns The formatted date with its time set to midnight.
 */
const getMidnightTimeFormat = (date) => {
    date.setHours(0, 0, 0, 0);
    return date;
};

/**
 * Returns the current date and time.
 * @returns Current date and time.
 */
const currentDateAndTime = () => {
    return new Date();
}

/**
 * Returns the date that represents the last day eleven months ahead.
 * @param {*} date The date on which the period shoudl be based on.
 */
const getNextYearPeriod = (date) => {
    date.setMonth(date.getMonth() + 11);

    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    lastDay.setHours(23, 59, 59, 999);

    return lastDay;
}

export { getMidnightTimeFormat, currentDateAndTime, getNextYearPeriod };