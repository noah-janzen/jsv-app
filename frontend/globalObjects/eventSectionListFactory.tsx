import { EventListItem } from "../models/eventListItem";
import { EventListItemRaw } from "../models/eventListRaw";
import { EventSectionListSection, EventSectionListSectionItem } from "../models/eventSectionList";
import { getMonthString } from "./dateAndTimeFunctions";

export class EventSectionListFactory {
    static fromEventListItemRaw(eventListItemRaw: EventListItemRaw): EventListItem {
        return {
            ...eventListItemRaw,
            date: new Date(eventListItemRaw.date)
        };
    }

    static fromEventListItemRawArray(eventListItemRawArray: EventListItemRaw[]): EventListItem[] {
        return eventListItemRawArray.map(eventListItemRaw => this.fromEventListItemRaw(eventListItemRaw))
    }

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

            // if month section already exists, push empty month element
            if (eventSectionList.filter(e => e.title === monthString).length === 0) {
                eventSectionList.push(
                    {
                        title: monthString,
                        data: []
                    }
                )
            }

            // push eventItem to corresponding section
            eventSectionList.find(section => section.title === monthString)?.data.push(item);

        })

        return eventSectionList;
    }
}