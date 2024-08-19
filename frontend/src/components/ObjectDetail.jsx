import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // Import default styles
import 'react-date-range/dist/theme/default.css'; // Import theme styles

const ObjectDetail = () => {
  const { id } = useParams();
  const [object, setObject] = useState(null);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);

  useEffect(() => {
    fetch(`http://localhost:3232/objects/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setObject(data);
        console.log('Fetched object:', data);
        console.log('Image URL:', data.image);
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
        setObject({ error: 'Failed to load object details' });
      });
  }, [id]);

  return (
    <div className='object-detail'>
      {object ? (
        object.error ? (
          <p>{object.error}</p>
        ) : (
          <div>
            <img 
              src={object.image} 
              alt={object.name} 
              onError={(e) => {
                console.error("Image failed to load:", e.target.src);
                e.target.onerror = null; 
                e.target.src = "/path-to-fallback-image.jpg";
              }} 
            />
            <h1>{object.name}</h1>
            <h3>{object.description}</h3>
            <h4>{object.price} $</h4>

            {/* Date Range Picker */}
            <div className="calendar-section">
              <h3>Select Your Stay:</h3>
              <DateRange
                editableDateInputs={true}
                onChange={item => setDateRange([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={dateRange}
                className="date-range-picker"
              />
              <p>
                Arrival: {dateRange[0].startDate.toDateString()}<br />
                Departure: {dateRange[0].endDate.toDateString()}
              </p>
            </div>
          </div>
        )
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ObjectDetail;
