import fs from 'fs';

export default function ReadJsonFile(path) {
    let rawData = fs.readFileSync(path);
    return JSON.parse(rawData);
}
