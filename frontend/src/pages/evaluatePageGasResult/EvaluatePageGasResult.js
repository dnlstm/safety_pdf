import {Navigate, useParams} from 'react-router-dom';
import graph from 'assets/img/graph.jpg';
import GasEquipment2 from './common/gasEquipment2/GasEquipment2';
import EvaluateGasResult from './common/evaluateGasResult/EvaluateGasResult';

// import WaterEquipment from './common/waterEquipment/WaterEquipment';
// import GasEquipment2 from './common/gasEquipment2/GasEquipment2';

const EvaluatePageGasResult = () => {
    const {page} = useParams();

    return (
        <>
            {page === '0' && <GasEquipment2 />}
            {page === '1' && (
                <EvaluateGasResult
                    item="방사구역 기밀도 시험(Door Fan Test)"
                    place="A/B지구 펌프실"
                    img={graph}
                    content={`※ 소화수조 설치 상태 확인(옥내소화전 화재안전기준 제4조 의거)
1. 수조의 외측에 수위계 설치 여부 확인
2. 수조의 외측에 고정식 사다리 설치 여부 확인
3. 조명설비 적정 여부 확인 
4. 수조의 밑 부문에 청소용 배수밸브 또는 배수관 설치 여부 확인 
5. 수조의 외측의 보기 쉬운 곳에 수조의 겸용되는 설비의 이름을 표시한 표지 설치 여부`}
                    result={`1. 소화수조 설치 상태 양호
- 수조의 수위계 Level 상태 양호 하며, 수조의 표지 상태도 양호
- 수조의 배관상태 양호
- 수조의 표지 부착상태 양호`}
                />
            )}

            {page === '2' && (
                <EvaluateGasResult
                    item="2) 선택밸브 작동 및 집합관 기밀도 시험"
                    place="A/B지구 펌프실"
                    img="https://picsum.photos/id/101/643/319"
                    content={`※ 동력제어반 설치 상태 확인(옥내소화전 화재안전기준 제4조 의거)
1. 앞면은 적색으로 하고 해당 설비용 동력제어반 표시한 표지 설치 여부 확인
2. 평상 시 자동 상태 관리여부 확인
3. 화재 또는 침수의 우려가 없는 위치에 설치 여부 확인`}
                    result={`1. 동력제어반 관리상태 양호
- 평상 시 자동 상태 관리 및 수동조작에 따른 펌프기동이 양호 함.
2. 개선사항
- 소화 배관 계통도의 표지를 설치 권장 함.
: 해당 소화 시스템이 어떻게 분포되어 적용 되는지 펌프실에서한눈에 식별이 용이하도록 소화 배관의 계통 비치 필요`}
                />
            )}
            {page === '3' && (
                <EvaluateGasResult
                    item="3) 피스톤릴리즈댐퍼 폐쇄시험"
                    place="A/B지구 펌프실"
                    img="https://picsum.photos/id/122/643/319"
                    content={`1. 다른 설비의 배관과의 구분 여부를 확인
2. 배관 및 보온재 표면의 색상 여부 확인
- 「산업표준화법」 제12조에 따른 한국산업표준(KS)에 따라 적색으로 식별이 가능하게 표시
3. 펌프 부속 밸브류(릴리프밸브등) 설치 여부 확인
4. 기기 주위의 배관은 기기의 조작보수용 여유 확보 여부 확인`}
                    result={`1. 관리 상태 양호
- 다른 설비의 배관과 식별이 가적색으로 표시 상태 양호 함.
- 펌프 체절 운전 시 릴리프 밸브여부 확인 가능하도록 사이트글라상태 양호 함.
- 밸브의 조작, 점검 및 보수가 가충분한 여유 공간 확보 됨.`}
                />
            )}
            {page === '4' && (
                <EvaluateGasResult
                    item="4) 니드밸브 개방시험"
                    place="A/B지구 펌프실"
                    img="https://picsum.photos/id/103/643/319"
                    content={`1. 펌프실의 평상시 관리상태를 확인
- 펌프실 바닥, 펌프의 외관 상 관리여부
2. 성능시험배관에는 펌프의 정격 토출량의 150%로 시험 및 점검으로 배출되는 물로 인한 침수되지 않는 대책이 있는지 다음 중 확인
1) 펌프의 시험유량이 모두 수원으로 되돌아가거나 옥외로 직접 배출되도록 배관 설치
2) 소화펌프 설계점의 150% 용량을 감당하기에 충분한 집수정 및 배수펌프 장치 설치
3) 펌프 토출구 단면적의 2배 이상의 유효개구면적을 갖는 바닥 배수구 관과 그에 연결된 수직 낙차 2m 이상의 배수배관 설치
4) 펌프 토출구 단면적의 3배 이상인 배수구로서 바닥 높이 이하에서 옥외 혹은 지하 집수정으로 직접 배출되는 방식    `}
                    result={`1. 펌프실 청소 및 주변 정리 상태 양호
2. 펌프 성능 시험 중 배출되는 시험 유량이 집수정으로 배출되는 방식
: 펌프 성능 시험 시 집수정의 수위 확인하며 시험 진행`}
                />
            )}
            {page > '4' && <Navigate to={'/list'} replace />}
        </>
    );
};

export default EvaluatePageGasResult;
