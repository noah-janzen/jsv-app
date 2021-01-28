import Mongoose from 'mongoose';
import newsSchema from '../schemas/newsSchema.js';
import globals from '../globals.js';
import { currentDateAndTime } from './shared.js';

// Compile model from news schema.
const News = Mongoose.model("News", newsSchema);

/**
 * Retrieves all the available news articles in descending order.
 * @returns A JSON object containing all the news articles.
 */
const GetNewsFeed = async () => {
    return await News
        .find({})
        .sort({ date: 'desc' })
        .then(function (foundNewsArticles) {
            // Construct array of news articles.
            var newsArticles = [];
            foundNewsArticles.forEach(function (newsArticle) {
                newsArticles.push({
                    id: newsArticle._id,
                    title: newsArticle.title,
                    textSnippet: newsArticle.content.substring(0, globals.newsArticleTextSnippetCharacterNumber),
                    imgURI: newsArticle.image_uri,
                    date: newsArticle.date
                })
            });

            // Return news articles as JSON.
            return JSON.stringify({ newsListItems: newsArticles });
        })
        .catch(function (err) {
            console.log("GetNewsFeed failed: " + err);
            return "";
        });
};

/**
 * Creates a n new news article with the specified information.
 * @param {*} title A title describing the news article briefly.
 * @param {*} content Content of the news article.
 * @param {*} image_uri An URI to an image representing the news article.
 * @returns The newly created news article as a JSON object.
 */
const CreateNewsArticle = async (title, content, image_uri) => {
    return await News
        .create({
            title: title,
            content: content,
            image_uri: image_uri,
            date: currentDateAndTime()
        })
        .then(function (createdNewsArticle) {
            // Return news article as JSON.
            return JSON.stringify({
                id: createdNewsArticle.id,
                title: createdNewsArticle.title,
                imgURI: createdNewsArticle.image_uri,
                date: createdNewsArticle.date,
                fullText: createdNewsArticle.content
            });
        })
        .catch(function (err) {
            console.log("CreateNewsArticle failed: " + err);
            return "";
        });
};

/**
 * Deletes the news article that has the specified id.
 * @param {*} id Id of the news article that should be deleted. 
 */
const DeleteNewsArticle = async (id) => {
    await News
        .findByIdAndDelete(id)
        .catch(function (err) {
            console.log("DeleteNewsArticle failed: " + err);
        });
};

/**
 * Retrieves the news article that has the specified id.
 * @param {*} id The id of the news article that should be retrieved.
 * @returns The desired news article as a JSON object.
 */
const GetNewsArticle = async (id) => {
    return await News
        .findById(id)
        .then(function (foundNewsArticle) {
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
};

export { GetNewsFeed, CreateNewsArticle, DeleteNewsArticle, GetNewsArticle };