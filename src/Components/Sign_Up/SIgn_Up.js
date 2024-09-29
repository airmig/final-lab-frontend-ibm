import React from "react";
import "./Sign_Up.css";
import { API_URL } from "../../config";
import { Link, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
export default function SignUp(){

      // State variables using useState hook
      const [name, setName] = useState('');
      const [email, setEmail] = useState('');
      const [phone, setPhone] = useState('');
      const [password, setPassword] = useState('');
      const [showerr, setShowerr] = useState(''); // State to show error messages
      const navigate = useNavigate(); // Navigation hook from react-router
      // Function to handle form submission

      function isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
      }

      function validateFields(){
        console.log('validemail', isValidEmail(email))
        if(name.length < 4){
            alert('Name must be at least 4 characters');
            return true;
        }
        else if(!isValidEmail(email)){
            alert('Email is not valid. Enter a valid email');
            return true;
        }
        else if(phone.length != 10){
            alert('A validation requirement from StayHealthy Inc. is to ensure the user enters only 10 digits for the phone number.');
            return true;
        }
        else if(password.length < 8){
            alert('A validation requirement from StayHealthy Inc. is to ensure the user enters password greater than 8 digits');
            return true;
        }
        else {
            return false;
        }
      }

      const register = async (e) => {
          e.preventDefault(); // Prevent default form submission
          let validFields = validateFields();
          console.log('validFields', validFields)
          if(!validFields){
            console.log('calling api')
          // API Call to register user
          const response = await fetch(`${API_URL}/api/auth/register`, {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({
                  name: name,
                  email: email,
                  password: password,
                  phone: phone,
              }),
          });
          const json = await response.json(); // Parse the response JSON
          console.log('json', json)
          if (json.authtoken) {
              // Store user data in session storage
              sessionStorage.setItem("auth-token", json.authtoken);
              sessionStorage.setItem("name", name);
              sessionStorage.setItem("phone", phone);
              sessionStorage.setItem("email", email);
              // Redirect user to home page
              navigate("/");
              window.location.reload(); // Refresh the page
          } else {
              if (json.errors) {
                  for (const error of json.errors) {
                      setShowerr(error.msg); // Show error messages
                  }
              } else {
                  setShowerr(json.error);
              }
          }
      }
      };

    return  <><div className="container" style={{marginTop: '5%'}}>
    <div className="signup-grid"> 
        <div className="signup-text">
            <h1>Sign Up</h1>
        </div>
        <div className="signup-text1" style={{textAlign: 'left'}}> 
            Already a member? <span><Link to='/login' style={{color: '#2190FF'}}> Login</Link></span>
        </div>
        <div className="signup-form"> 
            <form onSubmit={register}>

                <div className="form-group"> 
                    <label htmlFor="name">Name</label> 
                    <input value={name} onChange={(e) => setName(e.target.value)} type="text" name="name" id="name" required className="form-control" placeholder="Enter your name" aria-describedby="helpId" /> 
                    {showerr && <div className="err" style={{ color: 'red' }}>{showerr}</div>}
                </div>

                <div className="form-group"> 
                    <label htmlFor="phone">Phone</label> 
                    <input value={phone} onChange={(e)=> setPhone(e.target.value)} type="tel" name="phone" id="phone" required className="form-control" placeholder="Enter your phone number" aria-describedby="helpId" /> 
                </div>

                <div className="form-group">
                <input required value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" className="form-control" placeholder="Enter your email" aria-describedby="helpId" />
                            {showerr && <div className="err" style={{ color: 'red' }}>{showerr}</div>}              </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label> 
                    <input value={password} onChange={(e)=> setPassword(e.target.value)} name="password" id="password" required className="form-control" placeholder="Enter your password" aria-describedby="helpId" /> 
                    {showerr && <div className="err" style={{ color: 'red' }}>{showerr}</div>}
                </div>

                <div className="btn-group"> 
                    <button type="submit" className="btn btn-primary mb-2 mr-1 waves-effect waves-light">Submit</button> 
                    <button type="reset" className="btn btn-danger mb-2 waves-effect waves-light">Reset</button>
                </div>
            </form>
        </div>
    </div>
</div></>
}