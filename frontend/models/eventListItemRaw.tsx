import { AttendanceResponses } from "./attendanceResponses";

// Data model for an event list item that comes raw from the server
// (e. g. date is typed as string)
// will be transformed in the eventSectionListFactory
export interface EventListItemRaw {
    id: string;
    title: string;
    date: string;
    location: string,
    attendance_responses: AttendanceResponses; 
}