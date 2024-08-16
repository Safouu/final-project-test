const Login = () =>{
  return (
     <> 
  <h1>Login form</h1>
  
  <form action="">

    <div>
      <label>First Name</label>
      <input type="text" name="FirstName" id="FirstName" />
    </div>

    <div>
      <label>Last Name</label>
      <input type="text" name="LastName" id="LastName" placeholder="enter Last name"/>
    </div>

    <div>
      <label >Email</label>
      <input type="email" name="email" id="email" placeholder="Enter an email" />
    </div>

    <div>
      <label>Password</label>
      <input type="password" name="name" id="name" />
    </div>

    <button>
      Submit
    </button>

  </form>
  
  
  
  </> 
  )


}

export default Login