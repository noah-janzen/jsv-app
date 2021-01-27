import { AttendanceResponses } from "./attendanceResponses";

export interface EventListItem {
    id: string;
    title: string;
    date: Date;
    location: string,
    attendance_responses: AttendanceResponses; 
}