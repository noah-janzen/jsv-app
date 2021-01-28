import Mongoose from 'mongoose';
import eventSchema from '../schemas/eventSchema.js';
import { currentDateAndTime, getMidnightTimeFormat } from './shared.js';

export const AttendanceResponseType = {
    YES: 1,
    NO: 2,
    NOT_SURE: 3,
    NONE: 4
};

const Event = Mongoose.model("Event", eventSchema);

export async function GetEventOverview() {
    return await Event
        .find({ "start_time": { "$gte": getMidnightTimeFormat(currentDateAndTime()) } }, "_id title location start_time number_of_yes number_of_no number_of_not_sure")
        .then(function (foundEvents) {
            // Construct array of events.
            var events = [];
            foundEvents.forEach(function (event) {
                events.push({
                    id: event._id,
                    title: event.title,
                    date: event.start_time,
                    location: event.location,
                    attendance_responses: {
                        yes: event.number_of_yes,
                        no: event.number_of_no,
                        not_sure: event.number_of_not_sure
                    }
                })
            });

            console.log("Successfully retrieved event overview");

            // Return created events as JSON.
            return JSON.stringify({ eventListItems: events });
        })
        .catch(function (err) {
            console.log("GetEventOverview failed: " + err);
            return "";
        });
}

export async function CreateEvent(title, description, location, start_time, image_uri, is_public) {
    return await Event
        .create({
            title: title,
            description: description,
            location: location,
            start_time: start_time,
            image_uri: image_uri,
            is_public: is_public
        })
        .then(function (createdEvent) {
            console.log("Successfully created event with id " + createdEvent._id);

            // Return created event as JSON.
            return JSON.stringify({
                event: {
                    id: createdEvent._id,
                    title: createdEvent.title,
                    date: createdEvent.start_time,
                    location: createdEvent.location,
                    attendance_responses: {
                        yes: createdEvent.number_of_yes,
                        no: createdEvent.number_of_no,
                        not_sure: createdEvent.number_of_not_sure
                    },
                    public: createdEvent.is_public ? "Öffentliche Veranstaltung" : "Interne Vereinsveranstaltung",
                    description: createdEvent.description,
                    imgURI: createdEvent.image_uri
                }
            });
        })
        .catch(function (err) {
            console.log("CreateEvent failed: " + err)
            return "";
        });
}

export async function DeleteEvent(id) {
    await Event
        .findByIdAndDelete()
        .then(() => console.log("Successfully deleted event with id " + id))
        .catch(function (err) {
            console.log("DeleteEvent failed: " + err);
        });
}

export async function GetEvent(id) {
    return await Event
        .findById(id)
        .then(function (foundEvent) {
            console.log("Successfully retrieved event with id " + foundEvent._id);

            // Return found event as JSON.
            return JSON.stringify({
                event: {
                    id: foundEvent._id,
                    title: foundEvent.title,
                    date: foundEvent.start_time,
                    location: foundEvent.location,
                    attendance_responses: {
                        yes: foundEvent.number_of_yes,
                        no: foundEvent.number_of_no,
                        not_sure: foundEvent.number_of_not_sure
                    },
                    public: foundEvent.is_public ? "Öffentliche Veranstaltung" : "Interne Vereinsveranstaltung",
                    description: foundEvent.description,
                    imgURI: foundEvent.image_uri
                }
            });
        })
        .catch(function (err) {
            console.log("GetEvent failed: " + err);
            return "";
        });
}

export function GetAttendanceResponseType(stringResponseType) {
    if (!stringResponseType) {
        return AttendanceResponseType.NONE;
    }
    else {
        return stringResponseType == "yes" ? AttendanceResponseType.YES : (stringResponseType == "no" ? AttendanceResponseType.NO : AttendanceResponseType.NOT_SURE);
    }
}

function GetAttendanceResponseUpdateCriteria(newAttendance, oldAttendance) {
    switch (newAttendance) {
        case AttendanceResponseType.YES:
            switch (oldAttendance) {
                case AttendanceResponseType.NO:
                    return { $inc: { number_of_no: -1, number_of_yes: 1 } };

                case AttendanceResponseType.NOT_SURE:
                    return { $inc: { number_of_not_sure: -1, number_of_yes: 1 } };

                case AttendanceResponseType.NONE:
                    return { $inc: { number_of_yes: 1 } };
            }

            break;

        case AttendanceResponseType.NO:
            switch (oldAttendance) {
                case AttendanceResponseType.YES:
                    return { $inc: { number_of_yes: -1, number_of_no: 1 } };

                case AttendanceResponseType.NOT_SURE:
                    return { $inc: { number_of_not_sure: -1, number_of_no: 1 } };

                case AttendanceResponseType.NONE:
                    return { $inc: { number_of_no: 1 } };
            }
            break;

        case AttendanceResponseType.NOT_SURE:
            switch (oldAttendance) {
                case AttendanceResponseType.YES:
                    return { $inc: { number_of_yes: -1, number_of_not_sure: 1 } };

                case AttendanceResponseType.NO:
                    return { $inc: { number_of_no: -1, number_of_not_sure: 1 } };

                case AttendanceResponseType.NONE:
                    return { $inc: { number_of_not_sure: 1 } };
            }
            break;
    }
}

export async function AlterAttendanceResponse(id, newAttendance, oldAttendance) {
    if (newAttendance != oldAttendance) {
        return await Event
            .findByIdAndUpdate(id, GetAttendanceResponseUpdateCriteria(newAttendance, oldAttendance), { new: true })
            .then(function (updatedEvent) {
                console.log("Successfully updated attendance responses of event with id " + id);

                // Return updated event as JSON.
                return JSON.stringify({
                    event: {
                        id: updatedEvent._id,
                        title: updatedEvent.title,
                        date: updatedEvent.date,
                        location: updatedEvent.location,
                        attendance_responses: {
                            yes: updatedEvent.number_of_yes,
                            no: updatedEvent.number_of_no,
                            not_sure: updatedEvent.number_of_not_sure
                        },
                        public: updatedEvent.is_public ? "Öffentliche Veranstaltung" : "Interne Vereinsveranstaltung",
                        description: updatedEvent.description,
                        imgURI: updatedEvent.image_uri
                    }
                })
            })
            .catch(function (err) {

            });
    }
}