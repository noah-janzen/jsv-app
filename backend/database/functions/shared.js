export function getMidnightTimeFormat(date) {
    date.setHours(0, 0, 0, 0);
    return date;
}

export function currentDateAndTime() {
    return new Date();
}