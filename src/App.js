import React, { useState, useEffect } from 'react';
import AvatarWelcomeModal from './components/modals/AvatarWelcomeModal';
import Form from './components/modals/Form';

// ernest's part, which is not needed by char and I's ui
// import MainLayout from './components/MainLayout'
// import WelcomeScreen from './components/modals/WelcomeScreen';
// import AccSelectionScreen from './components/modals/AccSelectionScreen.js';
// import CreateAvatarResponse from './components/api-calls-avatar/CreateAvatarResponse';
// import CreateInput from './components/api-calls-avatar/CreateInput';

function App() {

  const [redirectActive, setRedirectActive] = useState(1);

  useEffect(() => {
    setRedirectActive(1);
  }, []);

  return (
    <div className='main'>
      {redirectActive === 1 && <AvatarWelcomeModal setRedirectActive={setRedirectActive} />}
      {redirectActive === 2 && <Form />}

      {/* ernest's part, which is not needed by char and I's ui */}
      {/* <button onClick={() => openModal('welcome')}>Open Welcome Screen</button>
      <button onClick={() => openModal('accSelection')}>Open AccSelection Screen</button>
      {/* Below sets rule for what is rendered by specifying the activePage */}
      {/* {activePage === 'welcome' && (
        //  Below passes closeModal funcyion as a prop so that the WelcomeScreen component can use it.
        <WelcomeScreen closeModal={closeModal} />
      )}
      {activePage === 'accSelection' && (
        <AccSelectionScreen closeModal={closeModal} />
      )}
      <MainLayout />
      <CreateAvatarResponse />
      <CreateInput /> */}
    </div>
  );
}

export default App;
