import { useState, useEffect } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
/////////////////
const AddGuest = ({ reservationToEdit, onClose }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    selectedObject: "", 
    checkin: "",
    checkout: "",
    people: 0,
    children: 0,
    pets: 0,
    pricePerDay: "",
    days: 0,
    totalPrice: "",
    advancePayment: "",
  });

  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [objects, setObjects] = useState([]);
  const [isBookingValid, setIsBookingValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [submitMessage, setSubmitMessage] = useState("");

  useEffect(() => {
    const fetchObjects = async () => {
      try {
        const response = await fetch("http://localhost:3232/objects");
        if (response.ok) {
          const data = await response.json();
          setObjects(data);
        } else {
          console.error("Failed to fetch objects:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching objects:", error);
      }
    };

    fetchObjects();
  }, []);

  useEffect(() => {
    if (reservationToEdit) {
      setFormData({
        ...reservationToEdit,
        checkin: reservationToEdit.checkin,
        checkout: reservationToEdit.checkout,
        days: Math.ceil((new Date(reservationToEdit.checkout) - new Date(reservationToEdit.checkin)) / (1000 * 60 * 60 * 24)),
      });
      setDateRange([
        {
          startDate: new Date(reservationToEdit.checkin),
          endDate: new Date(reservationToEdit.checkout),
          key: "selection",
        },
      ]);
    }
  }, [reservationToEdit]);

  useEffect(() => {
    const start = dateRange[0].startDate;
    const end = dateRange[0].endDate;
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

    if (days < 5) {
      setIsBookingValid(false);
      setErrorMessage("You must select a minimum of 5 days.");
    } else {
      setIsBookingValid(true);
      setErrorMessage("");
      setFormData((prevFormData) => ({
        ...prevFormData,
        days: days,
        checkin: start.toISOString().split("T")[0],
        checkout: end.toISOString().split("T")[0],
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
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleIncrement = (field) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: formData[field] + 1,
    }));
  };

  const handleDecrement = (field) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: formData[field] > 0 ? formData[field] - 1 : 0,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData.selectedObject)
    const method = reservationToEdit ? "PATCH" : "POST";
    const url = reservationToEdit
      ? `http://localhost:3232/reservation/${reservationToEdit._id}`
      : "http://localhost:3232/reservation";

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        setSubmitMessage("Reservation saved successfully!");
        console.log("Reservation saved:", result);
        if (onClose) onClose(); 
      } else {
        setSubmitMessage("Failed to save reservation.");
        console.error("Error saving reservation:", response.statusText);
      }
    } catch (error) {
      setSubmitMessage("An error occurred during reservation.");
      console.error("Error during reservation:", error);
    }
    console.log(formData.checkin, formData.checkout);
  };

  

  return (
    <div className="add-guest">
      <h2>{reservationToEdit ? "Edit Reservation" : "New Reservation"}</h2>
      <form onSubmit={handleSubmit}>
      <div>
        <label>Select Object:</label>
        <select
          name="selectedObject"
          value={formData.selectedObject}
          onChange={handleChange}
          required
        >
          <option value="" disabled>
            Select an option
          </option>
          {objects.map((object) => (
            <option key={object._id} value={object._id}>
              {object.name}
            </option>
          ))}
        </select>
      </div>

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
            type="tel"
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
            onChange={(item) => setDateRange([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={dateRange}
            className="date-range-picker"
            minDate={new Date()}
          />
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        </div>

        <div className="people-container">
          <div className="people-group">
          <label>Adults:</label>
          <div className="input-group">
            <button type="button" onClick={() => handleDecrement("people")}>
              +
            </button>
            <input
              type="number"
              name="people"
              value={formData.people}
              readOnly
            />
            <button type="button" onClick={() => handleIncrement("people")}>
              -
            </button>
          </div>
        </div>

        <div>
          <label>Children:</label>
          <div className="input-group">
            <button type="button" onClick={() => handleDecrement("children")}>
              +
            </button>
            <input
              type="number"
              name="children"
              value={formData.children}
              readOnly
            />
            <button type="button" onClick={() => handleIncrement("children")}>
              -
            </button>
          </div>
        </div>
         
       
        <div>
          <label>Pets:</label>
          <div className="input-group">
            <button type="button" onClick={() => handleDecrement("pets")}>
              +
            </button>
            <input type="number" name="pets" value={formData.pets} readOnly />
            <button type="button" onClick={() => handleIncrement("pets")}>
              -
            </button>
          </div>
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
            <input type="number" name="days" value={formData.days} readOnly />
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
          {reservationToEdit ? "Update" : "Submit"}
        </button>
        {submitMessage && <p>{submitMessage}</p>}
        <button type="button" onClick={onClose}>Close</button>
      </form>
    </div>
  );
};

export default AddGuest;
