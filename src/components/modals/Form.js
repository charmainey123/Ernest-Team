import React, { useState } from 'react';

function FormApp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); 
  };

  return (
    <div>
      <h1>Form Application</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Full Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />

        <label htmlFor="email">Email Address:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        <label htmlFor="mobile">Mobile Number:</label>
        <input
          type="mobile"
          id="mobile"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
        />
        <label htmlFor="currency">Account Currency Code:</label>
        <input
          type="currency"
          id="currency"
          name="currency"
          value={formData.currency}
          onChange={handleChange}
        />

        <label htmlFor="id">Id Number:</label>
        <input
          type="id"
          id="id"
          name="id"
          value={formData.id}
          onChange={handleChange}
        />

        <label htmlFor="id">Country of Tax Residence:</label>
        <input
          type="country"
          id="country"
          name="country"
          value={formData.country}
          onChange={handleChange}
        />
        <label htmlFor="id">Tax Identification Number:</label>
        <input
          type="taxId"
          id="taxId"
          name="taxId"
          value={formData.taxId}
          onChange={handleChange}
        />
        <label htmlFor="id">Purpose Of Account :</label>
        <input
          type="purpose"
          id="purpose"
          name="purpose"
          value={formData.purpose}
          onChange={handleChange}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default FormApp;
