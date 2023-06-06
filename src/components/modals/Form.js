import React, { useState } from 'react';


const FormApp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [currency, setCurrency] = useState('');
    const [id, setId] = useState('');
    const [country, setCountry] = useState('');
    const [taxId, setTaxId] = useState('');
    const [purpose, setPurpose] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    currency: '',
    id: '',
    country: '',
    taxId: '',
    purpose: ''
  });


  const options = [
    { value: 'Savings', label: 'Savings' },
    { value: 'Payroll', label: 'Payroll' },
    { value: 'General/Personal Transactions', label: 'General/Personal Transactions' },
    { value: 'Investment Purchases/Sales Proceeds', label: 'Investment Purchases/Sales Proceeds' },
    { value: 'Instalment/Regular Payments', label: 'Instalment/Regular Payments' },
    { value: 'International Payment/Transfers', label: 'International Payment/Transfers' }  ];

  const buttonStyle = {
    backgroundColor: 'green',
    color: 'white',
    padding: '8px 16px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.valuec
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); 
  };

  const handleOptionChange = (event) => {
    setPurpose(event.target.value);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '70px', marginLeft: '30px'}}>
    {/* <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: '70px', marginLeft: '30px'}}> */}

      <h1 style={{justifyContent: 'center', color: 'darkblue'}}>Account Application Form</h1>
      <form onSubmit={handleSubmit} style={{border: '1px solid black',background: 'white',padding: '30px' }}>
      <div style={{ display: 'flex', justifyContent: 'right',marginTop: '15px' }}>        
      <label htmlFor="name">Full Name:</label>
        <input style = {{marginLeft: '10px',width: '300px', height: '20px'}}
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
    </div>
    <div style={{ display: 'flex', justifyContent: 'right',marginTop: '20px' }}>        
    <label htmlFor="email">Email Address:</label>
        <input style = {{marginLeft: '10px',width: '300px', height: '20px'}}
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
    </div>
    <div style={{ display: 'flex', justifyContent: 'right',marginTop: '20px' }}>        
    <label htmlFor="mobile">Mobile Number:</label>
        <input style = {{marginLeft: '10px',width: '300px', height: '20px'}}
          type="mobile"
          id="mobile"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
          required 
        />
    </div>
    <div style={{ display: 'flex', justifyContent: 'right',marginTop: '20px' }}>       
     <label htmlFor="currency">Account Currency Code:</label>
        <input style = {{marginLeft: '10px',width: '300px', height: '20px'}}
          type="currency"
          id="currency"
          name="currency"
          value={formData.currency}
          onChange={handleChange}
          required 
        />
    </div>
    <div>
        <p style={{fontSize: '12px', justifyContent: 'center', marginLeft:'200px', marginTop: '0px'}}>Eg. SGD, USD, INR etc.</p>
    </div>

    <div style={{ display: 'flex', justifyContent: 'right',marginTop: '20px' }}>        
    <label htmlFor="id">Identification Number:</label>
        <input style = {{marginLeft: '10px',width: '300px', height: '20px'}}
          type="id"
          id="id"
          name="id"
          value={formData.id}
          onChange={handleChange}
          required 
        />
    </div>
    <div style={{ display: 'flex', justifyContent: 'right',marginTop: '20px' }}>        
    <label htmlFor="country">Country of Tax Residence:</label>
        <input style = {{marginLeft: '10px',width: '300px', height: '20px'}}
          type="country"
          id="country"
          name="country"
          value={formData.country}
          onChange={handleChange}
          required 
        />
    </div>
    <div style={{ display: 'flex', justifyContent: 'right',marginTop: '20px' }}>  
      <label htmlFor="taxId">Tax Identification Number:</label>
        <input style = {{marginLeft: '10px',width: '300px', height: '20px'}}
          type="taxId"
          id="taxId"
          name="taxId"
          value={formData.taxId}
          onChange={handleChange}
          required
        />
    </div>

    <div style={{ display: 'flex', justifyContent: 'right',marginTop: '20px' }}>
        <label htmlFor="purpose">Purpose Of Account :</label>
        <select id="purpose" value={purpose} onChange={handleOptionChange} required style={{marginLeft: '10px',width: '310px', height: '25px'}}>
          <option value="Savings">Savings</option>
          <option value="Payroll">Payroll</option>
          <option value="General/Personal Transactions">General/Personal Transactions</option>
          <option value="Investment Purchases/Sales Proceeds">Investment Purchases/Sales Proceeds</option>
          <option value="Instalment/Regular Payments">Instalment/Regular Payments</option>
          <option value="International Payment/Transfers">International Payment/Transfers</option>
          </select>
    </div>
    <div>
        <p style={{fontSize: '12px', justifyContent: 'center', marginLeft:'200px', marginTop: '0px'}}>Please select an option from the list.</p>
    </div>
    <div style={{ display: 'flex', justifyContent: 'center',marginTop: '30px'}}>
        <button type="submit" style={buttonStyle}>Submit</button>
    </div>
      </form>
  </div>
  );
}

export default FormApp;
