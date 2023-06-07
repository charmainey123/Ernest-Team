import React, { useState, useEffect } from 'react';
import MainLayout from './components/MainLayout'
import WelcomeScreen from './components/modals/WelcomeScreen';
import AccSelectionScreen from './components/modals/AccSelectionScreen.js';
import CreateAvatarResponse from './components/api-calls-avatar/CreateAvatarResponse';
import CreateInput from './components/api-calls-avatar/CreateInput';
import { experimentalStyled } from '@mui/material';


function App() {
  const [activePage, setActivePage] = useState(null);

  const openModal = (page) => {
    setActivePage(page);
  };

  const closeModal = () => {
    setActivePage(null);
  };

  useEffect(() => {
    console.log(activePage);
  }, [activePage]);

  return (
    <div>
      <button onClick={() => openModal('welcome')}>Open Welcome Screen</button>
      <button onClick={() => openModal('accSelection')}>Open AccSelection Screen</button>
      {/* Below sets rule for what is rendered by specifying the activePage */}
      {activePage === 'welcome' && (
      //  Below passes closeModal funcyion as a prop so that the WelcomeScreen component can use it.
          <WelcomeScreen closeModal={closeModal}/>
      )}
      {activePage === 'accSelection' && (
          <AccSelectionScreen closeModal={closeModal}/>
      )}
      <MainLayout/>
      <CreateInput/>
    </div>
  );
}

export default App;
 