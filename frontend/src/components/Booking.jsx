import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { useAuth } from "../context/AuthContext";
import { eachDayOfInterval } from 'date-fns';

function Booking() {
  const { isLoggedIn, userId } = useAuth();
  const location = useLocation();
  const { apartment } = location.state || {};
  const [disabledDates, setDisabledDates] = useState([]);
  const navigate = useNavigate();

  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);
  const [formData, setFormData] = useState({
    user: "",
    apartment: apartment ? apartment.name : "",
    startDate: dateRange[0].startDate,
    endDate: dateRange[0].endDate,
    totalPrice: "",
    advancePayment: "",
    people: 0,
    children: 0,
    pets: 0,
    days: 0,
  });
  const [isBookingValid, setIsBookingValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  useEffect(() => {
    if (!apartment) return;

    const fetchBookedDates = async () => {
      try {
        const response = await fetch(`http://localhost:3232/booking/apartment/${apartment._id}`);
        const data = await response.json();

        if (response.ok) {
          if (data && data.length > 0) {
            const bookedRanges = data.map(booking => ({
              startDate: new Date(booking.startDate),
              endDate: new Date(booking.endDate),
            }));

            const allBookedDates = bookedRanges.flatMap(range => 
              eachDayOfInterval({
                start: range.startDate,
                end: range.endDate,
              })
            );

            setDisabledDates(allBookedDates);
          } else {
            setDisabledDates([]);
          }
        }
      } catch (error) {
        console.error("Error fetching booked dates:", error);
      }
    };

    fetchBookedDates();
  }, [apartment]);

  useEffect(() => {
    if (!apartment) return;

    const calculatePrice = () => {
      const { price } = apartment;
      const start = dateRange[0].startDate;
      const end = dateRange[0].endDate;
      const days = Math.ceil(((end - start) / (1000 * 60 * 60 * 24)) + 1);
      if (days < 5) {
        setIsBookingValid(false);
        setErrorMessage('You must select a minimum of 5 days.');
        return { days: 0, totalPrice: 0, advancePayment: 0 };
      } else {
        setIsBookingValid(true);
        setErrorMessage('');

        const totalPrice = price * days;
        const advancePayment = totalPrice * 0.3;

        return { days, totalPrice, advancePayment };
      }
    };
    const { days, totalPrice, advancePayment } = calculatePrice();
    setFormData((prevFormData) => ({
      ...prevFormData,
      days: days,
      totalPrice: totalPrice.toFixed(2),
      advancePayment: advancePayment.toFixed(2)
    }));
  }, [dateRange, apartment]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleIncrement = (field) => {
    setFormData({
      ...formData,
      [field]: formData[field] + 1,
    });
  };
  const handleDecrement = (field) => {
    setFormData({
      ...formData,
      [field]: formData[field] > 0 ? formData[field] - 1 : 0,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLoggedIn || !userId || !apartment) {
      alert('You must be logged in and have selected an apartment.');
      navigate("/login");
      return;
    }
    try {
      const response = await fetch(`http://localhost:3232/booking/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: userId,
          apartment: apartment._id,
          startDate: dateRange[0].startDate.toISOString(),
          endDate: dateRange[0].endDate.toISOString(),
          totalPrice: formData.totalPrice,
          advancePayment: formData.advancePayment,
          people: formData.people,
          children: formData.children,
          pets: formData.pets
        }),
      });

      const data = await response.json();

      if (response.status === 201) {
        alert('Reservation created successfully!, Thanks for booking with us');
        navigate('/');
      } else {
        console.log("Fehler:", data);
        alert(`Failed to create reservation: ${data.error}`);
      }
    } catch (error) {
      console.error('Error creating reservation:', error);
      alert(`Failed to create reservation: ${error.message}`);
    }
  };

  useEffect(() => {
    if (!apartment) {
      navigate('/');
    }
  }, [apartment, navigate]);

  return (
    <div className="home">
      <div className="booking-container">
        <form onSubmit={handleSubmit}>
          <div className="calendar-section">
            
            <DateRange
              editableDateInputs={true}
              onChange={item => setDateRange([item.selection])}
              moveRangeOnFirstSelection={false}
              ranges={dateRange}
              className="date-range-picker"
              minDate={new Date()}
              disabledDates={disabledDates}
            />
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          </div>
          <div className="people-container">
            <div className="people-group">
              <label>Adults:</label>
              <div className="input-group">
                <button type="button" onClick={() => handleDecrement("people")}>
                  -
                </button>
                <input
                  type="number"
                  name="people"
                  value={formData.people}
                  onChange={handleChange}
                  readOnly
                />
                <button type="button" onClick={() => handleIncrement("people")}>
                  +
                </button>
              </div>
            </div>
            <div>
              <label>Children:</label>
              <div className="input-group">
                <button type="button" onClick={() => handleDecrement("children")}>
                  -
                </button>
                <input
                  type="number"
                  name="children"
                  value={formData.children}
                  onChange={handleChange}
                  readOnly
                />
                <button type="button" onClick={() => handleIncrement("children")}>
                  +
                </button>
              </div>
            </div>
            <div>
              <label>Pets:</label>
              <div className="input-group">
                <button type="button" onClick={() => handleDecrement("pets")}>
                  -
                </button>
                <input
                  type="number"
                  name="pets"
                  value={formData.pets}
                  onChange={handleChange}
                  readOnly
                />
                <button type="button" onClick={() => handleIncrement("pets")}>
                  +
                </button>
              </div>
            </div>
          </div>
          <div className="price-calculator">
            <h3>Booking Price</h3>
            <div>
              <label>Number of days:</label>
              <input
                type="number"
                name="days"
                value={formData.days}
                readOnly
              />
            </div>
            <div>
              <label>Total Price:</label>
              <input
                type="text"
                name="totalPrice"
                value={formData.totalPrice}
                readOnly
              />
            </div>
            <div>
              <label>Advance Payment (30%):</label>
              <input
                type="text"
                name="advancePayment"
                value={formData.advancePayment}
                readOnly
              />
            </div>
          </div>
          <button className="edit-button" type="submit" disabled={!isBookingValid}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
export default Booking;














