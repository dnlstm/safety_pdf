import {useParams} from 'react-router-dom';
import styles from './PreResult.module.scss';

const PreResult = () => {
    const {page} = useParams();

    return (
        <>
            {page === '1' && (
                <>
                    <div className={styles.EvaluateGasResult_slider_wrap1}>
                        <div className={styles.EvaluateGasResult_slider_wrap1_left}>
                            <h3>사전준비</h3>
                        </div>
                        <div className={styles.EvaluateGasResult_slider_wrap1_right}>
                            <p>
                                1) 킥오프 미팅 또는 현장 사전답사 시 성능시험 대상과 일정을 선정(사전 협의) 한다. <br />
                                - 통보 : 시험전 사전 공지한다. <br />
                                - 인원 : 시험에 필요한 인원 및 역할 분담한다. <br />
                                - 위치선정 : 시험을 실시할 대상 선정 및 시험위치 기록한다. <br />
                                2) Spot Test(성능확인시험) 동의서(양식)를 작성하고 제출 후 진행한다. <br />
                                3) 사전에 설계 검토(건물구조, 소방시설, HVAC 등)를 진행한다. <br />
                                4) 시험장정리 : 시험을 실시할 공간의 안전 확인한다. 및 점검 <br />
                                5) 시험장비 : Door Fan Set, 분석 프로그램, Door Fan Test Certification
                            </p>
                        </div>
                    </div>
                    <div className={styles.EvaluateGasResult_slider_wrap1}>
                        <div className={styles.EvaluateGasResult_slider_wrap1_left}>
                            <h3>관련기준</h3>
                        </div>
                        <div className={styles.EvaluateGasResult_slider_wrap1_right}>
                            <p>
                                1) 소방청 02090 할로겐화합물 및 불활성기체 소방설비공사 표준시방서 발췌 <br />
                                - 3.13.4 방호구역의 완전상 검토 전역방출설비가 설치된 모든 방호구역은 규정된 농도 유지시간 동안 규정된 농도의 유지를 불가능하게 하는 현저한 공기누설 부분을 발견하면 효과적으 로 밀봉할 수 있도록 점검 및 시험을 실시해야 한다. 규정된 방사시간 동안 규정된 소화약제의 농도가 최소 10분 동안 유지된다는 것을 표시하기 위해, 감독자에게 승인받은 도어팬 테스트 또는 기타 방법을 사용하여 적량적 결과를 도출하여 기록해야 한다. <br />
                                2) [ NFPA 2001 7.7.2.5 설치 승인 관련 발췌 ] <br />
                                - 방호구역 밀폐도 검토. 모든 하강방식의 소화약제 시스템은 방호구역을 검사하고 테스트하여 누설 부위 위치를 확인하도록 규정 <br />- 방호구역의 설계농도 유지 기간 동안 지정된 약제 농도 수준을 유지하지 못하게 할 수 있는 누출 부위를 효과적으로 밀봉합니다. 승인 된 Door Fan Test(송풍기 장치 등)를 시행하여 지정된 보호 기간 동안 지정된 약제 농도가 기준 만큼 준수함을 나타내는 정량 결과를 얻고 기록해야 한다.
                            </p>
                        </div>
                    </div>
                    <div className={styles.EvaluateGasResult_slider_wrap1}>
                        <div className={styles.EvaluateGasResult_slider_wrap1_left}>
                            <h3>
                                시험절차 <br />및<br /> 방법
                            </h3>
                        </div>
                        <div className={styles.EvaluateGasResult_slider_wrap1_right}>
                            <p>
                                1) 시험 전 방재센터와 사전 협의 후 시험을 실시한다. <br />
                                2) 성능시험의 수행은 인증신청기관에서 실시하고 평가위원이 다음을 평가한다.
                                <br />
                                (다만, 전문시험기관을 지정할 수 있다.)
                                <br />
                                (1) 설계검토 : 건물구조, 소방시설, HVAC 구조 등<br />
                                - HVAC 등 환기시스템에 대한 구체적 자료 확보 필요
                                <br />
                                - 덕트내 상시 OPEN DAMPER 또는 환기 팬 등 테스트 중 정지 가능여부 확인
                                <br />
                                (2) 방호구역 내 구획 및 준비 상태 육안으로 확인
                                <br />
                                - 개방 가능한 모든 문 해치 및 이동식 칸막이가 시험 중에 닫혀 있는지 확인
                                <br />
                                (3) 기초자료 측정 : <br />
                                - 온도, 압력, 풍향, 풍속
                                <br />
                                - 방호구역 체적, 최대 방호대상물 최대 높이 측정
                                <br />
                                (4) Door Fan 설치
                                <br />
                                - HVAC 정지, 피스톤릴리스 댐퍼 클로즈
                                <br />
                                (5) 가압/감압 실험
                                <br />
                                (6) 정밀도 검증 및 결과분석
                                <br />
                                (7) 소화농도 유지시간(Soaking Time) 측정
                                <br />
                                3) 평가 결과는 최종보고서에 개선요구사항과 함께 제공한다.
                            </p>
                        </div>
                    </div>
                    <div className={styles.EvaluateGasResult_slider_wrap1}>
                        <div className={styles.EvaluateGasResult_slider_wrap1_left}>
                            <h3>평가기준</h3>
                        </div>
                        <div className={styles.EvaluateGasResult_slider_wrap1_right}>
                            <p>
                                1) 옥내·외소화전설비는 소방대상물 내·외부에서 화재 초기에 관계자 또는 자체소방대원이 신속하게 소화할 수 있는 수동식 수계소화설비이다. <br />
                                2) 가장 기본적인 자체 초기 소화설비이므로 유사시에 원활하게 작동시킬 수 있도록 철저한 유지관리와 사용방법에 대한 숙지가 필요하다.
                                <br />
                                3) 본 시험은 관계자의 유지관리 현황 및 실제 사용 능력에 대한 평가를 하는 것을 목적으로 한다.
                            </p>
                        </div>
                    </div>{' '}
                </>
            )}
            {page === '2' && (
                <>
                    <div className={styles.EvaluateGasResult_slider_wrap1}>
                        <div className={styles.EvaluateGasResult_slider_wrap1_left}>
                            <h3>사전준비</h3>
                        </div>
                        <div className={styles.EvaluateGasResult_slider_wrap1_right}>
                            <p>
                                1) 킥오프 미팅 또는 현장 사전답사 시 성능시험 대상과 일정을 선정(사전 협의) 한다. <br />
                                - 통보 : 시험전 사전 공지한다.
                                <br />
                                - 인원 : 시험에 필요한 인원 및 역할 분담한다.
                                <br />
                                - 위치선정 : 시험을 실시할 대상 선정 및 시험위치 기록한다.
                                <br />
                                2) Spot Test(성능확인시험) 동의서(양식)를 작성하고 제출 후 진행한다.
                                <br />
                                3) 선정된 저장용기실(선택밸브실)에 평가위원이 방문하여 시험 가능여부를 확인한다.
                                <br />
                                (공기 압축기 전원 공급 가능여부, 안전밸브 금구 종류, 소화설비 종류 등)
                                <br />
                                4) 선택밸브 작동 시 방호구역 내에 압축공기가 방사되어 배관내에 쌓인 오염물질 비산에 대한 대책을 수립한다.
                                <br />
                                5) 시험장정리 : 시험을 실시할 공간의 안전확인 및 점검한다.
                                <br />
                                6) 시험장비 : 공기압축기, 연결급구 및 압력계, 전자저울, 초시계
                            </p>
                        </div>
                    </div>
                    <div className={styles.EvaluateGasResult_slider_wrap1}>
                        <div className={styles.EvaluateGasResult_slider_wrap1_left}>
                            <h3>
                                {' '}
                                시험절차 <br />및<br /> 방법
                            </h3>
                        </div>
                        <div className={styles.EvaluateGasResult_slider_wrap1_right}>
                            <p>
                                1) 시험 전 방재센터와 사전 협의 후 시험을 실시한다. <br />
                                2) 성능시험의 수행은 인증신청기관에서 실시하고 평가위원이 다음을 평가한다. <br />
                                (다만, 전문시험기관을 지정할 수 있다.)
                                <br />
                                - 시험 실시 전 시험 절차 설명 및 안전상태 상호 확인한다.
                                <br />
                                - 수신기(제어반) 연동 스위치 정지(화재표시등, 경보설비 등) 확인한다.
                                <br />
                                - 솔레노이드밸브 안전핀 체결 후 기동용기에서 분리 확인한다.
                                <br />
                                - 저장용기 기동용 가스배관 분리, 공기압축기 및 압력계 연결확인한다.
                                <br />
                                - 시험대상 방호구역의 선택밸브 레버 개방, 압축 공기 주입 확인한다.
                                <br />
                                - 시험대상 방호구역의 선택밸브 피스톤 개방 여부 확인한다. <br />- 미시험 종료 후 복구, 관계자 최종확인 및 복구확인서(양식) 확인한다.
                            </p>
                        </div>
                    </div>
                    <div className={styles.EvaluateGasResult_slider_wrap1}>
                        <div className={styles.EvaluateGasResult_slider_wrap1_left}>
                            <h3>관련기준</h3>
                        </div>
                        <div className={styles.EvaluateGasResult_slider_wrap1_right}>
                            <p>
                                1) [가스관선택밸브의 형식승인 및 제품검사의 기술기준 (제9조 기능시험)] <br />
                                (1) 선택밸브는 자동 또는 수동의 방법에 의하여 작동하는 경우에 조작이 원활하고 확실하게 작동되어야 한다. <br />
                                (2) 피스톤릴리스는 1Mpa의 압력이내에서 작동되어야 하며 밸브시트를 확실하게 열 수 있어야 한다. <br />
                                2) [가스계소화설비 설계프로그램의 성능인증 및 제품검사의 기술기준 (제5조 설계프로그램의 유효성 확인)] <br />
                                ② 설계프로그램 유효성 확인 사항 중 신청자가 제시하는 20개 이상의 시험모델 중에서 임의로 선정한 5개 이상의 시험모델을 실제 설치하여 시험하는 경우에 다음 각 호에 적합하여야 한다. <br />
                                2. 기밀시험 <br />
                                소화약제 저장용기 이후부터 분사헤드 이전까지의 설비부품 및 배관 등은 양끝단을 밀폐시킨 후 98kpa 압력공기 등으로 5분간 가압하는 때에 누설되지 아니하여야 한다 <br />
                                3) 소방청 02090 할로겐화합물 및 불활성기체 소방설비공사 표준시방서 발췌
                                <br />- 3.13.1 기압(기밀) 시험 <br />
                                기압시험은 일부 또는 전 배관에 대해 은폐 또는 방출헤드(노즐) 설치 전에 기압으로 시험하고 배관에서의 누설을 검사한다. <br /> 유지시간은 280KPa의 압력으로 10분간 시험을 실시하고 10분 후에 압력이 50KPa 이상 떨어지지 않아야 한다. <br />
                                ※ 참조 [ NFPA 2001 7.7.2.4.12 설치 승인 관련 발췌] <br />
                                1) 파이프 시스템은 질소 또는 기타 건조 가스를 사용하여 폐쇄 회로에서 압력 테스트 시행 하도록 규정 <br />
                                - 파이프틑 최소 40 psi (276kpa) 로 가압 <br />
                                - 가압가스원을 제거 한 후 10분 후 배관내 압력은 시험압력의 80% 이상을 유지하여야 한다. <br />
                                2) 배관 계통에서 질소 또는 불활성 가스를 사용하는 유량 테스트를 수행하여 흐름이 계속되고 배관과 노즐이 막히지 않았는지 확인하도록 규정
                            </p>
                        </div>
                    </div>
                    <div className={styles.EvaluateGasResult_slider_wrap1}>
                        <div className={styles.EvaluateGasResult_slider_wrap1_left}>
                            <h3>평가기준</h3>
                        </div>
                        <div className={styles.EvaluateGasResult_slider_wrap1_right}>
                            <p>
                                1) 선택밸브 1.0Mpa 이내에서 피스톤릴리스 동작 여부 확인한다.
                                <br />
                                2) 집합관과 저장용기 연결 부, 플랜지 접합부 누기여부 확인한다.
                                <br />
                                3) 집합관 안전밸브 선택 적정 여부 확인한다.
                            </p>
                        </div>
                    </div>{' '}
                </>
            )}
            {page === '3' && (
                <>
                    <div className={styles.EvaluateGasResult_slider_wrap1}>
                        <div className={styles.EvaluateGasResult_slider_wrap1_left}>
                            <h3>사전준비</h3>
                        </div>
                        <div className={styles.EvaluateGasResult_slider_wrap1_right}>
                            <p>
                                1) 킥오프 미팅 또는 현장 사전답사 시 성능시험 대상과 일정을 선정(사전 협의) 한다. <br />
                                - 통보 : 시험전 사전 공지한다.
                                <br />
                                - 인원 : 시험에 필요한 인원 및 역할 분담한다.
                                <br />
                                - 위치선정 : 시험을 실시할 대상 선정 및 시험위치 기록한다.
                                <br />
                                2) Spot Test(성능확인시험) 동의서(양식)를 작성하고 제출 후 진행한다.
                                <br />
                                3) 선정된 방호구역에 평가위원이 방문하여 시험 가능여부를 확인한다. <br />
                                (공기 압축기 전원 공급 가능여부, 소화설비 종류 등)
                                <br />
                                4) 성능시험 시 방호구역 내에 압축공기가 방사되어 배관내에 쌓인 오염물질 비산에 대한 대책을 수립한다.
                                <br />
                                5) 시험장정리 : 시험을 실시할 공간의 안전확인 및 점검 한다.
                                <br />
                                6) 시험장비 : 공기압축기, 가압가스, 연결급구 및 압력계, 초시계
                            </p>
                        </div>
                    </div>
                    <div className={styles.EvaluateGasResult_slider_wrap1}>
                        <div className={styles.EvaluateGasResult_slider_wrap1_left}>
                            <h3>
                                {' '}
                                시험절차 <br />및<br /> 방법
                            </h3>
                        </div>
                        <div className={styles.EvaluateGasResult_slider_wrap1_right}>
                            <p>
                                1) 시험 전 방재센터와 사전 협의 후 시험을 실시한다.
                                <br />
                                2) 성능시험의 수행은 인증신청기관에서 실시하고 평가위원이 다음을 평가한다.
                                <br />
                                (다만, 전문시험기관을 지정할 수 있다.)
                                <br />
                                - 수신기(제어반) 연동 정지 상태를 확인한다.
                                <br />
                                - PRD(Piston Releasor Damper)의 가스동관을 주입구를 분리한다.
                                <br />
                                - 공기 압축기나 가압가스관을 연결한다.
                                <br />
                                - 가압 후 PRD(Piston Releasor Damper)의 작동 여부를 확인한다.
                                <br />- 시험 후 복구 및 관계자 확인한다. (복구 확인서 작성 및 제출)
                            </p>
                        </div>
                    </div>
                    <div className={styles.EvaluateGasResult_slider_wrap1}>
                        <div className={styles.EvaluateGasResult_slider_wrap1_left}>
                            <h3>관련기준</h3>
                        </div>
                        <div className={styles.EvaluateGasResult_slider_wrap1_right}>
                            <p>
                                1) 소방청 02090 할로겐화합물 및 불활성기체 소방설비공사 표준시방서 발췌
                                <br />
                                - 3.10 개구부
                                <br />
                                가. 전역방출방식인 경우 가능한 개구부를 최대로 줄여야 한다.
                                <br />
                                나. 약제가 방출하기 전 또는 방출 중에 폐쇄하지 못하는 개구부에는 인접구역 까지 방호구역을 확대하거나 연장방출방식으로 추가 약제량으로 보상하여야 한다.
                                <br />
                                다. 자동폐쇄장치
                                <br />
                                (1) 자동폐쇄장치는 약제가 방출하기전 또는 동시에 폐쇄되어야 한다.
                                <br />
                                (2) 전동모터에 의해 셔터가 폐쇄되는 경우에는 약제의 방출 지연시간 이내에 폐쇄하여야 한다.
                            </p>
                        </div>
                    </div>
                    <div className={styles.EvaluateGasResult_slider_wrap1}>
                        <div className={styles.EvaluateGasResult_slider_wrap1_left}>
                            <h3>평가기준</h3>
                        </div>
                        <div className={styles.EvaluateGasResult_slider_wrap1_right}>
                            <p>
                                1) PRD(Piston Releasor Damper)의 정상 작동 여부와 지연시간을 평가한다. <br />
                                2) 배관에서 누기발생 여부를 평가한다.
                            </p>
                        </div>
                    </div>{' '}
                </>
            )}
            {page === '4' && (
                <>
                    <div className={styles.EvaluateGasResult_slider_wrap1}>
                        <div className={styles.EvaluateGasResult_slider_wrap1_left}>
                            <h3>사전준비</h3>
                        </div>
                        <div className={styles.EvaluateGasResult_slider_wrap1_right}>
                            <p>
                                1) 킥오프 미팅 또는 현장 사전답사 시 성능시험 대상과 일정을 선정(사전 협의) 한다. <br />
                                - 통보 : 시험전 사전 공지한다.
                                <br />
                                - 인원 : 시험에 필요한 인원 및 역할 분담한다.
                                <br />
                                - 위치선정 : 시험을 실시할 대상 선정 및 시험위치 기록한다.
                                <br />
                                2) Spot Test(성능확인시험) 동의서(양식)를 작성하고 제출 후 진행한다.
                                <br />
                                3) 선정된 방호구역에 평가위원이 방문하여 시험 가능여부를 확인한다. <br />
                                4) 시험장정리 : 시험을 실시할 공간의 안전 및 점검 확인한다.
                                <br />
                                5) 시험장비 : 기동용기(예비품), 연결금구 및 압력계, 초시계, 열,연기감지기 테스터기
                            </p>
                        </div>
                    </div>
                    <div className={styles.EvaluateGasResult_slider_wrap1}>
                        <div className={styles.EvaluateGasResult_slider_wrap1_left}>
                            <h3>
                                {' '}
                                시험절차 <br />및<br /> 방법
                            </h3>
                        </div>
                        <div className={styles.EvaluateGasResult_slider_wrap1_right}>
                            <p>
                                1) 시험 전 방재센터와 사전 협의 후 시험을 실시한다. <br />
                                2) 성능시험의 수행은 인증신청기관에서 실시하고 평가위원이 다음을 평가한다. <br />
                                (다만, 전문시험기관을 지정할 수 있다.) <br />
                                - 화재수신기의 연동 정지 버튼을 눌러 소화약제가 오 방출되지 않도록 조치한다. <br />
                                - 기동용기함내 솔레노이드밸브에 안전핀을 체결하고 기동용기에서 분리한다. <br />
                                - 기동용기에 연결 된 동관을 분리한다. <br />
                                - 소화약제 저장용기에서 니들밸브를 분리한다. <br />
                                - 니들밸브 분리 후 테스트를 위해 소화저장용기 고정 틀에 견고하게 고정한다. <br />
                                - 니들밸브 동작여부를 육안으로 쉽게 확인한기 위해 청테이프를 부착한다. <br />
                                - 설치 된 기동용기를 분리하고 예비품으로 교체 한다. <br />
                                - 예비 기동용기에 솔레노이드 밸브를 체결하고, 안전핀을 제거한다. <br />
                                - 감지기 A,B 동작 또는 수동조작함 조작으로 솔레노이드밸브를 동작 시킨다. <br />
                                - 솔레노이드밸브 동작 후 동관의 누기여부 및 니들밸브 정상 동작을 확인한다. <br />- 테스트 완료 후 복구 및 관계자에게 정상 복구여부 확인 받는다.
                            </p>
                        </div>
                    </div>
                    <div className={styles.EvaluateGasResult_slider_wrap1}>
                        <div className={styles.EvaluateGasResult_slider_wrap1_left}>
                            <h3>관련기준</h3>
                        </div>
                        <div className={styles.EvaluateGasResult_slider_wrap1_right}>
                            <p>
                                1) 소방청 02090 할로겐화합물 및 불활성기체 소방설비공사 표준시방서 발췌
                                <br />
                                - 2.6 기동용기 배관
                                <br />
                                점검 및 시험으로 탈부착이 빈번하게 발생하는 기동용기배관의 연결 부분에는 동관이외의 고압 플렉시블호스를 사용하도록 권장하고 있음
                                <br />
                                니들밸브와 실린더간의 연결을 견고하게 할 수 있도록 제작된 것을 사용
                            </p>
                        </div>
                    </div>
                    <div className={styles.EvaluateGasResult_slider_wrap1}>
                        <div className={styles.EvaluateGasResult_slider_wrap1_left}>
                            <h3>평가기준</h3>
                        </div>
                        <div className={styles.EvaluateGasResult_slider_wrap1_right}>
                            <p>
                                1) 기동용 동관 누기 여부 확인한다. <br />
                                2) 설계된 소화약제 개방 병수 만큼 방출되도록 체크밸브가 적정하게 설치되었는지 확인한다. <br />
                                3) 니들밸브의 정상 동작 여부 확인한다.
                            </p>
                        </div>
                    </div>{' '}
                </>
            )}
        </>
    );
};

export default PreResult;
