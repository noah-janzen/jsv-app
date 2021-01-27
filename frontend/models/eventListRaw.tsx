import { AttendanceResponses } from "./attendanceResponses";

export interface EventListItemRaw {
    id: string;
    title: string;
    date: string;
    location: string,
    attendance_responses: AttendanceResponses; 
}