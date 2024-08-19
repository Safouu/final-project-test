import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css'; 

const ObjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [object, setObject] = useState(null);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);
  const [isBookingValid, setIsBookingValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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

  useEffect(() => {
    const start = dateRange[0].startDate;
    const end = dateRange[0].endDate;
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

    if (days < 5) {
      setIsBookingValid(false);
      setErrorMessage('You must select minimum 5 days.');
    } else {
      setIsBookingValid(true);
      setErrorMessage('');
    }
  }, [dateRange]);

  const handleBooking = () => {
    if (!isBookingValid) return;

    navigate('/booking', { state: { object, dateRange } });
  };

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

            <div className="calendar-section">
              <h3>Select Your Stay:</h3>
              <DateRange
                editableDateInputs={true}
                onChange={item => setDateRange([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={dateRange}
                className="date-range-picker"
              />
              {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            </div>

            <button
              className="booking-button"
              onClick={handleBooking}
              disabled={!isBookingValid}
            >
              Book Now
            </button>
          </div>
        )
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ObjectDetail;