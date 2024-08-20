import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function Booking() {
  const location = useLocation();
  const { object } = location.state || {};

  const [formData, setFormData] = useState({
    people: 0,
    children: 0,
    pets: 0,
    pricePerDay: object ? object.price : "",
    days: "0",
    totalPrice: "",
    advancePayment: "",
  });

  // Calculate total price and advance payment
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="Booking">
      <h2>Reservation</h2>
      <form onSubmit={handleSubmit}>
        <div>
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
        </div>

        {/* Calculator Section */}
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
              required
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

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Booking;
