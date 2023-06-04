import React from 'react';

function CreateAvatarResponse() {
  //API call to post request using parameters to make the video
  const makeAPICall = () => {
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: 'Basic WlhKdVpYTjBZMmg1UUdkdFlXbHNMbU52YlE6M1Zyb2xhZVh0cE9YZmpXQl91OUNp'
      },
      body: JSON.stringify({
        script: {
          type: 'text',
          subtitles: 'false',
          provider: { type: 'microsoft', voice_id: 'en-SG-WayneNeural' },
          ssml: 'false',
          input: 'ChatGPT response' //this is what we need to input.
        },
        config: { fluent: 'false', pad_audio: '0.0' },
        source_url: 's3://d-id-images-prod/google-oauth2|104007482304986843759/img_AzY3u7achXhKfSVHtOvry/passport_ernest.jpeg'
      })
    };

    fetch('https://api.d-id.com/talks', options)
      .then(response => response.json())
      .then(response => {
        const id = response.id;
        console.log('ID:', id);
      })
      .catch(err => console.error(err));
  };

  return (

   
    <div>
      <button onClick={makeAPICall}>Make API Call</button>
    </div>
  );
}

export default CreateAvatarResponse;