import styles from './Gnb.module.scss';
import {NavLink, Outlet, useParams} from 'react-router-dom';

const Gnb = () => {
    const {id} = useParams();

    const gnbTitle = ['현황 및 개요', '1) 소화 수조 소화수원 확보상태 확인', '2) 감시제어반 가압송수장치 스위치 확인', '3) 가압송수장치 배관 상태 확인', '4) 펌프 성능시험의 집수정, 펌프실 바닥 확인', '5) 펌프의 밸브 개방 및 폐쇠 확인', '6) 기압송수장치 토출량, 토출압력 확인', '7) 기압송수장치, 압력챔버, 물탱크 표지 확인', '8) 기압송수장치 체절압력 확인', '9) 기압송수장치 정격압력 확인', '10) 가압송수장치 150%에서 65%이상 확인', '11) 가압송수장치 기동압력 확인', '12) 릴리프밸브 개방을 확인'];

    const gnbTitle2 = ['현황 및 개요', '1) 옥내ㆍ옥외 소화전의 배관 상태 확인', '2) 옥내ㆍ옥외 방수구의 위치 및 상태 확인', '3) 옥내ㆍ옥외 소화전 표지판,사용설명서 확인', '4) 옥내ㆍ옥외 소화전함 내부 수납물 확인', '5) 옥내ㆍ옥외 소화전 방수압력 확인'];

    const gnbTitle3 = ['현황 및 개요', '1) 방사구역 기밀도 시험', '2) 선택밸브 작동 및 배관기밀도 시험', '3) 피스톤릴리즈댐퍼 폐쇄시험', '4) 니들밸브 작동시험'];

    const gnbMenu = gnbTitle.map((title, index) => (
        <div key={index} className={styles.water_top_1}>
            <NavLink className={({isActive}) => (isActive ? styles.tactive1 : styles.tnormal1)} replace to={`/${id}/evaluate/water/result/${index}`} key={index}>
                {title}
            </NavLink>
        </div>
    ));
    const gnbMenu2 = gnbTitle2.map((title, index) => (
        <div key={index} className={styles.water_top_2}>
            <NavLink className={({isActive}) => (isActive ? styles.tactive2 : styles.tnormal2)} replace to={`/${id}/evaluate/water/result2/${index}`} key={index}>
                {title}
            </NavLink>
        </div>
    ));
    const gnbMenu3 = gnbTitle3.map((title, index) => (
        <div key={index} className={styles.gas_top_1}>
            <NavLink className={({isActive}) => (isActive ? styles.tactive3 : styles.tnormal3)} replace to={`/${id}/evaluate/gas/result/${index}`} key={index}>
                <p className={styles.topWater2}>{title}</p>
            </NavLink>
        </div>
    ));

    const handleClick = (event) => {
        // 이벤트를 막아 링크를 비활성화
        event.preventDefault();
    };

    return (
        <>
            <div className={styles.gnb}>
                <NavLink className={({isActive}) => (isActive ? styles.active : styles.normal)} replace to={`/${id}/buildingSituation`}>
                    건축물 현황
                </NavLink>
                <NavLink className={({isActive}) => (isActive ? styles.active : styles.normal)} replace to={`/${id}/equipmentSituation`}>
                    소화설비 현황
                </NavLink>

                <div className={styles.ggnb}>
                    <NavLink onClick={handleClick} className={({isActive}) => (isActive ? styles.active_water : styles.normal_water)} replace to={`/${id}/evaluate/water/`}>
                        수계소화설비
                    </NavLink>

                    <div className={styles.active_water_in}>
                        <div className={styles.water_in_1}>
                            <NavLink className={({isActive}) => (isActive ? styles.active_waterin : styles.normal_waterin)} replace to={`/${id}/evaluate/water/result/`}>
                                가압송수장치
                            </NavLink>

                            <div className={styles.active_water_in_1}>{gnbMenu}</div>
                        </div>

                        <div className={styles.water_in_2}>
                            <NavLink className={({isActive}) => (isActive ? styles.active_waterin2 : styles.normal_waterin2)} replace to={`/${id}/evaluate/water/result2/`}>
                                옥내 · 외소화전설비
                            </NavLink>
                            <div className={styles.active_water_in_2}>{gnbMenu2}</div>
                        </div>
                    </div>
                </div>
                <div className={styles.ggnb2}>
                    <NavLink className={({isActive}) => (isActive ? styles.active_gas : styles.normal_gas)} replace to={`/${id}/evaluate/gas/result/`}>
                        가스계소화설비
                    </NavLink>

                    <div className={styles.active_gas_in}>
                        <div className={styles.gas_in_1}>
                            <NavLink className={({isActive}) => (isActive ? styles.active_gasin : styles.normal_gasin)} replace to={`/${id}/evaluate/gas/result/`}>
                                가스계소화설비
                            </NavLink>

                            <div className={styles.active_gas_in_1}>{gnbMenu3}</div>
                        </div>
                    </div>
                </div>
            </div>
            <Outlet />
        </>
    );
};

export default Gnb;
