import styles from './WaterEquipment2.module.scss';
import {useNavigate, useParams} from 'react-router-dom';
import graph from 'assets/img/graph.jpg';
import SelectBox from 'components/common/selectBox/SelectBox';
import {useForm, useFieldArray, Controller} from 'react-hook-form';
import axios from 'axios';
import {useEffect} from 'react';

const WaterEquipment2 = () => {
    const navigate = useNavigate();
    const {id} = useParams();

    const {
        register,
        control,
        handleSubmit,
        reset
        // formState: {errors},
    } = useForm({
        defaultValues: {
            equipInputAll: [
                {
                    equipInput: [{equipInput: '', equipInput2: '', equipInput3: '', equipInput4: '', equipInput5: ''}]
                }
            ]
        }
    });

    const equipInputAll = useFieldArray({
        name: 'equipInputAll',
        control
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/post/evaluateWater/${id}`);
                const data = response.data;
                if (data) {
                    reset(data);
                }
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };

        fetchData();
    }, [id, reset]);

    const onSubmit = async (data) => {
        await axios.post(`/post/evaluateWater/${id}`, data);
        navigate(`/${id}/evaluate/water/result/1`, {replace: true});
        // 폼 제출 시 데이터 처리 로직 추가
    };

    return (
        <div className={styles.EquipmentSituation2}>
            <form
                onSubmit={handleSubmit(onSubmit)}
                style={{
                    height: '100%',
                    overflow: 'auto'
                }}
            >
                <div className={styles.EquipmentSituation2_slider}>
                    {equipInputAll.fields.map((field, idx) => (
                        <div key={field.id} className={styles.EquipmentSituation2_slider_wrap1}>
                            <div className={styles.EquipmentSituation2_slider_wrap1_left}>
                                <div className={styles.wrap1_left_in}>
                                    <h3>현황({idx + 1}지구)</h3>
                                    <button type="button" className={styles.plusAllBtn} onClick={() => equipInputAll.append({equipInput: [{equipInput: '', equipInput2: '', equipInput3: '', equipInput4: '', equipInput5: ''}]})}>
                                        +
                                    </button>
                                    <button type="button" className={styles.removeAllBtn} onClick={() => equipInputAll.remove(idx)} disabled={equipInputAll.fields.length === 1}>
                                        -
                                    </button>
                                </div>
                            </div>

                            <div className={styles.EquipmentSituation2_slider_wrap1_right}>
                                <div className={styles.EquipmentSituation2_slider_wrap1_right_grid}>
                                    <div className={styles.a1}>항목</div>
                                    <div className={styles.a2}>구분</div>
                                    <div className={styles.a3}>내용</div>
                                    <div className={styles.a4}>제조사</div>
                                    <div className={styles.a5}>제조년도</div>
                                    <div className={styles.a6}>용도</div>
                                    <div className={styles.a7}>톡이사항</div>
                                    <div className={styles.a8}>삭제</div>
                                </div>

                                {field.equipInput &&
                                    field.equipInput.map((inputField, inputIdx) => (
                                        <div key={`${field.id}-${inputIdx}`} className={styles.EquipmentSituation2_equipInput}>
                                            <input {...register(`equipInputAll[${idx}].equipInput[${inputIdx}].equipInput`)} defaultValue={inputField.equipInput} className={styles.EquipmentSituation2_equipInput_right} />
                                            <input {...register(`equipInputAll[${idx}].equipInput[${inputIdx}].equipInput2`)} defaultValue={inputField.equipInput2} className={styles.EquipmentSituation2_equipInput_right} />
                                            <input type="month" {...register(`equipInputAll[${idx}].equipInput[${inputIdx}].equipInput3`)} defaultValue={inputField.equipInput3} className={styles.EquipmentSituation2_equipInput_right} />
                                            <div className={styles.EquipmentSituation2_equipInput_right}>
                                                <Controller control={control} name={`equipInputAll[${idx}].equipInput[${inputIdx}].equipInput4`} render={({field}) => <SelectBox version="1" situation={{field}} />} />
                                            </div>
                                            <input {...register(`equipInputAll[${idx}].equipInput[${inputIdx}].equipInput5`)} defaultValue={inputField.equipInput5} className={styles.EquipmentSituation2_equipInput_right} />
                                            <div className={styles.EquipmentSituation2_equipInput_right}>
                                                <button
                                                    type="button"
                                                    className={styles.removeBtn}
                                                    onClick={() => {
                                                        const equipInputFieldArray = equipInputAll.fields[idx].equipInput;
                                                        equipInputFieldArray.splice(inputIdx, 1);
                                                        equipInputAll.update(idx, {equipInput: equipInputFieldArray});
                                                    }}
                                                >
                                                    -
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                <button
                                    type="button"
                                    className={styles.plusBtn}
                                    onClick={() => {
                                        const equipInputFieldArray = equipInputAll.fields[idx].equipInput;
                                        equipInputFieldArray.push({equipInput: '', equipInput2: '', equipInput3: '', equipInput4: '', equipInput5: ''});
                                        equipInputAll.update(idx, {equipInput: equipInputFieldArray});
                                    }}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    ))}

                    <div className={styles.EquipmentSituation2_slider_wrap1}>
                        <div className={styles.EquipmentSituation2_slider_wrap1_left}>
                            <h3>시험목적</h3>
                        </div>
                        <div className={styles.EquipmentSituation2_slider_wrap1_right}>
                            <p>
                                1) 소방펌프는 일반펌프와는 달리 화재 상황 등 특수한 경우에만 동작하도록 되어있다. <br />
                                2) 소방펌프는 평소에 거의 기동을 하지 않으므로 평상시 성능시험을 통해 이상 .유무를 확인하고 유지관리를 철저히 하여야 한다. <br />
                                3) 수질검사를통하여 미생물로인한 부식 및 이물질로인한 미비한 방수량을 등을 방지한다. <br />
                                4) 본 시험은 관계자의 설비 이해도 및 성능확인시험 운영 능력에 대한 평가를 목적으로 한다.
                            </p>
                        </div>
                    </div>
                    <div className={styles.EquipmentSituation2_slider_wrap1}>
                        <div className={styles.EquipmentSituation2_slider_wrap1_left}>
                            <h3>평가기준</h3>
                        </div>
                        <div className={styles.EquipmentSituation2_slider_wrap1_right}>
                            <p>
                                1) 옥내소화전설비의 화재안전기준(NFSC 102) <br />
                                2) 스프링클러설비의 화재안전기준(NFSC 103) <br />
                                3) NFPA 20 Standard for the Installation of Centrifugal Fire Pumps <br />
                                4) NFPA 13 Standard for the Installation of Sprinkler Systems, 2019 Edition, Sections 5.1.5 and 7.8.1.
                            </p>
                        </div>
                    </div>
                    <div className={styles.EquipmentSituation2_slider_wrap1}>
                        <div className={styles.EquipmentSituation2_slider_wrap1_left}>
                            <h3>사전준비</h3>
                        </div>
                        <div className={styles.EquipmentSituation2_slider_wrap1_right}>
                            <p>
                                1) 킥오프 미팅 또는 현장 사전답사 시 성능시험 대상과 일정을 선정(사전 협의) 한다. <br />
                                - 통보 : 시험전 사전 공지한다. <br />
                                - 인원 : 시험에 필요한 인원 및 역할 분담한다. <br />
                                - 위치선정 : 시험을 실시할 대상 선정 및 시험위치 기록한다. <br />
                                2) Spot Test(성능확인시험) 동의서(양식)를 작성하고 제출 후 진행한다. <br />
                                3) 시험장비 : 필요시 초음파 유량계를 활용하여 유량을 측정한다. <br />
                                4) 시험장정리 : 시험을 실시할 공간의 안전 및 점검한다.
                            </p>
                        </div>
                    </div>
                    <div className={styles.EquipmentSituation2_slider_wrap1}>
                        <div className={styles.EquipmentSituation2_slider_wrap1_left}>
                            <h3>성능시험 항목</h3>
                        </div>
                        <div className={styles.EquipmentSituation2_slider_wrap1_right}>
                            <p>
                                1) 소화수조 소화수원 확보상태 확인한다. <br />
                                2) 감시제어반 가압송수장치 스위치 정상여부 확인한다.
                                <br />
                                3) 가압송수장치 주위배관 상태(배관, 릴리프밸브, 드레인 등) 확인한다.
                                <br />
                                4) 방출수를 처리할 집수정, 펌프실 바닥상태 등 확인한다.
                                <br />
                                5) 가압송수장치 밸브 개방 및 폐쇄 상태 확인한다.
                                <br />
                                6) 가압송수장치 토출량, 토출압력 등 확인한다.
                                <br />
                                7) 가압송수장치, 압력챔버(압력스위치), 물탱크 표지 확인한다.
                                <br />
                                8) 가압송수장치 체절압력 확인한다.
                                <br />
                                9) 가압송수장치 정격압력 확인한다.
                                <br />
                                10) 가압송수장치 150% 토출량에서 65% 이상 압력 확인한다.
                                <br />
                                11) 가압송수장치 기동압력 확인한다.
                                <br />
                                12) 릴리프밸브 개방확인한다. (체절운전 후 체절압력 범위에서 개방)
                            </p>
                        </div>
                    </div>
                    <div className={styles.EquipmentSituation2_slider_wrap1}>
                        <div className={styles.EquipmentSituation2_slider_wrap1_left}>
                            <h3>
                                시험절차 <br />및<br /> 방법
                            </h3>
                        </div>
                        <div className={styles.EquipmentSituation2_slider_wrap1_right}>
                            <p>
                                1) 시험 전 방재센터와 사전 협의 후 시험을 실시한다.
                                <br /> 2) 성능시험의 수행은 인증신청기관에서 실시하고 평가위원이 결과를 평가한다.
                                <br /> 3) 펌프의 전양정과 토출량을 확인한다. (정격토출압력(명판)의 140% 계산, 65% 계산)
                                <br /> 4) 체절운전시험 실시 <br />- 동력제어반에서 주펌프 및 충압펌프를 수동 전환한다. <br />- 2차 개폐밸브 폐쇄, 성능시험배관의 성능시험밸브(1차측) 개방한다. <br />- 성능시험배관의 유량조절밸브(2차측)를 폐쇄한 상태에서 실시한다. <br />- 주펌프 수동기동(체절운전) 확인한다. <br />- 체절운전시 압력계 확인한다. (토출량이 0인 상태에서 정격양정의 140% 미만 확인) <br />- 체절압력 미만에서 릴리프밸브 개방여부 확인한다. (미개방시 릴리프밸브 압력조절나사 조절) <br />-
                                평가위원이 체절운전시험 결과를 확인한다.
                                <br /> 5) 정격운전시험 실시 <br />- 유량이 100인 상태로 운전할 때 정격토출압력 확인한다.
                                <br /> - 유량계로 유량 확인한다. (유량계 교정 상태) <br />- 압력계로 정격토출압력 확인한다. (압력계 교정 상태)
                                <br /> - 평가위원이 정격운전시험 결과를 확인한다. (최대부하운전시험 실시)
                                <br /> - 정격토출량의 150%로 운전 확인한다. (유량계 확인) <br />- 정격토출압력의 65% 이상 확인한다. <br />- 평가위원이 최대부하운전시험 결과를 확인한다.
                                <br /> 6) 복구 <br />- 주펌프 및 충압펌프 운전 정지 확인한다. <br />- 펌프 기동 및 정지 압력 세팅한다. <br />- 동력제어반 및 감지제어반 자동으로 전환하는지 확인한다. <br />- 2차 개폐밸브 개방확인한다. <br />- 설비 이상 유무 최종확인한다. <br />- 설비 복구 확인서(양식) 제출
                            </p>

                            <img src={graph} height="732" alt="" />
                        </div>
                    </div>
                </div>

                {/* <div className={styles.EquipmentSituation2_grid}></div> */}

                <button className={styles.EquipmentSituation2_button}>다음</button>
            </form>
        </div>
    );
};

export default WaterEquipment2;
