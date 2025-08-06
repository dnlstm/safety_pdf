import {zodResolver} from '@hookform/resolvers/zod';
import React, {useState} from 'react';
import styles from './LoginPage.module.scss';
// import MarginTopButton30 from 'components/common/button/marginTopButton/MarginTopButton30/MarginTopButton30';
import MarginTopButton20 from 'components/common/button/marginTopButton/MarginTopButton20/MarginTopButton20';
import {useForm} from 'react-hook-form';
import {Link, useNavigate} from 'react-router-dom';
import {loginschema} from 'lib/validation';
import axios from 'axios';
// import {PiWarningCircleFill} from 'react-icons/pi';
import mark from 'assets/img/mark2.png';
import ReactModal4 from 'components/react-modal/ReactModal4';

axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.withCredentials = true;

const LoginPage = () => {
    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState('');

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm({resolver: zodResolver(loginschema)});

    const onSubmit = async (formData) => {
        const res = await axios.post(`/auth/login`, formData);

        setIsOpen(true);
        setTitle(res.data.message);
        console.log(res.data.code);
        res.data.code === 200 && navigate('/list', {replace: true});
    };

    return (
        <div className={styles.loginPage__wrap}>
            <img src={mark} alt="" />
            <h2>PDF 보고서 생성 프로그램</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <MarginTopButton20 placeholder="아이디" register={register} name="id" errors={errors.id?.message} />
                {/* {errors.id?.message && (
                    <p className={styles.errors}>
                        <span className={styles.errors_text}>{errors.id?.message}</span>
                        <PiWarningCircleFill size={25} />
                    </p>
                )} */}
                <MarginTopButton20 placeholder="비밀번호" register={register} name="password" errors={errors.password?.message} />
                {/* {errors.pw?.message && (
                    <p className={styles.errors}>
                        <span className={styles.errors_text}>{errors.pw?.message}</span>
                        <PiWarningCircleFill size={25} />
                    </p>
                )} */}
                <div className={styles.loginPage__searchWrap}>
                    <Link to="/register">
                        <span>회원가입</span>
                    </Link>
                    <div>
                        <Link to="/id">
                            <span>아이디·</span>
                        </Link>
                        <Link to="/pw">
                            <span>비밀번호 찾기</span>
                        </Link>
                    </div>
                </div>

                <button className={styles.loginPage__button}>로그인</button>
            </form>
            {isOpen && <ReactModal4 isOpen={isOpen} setIsOpen={setIsOpen} title={title} />}
        </div>
    );
};

export default LoginPage;
