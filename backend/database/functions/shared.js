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

export { getMidnightTimeFormat, currentDateAndTime };