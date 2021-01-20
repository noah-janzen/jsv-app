import fs from 'fs';

export function EventOverview() {
    let rawData = fs.readFileSync("D:/Philipp Student/HRW/jsv-app-server/json/event-overview.json");
    return JSON.parse(rawData);
}

export function Event() {
    let rawData = fs.readFileSync("D:/Philipp Student/HRW/jsv-app-server/json/event.json");
    return JSON.parse(rawData);
}

