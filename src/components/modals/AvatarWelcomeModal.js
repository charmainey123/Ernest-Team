import React, { useState, useEffect, useRef } from 'react';
import "../../styles/avatarwelcomemodal.css";
import video from '../../videos/welcome-talk.mp4';
// import { useNavigate } from 'react-router-dom';
// import { createBrowserHistory } from 'history';

function AvatarWelcomeModal({ setRedirectActive }) {

    const [avatarModalIsOpen, setAvatarModalIsOpen] = useState(true);
    const [avatarVideoFinished, setAvatarVideoFinished] = useState(false);
    const videoRef = useRef(null);

    const handleAvatarVideoEnd = () => {
        setAvatarVideoFinished(true);
    };

    useEffect(() => {
        if (avatarVideoFinished) {
            const timer = setTimeout(() => {
                // Close the modal here
                setAvatarModalIsOpen(false);
                setRedirectActive(2);
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [avatarVideoFinished, setRedirectActive]);

    return (
        <div>
            {avatarModalIsOpen && (
                <div className="overlay">
                    <div className="modal-content">
                        <video controls autoPlay ref={videoRef} onEnded={handleAvatarVideoEnd}>
                            <source src={video} alt="Avatar Welcome Video" />
                        </video>
                    </div>
                </div>
            )}
        </div>
    )
};

export default AvatarWelcomeModal;