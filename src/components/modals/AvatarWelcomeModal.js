import { useState } from "react";
import "../../styles/avatarwelcomemodal.css";
import video from '../../videos/welcome-talk.mp4';

export default function Modal() {
    // true because we want to see the modal when the main page loads
    const [modal, setModal] = useState(true);

    const toggleModal = () => {
        setModal(!modal);
    };

    // if (modal) {
    //     document.body.classList.add('active-modal')
    // } else {
    //     document.body.classList.remove('active-modal')
    // }

    return (
        <div>
            {/* <button onClick={toggleModal} className="btn-modal">
                Open
            </button> */}

            {modal && (
                <div className="modal">
                    <div onClick={toggleModal} className="overlay"></div>
                    <div className="modal-content">
                        {/* apparently autoplay with sound is not allowed as per the policy so i can only do autoplay without sound */}
                        <video autoPlay controls muted>
                            <source src={video} alt="Avatar" className="left-avatar" type="video/mp4" />
                        </video>
                        <button className="close-modal" onClick={toggleModal}>
                            CLOSE
                        </button>
                    </div>
                </div>
            )}
            <p>Text</p>
        </div>
    )
};