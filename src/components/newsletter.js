import React, { useState } from 'react';
import addToMailchimp from 'gatsby-plugin-mailchimp';

const EmailListForm = () => {

  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addToMailchimp(email)
      .then((data) => {
        alert(data.result);
      })
      .catch((error) => {
        // Errors in here are client side
        // Mailchimp always returns a 200
      });
  };

  const handleEmailChange = (event) => {
    setEmail(event.currentTarget.value);
  };

  return (
    <div className="form-handler">
        <form onSubmit={handleSubmit}>
          <h4>Want to read more?</h4>
          <p>Subscribe to the newsletter, opt-out anytime.</p>
          <div>
            <input
              placeholder="Email address"
              name="email"
              type="text"
              onChange={handleEmailChange}
            />
            <button type="submit">Subscribe</button>
          </div>
        </form>
    </div>
  );
};

export default EmailListForm;