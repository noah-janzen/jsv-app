import Mongoose from 'mongoose';
import eventSchema from '../schemas/eventSchema.js';
import { currentDateAndTime, getMidnightTimeFormat, getNextYearPeriod } from './shared.js';

/**
 * Describes the different types of attendance responses of an event. 
 */
const AttendanceResponseType = {
    YES: 1,
    NO: 2,
    NOT_SURE: 3,
    NONE: 4
};

// Compile model from event schema.
const Event = Mongoose.model("Event", eventSchema);

/**
 * Retrieves all the currently available events.
 * @returns A JSON object containing all the events.
 */
const getEventOverview = async () => {
    return await Event
        .find({
            "start_time": {
                "$gte": getMidnightTimeFormat(currentDateAndTime()), "$lt": getNextYearPeriod(currentDateAndTime())
            }
        }, "_id title location start_time number_of_yes number_of_no number_of_not_sure")
        .sort({ start_time: 'asc' })
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

            // Return created events as JSON.
            return JSON.stringify({ eventListItems: events });
        })
        .catch(function (err) {
            console.log("getEventOverview failed: " + err);
            return "";
        });
};

/**
 * Creates an event with the specified information.
 * @param {*} title A title describing the event briefly.
 * @param {*} description A description specifying details of the event.
 * @param {*} location Where the event takes place.
 * @param {*} start_time On which date and at which time the event takes place.
 * @param {*} image_uri An URI to an image representing the event.
 * @param {*} is_public Whether the event is public or club-intern only.
 * @returns The newly created event as a JSON object. 
 */
const createEvent = async (title, description, location, start_time, image_uri, is_public) => {
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
            console.log("createEvent failed: " + err)
            return "";
        });
};

/**
 * Deletes the event that has the specified id.
 * @param {*} id The id of the event that should be deleted.
 */
const deleteEvent = async (id) => {
    await Event
        .findByIdAndDelete(id)
        .catch(function (err) {
            console.log("deleteEvent failed: " + err);
        });
};

/**
 * Retrieves the event with the specified id.
 * @param {*} id The id of the event that should be retrieved.
 * @returns The desired event as a JSON object.
 */
const getEvent = async (id) => {
    return await Event
        .findById(id)
        .then(function (foundEvent) {
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
            console.log("getEvent failed: " + err);
            return "";
        });
};

/**
 * Returns an AttendanceResponseType based on the specified string.
 * @param {*} stringResponseType String representation of an AttendanceResponseType.
 * @returns An AttendanceResponseType that matches to the specified string.
 */
const getAttendanceResponseType = (stringResponseType) => {
    if (!stringResponseType) {
        return AttendanceResponseType.NONE;
    }
    else {
        switch (stringResponseType) {
            case "yes":
                return AttendanceResponseType.YES;

            case "no":
                return AttendanceResponseType.NO;

            case "not_sure":
                return AttendanceResponseType.NOT_SURE;

            default:
                return AttendanceResponseType.NONE;
        }
    }
};

/**
 * Returns an update object required for a database query based on the specified AttendanceResponseTypes.
 * @param {*} newAttendance The new attendance status.
 * @param {*} oldAttendance The old attendance status.
 * @returns An update object required for a database query based on the specified AttendanceResponseTypes.
 */
const getAttendanceResponseUpdateCriteria = (newAttendance, oldAttendance) => {
    // Based on the specified types, increment/decrement the attendance response values.
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
};

/**
 * Alters the number of a specific AttendanceResponseType of the event with the specified id.
 * @param {*} id Id of the event of which the attendance reponses should be altered.
 * @param {*} newAttendance Old Attendance status.
 * @param {*} oldAttendance New attendance status.
 * @returns The event with the updated attendance response values as a JSON object.
 */
const alterAttendanceResponse = async (id, newAttendance, oldAttendance) => {
    if (newAttendance != oldAttendance) {
        return await Event
            .findByIdAndUpdate(id, getAttendanceResponseUpdateCriteria(newAttendance, oldAttendance), { new: true })
            .then(function (updatedEvent) {
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
                console.log("AlterAttendanceReponse failed: " + err);
                return "";
            });
    }
};

export { AttendanceResponseType, getEventOverview, createEvent, deleteEvent, getEvent, getAttendanceResponseType, alterAttendanceResponse };