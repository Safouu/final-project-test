import { useState, useEffect } from 'react';
import { DayPilot, DayPilotScheduler } from 'daypilot-pro-react';


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
  const [scheduler, setScheduler] = useState(null);
  const [startDate, setStartDate] = useState("2024-01-01"); 
  const [days, setDays] = useState(365); 

  useEffect(() => {
    
    fetch('http://localhost:3232/objects')
      .then((res) => res.json())
      .then((data) => {
        const resources = data.map((item) => ({
          id: item._id,
          name: item.name,
          color: getColorForResource(item._id, data) 
        }));
        setObjects(resources);

       
        const initialEvents = [
          {
            id: 1,
            text: "Event 1",
            start: "2025-01-02T00:00:00",
            end: "2025-01-05T00:00:00",
          },
        
        ];
        setEvents(initialEvents);
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
    days,
    startDate,
    timeRangeSelectedHandling: "Enabled",
    rowHeaderWidth: 150,
    onEventMoved: args => {
      console.log("Event moved:", args.e.data.id, args.newStart, args.newEnd, args.newResource);
      scheduler.message("Event moved: " + args.e.data.text);
    },
    onEventResized: args => {
      console.log("Event resized:", args.e.data.id, args.newStart, args.newEnd);
      scheduler.message("Event resized: " + args.e.data.text);
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
      scheduler.events.add(newEvent);
    },
    onBeforeEventRender: args => {
      const resource = objects.find(o => o.id === args.data.resource);
      const color = resource ? resource.color : "#93c47d"; // Default color
      args.data.backColor = color;
    },
    contextMenu: new DayPilot.Menu({
      items: [
        {
          text: "Delete",
          onClick: async args => {
            const modal = await DayPilot.Modal.confirm("Do you want to delete this event?");
            if (modal.canceled) return;
          //  scheduler.events.remove(args.source);
           // setEvents(prevEvents => prevEvents.filter(event => event.id !== args.source.id));
           console.log("Deleted", args.source);
        
           // Optionally, you can show a message to the user indicating the action was confirmed
           //DayPilot.Modal.alert();
    
          }
        }
      ]
    })
  };

  return (
    <div className="admin-container-calendar">
      <div className='demo'>ADMIN</div>
      <h1>Admin Scheduler</h1>
      <DayPilotScheduler
        {...config}
        events={events}
        resources={objects}
        ref={setScheduler}
      />
    </div>
  );
};

export default AdminCalendar;
