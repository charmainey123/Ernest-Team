import React, { useState, useEffect } from 'react';
import CreateAvatarResponse from './components/api-calls-avatar/CreateAvatarResponse';

import AvatarWelcomeModal from './components/modals/AvatarWelcomeModal';
import Form from './components/modals/Form';

function App() {

  const [redirectActive, setRedirectActive] = useState(1);

  useEffect(() => {
    setRedirectActive(1);
  }, []);

  return (
    <div className='main'>
      {redirectActive === 1 && <AvatarWelcomeModal setRedirectActive={setRedirectActive} />}
      {redirectActive === 2 && <Form />}
      {redirectActive === 'avatarResponse' && <CreateAvatarResponse setRedirectActive={setRedirectActive} /> }
    </div>
  );
}

export default App;
 