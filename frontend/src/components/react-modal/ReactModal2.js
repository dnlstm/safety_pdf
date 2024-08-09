import {useState} from 'react';
import './ReactModal2.scss';

import Modal from 'react-modal';
import {useNavigate} from 'react-router-dom';
import {ModalStyles} from './Modalstyles';

Modal.setAppElement('#root');

const ReactModal2 = ({title, cname, setResData}) => {
    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(true);

    const hModalClose0 = () => {
        setIsOpen(false);
        setResData('');
    };
    const hModalClose = () => {
        setIsOpen(false);
        navigate('/', {replace: true});
    };
    const hModalClose2 = () => {
        setIsOpen(false);
        navigate('/list', {replace: true});
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={hModalClose} style={ModalStyles('100%', '100%', 'rgb(0, 0, 0,0.1)')} ariaHideApp={false} contentLabel="Pop up Message" shouldCloseOnOverlayClick={false}>
            {cname === 'text' && (
                <>
                    <div className={cname}>{title}</div>
                    <div className={cname}>로딩중</div>
                </>
            )}
            {cname === 'button' && (
                <button className={cname} onClick={hModalClose}>
                    {title}
                </button>
            )}
            {cname === 'button2' && (
                <button className="button" onClick={hModalClose2}>
                    {title}
                </button>
            )}
            {cname === 'button0' && (
                <button type="button" className="button" onClick={hModalClose0}>
                    {title}
                </button>
            )}
        </Modal>
    );
};

export default ReactModal2;
