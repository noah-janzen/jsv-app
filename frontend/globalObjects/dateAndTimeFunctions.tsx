// creates date string
// Format: DD.MM.YYYY
const getDateString = (date: Date) => {
    let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    let month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
    let year = date.getFullYear();

    return day + "." + month + "." + year;
};

// creates time string
// Format: hh:mm Uhr
const getTimeString = (date: Date) => {
    let hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
    let minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();

    return hours + ":" + minutes + " Uhr";
};

// creates date time string
// Format DD.MM.YYYY · hh:mm Uhr
const getDateTimeString = (date: Date) => {
    return getDateString(date) + ' · ' + getTimeString(date);
};

// returns month abbreviation string in German language
const getMonthAbbreviation = (month: number) => {
    let monthAbbreviations = new Map<number, string>([
        [0, "JAN"],
        [1, "FEB"],
        [2, "MÄR"],
        [3, "APR"],
        [4, "MAI"],
        [5, "JUN"],
        [6, "JUL"],
        [7, "AUG"],
        [8, "SEP"],
        [9, "OKT"],
        [10, "NOV"],
        [11, "DEZ"]
    ]);
    return monthAbbreviations.get(month);
};

// returns full month string in German language
const getMonthString = (month: number): string => {
    let monthStrings = new Map<number, string>([
        [0, "Januar"],
        [1, "Februar"],
        [2, "März"],
        [3, "April"],
        [4, "Mai"],
        [5, "Juni"],
        [6, "Juli"],
        [7, "August"],
        [8, "September"],
        [9, "Oktober"],
        [10, "November"],
        [11, "Dezember"],
    ]);

    let result = monthStrings.get(month);

    return result ? result : '';
};

export { getDateString, getTimeString, getDateTimeString, getMonthAbbreviation, getMonthString };
