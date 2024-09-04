import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { useAuth } from "../context/AuthContext";

function Booking() {
  const { isLoggedIn, userId } = useAuth();
  const location = useLocation();
  const { object } = location.state || {};
  const storedFirstName = localStorage.getItem('firstName');

  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);

  const [formData, setFormData] = useState({
    people: 0,
    children: 0,
    pets: 0,
    pricePerDay: object ? object.price : "",
    days: 0,
    totalPrice: "",
    advancePayment: "",
    selectedObject: object ? object.name : "",
    userId: userId,
    storedFirstName: storedFirstName
  });

  const [isBookingValid, setIsBookingValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const start = dateRange[0].startDate;
    const end = dateRange[0].endDate;
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

    if (days < 5) {
      setIsBookingValid(false);
      setErrorMessage('You must select a minimum of 5 days.');
    } else {
      setIsBookingValid(true);
      setErrorMessage('');
      setFormData((prevFormData) => ({
        ...prevFormData,
        days: days,
      }));
    }
  }, [dateRange]);

  useEffect(() => {
    const totalPrice = formData.pricePerDay * formData.days;
    const advancePayment = totalPrice * 0.3;

    setFormData((prevFormData) => ({
      ...prevFormData,
      totalPrice: totalPrice.toFixed(2),
      advancePayment: advancePayment.toFixed(2),
    }));
  }, [formData.pricePerDay, formData.days]);

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

    
    if (!isLoggedIn || !userId || !object) {
      alert('You must be logged in and have selected an object.');
      return;
    }

    try {
      const response = await fetch ('http://localhost:3232/genreservation', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          user: userId,
           apartment: object._id,
            startDate: dateRange[0].startDate.toISOString(),
            endDate: dateRange[0].endDate.toISOString(), 
            totalPrice: formData.totalPrice, 
            advancePayment: formData.advancePayment, 
            }),
      });

      if (response.status === 201) {
        alert('Reservation created successfully!');
      }
    } catch (error) {
      console.error('Error creating reservation:', error);
      alert(`Failed to create reservation: ${error.response?.data?.error || 'Unknown error'}`);
    }
  };

  return (
    <div className="home">
      <form onSubmit={handleSubmit}>
        <div className="calendar-section">
          <DateRange
            editableDateInputs={true}
            onChange={item => setDateRange([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={dateRange}
            className="date-range-picker"
          />
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </div>

        <div className="people">
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

        <div className="calculator">
          <h3>Price Calculator</h3>
          <div>
            <label>Price per day:</label>
            <input
              type="number"
              name="pricePerDay"
              value={formData.pricePerDay}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Number of days:</label>
            <input
              type="number"
              name="days"
              value={formData.days}
              onChange={handleChange}
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

        <button type="submit" disabled={!isBookingValid}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default Booking;
