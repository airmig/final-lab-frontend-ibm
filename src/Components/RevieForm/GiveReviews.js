// Following code has been commented with appropriate comments for your reference.
import React, { useState } from 'react';
import Rating from 'react-rating';

// Function component for giving reviews
function GiveReviews({submittedMessage, setSubmittedMessage, doctorName}) {
  // State variables using useState hook
  const [showForm, setShowForm] = useState(false);
  
  const [showWarning, setShowWarning] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    review: '',
    rating: 0,
    doctorName: doctorName
  });

  // Function to handle button click event
  const handleButtonClick = () => {
    setShowForm(true);
  };

  // Function to handle form input changes
  const handleChange = (e) => {
    // Update the form data based on user input
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedMessage(formData);
    setFormData({
      name: '',
      review: '',
      rating: 0,
      doctorName: doctorName
    });
    // Check if all required fields are filled before submission
    if (formData.name && formData.review && formData.rating > 0) {
      setShowWarning(false);
    } else {
      setShowWarning(true);
    }
  };

  return (
    <div>
      <h2>Form with Message</h2>
      {!showForm ? (
        // Display button to open the form
        <button onClick={handleButtonClick}>Open Form</button>
      ) : (
        // Display form for giving feedback
        <form onSubmit={handleSubmit}>
          <h2>Give Your Feedback</h2>
          {/* Display warning message if not all fields are filled */}
          {showWarning && <p className="warning">Please fill out all fields.</p>}
          <div>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="review">Review:</label>
            <textarea id="review" name="review" value={formData.review} onChange={handleChange} />
          </div>
          <div>
            <label>Rating:</label>
            <Rating
  emptySymbol="fa fa-star-o fa-2x"
  fullSymbol="fa fa-star fa-2x"
/>

          </div>
          {/* Submit button for form submission */}
          <button type="submit">Submit</button>
        </form>
      )}
      {/* Display the submitted message if available */}
      {submittedMessage && (
        <div>
          <h3>Submitted Message:</h3>
          <p>{submittedMessage.name}</p>
          <p>{submittedMessage.review}</p>
          <p>{submittedMessage.rating}</p>
          <p>{submittedMessage.doctorName}</p>
        </div>
      )}
    </div>
  );
}

export default GiveReviews;
