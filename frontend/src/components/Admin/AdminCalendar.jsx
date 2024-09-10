import { useState, useEffect, useRef } from 'react';
import { DayPilotScheduler, DayPilot } from 'daypilot-pro-react';

const generateRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const getColorForResource = (resourceId, resources) => {
  const resource = resources.find(r => r.id === resourceId);
  return resource ? resource.color : generateRandomColor();
};

const AdminCalendar = () => {
  const [objects, setObjects] = useState([]);
  const [events, setEvents] = useState([]);
  
  const schedulerRef = useRef(null);
  const [startDate, setStartDate] = useState("2024-09-01");
  const [days, setDays] = useState(365);

  useEffect(() => {
    fetch('http://localhost:3232/reservations')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Fetched data:', data);

      const resources = data
        .filter((item, index, self) => self.findIndex(t => t.apartment._id === item.apartment._id) === index) // Entfernen von Duplikaten
        .map(item => ({
          id: item.apartment._id,
          name: item.apartment.name,
          color: getColorForResource(item.apartment._id, data)
        }));
      
      const events = data
        .filter((item, index, self) => self.findIndex(t => t._id === item._id) === index) // Entfernen von Duplikaten
        .map(item => ({
          id: item._id,
          text: item.user.firstName,
          start: item.startDate,
          end: item.endDate,
          resource: item.apartment._id
        }));
      

        setObjects(resources);
        setEvents(events);

        // console.log(events)
        // console.log(resources)
        // console.log(data)
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const config = {
    timeHeaders: [
      { groupBy: "Month" },
      { groupBy: "Day", format: "d" }
    ],
    scale: "Day",
    cellWidth: 50,
    days,
    startDate,
    timeRangeSelectedHandling: "Enabled",
    rowHeaderWidth: 150,
    onEventMoved: args => {
      console.log("Event moved:", args.e.data.id, args.newStart, args.newEnd, args.newResource);
      schedulerRef.current.message("Event moved: " + args.e.data.text);
    },
    onEventResized: args => {
      console.log("Event resized:", args.e.data.id, args.newStart, args.newEnd);
      schedulerRef.current.message("Event resized: " + args.e.data.text);
    },
    onTimeRangeSelected: async args => {
      const modal = await DayPilot.Modal.prompt("New event name", "Event");
      if (!modal.result) return;
      const newEvent = {
        id: DayPilot.guid(),
        text: modal.result,
        start: args.start,
        end: args.end,
        resource: args.resource
      };
      console.log('New event created:', newEvent);
      setEvents(prevEvents => [...prevEvents, newEvent]);
      schedulerRef.current.events.add(newEvent);
    },
    onBeforeEventRender: args => {
      const resource = objects.find(o => o.id === args.data.resource);
      const color = resource ? resource.color : "#c47dc4";
      args.data.backColor = color;
    },
    contextMenu: new DayPilot.Menu({
      items: [
        {
          text: "Delete",
          onClick: async args => {
            const modal = await DayPilot.Modal.confirm("Do you want to delete this event?");
            if (modal.canceled) return;
            console.log("Deleted", args.source);
          }
        }
      ]
    })
  };

  return (
    <div>
      <div className="admin-container-calendar">
        <h1>Admin Scheduler</h1>
        <DayPilotScheduler
          {...config}
          events={events}
          resources={objects}
          ref={schedulerRef}
        />
      </div>
    </div>
  );
};

export default AdminCalendar;


