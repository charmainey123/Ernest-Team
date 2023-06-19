import React, { useState, useEffect, useRef } from 'react';
import "../../styles/commonmodal.css";
import video from '../../videos/welcome-talk.mp4';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';

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
                <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                  }}>
                     <Card sx={{ height: '400px', width: '400px', }}>
                     <CardCover>
                        <video controls autoPlay ref={videoRef} onEnded={handleAvatarVideoEnd}>
                            <source src={video} alt="Avatar Welcome Video" />
                        </video>
                        </CardCover>
                    </Card>
                </Box>
            )}
        </div>
    )
};

export default AvatarWelcomeModal;