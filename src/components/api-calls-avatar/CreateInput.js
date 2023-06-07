// import React, { useState } from 'react';
// import CreateAvatarResponse from './CreateAvatarResponse';

// function CreateInput() {
//   const [input, setInput] = useState('');

//   const handleInputChange = (event) => {
//     setInput(event.target.value);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     // Perform any necessary actions with the input value
//     // For example, you can make an API call or update the state
//     // based on the input value
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Input:
//           <input type="text" value={input} onChange={handleInputChange} />
//         </label>
//         <button type="submit">Submit</button>
//       </form>
//       <CreateAvatarResponse input={input} />
//     </div>
//   );
// }

// export default CreateInput;
