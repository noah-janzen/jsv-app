import { ChatListItemRaw } from '../models/chatListItemRaw';
import { ChatListItem } from '../models/chatListItem';

export class ChatListFactory {
    // transforms chat list item raw (which comes from the server) to a chat list item used in the app
    static fromRaw(item: ChatListItemRaw): ChatListItem {
        return {
            id: item.id,
            textSnippet: item.text_snippet,
            date: new Date(item.date),
            numberOfAnswers: item.number_of_answers
        };
    }
}