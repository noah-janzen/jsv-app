import { EventListItem } from "../models/eventListItem";
import { EventListItemRaw } from "../models/eventListItemRaw";
import { EventSectionListSection, EventSectionListSectionItem } from "../models/eventSectionList";
import { getMonthString } from "./dateAndTimeFunctions";

export class EventSectionListFactory {
    // transforms _raw_ event list item (which comes from the server) to a list item
    static fromEventListItemRaw(eventListItemRaw: EventListItemRaw): EventListItem {
        return {
            ...eventListItemRaw,
            date: new Date(eventListItemRaw.date)
        };
    }

    // transforms _raw_ event list item _arraw_ to list item _arraw_
    static fromEventListItemRawArray(eventListItemRawArray: EventListItemRaw[]): EventListItem[] {
        return eventListItemRawArray.map(eventListItemRaw => this.fromEventListItemRaw(eventListItemRaw))
    }

    // transforms event list item array to a section list in correct format for react native section list
    // array of objects with props 'title' and 'data'
    // Assigns a specific event list item to a section depending on month and year of the event.
    static toSectionList(eventListItems: EventListItem[]): EventSectionListSection[] {
        let eventSectionList: EventSectionListSection[] = [];

        // adds each item in EventSectionList
        eventListItems.forEach(item => {
            let monthString: string = getMonthString(item.date.getMonth());

            // add appropriate year to monthString, if year of event is not in current calendar year
            let isInCurrentCalendarYear = item.date.getFullYear() === new Date().getFullYear();
            if(!isInCurrentCalendarYear) {
                monthString += (', ' + item.date.getFullYear());
            }

            // if month section does not exist yet, create month section and push empty month element in it
            if (eventSectionList.filter(e => e.title === monthString).length === 0) {
                eventSectionList.push(
                    {
                        title: monthString,
                        data: []
                    }
                )
            }

            // push eventItem to corresponding month section
            eventSectionList.find(section => section.title === monthString)?.data.push(item);

        })

        return eventSectionList;
    }
}