import React from 'react';

function createDateString(date: Date) {
    let dayString = date.getDate();
    let monthString = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
    let yearString = date.getFullYear();
    let formatedDate = dayString + '.' + monthString + '.' + yearString;

    return formatedDate;
}

export default createDateString;