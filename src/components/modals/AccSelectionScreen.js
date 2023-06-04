import React, { useState } from 'react';
import Button from '@mui/material/Button';

import '../../styles/modals.css'; // Import the CSS file

const AccSelectionScreen = () => {
  const [selectedAccount, setSelectedAccount] = useState('Bonu$aver');
  const [otherAccounts] = useState(['SuperSalary', 'JumpStart', 'E$aver']);

  const handleAccountChange = (account) => {
    setSelectedAccount(account);
  };

  return (
    <div className="modal">
     
      <div className="modal-content">
      <div>
      <h1>Select an Account</h1>

      <div>
        <h3>Recommended Account</h3>
        <Button variant="contained">Bonu$aver</Button>
      </div>

      <div>
        <h3>Other Accounts</h3>
        <div className="accountStack">
          {otherAccounts.map((account) => (
            <Button 
              variant="outlined"
              key={account}
              className={account === selectedAccount ? 'selected' : ''}
              onClick={() => handleAccountChange(account)}
            >
              {account}
            </Button>
          ))}
        </div>
      </div>

      <p>Selected Account: {selectedAccount}</p>
    </div>
      </div>

      

      
    </div>
  );
};

export default AccSelectionScreen;

      
   
