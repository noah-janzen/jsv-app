const getDateString = (date: Date) => {
    let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    let month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
    let year = date.getFullYear();

    return day + "." + month + "." + year;
};

const getTimeString = (date: Date) => {
    let hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
    let minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();

    return hours + ":" + minutes + " Uhr";
};

const getDateTimeString = (date: Date) => {
    return getDateString(date) + ' · ' + getTimeString(date);
};

const getMonthAbbreviation = (month: number) => {
    let monthAbbreviations = new Map<number, string>();
    monthAbbreviations.set(0, "JAN");
    monthAbbreviations.set(1, "FEB");
    monthAbbreviations.set(2, "MÄR");
    monthAbbreviations.set(3, "APR");
    monthAbbreviations.set(4, "MAI");
    monthAbbreviations.set(5, "JUN");
    monthAbbreviations.set(6, "JUL");
    monthAbbreviations.set(7, "AUG");
    monthAbbreviations.set(8, "SEP");
    monthAbbreviations.set(9, "OKT");
    monthAbbreviations.set(10, "NOV");
    monthAbbreviations.set(11, "DEZ");

    return monthAbbreviations.get(month);
};

const getMonthString = (month: number): string => {
    let monthStrings = new Map<number, string>();
    monthStrings.set(0, "Januar");
    monthStrings.set(1, "Februar");
    monthStrings.set(2, "März");
    monthStrings.set(3, "April");
    monthStrings.set(4, "Mai");
    monthStrings.set(5, "Juni");
    monthStrings.set(6, "Juli");
    monthStrings.set(7, "August");
    monthStrings.set(8, "September");
    monthStrings.set(9, "Oktober");
    monthStrings.set(10, "November");
    monthStrings.set(11, "Dezember");

    let result = monthStrings.get(month);

    return result ? result : '';
};

export { getDateString, getTimeString, getDateTimeString, getMonthAbbreviation, getMonthString };
