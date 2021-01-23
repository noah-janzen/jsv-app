import { EventOverviewItem } from '../models/eventOverviewItem';
import globalObjects from './globalObjects';

export default function fetchEventOverviewList() {
    let requestUrl = globalObjects.serverURL + '/event-overview';
    let fetchedJSON: EventOverviewItem[] = [];

    fetch(requestUrl, globalObjects.globalHeader)
        .then((response) => response.json())
        .then((json) => json.eventListItems)
        .then((eventListItems) => eventListItems.array.forEach(eventListItem => {
            eventListItem.date = new Date(eventListItem.date);
            return eventListItem;
        }))
        .then((eventListItems) => fetchedJSON = eventListItems)
        .catch((error) => console.error(error));

    console.log(fetchedJSON);
}