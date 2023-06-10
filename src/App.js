import React, { useState, useEffect } from 'react';
import CreateAvatarResponse from './components/api-calls-avatar/CreateAvatarResponse';
import AvatarWelcomeModal from './components/modals/AvatarWelcomeModal';
import Form from './components/modals/Form';
import axios from 'axios';

function App() {

  const [redirectActive, setRedirectActive] = useState(1);

  useEffect(() => {
    setRedirectActive(1);
  }, []);

  const handleFormSubmit = () => {

  };

  //---------------------------Python Script will run when app starts. Use this code to transfer to any component-------------------------------------------------------------
  
  useEffect(() => {
    const executePythonScript = async () => {
      try {
        await fetch('http://localhost:5000/execute_voice_recognition', {
          method: 'POST'
        });

        console.log('Voice recognition backend script executed successfully!');
      } catch (error) {
        console.error('Error executing python script', error);
      }
    };
    executePythonScript();
  }, [])

  const [ernestResponse, setErnestResponse] = useState('');
  
  useEffect(() => {

    const interval = setInterval(() => {
      console.log(ernestResponse)
      fetch('/response.txt')
      .then(response => {
        return response.text();
      })
      .then(text => {
        if(text !== ernestResponse){
          setErnestResponse(text);
        console.log('Text is changed' + ernestResponse)
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


//-----------code ends here-------------------------------------------------------------



  return (
    <div className='main'>
      {redirectActive === 1 && !ernestResponse && <AvatarWelcomeModal setRedirectActive={setRedirectActive} />}
      {redirectActive === 1 && ernestResponse && <CreateAvatarResponse setRedirectActive={setRedirectActive} ernestResponse={ernestResponse} />}
      {redirectActive === 2 && <Form onSubmit={handleFormSubmit} />}
    </div>
  );
}

export default App;
