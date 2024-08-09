import styles from './InquiryPage.module.scss';
// import {GrMail} from 'react-icons/gr';

const InquiryPage = () => {
    return (
        <div className={styles.InquiryPage}>
            <input placeholder="이메일" />
            <input placeholder="제목" />
            <textarea placeholder="문의사항을 입력해주세요"></textarea>
            <button className={styles.button} type="submit">
                보내기
            </button>
        </div>
    );
};

export default InquiryPage;
