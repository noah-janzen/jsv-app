function getMonthString(month: number): string {
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
}

export default getMonthString;