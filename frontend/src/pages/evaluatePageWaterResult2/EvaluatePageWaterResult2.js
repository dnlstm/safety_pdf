import EvaluateWaterResult2 from './common/EvaluateWaterResult2/EvaluateWaterResult2';
import {Navigate, useParams} from 'react-router-dom';
import graph from 'assets/img/graph.jpg';
// import WaterEquipment from './common/waterEquipment/WaterEquipment';
import WaterEquipment2 from './common/waterEquipment2/WaterEquipment2';

const EvaluatePageWaterResult2 = () => {
    const {page} = useParams();

    return (
        <>
            {page === '0' && <WaterEquipment2 />}
            {page === '1' && (
                <EvaluateWaterResult2
                    item="1) 옥내ㆍ옥외 소화전의 배관 상태 확인한다."
                    place="지하1층 소방펌프실"
                    img={graph}
                    content={`1. 배관은 다른 설비의 배관과 쉽게 아래와 같이 구분 여부 확인
    1) 배관의 표며 또는 배관 보온재 표면의 색상을 [산업표준화법 제12조]에 따른 한국산업 표준(KS)에 따라 배관계의 식별 표시
    2) 적색으로 하여 식별이 가능하도록 소방용설비의 배관임을 표시
2. 배관 내 부식 또는 지하 매설 배관의 경우 누수로 인한 소화수 탁도의 변화 여부 확인.`}
                    result={`1. 소화수조 설치 상태 양호
- 수조의 수위계 Level 상태 양호 하며, 수조의 표지 상태도 양호
- 수조의 배관상태 양호
- 수조의 표지 부착상태 양호`}
                />
            )}

            {page === '2' && (
                <EvaluateWaterResult2
                    item="2) 옥내ㆍ옥외 방수구의 위치 및 관리상태 확인한다."
                    place="지하1층 펌프실 / 옥상층"
                    img="https://picsum.photos/id/101/643/319"
                    content={`1. 옥내소화전 방수구 설치 높이: 바닥으로부터 높이 1.5m이하
2. 옥외소화전 방수구 설치 높이: 바닥으로부터 높이 0.5m 이상 1m 이하
3. 주위 장애물 간섭이 없는지 확인`}
                    result={`1. 동력제어반 관리상태 양호
- 평상 시 자동 상태 관리 및 수동조작에 따른 펌프기동이 양호 함.
2. 개선사항
- 소화 배관 계통도의 표지를 설치 권장 함.
: 해당 소화 시스템이 어떻게 분포되어 적용 되는지 펌프실에서한눈에 식별이 용이하도록 소화 배관의 계통 비치 필요`}
                />
            )}
            {page === '3' && (
                <EvaluateWaterResult2
                    item="3) 옥내ㆍ옥외 소화전 표지판, 사용설명서 등 확인한다."
                    place="지하1층 펌프실 / 옥상층"
                    img="https://picsum.photos/id/122/643/319"
                    content={`- 옥내/옥외소화전 -
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
                <EvaluateWaterResult2
                    item="4) 옥내ㆍ옥외 소화전함 내부 수납물 확인한다."
                    place="청사동 지하1층 / 자동화창고동 옥외"
                    img="https://picsum.photos/id/103/643/319"
                    content={`1. 소화전함 표시등 설치 여부 확인
2. 옥내소화전 사용설명 표지 부착 여부 확인 – 옥외소화전 해당 사항 없음
3. 소화전함 내부의 수납물(호스, 노즐, 조작핸들)의 정상 비치 확인`}
                    result={`1. 펌프실 청소 및 주변 정리 상태 양호
2. 펌프 성능 시험 중 배출되는 시험 유량이 집수정으로 배출되는 방식
: 펌프 성능 시험 시 집수정의 수위 확인하며 시험 진행`}
                />
            )}
            {page === '5' && (
                <EvaluateWaterResult2
                    item="5) 옥내ㆍ옥외 소화전 노즐선단에서의 방수압력 확인한다."
                    place="A/B지구 펌프실"
                    img="https://picsum.photos/id/104/643/319"
                    content={`1. 펌프 및 배관의 개방 및 폐쇄 상태를 확인한다.
- 펌프 흡입측, 토출측, 성능시험배관 개폐밸브`}
                    result={`1. 밸브의 개폐 상태 표지를 설치하여 육안으로 확인하기 편하게 되어 있음.
- 양호`}
                />
            )}
            {page > '5' && <Navigate to={'/list'} replace />}
        </>
    );
};

export default EvaluatePageWaterResult2;
