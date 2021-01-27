import { AttendanceResponses } from "./attendanceResponses";

export interface EventSectionListSection {
    title: string;
    data: EventSectionListSectionItem[];
}

export interface EventSectionListSectionItem {
    id: string;
    title: string;
    date: Date;
    location: string,
    attendance_responses: AttendanceResponses; 
}