import React from 'react';
import video from '../animation/ernest-animation.mp4';
import '../styles/main-layout.css'

function MainLayout() {


return (

     <div className = "container">
          <video loop controls>
          <source src={video} alt="Avatar" className="left-avatar" />
          </video>
     </div>
     
)

}

export default MainLayout

