function getMonthStringByMonthId(month: number) {
    let monthString = new Map<number, string>();
    monthString.set(0, "Januar");
    monthString.set(1, "Februar");
    monthString.set(2, "März");
    monthString.set(3, "April");
    monthString.set(4, "Mai");
    monthString.set(5, "Juni");
    monthString.set(6, "Juli");
    monthString.set(7, "August");
    monthString.set(8, "September");
    monthString.set(9, "Oktober");
    monthString.set(10, "November");
    monthString.set(11, "Dezember");

    return monthString.get(month);
}

export default getMonthStringByMonthId;