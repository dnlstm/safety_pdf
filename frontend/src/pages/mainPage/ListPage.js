import styles from './ListPage.module.scss';
import Table from 'components/main/table/Table';
import EvaluateModal from 'components/react-modal/EvaluateModal';
import {FaFileCirclePlus} from 'react-icons/fa6';
import {FaListAlt} from 'react-icons/fa';
import {GrMail} from 'react-icons/gr';
import {FaGear} from 'react-icons/fa6';
import {RiLogoutBoxRFill} from 'react-icons/ri';
import {BsFillPersonVcardFill} from 'react-icons/bs';
import {NavLink, Navigate, useNavigate} from 'react-router-dom';
import {useState} from 'react';
import mark from 'assets/img/mark2.png';
import axios from 'axios';
import {useQuery} from '@tanstack/react-query';
import ReactModal2 from 'components/react-modal/ReactModal2';
import {MoonLoader} from 'react-spinners';

const ListPage = () => {
    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);

    const hModalOpen = () => {
        setIsOpen(true);
    };

    const hModalClose = () => {
        setIsOpen(false);
    };

    const handleClick = async () => {
        try {
            const res = await axios.get('/auth/logout');
            if (res.data.code === 200) {
                navigate('/', {replace: true});
            }
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const fetchlogin = () => axios.get(`/auth/islogin`).then(({data}) => data);

    const {
        data: id,
        error,
        isPending
    } = useQuery({
        queryKey: ['islogin'],
        queryFn: fetchlogin,
        retry: false,
        refetchOnWindowFocus: false
    });

    if (isPending) {
        return <ReactModal2 cname="text" title={<MoonLoader color="white" />} />;
    }

    if (error) {
        return <Navigate to="/" replace />;
    }
    return (
        <div className={styles.ListPage}>
            <aside className={styles.ListPage__aside}>
                <article className={styles.ListPage__aside__title}>
                    <img src={mark} alt="" />
                    <h2>공간안전인증원</h2>
                </article>
                <ul className={styles.ListPage__aside__nav}>
                    <li onClick={hModalOpen}>
                        <FaFileCirclePlus size="25" onClick={hModalOpen} />
                        평가 추가
                    </li>
                    <EvaluateModal isOpen={isOpen} isClose={hModalClose} />

                    <NavLink to="/list" className={({isActive}) => (isActive ? styles.ListPage__aside__Navlink_1 : styles.ListPage__aside__Navlink)}>
                        <FaListAlt size="25" />
                        평가 목록
                    </NavLink>

                    <NavLink className={styles.ListPage__aside__Navlink} to="/inquiry">
                        <GrMail size="25" /> 문의하기
                    </NavLink>

                    <NavLink className={styles.ListPage__aside__Navlink} to="/option">
                        <FaGear size="25" />
                        설정
                    </NavLink>

                    <div className={styles.ListPage__aside__Navlink} onClick={handleClick}>
                        <RiLogoutBoxRFill size="25" />
                        로그아웃
                    </div>
                </ul>
                <div className={styles.ListPage__aside__login}>
                    <BsFillPersonVcardFill size="25" />
                    <span>{id}</span>
                </div>
            </aside>
            <main className={styles.ListPage__main}>
                <Table />
            </main>
        </div>
    );
};

export default ListPage;
