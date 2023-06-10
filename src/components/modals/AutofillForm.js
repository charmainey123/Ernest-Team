import React from 'react';
import '../../styles/commonmodal.css';

const AutofillForm = ({ autofillData, onClose }) => {
    return (
        <div className='modal-content'>
            <h2>Autofill Modal testing</h2>
            <p>Account Type: {autofillData.type}</p>
            <p>Name: {autofillData.name}</p>
            <p>Email: {autofillData.email}</p>
            <p>Mobile: {autofillData.mobile}</p>
            <p>Account Currency Code: {autofillData.currency}</p>
            <p>Identification Number: {autofillData.id}</p>
            <p>Country of Tax Residence: {autofillData.taxId}</p>
            <p>Purpose of Account: {autofillData.purpose}</p>
            <button onClick={onClose}>Next</button>
        </div>
    );
};

export default AutofillForm;