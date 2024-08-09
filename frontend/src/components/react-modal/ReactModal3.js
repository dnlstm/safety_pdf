import styles from './ReactModal3.module.scss';

import Modal from 'react-modal';
import {ModalStyles} from './Modalstyles';

Modal.setAppElement('#root');

const ReactModal3 = ({isOpen, setIsOpen, tilte, deleteEV}) => {
    const hModalClose1 = () => {
        setIsOpen(false);
        deleteEV();
    };
    const hModalClose2 = () => {
        setIsOpen(false);
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={hModalClose2} style={ModalStyles('300px', '100px', 'white')} ariaHideApp={false} contentLabel="Pop up Message" shouldCloseOnOverlayClick={false}>
            <div className={styles.modaldelete}>
                <p>{tilte}</p>
                <button className={styles.button1} onClick={hModalClose1}>
                    확인
                </button>
                <button className={styles.button2} onClick={hModalClose2}>
                    취소
                </button>
            </div>
        </Modal>
    );
};

export default ReactModal3;
