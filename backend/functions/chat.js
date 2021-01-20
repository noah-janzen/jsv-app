import fs from 'fs';

export function Chat() {
    let rawData = fs.readFileSync("D:/Philipp Student/HRW/jsv-app-server/json/chat.json");
    return JSON.parse(rawData);
}

export function Thread() {
    let rawData = fs.readFileSync("D:/Philipp Student/HRW/jsv-app-server/json/thread.json");
    return JSON.parse(rawData);
}

