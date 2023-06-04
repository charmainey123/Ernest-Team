import React from 'react';

function RetrieveAvatarResponse() {
  //API call GET method using generated ID from CreateAvatarResponse APIcall to retrieve the video
  const makeAPICall = () => {
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          authorization: 'Basic WlhKdVpYTjBZMmg1UUdkdFlXbHNMbU52YlE6M1Zyb2xhZVh0cE9YZmpXQl91OUNp'
        }
      };
      
      fetch('https://api.d-id.com/talks/id', options) //ID will be retrieved and plugged in here (/talks/id)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
  };

  return (

    
    <div>
      <button onClick={makeAPICall}>Make API Call</button>
    </div>
  );
}

export default RetrieveAvatarResponse;