import { useState, useEffect } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const AddGuest = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    selectedObject: "", // To store the selected object ID
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

  // Fetch objects from the server
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

  // Calculate the number of days and validate the booking duration
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

  // Calculate the total price and advance payment
  useEffect(() => {
    const totalPrice = formData.pricePerDay * formData.days;
    const advancePayment = totalPrice * 0.3;

    setFormData((prevFormData) => ({
      ...prevFormData,
      totalPrice: totalPrice.toFixed(2),
      advancePayment: advancePayment.toFixed(2),
    }));
  }, [formData.pricePerDay, formData.days]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Handle incrementing the number of people, children, or pets
  const handleIncrement = (field) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: formData[field] + 1,
    }));
  };

  // Handle decrementing the number of people, children, or pets
  const handleDecrement = (field) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: formData[field] > 0 ? formData[field] - 1 : 0,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3232/reservation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        setSubmitMessage("Reservation created successfully!");
        console.log("Reservation created:", result);
      } else {
        setSubmitMessage("Failed to create reservation.");
        console.error("Error creating reservation:", response.statusText);
      }
    } catch (error) {
      setSubmitMessage("An error occurred during reservation.");
      console.error("Error during reservation:", error);
    }
  };

  const handelEdit = async (id) => {
    try {
      const response = await fetch(`http://localhost:3232/reservation/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        setSubmitMessage("Reservation updated successfully!");
        console.log("Reservation updated:", result);
      } else {
        setSubmitMessage("Failed to update reservation.");
        console.error("Error updating reservation:", response.statusText);
      }
    } catch (error) {
      setSubmitMessage("An error occurred during update.");
      console.error("Error during update:", error);
    }
  }

  return (
    <div className="add-guest">
      <h2>Reservation</h2>

      {/* Select Object */}
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

      {/* Reservation Form */}
      <form onSubmit={handleSubmit}>
        {/* First Name */}
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

        {/* Last Name */}
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

        {/* Email */}
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

        {/* Phone */}
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

        {/* Date Range Picker */}
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

        {/* Number of People */}
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

        {/* Number of Children */}
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

        {/* Number of Pets */}
        <div>
          <label>Pets:</label>
          <div className="input-group">
            <button type="button" onClick={() => handleDecrement("pets")}>
              -
            </button>
            <input type="number" name="pets" value={formData.pets} readOnly />
            <button type="button" onClick={() => handleIncrement("pets")}>
              +
            </button>
          </div>
        </div>

        {/* Price Calculator */}
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

        {/* Submit Button */}
        <button type="submit" disabled={!isBookingValid}>
          Submit
        </button>
        {submitMessage && <p>{submitMessage}</p>}
      </form>
    </div>
  );
};

export default AddGuest;
