import React from 'react';

function createDateTimeString(date: Date) {
    let dayString = (date.getDate() + 1) < 10 ? '0' + date.getDate() : date.getDate();
    let monthString = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
    let yearString = date.getFullYear();

    let hours = date.getHours();
    let minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();

    let formatedDate = dayString + '.' + monthString + '.' + yearString + ' · ' + hours + ':' + minutes + ' Uhr';

    return formatedDate;
}

export default createDateTimeString;