import { useState, useEffect } from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // Import the necessary styles
import 'react-date-range/dist/theme/default.css';

const AddGuest = () => {
  // Initialize form data with useState
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    checkin: '',
    checkout: '',
    people: 0,
    children: 0,
    pets: 0,
    pricePerDay: "",
    days: 0,
    totalPrice: "",
    advancePayment: "",
  });

  // State to manage date range selection
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);

  const [isBookingValid, setIsBookingValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Calculate the number of days and validate booking
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
      setFormData(prevFormData => ({
        ...prevFormData,
        days: days,
        checkin: start.toISOString().split('T')[0],  // Set checkin date
        checkout: end.toISOString().split('T')[0]   // Set checkout date
      }));
    }
  }, [dateRange]);

  // Calculate total price and advance payment
  useEffect(() => {
    const totalPrice = formData.pricePerDay * formData.days;
    const advancePayment = totalPrice * 0.3;

    setFormData(prevFormData => ({
      ...prevFormData,
      totalPrice: totalPrice.toFixed(2),
      advancePayment: advancePayment.toFixed(2),
    }));
  }, [formData.pricePerDay, formData.days]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Increment value for people, children, or pets
  const handleIncrement = (field) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      [field]: formData[field] + 1,
    }));
  };

  // Decrement value for people, children, or pets
  const handleDecrement = (field) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      [field]: formData[field] > 0 ? formData[field] - 1 : 0,
    }));
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    console.log(dateRange[0].startDate);
    console.log(dateRange[0].endDate);
    // Handle form submission logic here, e.g., send data to server
    try {
      const fetchData = async () => {
        const response = await fetch('http://localhost:3232/add-guest', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify( formData ),
        });

        const data = await response.json();
      };

      fetchData();
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred. Please try again later.');
    }

    // setEmail('');
    // setPassword('');
 


  };

  return (
    <div className="add-guest">
      <h2>Reservation</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Phone:</label>
          <input
            type="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        
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
};

export default AddGuest;
