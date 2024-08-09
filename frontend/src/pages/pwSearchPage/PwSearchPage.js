import MarginTopButton30 from 'components/common/button/marginTopButton/MarginTopButton30/MarginTopButton30';
import styles from './PwSearchPage.module.scss';
import MarginTopButton20 from 'components/common/button/marginTopButton/MarginTopButton20/MarginTopButton20';
import {useForm} from 'react-hook-form';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {useState} from 'react';
import ReactModal4 from 'components/react-modal/ReactModal4';

const PwSearchPage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState('');

    const {register, handleSubmit} = useForm();

    const onSubmit = async (formData) => {
        const res = await axios.post(`/auth/pwSearch`, formData);

        setIsOpen(true);
        setTitle(res.data.message);
    };

    return (
        <div className={styles.PwSearchPage}>
            <Link to="/" className={styles.home}>
                ✖︎
            </Link>
            <h2>비밀번호 찾기</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <MarginTopButton30 placeholder="아이디" register={register} name="id" />
                <MarginTopButton20 placeholder="이메일" register={register} name="email" />
                <button className={styles.PwSearchPage__button}>비밀번호 찾기</button>
            </form>
            {isOpen && <ReactModal4 isOpen={isOpen} setIsOpen={setIsOpen} title={title} />}
        </div>
    );
};

export default PwSearchPage;
