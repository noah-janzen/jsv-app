import { ChatListItemRaw } from '../models/chatListItemRaw';
import { ChatListItem } from '../models/chatListItem';

export class ChatListFactory {
    static fromRaw(cl: ChatListItemRaw) {
        return {
            ...cl,
            date: new Date(cl.date),
            textSnippet: cl.text_snippet,
            numberOfAnswers: cl.number_of_answers
        };
    }
}