
import { useState, useEffect } from 'react';
import { DayPilot, DayPilotScheduler } from 'daypilot-pro-react';


const AdminCalendar = () => {
const [objects, setObjects] = useState([]);
const [events, setEvents] = useState([]);
const [scheduler, setScheduler] = useState(null);
const [startDate, setStartDate] = useState("2024-01-01");
const [days, setDays] = useState(365);

useEffect(() => {
fetch('http://localhost:3232/objects')
.then((res) => res.json())
.then((data) => {
const resources = data.map((item) => ({
id: item._id,
name: item.name
}));
setObjects(resources);
})
.catch((error) => console.error('Error fetching objects:', error));
}, []);

const config = {
timeHeaders: [
{ groupBy: "Month" },
{ groupBy: "Day", format: "d" }
],
scale: "Day",
cellWidth: 50,
plugins: [],
durationBarVisible: false,
treeEnabled: true,
rowHeaderColumns: [
{ name: "Object Name", display: "name", width: 150 },
],
onEventMoved: args => {
console.log("Event moved: ", args.e.data.id, args.newStart, args.newEnd, args.newResource);
scheduler.message("Event moved: " + args.e.data.text);
},
onEventResized: args => {
console.log("Event resized: ", args.e.data.id, args.newStart, args.newEnd);
scheduler.message("Event resized: " + args.e.data.text);
},
onTimeRangeSelected: async args => {
const modal = await DayPilot.Modal.prompt("New event name", "Event");

if (!modal.result) {
return;
}
const newEvent = {
id: DayPilot.guid(),
text: modal.result,
start: args.start,
end: args.end,
resource: args.resource
};
console.log('New event created:', newEvent);

setEvents(prevEvents => [...prevEvents, newEvent]);
scheduler.events.add(newEvent);
},
onBeforeEventRender: args => {
if (!args.data.backColor) {
args.data.backColor = "#93c47d";
}
args.data.borderColor = "#2a498d";
args.data.fontColor = "#470450";
},
contextMenu: new DayPilot.Menu({
items: [
{
text: "Delete",
onClick: async args => {
const modal = await DayPilot.Modal.confirm("Do you really want to delete this event?");
if (modal.canceled) {
return;
}
scheduler.events.remove(args.source);
setEvents(prevEvents => prevEvents.filter(event => event.id !== args.source.id));
}
},
]
})
};

return (
<div className="admin-container-calendar">
<h1>Admin Scheduler</h1>
<DayPilotScheduler
  {...config}
  startDate={startDate}
  days={days}
  events={events}
  resources={objects}
  ref={setScheduler} // Use ref directly
/>

</div>
);
}

export default AdminCalendar;

