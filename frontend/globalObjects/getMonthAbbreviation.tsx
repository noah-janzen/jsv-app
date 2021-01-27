function getMonthAbbreviation(month: number) {
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
}

export default getMonthAbbreviation;