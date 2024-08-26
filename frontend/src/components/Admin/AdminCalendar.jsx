import { useState, useEffect } from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar'; // Umbenennen, um Konflikte mit react-calendar zu vermeiden
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const AdminCalendar = () => {
const [date, setDate] = useState(new Date());
const [events, setEvents] = useState([]);
const [objects, setObjects] = useState([]);

useEffect(() => {

fetch('http://localhost:3232/objects')
.then((res) => res.json())
.then((data) => {
const names = data.map(item => item.name);
setObjects(names);
})
.catch(error => console.error('Error fetching objects:', error));
}, []);

/*const handleDateChange = newDate => {
setDate(newDate);
};*/

const handleSelectSlot = ({ start, end }) => {
const title = window.prompt('New Event name');
if (title) {
setEvents([...events, { start, end, title }]);
}
};

const handleSelectEvent = (event) => {
window.alert(event.title);
};

const renderCalendarHeader = () => {
return (
<div className="calendar-header">
<button onClick={() => changeMonth(-1)}>{"<"}</button>
<span>{date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
<button onClick={() => changeMonth(1)}>{">"}</button>
</div>
);
};

const changeMonth = (offset) => {
setDate(prevDate => {
const newDate = new Date(prevDate);
newDate.setMonth(newDate.getMonth() + offset);
return newDate;
});
};

return (
<div className="admin-container-calendar">
<div className="object-table">
<table>
<thead>
<tr>
<th>Object Name</th>
</tr>
</thead>
<tbody>
{objects.map((object) => (
<tr key={object._id}>
<td>{object}</td>
</tr>
))}
</tbody>
</table>
</div>
<div className="admin-calendar">
<h1>Calendar</h1>
{renderCalendarHeader()}
<div style={{ height: '100vh' }}>
<BigCalendar
localizer={localizer}
events={events}
startAccessor="start"
endAccessor="end"
style={{ height: '100%' }}
selectable
onSelectSlot={handleSelectSlot}
onSelectEvent={handleSelectEvent}
/>
</div>
</div>
</div>
);
};

export default AdminCalendar;





