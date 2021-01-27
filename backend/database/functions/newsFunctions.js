import Mongoose from 'mongoose';
import newsSchema from '../schemas/newsSchema.js'

const News = Mongoose.model("News", newsSchema);

export async function GetNewsFeed() {
    return await News.find({}).sort({ date: 'desc' })
        .then(function (foundNewsArticles) {
            // Construct array of news articles.
            var newsArticles = [];
            foundNewsArticles.forEach(function (newsArticle) {
                newsArticles.push({
                    id: newsArticle._id,
                    title: newsArticle.title,
                    textSnippet: newsArticle.content.substring(0, 200),
                    imgURI: newsArticle.image_uri,
                    date: newsArticle.date
                })
            });

            console.log("Successfully retrieved news feed");

            // Return news articles as JSON.
            return JSON.stringify({ newsListItems: newsArticles });
        })
        .catch(function (err) {
            console.log("GetNewsFeed failed: " + err);
            return "";
        });
}

export async function CreateNewsArticle(title, content, image_uri) {
    return await News.create({
        title: title,
        content: content,
        image_uri: image_uri
    })
        .then(function (createdNewsArticle) {
            console.log("Successfully created news article with id " + createdNewsArticle._id);

            // Return news article as JSON.
            return JSON.stringify({
                id: createdNewsArticle.id,
                title: createdNews.title,
                imgURI: createdNews.image_uri,
                date: createdNews.date,
                fullText: createdNews.content
            });
        })
        .catch(function (err) {
            console.log("CreateNewsArticle failed: " + err);
            return "";
        });
}

export async function DeleteNewsArticle(id) {
    await News.findByIdAndDelete(id)
        .then(() => console.log("Successfully deleted news article with id " + id))
        .catch(function (err) {
            console.log("DeleteNewsArticle failed: " + err);
        });
}

export async function GetNewsArticle(id) {
    return await News.findById(id)
        .then(function (foundNewsArticle) {
            console.log("Successfully retrieved news article with id " + foundNewsArticle._id);

            // Return news article as JSON.
            return JSON.stringify({
                id: foundNewsArticle.id,
                title: foundNewsArticle.title,
                imgURI: foundNewsArticle.image_uri,
                date: foundNewsArticle.date,
                fullText: foundNewsArticle.content
            });
        })
        .catch(function (err) {
            console.log("GetNewsArticle failed: " + err);
            return "";
        });
}

