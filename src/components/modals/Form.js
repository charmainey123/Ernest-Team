import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './form.css';
import '../../styles/commonmodal.css'
import '../modals/SubmissionConfirmationModal'
import SubmissionConfirmationModal from '../modals/SubmissionConfirmationModal';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';


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

  const [error, setError] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    const regexPattern = /^[A-Za-z]{3}$/;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
    if(!regexPattern.test(formData.currency) && formData.currency!=="") {
    setError(true)
  }
    else {
      setError(false)
    }
  };

  // const isValidInput = (value) => {
  //   const regexPattern = /^[A-Za-z]{3}$/;
  //   return regexPattern.test(value);
  // };


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

  const theme = createTheme({
    palette: {
      primary: {
        main: '#525355'
      }
    },
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  return (
    
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '100px'}}>
      <div>
        {showSuccessModal && <SubmissionConfirmationModal closeModal={handleCloseSubmissionModal} message="You have submitted your form successfully"/>}
      </div>
      <form onSubmit={handleSubmit} style={{ borderStyle: 'solid', borderWidth: '1px', borderRadius: '5px', background: '#f5f8fa', padding: '35px', width: '100ch' }}>
      <h1 style={{ justifyContent: 'center', color: '#525355', marginTop: '20px', marginLeft: '10px' }}>Account Application Form</h1>
      <FormControl fullWidth sx={{ m: 1, height: '7ch'}} >
      <InputLabel variant='filled'>Full Name</InputLabel>
          <OutlinedInput
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
        </FormControl>
        <FormControl sx={{ m: 1, width: '45ch', height: '7ch' }} variant="outlined">
        <InputLabel variant='filled'>Email Address</InputLabel>
          <OutlinedInput
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
        </FormControl>
        <FormControl sx={{ m: 1, width: '45ch', height: '7ch' }} variant="outlined">
        <InputLabel variant='filled'>Mobile Number</InputLabel>
          <OutlinedInput
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
        </FormControl>
        <FormControl sx={{ m: 1, width: '45ch' }} variant="outlined">
        <InputLabel variant='filled'>Account Currency Code</InputLabel>
          <OutlinedInput
            type="currency"
            id="currency"
            name="currency"
            pattern="[A-Za-z]{3}"
            maxLength={3}
            title="Three letter alphabetic code according to ISO currency code."
            value={formData.currency}
            onChange={handleChange}
            onInput={handleInput}
            onBlur={handleChange}
            error={error}
            required
          />
          <FormHelperText id="outlined-weight-helper-text">Eg. SGD, USD, INR etc.</FormHelperText>
          {error && (
        <FormHelperText error={error}>
          Input should be three alphabetical characters.
        </FormHelperText>
      )}
        </FormControl>

        <FormControl sx={{ m: 1, width: '45ch', height: '7ch' }} variant="outlined">
        <InputLabel variant='filled'>Identification Number</InputLabel>
          <OutlinedInput
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
        </FormControl>
        <FormControl sx={{ m: 1, width: '45ch', height: '7ch' }} variant="outlined">
        <InputLabel variant='filled' htmlFor="country">Country</InputLabel>
          <OutlinedInput
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
        </FormControl>
        
        <FormControl sx={{ m: 1, width: '100ch', height: '7ch'}} variant="outlined">
          <InputLabel variant='filled' htmlFor="taxId">Tax Identification Number</InputLabel>
          <OutlinedInput
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
        </FormControl>

        <FormControl sx={{ m: 1, width: '100ch' }} variant="outlined">
          <InputLabel variant='filled' htmlFor="purpose">Purpose Of Account</InputLabel>
          <Select id="purpose" name="purpose" value={formData.purpose} onChange={handleOptionChange} required >
            <MenuItem  value=""></MenuItem >
            <MenuItem  value="Savings">Savings</MenuItem >
            <MenuItem  value="Payroll">Payroll</MenuItem >
            <MenuItem  value="General/Personal Transactions">General/Personal Transactions</MenuItem >
            <MenuItem  value="Investment Purchases/Sales Proceeds">Investment Purchases/Sales Proceeds</MenuItem >
            <MenuItem  value="Instalment/Regular Payments">Instalment/Regular Payments</MenuItem >
            <MenuItem  value="International Payment/Transfers">International Payment/Transfers</MenuItem >
          </Select>
          <FormHelperText>Please select an option from the list
          <span className="info-icon" title="Say 'Hi Ernest' if you need help to recommend a product. 
          Our avatar is here to assist you.">?</span></FormHelperText>
        </FormControl>
      
        <FormControl sx={{ m: 1, width: '100ch' }} variant="outlined">
          <InputLabel variant='filled' htmlFor="type">Product Type </InputLabel>
          <Select id="type" name="type" value={formData.type} onChange={handleOptionChange} required >
            <MenuItem value=""></MenuItem >
            <MenuItem value="Savings – e$aver">Savings – e$aver</MenuItem>
            <MenuItem value="Savings – MyWay:">Savings – MyWay</MenuItem>
            <MenuItem value="Everyday Use – JumpStart Account:">Everyday Use – JumpStart Account</MenuItem>
          </Select>
          <FormHelperText>Please select an option from the list</FormHelperText>
        </FormControl>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
        <ThemeProvider theme={theme}>
          <Button type="submit" variant="outlined" color="primary">Submit</Button>
          </ThemeProvider>
        </div>
      </form>
      
    </Box>
  );
}

export default FormApp;
