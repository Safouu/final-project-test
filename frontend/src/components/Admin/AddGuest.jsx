const AddGuest = () => {
    return (
      <div className="guests-page">
        <h2>Guests List</h2>
        <form>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" />
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" />
          <label htmlFor="phone">Phone</label>
          <input type="text" id="phone" name="phone" />
          <button type="submit">Add Guest</button>
        </form>
       
      </div>
    );
  };
  
  export default AddGuest;