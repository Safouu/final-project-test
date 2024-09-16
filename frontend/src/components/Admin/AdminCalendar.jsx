
import { useState, useEffect, useRef } from 'react';
import { DayPilotScheduler, DayPilot } from 'daypilot-pro-react';
import moment from 'moment-timezone'; 
import DatePicker from 'react-datepicker'; 
import 'react-datepicker/dist/react-datepicker.css'; 

const generateRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 1; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};


const getColorForResource = (resourceId, resources) => {
  const resource = resources.find(r => r.id === resourceId);
  return resource ? resource.color : generateRandomColor();
};


const deduplicateResources = (data) => {
  return data
    .filter((item, index, self) => self.findIndex(t => t.apartment._id === item.apartment._id) === index)
    .map(item => ({
      id: item.apartment._id,
      name: item.apartment.name,
      color: getColorForResource(item.apartment._id, data)
    }));
};

const processEvents = (data) => {
  return data
    .filter(item => item.apartment && item.user) 
    .map(item => {
      const startDateUTC = moment.utc(item.startDate).local().format('YYYY-MM-DDTHH:mm:ss');
      const endDateUTC = moment.utc(item.endDate).local().endOf('day').format('YYYY-MM-DDTHH:mm:ss');
      return {
        id: item._id,
        text: item.user.firstName,
        start: startDateUTC,
        end: endDateUTC,
        resource: item.apartment._id
      };
    });
};

const AdminCalendar = () => {
  const [objects, setObjects] = useState([]);
  const [events, setEvents] = useState([]);
  const schedulerRef = useRef(null);
  const [startDate, setStartDate] = useState(moment().startOf('month').format('YYYY-MM-DD')); 
  const [days] = useState(365); 

 
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3232/bookings');
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      const data = await response.json();
      console.log('Fetched data:', data); 

      const resources = deduplicateResources(data);
      const events = processEvents(data);

      setObjects(resources);
      setEvents(events);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

    const handleMonthChange = (direction) => {
      const newDate = moment(startDate).add(direction, 'months').toDate();
      setStartDate(newDate);
    };

 
  const handleDateChange = (date) => {
    const formattedDate = moment(date).startOf('month').format('YYYY-MM-DD');
    setStartDate(formattedDate); 
  };

 
  const config = {
    timeHeaders: [
      { groupBy: 'Month' },
      { groupBy: 'Day', format: 'd' }
    ],
    scale: 'Day',
    cellWidth: 50,
    days,
    startDate,
    timeRangeSelectedHandling: 'Enabled',
    rowHeaderWidth: 185,
    onEventMoved: (args) => {
      console.log('Event moved:', args.e.data.id, args.newStart, args.newEnd, args.newResource);
      schedulerRef.current.message(`Event moved: ${args.e.data.text}`);
    },
    onEventResized: (args) => {
      console.log('Event resized:', args.e.data.id, args.newStart, args.newEnd);
      schedulerRef.current.message(`Event resized: ${args.e.data.text}`);
    },
    onTimeRangeSelected: async (args) => {
      const modal = await DayPilot.Modal.prompt('New event name', 'Event');
      if (!modal.result) return;
      const newEvent = {
        id: DayPilot.guid(),
        text: modal.result,
        start: args.start,
        end: args.end,
        resource: args.resource
      };
      console.log('New event created:', newEvent);
      setEvents((prevEvents) => [...prevEvents, newEvent]);
      schedulerRef.current.events.add(newEvent);
    },
    onBeforeEventRender: (args) => {
      const resource = objects.find(o => o.id === args.data.resource);
      const color = resource ? resource.color : '#93c47d';
      args.data.backColor = color;
    },
    contextMenu: new DayPilot.Menu({
      items: [
        {
          text: 'Delete',
          onClick: async (args) => {
            const modal = await DayPilot.Modal.confirm('Do you want to delete this event?');
            if (modal.canceled) return;
            console.log('Deleted', args.source);
          }
        }
      ]
    })
  };

  return (
    <div>
      <div className="admin-container-calendar">
        <h1>Booking Calendar</h1>

        <div className="date-picker-container" style={{ marginBottom: '20px' }}>
          <DatePicker
            selected={new Date(startDate)}
            onChange={handleDateChange}
            dateFormat="MMMM yyyy" 
            showMonthYearPicker 
            className="react-datepicker-ignore-onclickoutside"
       
          />
        <div className="arrow-buttons">
        <button onClick={() => handleMonthChange(-1)}>{'<'}</button>
        <button onClick={() => handleMonthChange(1)}>{'>'}</button>
      </div>

        </div>


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
