import {zodResolver} from '@hookform/resolvers/zod';
import MarginTopButton20 from 'components/common/button/marginTopButton/MarginTopButton20/MarginTopButton20';
import styles from './RegisterPage.module.scss';
import {useForm} from 'react-hook-form';
import MarginTopButton30 from 'components/common/button/marginTopButton/MarginTopButton30/MarginTopButton30';
import {Link, useNavigate} from 'react-router-dom';
import {schema} from 'lib/validation';
import axios from 'axios';
import ReactModal4 from 'components/react-modal/ReactModal4';
import {useState} from 'react';

const RegisterPage = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState('');

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm({resolver: zodResolver(schema)});

    const onSubmit = async (formData) => {
        const res = await axios.post(`/auth/join`, formData);

        if (res.data.code !== 200) {
            setIsOpen(true);
            setTitle(res.data.message);
        }
        res.data.code === 200 && navigate('/');
    };

    return (
        <div className={styles.RegisterPage}>
            <Link to="/" className={styles.home}>
                ✖︎
            </Link>
            <h2>회원가입</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <MarginTopButton30 placeholder="아이디" register={register} name="id" />
                {errors.id?.message && <p className={styles.errors}>{errors.id?.message}</p>}

                <MarginTopButton20 placeholder="비밀번호" register={register} name="password" />
                {errors.password?.message && <p className={styles.errors}>{errors.password?.message}</p>}
                <MarginTopButton20 placeholder="비밀번호 확인" register={register} name="pwCheck" />
                {errors.pwCheck?.message && <p className={styles.errors}>{errors.pwCheck?.message}</p>}
                <MarginTopButton20 placeholder="이름" register={register} name="names" />
                {errors.names?.message && <p className={styles.errors}>{errors.names?.message}</p>}
                <MarginTopButton20 placeholder="이메일" register={register} name="email" />
                {errors.email?.message && <p className={styles.errors}>{errors.email?.message}</p>}
                <MarginTopButton20 placeholder="회사명" register={register} name="office" />
                {errors.office?.message && <p className={styles.errors}>{errors.office?.message}</p>}
                <MarginTopButton20 placeholder="전화번호" register={register} name="phone" />
                {errors.phone?.message && <p className={styles.errors}>{errors.phone?.message}</p>}
                <button className={styles.RegisterPage__button}>회원가입</button>
            </form>
            {isOpen && <ReactModal4 isOpen={isOpen} setIsOpen={setIsOpen} title={title} />}
        </div>
    );
};

export default RegisterPage;
