import styles from './ReactModal4.module.scss';

import Modal from 'react-modal';
import {ModalStyles} from './Modalstyles';
import {useNavigate} from 'react-router-dom';

Modal.setAppElement('#root');

const ReactModal3 = ({isOpen, setIsOpen, title}) => {
    const navigate = useNavigate();

    const hModalClose = () => {
        setIsOpen(false);
        title === '이메일로 Id를 보냈습니다.' && navigate('/');
        title === '이메일로 비밀번호를 보냈습니다.' && navigate('/');
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={hModalClose} style={ModalStyles('320px', '150px', 'white')} ariaHideApp={false} contentLabel="Pop up Message" shouldCloseOnOverlayClick={false}>
            <div className={styles.modaldelete}>
                <p>{title}</p>
                <button className={styles.button1} onClick={hModalClose}>
                    확인
                </button>
            </div>
        </Modal>
    );
};

export default ReactModal3;
