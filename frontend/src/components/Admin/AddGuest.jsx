import { useState, useEffect } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { eachDayOfInterval } from 'date-fns';

const AddGuest = ({ reservationToEdit, onClose }) => {
  const [apartments, setApartments] = useState([]);
  const [isBookingValid, setIsBookingValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [submitMessage, setSubmitMessage] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    apartment: "",
    startDate: "",
    endDate: "",
    totalPrice: 0,
    advancePayment: 0,
    people: 0,
    children: 0,
    pets: 0,
    pricePerDay: 0,
    days: 0,
  });
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [disabledDates, setDisabledDates] = useState([]);

  useEffect(() => {
    const fetchApartments = async () => {
      try {
        const response = await fetch("http://localhost:3232/apartment");
        if (response.ok) {
          const data = await response.json();
          setApartments(data);
        } else {
          console.error("Failed to fetch apartments:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching apartments:", error);
      }
    };
    fetchApartments();
  }, []);

  useEffect(() => {
    if (reservationToEdit) {
      const selectedApartment = apartments.find(apartment => apartment._id === reservationToEdit.apartment._id);
      setFormData({
        firstName: reservationToEdit.firstName || "",
        lastName: reservationToEdit.lastName || "",
        email: reservationToEdit.email || "",
        apartment: reservationToEdit.apartment._id || "",
        startDate: reservationToEdit.startDate || "",
        endDate: reservationToEdit.endDate || "",
        people: reservationToEdit.people || 0,
        children: reservationToEdit.children || 0,
        pets: reservationToEdit.pets || 0,
        pricePerDay: selectedApartment ? selectedApartment.price : 0,
        days: reservationToEdit.days || 0,
        totalPrice: reservationToEdit.totalPrice || 0,
        advancePayment: reservationToEdit.advancePayment || 0,
      });
      setDateRange([
        {
          startDate: new Date(reservationToEdit.startDate || new Date()),
          endDate: new Date(reservationToEdit.endDate || new Date()),
          key: "selection",
        },
      ]);
    }
  }, [reservationToEdit, apartments]);

  useEffect(() => {
    const fetchBookedDates = async () => {
      if (!formData.apartment) return;
      try {
        const response = await fetch(`http://localhost:3232/booking/apartment/${formData.apartment}`);
        const data = await response.json();
        if (response.ok) {
          const allBookedDates = [];
          data.forEach(booking => {
            const startDate = new Date(booking.startDate);
            const endDate = new Date(booking.endDate);
            const days = eachDayOfInterval({
              start: startDate,
              end: endDate,
            });
            allBookedDates.push(...days);
          });
          setDisabledDates(allBookedDates);
        }
      } catch (error) {
        console.error("Error fetching booked dates:", error);
      }
    };
    fetchBookedDates();
  }, [formData.apartment]);

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
      setFormData(prevFormData => ({
        ...prevFormData,
        days,
        startDate: start.toISOString().split("T")[0],
        endDate: end.toISOString().split("T")[0],
      }));
    }
  }, [dateRange]);

  useEffect(() => {
    if (formData.pricePerDay && formData.days) {
      const totalPrice = formData.pricePerDay * formData.days;
      const advancePayment = totalPrice * 0.3;
      setFormData(prevFormData => ({
        ...prevFormData,
        totalPrice: totalPrice.toFixed(2),
        advancePayment: advancePayment.toFixed(2),
      }));
    }
  }, [formData.pricePerDay, formData.days]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "apartment") {
      const selectedApartment = apartments.find(apartment => apartment._id === value);
      if (selectedApartment) {
        setFormData(prevFormData => ({
          ...prevFormData,
          [name]: value,
          pricePerDay: selectedApartment.price,
        }));
      }
    } else {
      setFormData(prevFormData => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleIncrement = (field) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      [field]: prevFormData[field] + 1,
    }));
  };

  const handleDecrement = (field) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      [field]: prevFormData[field] > 0 ? prevFormData[field] - 1 : 0,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = reservationToEdit ? "PATCH" : "POST";
    const url = reservationToEdit ? `http://localhost:3232/booking/${reservationToEdit._id}` : "http://localhost:3232/booking";
    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          apartment: { _id: formData.apartment },
        }),
      });
      if (response.ok) {
        setSubmitMessage("Reservation saved successfully!");
        if (onClose) onClose();
      } else {
        setSubmitMessage("Failed to save reservation.");
      }
    } catch (error) {
      setSubmitMessage("An error occurred during reservation.");
    }
  };

  return (
    <div className="add-guest">
      <h2>{reservationToEdit ? "Edit Reservation" : "New Reservation"}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Select Apartment:</label>
          <select
            name="apartment"
            value={formData.apartment}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Select an option</option>
            {apartments.map(apartment => (
              <option key={apartment._id} value={apartment._id}>
                {apartment.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
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
            placeholder="Last Name"
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
            placeholder="Email"
            value={formData.email}
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
            minDate={new Date()}
            disabledDates={disabledDates}
          />
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
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
                readOnly
              />
              <button type="button" onClick={() => handleIncrement("people")}>
                +
              </button>
            </div>
          </div>
          <div className="people-group">
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
          <div className="people-group">
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
              readOnly
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
        <button className="edit-button" type="submit" disabled={!isBookingValid}>
          {reservationToEdit ? "Update" : "Submit"}
        </button>
        {submitMessage && <p>{submitMessage}</p>}
        <button className="delete-button" type="button" onClick={onClose}>Close</button>
        </form>
        </div>
        

  );
};

export default AddGuest;
