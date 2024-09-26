import React from "react";
import "./Sign_Up.css";
import { API_URL } from "../../config";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
export default function SignUp(){

      // State variables using useState hook
      const [name, setName] = useState('');
      const [email, setEmail] = useState('');
      const [phone, setPhone] = useState('');
      const [password, setPassword] = useState('');
      const [showerr, setShowerr] = useState(''); // State to show error messages
      const navigate = useNavigate(); // Navigation hook from react-router
      // Function to handle form submission
      const register = async (e) => {
          e.preventDefault(); // Prevent default form submission
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
                      console.log(error.msg)
                  }
              } else {
                  setShowerr(json.error);
              }
          }
      };

    return  <><div class="container" style={{marginTop: '5%'}}>
    <div class="signup-grid"> 
        <div class="signup-text">
            <h1>Sign Up</h1>
        </div>
        <div class="signup-text1" style={{textAlign: 'left'}}> 
            Already a member? <span><Link to='/login' style={{color: '#2190FF'}}> Login</Link></span>
        </div>
        <div class="signup-form"> 
            <form onSubmit={register}>

                <div class="form-group"> 
                    <label for="name">Name</label> 
                    <input value={name} onChange={(e) => setName(e.target.value)} type="text" name="name" id="name" required class="form-control" placeholder="Enter your name" aria-describedby="helpId" /> 
                    {showerr && <div className="err" style={{ color: 'red' }}>{showerr}</div>}
                </div>

                <div class="form-group"> 
                    <label for="phone">Phone</label> 
                    <input value={phone} onChange={(e)=> setPhone(e.target.value)} type="tel" name="phone" id="phone" required class="form-control" placeholder="Enter your phone number" aria-describedby="helpId" /> 
                </div>

                <div class="form-group">
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" className="form-control" placeholder="Enter your email" aria-describedby="helpId" />
                            {showerr && <div className="err" style={{ color: 'red' }}>{showerr}</div>}              </div>
                <div class="form-group">
                    <label for="password">Password</label> 
                    <input value={password} onChange={(e)=> setPassword(e.target.value)} name="password" id="password" required class="form-control" placeholder="Enter your password" aria-describedby="helpId" /> 
                    {showerr && <div className="err" style={{ color: 'red' }}>{showerr}</div>}
                </div>

                <div class="btn-group"> 
                    <button type="submit" class="btn btn-primary mb-2 mr-1 waves-effect waves-light">Submit</button> 
                    <button type="reset" class="btn btn-danger mb-2 waves-effect waves-light">Reset</button>
                </div>
            </form>
        </div>
    </div>
</div></>
}