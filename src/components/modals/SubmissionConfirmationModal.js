import { Button } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import '../../styles/commonmodal.css'

const SubmissionConfirmationModal = ({ onClick }) => {
    return (
        <div className='modal-content'>
            <CheckCircleOutlineIcon style={{ fontSize: 70, color: 'green' }} />
            <p>You have submitted your form successfully.</p>
            <Button variant="outlined" size='small' onclick={onClick}>OK</Button>
        </div>
    )
}

export default SubmissionConfirmationModal;