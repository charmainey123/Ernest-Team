import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './form.css';
import '../../styles/commonmodal.css'
import '../modals/SubmissionConfirmationModal'
import SubmissionConfirmationModal from '../modals/SubmissionConfirmationModal';
import AutofillForm from './AutofillForm';

const FormApp = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    currency: '',
    id: '',
    country: '',
    taxId: '',
    purpose: '',
    type: ''
  });

  const buttonStyle = {
    backgroundColor: 'green',
    color: 'white',
    padding: '8px 16px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  };

  const handleInput = (title) => (event) => {
    const input = event.target;
    if (input.validity.valueMissing) {
      input.setCustomValidity('Please fill out this field.');
    } else {
      input.setCustomValidity('Please match the requested format: ' + title);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    try {
      const data = {
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        currency: formData.currency,
        id: formData.id,
        country: formData.country,
        taxId: formData.taxId,
        purpose: formData.purpose,
        type: formData.type
      }
      const response = await axios.post('http://localhost:5000/insert_data', data);
      console.log(response.data.message)
      setShowSuccessModal(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOptionChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleCloseSubmissionModal = () => {
    setShowSuccessModal(false)
    setShowListening(false)
    setFormData({
      name: '',
      email: '',
      mobile: '',
      currency: '',
      id: '',
      country: '',
      taxId: '',
      purpose: '',
      type: ''
    })
  }

  useEffect(() => {
    const executePythonScript = async () => {
      try {
        await fetch('http://localhost:5000/execute_voice_recognition', {
          method: 'POST'
        });
        console.log('Voice recognition backend script executed successfully!');
        setShowListening(true)
      } catch (error) {
        console.error('Error executing python script', error);
      }
    };
    executePythonScript();
  }, [])

  const [ernestResponse, setErnestResponse] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      fetch('../../../backend/response.txt')
        .then(response => response.text())
        .then(text => {
          if (text !== ernestResponse) {
            setErnestResponse(text);
          }
        })
        .catch(error => {
          console.error('Error reading file:', error);
        });
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [ernestResponse]);

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showListening, setShowListening] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '10px', marginLeft: '30px' }}>
      {/* <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: '70px', marginLeft: '30px'}}> */}

      <h1 style={{ justifyContent: 'center', color: 'darkblue' }}>Account Application Form</h1>

      {/* <div>
        {showSuccessModal && <SubmissionConfirmationModal closeModal={handleCloseSubmissionModal} message="You have submitted your form successfully" />}
      </div> */}

      <div>
        {showListening && <SubmissionConfirmationModal closeModal={handleCloseSubmissionModal} message="Say 'Hi Ernest' for assistance at any time. Ernest is listening, but may take time to respond. We appreciate your understanding." />}
      </div>
      {/* if the autofillform is used */}
      <div>
        {showSuccessModal && <AutofillForm closeModal={handleCloseSubmissionModal} />}
      </div>

      <form onSubmit={handleSubmit} style={{ border: '1px solid black', background: 'white', padding: '35px' }}>
        <div style={{ display: 'flex', justifyContent: 'right', marginTop: '15px' }}>
          <label htmlFor="name">Full Name:</label>
          <input style={{ marginLeft: '10px', width: '300px', height: '20px' }}
            type="text"
            id="name"
            name="name"
            maxLength={50}
            title="Maximum of 50 characters."
            value={formData.name}
            onChange={handleChange}
            onInput={handleInput}
            required
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'right', marginTop: '20px' }}>
          <label htmlFor="email">Email Address:</label>
          <input style={{ marginLeft: '10px', width: '300px', height: '20px' }}
            type="email"
            id="email"
            name="email"
            maxLength={50}
            title="Maximum of 50 characters."
            value={formData.email}
            onChange={handleChange}
            onInput={handleInput}
            // onInvalid={handleInvalid}
            required
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'right', marginTop: '20px' }}>
          <label htmlFor="mobile">Mobile Number:</label>
          <input style={{ marginLeft: '10px', width: '300px', height: '20px' }}
            type="mobile"
            id="mobile"
            name="mobile"
            pattern="\d{10}"
            title="10-digit mobile number."
            value={formData.mobile}
            onChange={handleChange}
            onInput={handleInput}
            required
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'right', marginTop: '20px' }}>
          <label htmlFor="currency">Account Currency Code:</label>
          <input style={{ marginLeft: '10px', width: '300px', height: '20px' }}
            type="currency"
            id="currency"
            name="currency"
            pattern="[A-Za-z]{3}"
            maxLength={3}
            title="Three letter alphabetic code according to ISO currency code."
            value={formData.currency}
            onChange={handleChange}
            onInput={handleInput}
            required
          />
        </div>
        <div>
          <p style={{ fontSize: '12px', justifyContent: 'center', marginLeft: '200px', marginTop: '0px' }}>Eg. SGD, USD, INR etc.</p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'right', marginTop: '20px' }}>
          <label htmlFor="id">Identification Number:</label>
          <input style={{ marginLeft: '10px', width: '300px', height: '20px' }}
            type="id"
            id="id"
            name="id"
            pattern="^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$"
            maxLength={50}
            title="Maximum of 50 characters. Only alphanumeric characters allowed."
            value={formData.id}
            onChange={handleChange}
            onInput={handleInput}
            required
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'right', marginTop: '20px' }}>
          <label htmlFor="country">Country of Tax Residence:</label>
          <input style={{ marginLeft: '10px', width: '300px', height: '20px' }}
            type="country"
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            onInput={handleInput}
            pattern="[A-Za-z]*"
            maxLength={50}
            title="Maximum of 50 alphabetic characters."
            required
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'right', marginTop: '20px' }}>
          <label htmlFor="taxId">Tax Identification Number:</label>
          <input style={{ marginLeft: '10px', width: '300px', height: '20px' }}
            type="taxId"
            id="taxId"
            name="taxId"
            pattern="^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$"
            maxLength={50}
            title="Maximum of 50 characters. Only alphanumeric characters allowed"
            value={formData.taxId}
            onInput={handleInput}
            onChange={handleChange}
            required
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'right', marginTop: '20px' }}>
          <label htmlFor="purpose">Purpose Of Account :</label>
          <select id="purpose" name="purpose" value={formData.purpose} onChange={handleOptionChange} required style={{ marginLeft: '10px', width: '310px', height: '25px' }}>
            <option value="Savings">Savings</option>
            <option value="Payroll">Payroll</option>
            <option value="General/Personal Transactions">General/Personal Transactions</option>
            <option value="Investment Purchases/Sales Proceeds">Investment Purchases/Sales Proceeds</option>
            <option value="Instalment/Regular Payments">Instalment/Regular Payments</option>
            <option value="International Payment/Transfers">International Payment/Transfers</option>
          </select>
        </div>
        <div>
          <p style={{ fontSize: '12px', justifyContent: 'center', marginLeft: '200px', marginTop: '0px' }}>Please select an option from the list.</p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'right', marginTop: '20px', marginLeft: '0px' }}>
          <label htmlFor="type">Product Type:  </label>
          <select id="type" name="type" value={formData.type} onChange={handleOptionChange} required style={{ marginLeft: '10px', marginRight: '0px', width: '310px', height: '25px' }}>
            <option value="Savings – e$aver">Savings – e$aver</option>
            <option value="Savings – MyWay:">Savings – MyWay</option>
            <option value="Everyday Use – JumpStart Account:">Everyday Use – JumpStart Account</option>
          </select>    <span className="info-icon" title="Say 'Hi Ernest' if you need help to recommend a product. 
          Our avatar is here to assist you.">?</span>
        </div>

        <div>
          <p style={{ fontSize: '12px', justifyContent: 'center', marginLeft: '200px', marginTop: '0px' }}>Please select an option from the list.</p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
          <button type="submit" style={buttonStyle}>Submit</button>
        </div>
      </form>
    </div>
  );
}

export default FormApp;
