import fs from 'fs';

export function NewsFeed() {
    let rawData = fs.readFileSync("D:/Philipp Student/HRW/jsv-app-server/json/news-feed.json");
    return JSON.parse(rawData);
}

export function NewsArticle() {
    let rawData = fs.readFileSync("D:/Philipp Student/HRW/jsv-app-server/json/news-article.json");
    return JSON.parse(rawData);
}

