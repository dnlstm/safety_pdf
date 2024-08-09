import styles from './WaterEquipment2.module.scss';
import {useNavigate, useParams} from 'react-router-dom';
import SelectBox from 'components/common/selectBox/SelectBox';
import {useForm, useFieldArray, Controller} from 'react-hook-form';
import axios from 'axios';
import {useEffect} from 'react';

const WaterEquipment2 = () => {
    const navigate = useNavigate();
    const {id} = useParams();

    const {register, control, handleSubmit, reset} = useForm({
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
                const response = await axios.get(`/post/evaluateWaterver2/${id}`);
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
        await axios.post(`/post/evaluateWaterver2/${id}`, data);
        navigate(`/${id}/evaluate/water/result2/1`, {replace: true});
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
                                    <div className={styles.a6}>형식</div>
                                    <div className={styles.a7}>특이사항</div>
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
                                1) 옥내·외소화전설비는 소방대상물 내·외부에서 화재 초기에 관계자 또는 자체소방대원이 신속하게 소화할 수 있는 수동식 수계소화설비이다. <br />
                                2) 가장 기본적인 자체 초기 소화설비이므로 유사시에 원활하게 작동시킬 수 있도록 철저한 유지관리와 사용방법에 대한 숙지가 필요하다.
                                <br />
                                3) 본 시험은 관계자의 유지관리 현황 및 실제 사용 능력에 대한 평가를 하는 것을 목적으로 한다.
                            </p>
                        </div>
                    </div>
                    <div className={styles.EquipmentSituation2_slider_wrap1}>
                        <div className={styles.EquipmentSituation2_slider_wrap1_left}>
                            <h3>평가기준</h3>
                        </div>
                        <div className={styles.EquipmentSituation2_slider_wrap1_right}>
                            <p>
                                1) 옥내소화전설비의 화재안전기준(NFSC 102) 제5조제1항제3호
                                <br />
                                2) 옥외소화전설비의 화재안전기준(NFSC 109) 제5조제1항제3호 <br />
                                3) NFPA 14 Standard for the Installation of Standpipe and Hose Systems
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
                                1) 옥내·외 소화전의 배관 상태 확인한다. <br />
                                2) 방수구의 위치 및 관리상태 확인한다.
                                <br />
                                3) 옥내·외 소화전함 내부 수납물 확인한다.
                                <br />
                                4) 송수구 위치확인한다.
                                <br />
                                5) 옥내·외 소화전 표지판, 사용설명서 등 확인한다.
                                <br />
                                6) 옥내·외 소화전 노즐선단에서의 방수압력 확인한다.
                                <br />
                                7) 가압송수장치 기동표시등 확인한다.
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
                                1) 위치 : 펌프와 가장 먼곳 선정한다. (동결이나 수손피해 우려가 없는 곳으로 대상을 선정)
                                <br /> 2) 옥내, 외 소화전 주펌프 및 충압펌프 정상위치 확인한다. (자동위치)
                                <br /> 3) 제어반 옥내, 외 소화전 가압송수장치 스위치 정상위치 확인한다.
                                <br /> 4) 옥내, 외 소화전(시험위치) 호스 전개(2본) <br />
                                5) 성능시험의 수행은 인증신청기관에서 실시하고 평가위원이 결과를 평가한다.
                                <br />
                                6) 시험 전 방재센터와 사전 협의 후 실시한다. <br /> - 수신기(제어반) 상태 확인한다. <br /> - 옥내소화전 방수구 1개소 개방한다.
                                <br />- 소방펌프 작동확인, 최고방수압 확인한다.
                                <br /> - 옥내소화전 방수구 동시개방한다. (2개이상일시 2개) <br />- 방사거리(8m), 최소방수압(0.17 MPa), 펌프 확인한다.
                            </p>
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
