import React, { useEffect, useState, useRef } from 'react';
import { LinearProgress } from '@mui/material';


//makeAPICall1 is a POST method to generate the video, using text input from chatgpt and an image from online storage.
//makeAPICall2 is a GET method to retrieve the video.

function CreateAvatarResponse({ setRedirectActive, ernestResponse }) {
  const [responseId, setResponseId] = useState(null);
  const [resultUrl, setResultUrl] = useState(null);

  const makeAPICall1 = () => {
    // Check if input is null or empty before making the API call
    if (!ernestResponse) {
      console.log('Input is null or empty / No response from ChatGPT');
      return;
    }

    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: 'Basic WlRNeE1Ua3lNVEUzUUdkdFlXbHNMbU52YlE6SnhPZXdsWkV0MldKU1BMT2ZFdHBH'
      },
      body: JSON.stringify({
        script: {
          type: 'text',
          subtitles: 'false',
          provider: { type: 'microsoft', voice_id: 'en-US-DavisNeural' },
          ssml: 'false',
          input: ernestResponse
        },
        config: { fluent: 'false', pad_audio: '0.0' },
        source_url: 's3://d-id-images-prod/google-oauth2|100779621296352756305/img_Z_nMMerw3oCM5LPH43eQ8/passport_ernest.jpeg' //this image might expire. Image upload can be done on the D-ID website.
      })
    };

    fetch('https://api.d-id.com/talks', options)
      .then(response => response.json())
      .then(response => {
        const id = response.id;
        setResponseId(id); // Save the response ID in the state
        console.log('ID:', id);
      })
      .catch(err => console.error(err));
  };

  const makeAPICall2 = () => {
    if (!responseId || responseId === null  ) { //If responseId is not null, responseId is plugged into the URL of the API call.
      console.log('Response ID is null');
      return;
    }

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        authorization: 'Basic WlRNeE1Ua3lNVEUzUUdkdFlXbHNMbU52YlE6SnhPZXdsWkV0MldKU1BMT2ZFdHBH'
      }
    };

    setTimeout(() => {
    fetch(`https://api.d-id.com/talks/${responseId}`, options)
      .then(response => response.json())
      .then(response => {
        const url = response.result_url;
        setResultUrl(url); // Update the resultUrl state variable
        console.log('resultURL:', url);
      })
      .catch(err => console.error(err));
    }, 20000); //Wait for 20 seconds before making the call
  };

  useEffect(() => {  //runs when the ernestResponse prop changes
    makeAPICall1();
  }, [ernestResponse]);

  useEffect(() => { //runs when the responseId changes.
    makeAPICall2();
  }, [responseId]);

  const videoRef = useRef(null);
  const handleAvatarVideoEnd = () => {
    setAvatarVideoFinished(true);
};
const [createAvatarModalIsOpen, setCreateAvatarModalIsOpen] = useState(true);
const [avatarVideoFinished, setAvatarVideoFinished] = useState(false);
useEffect(() => {
    if (avatarVideoFinished) {
        const timer = setTimeout(() => {
            // Close the modal here
            setCreateAvatarModalIsOpen(false);
            setRedirectActive(2);
        }, 2000);

        return () => clearTimeout(timer);
    }
}, [avatarVideoFinished, setRedirectActive]);
  return ( // we can return the avatar in JSX for this
  <div>
  {createAvatarModalIsOpen && (
  <div className="overlay">
    <div className="modal-content">
  {resultUrl ? (
    <video controls autoPlay ref={videoRef} onEnded={handleAvatarVideoEnd}>
      <source src={resultUrl} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  ) : (
    <p>Ernest is thinking of a reply. Please wait! </p>
  )}
</div>
</div>
  )}
  </div>
  );
}

export default CreateAvatarResponse;
