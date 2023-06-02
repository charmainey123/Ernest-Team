import React from 'react';
import '../../styles/modals.css'; // Import the CSS file

const AccSelectionScreen = ({ closeModal }) =>  {
  return (
    <div className="modal">
      <div className="modal-content">
        <h1>Account Selection</h1>
        <p>We can use the main layout(main container) aka the office bg that you see to put the subtitles and the avatar
            Avatar can be centered WHEN modals are not active.
        </p>
        <button onClick={closeModal}>Close</button>
      </div>
    </div>
  );
}

export default AccSelectionScreen;
