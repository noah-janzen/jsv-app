// Data model for an chat list item that comes raw from the server
// (e. g. date is typed as string)
// will be transformed in the chatListFactory
export interface ChatListItemRaw {
    id: string;
    text_snippet: string;
    date: string;
    number_of_answers: number;
}