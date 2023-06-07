import React, { useEffect, useState, useRef } from 'react';


//makeAPICall1 is a POST method to generate the video, using text input from chatgpt and an image from online storage.
//makeAPICall2 is a GET method to retrieve the video.

function CreateAvatarResponse({ input, setRedirectActive }) {
  const [responseId, setResponseId] = useState(null);
  const [resultUrl, setResultUrl] = useState(null);

  const makeAPICall1 = () => {
    // Check if input is null or empty before making the API call
    if (!input) {
      console.log('Input is null or empty / No response from ChatGPT');
      return;
    }

    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: 'Basic WTJodmIyVnlibVZ6ZERnMVFHZHRZV2xzTG1OdmJROkM0VkV1clUtbkFTSDl1M3dJMGpZdQ=='
      },
      body: JSON.stringify({
        script: {
          type: 'text',
          subtitles: 'false',
          provider: { type: 'microsoft', voice_id: 'en-SG-WayneNeural' },
          ssml: 'false',
          input: input
        },
        config: { fluent: 'false', pad_audio: '0.0' },
        source_url: 's3://d-id-images-prod/google-oauth2|111101595976295069161/img_-a_DPaJlBG4nSURJohTne/passport_ernest.jpeg' //this image might expire. Image upload can be done on the D-ID website.
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
        authorization: 'Basic WTJodmIyVnlibVZ6ZERnMVFHZHRZV2xzTG1OdmJROkM0VkV1clUtbkFTSDl1M3dJMGpZdQ=='
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
    }, 10000); //Wait for 10 seconds before making the call
  };

  useEffect(() => {  //runs when the input prop changes
    makeAPICall1();
  }, [input]);

  useEffect(() => { //runs when the responseId changes.
    makeAPICall2();
  }, [responseId]);


  //-------------------------------------Video-related-----------------------------------------------
  const videoRef = useRef(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play();
      }
    }, 100); // Delay autoplay (in ms)

    return () => clearTimeout(timeout);
  }, []);
 

  const [avatarResponseIsOpen, setAvatarResponseIsOpen] = useState(true);
  const [avatarResponseFinished, setAvatarResponseFinished] = useState(false);
  

  const handleAvatarVideoEnd = () => {
    setAvatarResponseFinished(true);
  };

  useEffect(() => {
      if (avatarResponseFinished) {
          const timer = setTimeout(() => {
              // Close the modal here
              setAvatarResponseIsOpen(false);
              setRedirectActive(2);
          }, 2000);

          return () => clearTimeout(timer);
      }
  }, [avatarResponseFinished, setRedirectActive]);



  return ( // we can return the avatar in JSX for this

  <div>
  <h1>Video Example</h1>
  {resultUrl ? (
   <video controls autoPlay ref={videoRef} onEnded={handleAvatarVideoEnd}>
      <source src={resultUrl} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  ) : (
    <p>Loading video...</p>
  )}
</div>
  );
}

export default CreateAvatarResponse;
