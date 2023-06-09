import { Button } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import '../../styles/commonmodal.css'

const SubmissionConfirmationModal = ({closeModal, message}) => {
    
    return (
        <div className='modal-content'>
            <CheckCircleOutlineIcon style={{ fontSize: 70, color: 'green' }} />
            <p>{message}</p>
            <Button variant="outlined" size='small' onClick={closeModal}>OK</Button>
        </div>
    )
}

export default SubmissionConfirmationModal;