import React from 'react';
import '../../styles/modals.css'; // Import the CSS file

const WelcomeScreen = ({ closeModal }) =>  {
  return (
    <div className="modal">
      <div className="modal-content">
        <h1>Welcome</h1>
        <p>Will change background to transparent.Implemented the buttons to showcase how all the props are passed around,
          so we know at which points in the code we are able to trigger certain events. E.g. replace button OnClick action with a voice prompt etc.
        </p>
        <button onClick={closeModal}>Close</button>
      </div>
    </div>
  );
}

export default WelcomeScreen;
