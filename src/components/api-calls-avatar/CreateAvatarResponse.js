import React, { useEffect, useState } from 'react';


//makeAPICall1 is a POST method to generate the video, using text input from chatgpt and an image from online storage.
//makeAPICall2 is a GET method to retrieve the video.

function CreateAvatarResponse({ input }) {
  const [responseId, setResponseId] = useState(null);

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
        authorization: 'Basic WkhKaFoyOXVjMjUxYm1sQVoyMWhhV3d1WTI5dDprNW9nSkxCQXJZRVBZNl9vbE5GV0I='
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
        source_url: 's3://d-id-images-prod/google-oauth2|104007482304986843759/img_TIv05EVgQcEDWvb-NVP9d/passport_ernest.jpeg' //this image might expire. Image upload can be done on the D-ID website.
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
    if (!responseId) { //If responseId is not null, responseId is plugged into the URL of the API call.
      console.log('Response ID is null');
      return;
    }

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        authorization: 'Basic WlhKdVpYTjBZMmg1UUdkdFlXbHNMbU52YlE6M1Zyb2xhZVh0cE9YZmpXQl91OUNp'
      }
    };

    fetch(`https://api.d-id.com/talks/${responseId}`, options)
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(err => console.error(err));
  };

  useEffect(() => {  //runs when the input prop changes
    makeAPICall1();
  }, [input]);

  useEffect(() => { //runs when the responseId changes.
    makeAPICall2();
  }, [responseId]);

  return null; // we can return the avatar in JSX for this
}

export default CreateAvatarResponse;
