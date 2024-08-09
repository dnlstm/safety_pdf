import styles from './GasEquipment2.module.scss';
import {useNavigate, useParams} from 'react-router-dom';
import SelectBox from 'components/common/selectBox/SelectBox';
import {useForm, useFieldArray, Controller} from 'react-hook-form';
import axios from 'axios';
import {useEffect} from 'react';

const GasEquipment2 = () => {
    const navigate = useNavigate();
    const {id} = useParams();

    const {register, control, handleSubmit, reset} = useForm({
        defaultValues: {
            equipInputAll: [
                {
                    equipInput: [{equipInput: '', equipInput2: '', equipInput3: '', equipInput4: '', equipInput5: '', equipInput6: '', equipInput7: ''}]
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
                const response = await axios.get(`/post/evaluateGas/${id}`);
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
        await axios.post(`/post/evaluateGas/${id}`, data);
        navigate(`/${id}/evaluate/gas/result/1`, {replace: true});
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
                                    <button type="button" className={styles.plusAllBtn} onClick={() => equipInputAll.append({equipInput: [{equipInput: '', equipInput2: '', equipInput3: '', equipInput4: '', equipInput5: '', equipInput6: '', equipInput7: ''}]})}>
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
                                    <div className={styles.a5}>종류</div>
                                    <div className={styles.a6}>용기수</div>
                                    <div className={styles.a7}>제조년도</div>
                                    <div className={styles.a8}>방출구역</div>
                                    <div className={styles.a9}>특이사항</div>
                                    <div className={styles.a10}>삭제</div>
                                </div>

                                {field.equipInput &&
                                    field.equipInput.map((inputField, inputIdx) => (
                                        <div key={`${field.id}-${inputIdx}`} className={styles.EquipmentSituation2_equipInput}>
                                            <input {...register(`equipInputAll[${idx}].equipInput[${inputIdx}].equipInput`)} defaultValue={inputField.equipInput} className={styles.EquipmentSituation2_equipInput_right} />
                                            <input {...register(`equipInputAll[${idx}].equipInput[${inputIdx}].equipInput2`)} defaultValue={inputField.equipInput2} className={styles.EquipmentSituation2_equipInput_right} />
                                            <input {...register(`equipInputAll[${idx}].equipInput[${inputIdx}].equipInput3`)} defaultValue={inputField.equipInput3} className={styles.EquipmentSituation2_equipInput_right} />
                                            <div className={styles.EquipmentSituation2_equipInput_right}>
                                                <Controller control={control} name={`equipInputAll[${idx}].equipInput[${inputIdx}].equipInput4`} render={({field}) => <SelectBox version="1" situation={{field}} />} />
                                            </div>
                                            <input type="month" {...register(`equipInputAll[${idx}].equipInput[${inputIdx}].equipInput5`)} defaultValue={inputField.equipInput5} className={styles.EquipmentSituation2_equipInput_right} />
                                            <input {...register(`equipInputAll[${idx}].equipInput[${inputIdx}].equipInput6`)} defaultValue={inputField.equipInput6} className={styles.EquipmentSituation2_equipInput_right} />
                                            <input {...register(`equipInputAll[${idx}].equipInput[${inputIdx}].equipInput7`)} defaultValue={inputField.equipInput7} className={styles.EquipmentSituation2_equipInput_right} />
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
                                        equipInputFieldArray.push({equipInput: '', equipInput2: '', equipInput3: '', equipInput4: '', equipInput5: '', equipInput6: '', equipInput7: ''});
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
                                1) 방사구역 기밀도 시험(Door Fan Test) <br />
                                - 가스계소화설비는 화재 시 수동 또는 자동으로 가스계 소화약제를 이용하여 화재를 진화하는 소화설비이다. <br />
                                - 화재 시 원활하게 동작할 수 있도록 평상시 철저한 유지관리와 작동방법에 대한 숙지가 필요하다. <br />
                                - 본 시험은 Door Fan을 이용하여 약제 방출시와 동일한 환경을 조성하고 가스계소화설비의 소화능력을 컴퓨터 프로그램을 이용하여 분석·평가한다. 이를 통해 누출 부위를 확인 및 차단하여 가스계소화설비의 소화능력의 효율성 평가를 목적으로 한다. (간접 성능시험 확인) <br />
                                2) 선택밸브 작동 및 배관기밀도 시험 <br />
                                - 선택밸브는 가스계소화설비 및 분말소화설비에서 2개소 이상의 방호구역 또는 방호대상물에 대해 소화약제 저장용기를 공용으로 사용하는 경우에 사용하는 밸브로서 자동 또는 수동개방 장치에 의해 개방되는 것을 말한다. <br />
                                - 화재 시 원활하게 작동될 수 있도록 평상시 철저한 유지관리와 작동방법에 대한 숙지가 필요하다. <br />
                                - 본 시험은 공기압축기를 이용하여 선택밸브의 원활한 작동여부와 배관의 기밀도를 평가하는 것을 목적으로 한다. <br />
                                3) 피스톤릴리프댐퍼 개방시험 <br />
                                - 피스톤릴리프댐퍼(이하‘PRD’)는 방호구역을 관통하는 덕트 내부나 개구부에 설치하여 화재 시 자동으로 닫혀 소화약제의 누설을 방지하기 위해 설치한다. <br />
                                - 화재 시 원활하게 작동될 수 있도록 평상시 철저한 유지관리가 필요하다. <br />- 본 시험은 공기압축기를 이용하여 PRD(Piston Releasor Damper)의 작동여부를 평가하는 것을 목적으로 한다.
                            </p>
                        </div>
                    </div>
                    <div className={styles.EquipmentSituation2_slider_wrap1}>
                        <div className={styles.EquipmentSituation2_slider_wrap1_left}>
                            <h3>평가기준</h3>
                        </div>
                        <div className={styles.EquipmentSituation2_slider_wrap1_right}>
                            <p>
                                1) 이산화탄소소화설비의 화재안전기준(NFSC 106) <br />
                                2) 할론소화설비의 화재안전기준(NFSC 107) <br />
                                3) 할로겐화합물 및 불활성기체소화설비의 화재안전기준(NFSC 107A) <br />
                                4) 소방청 소방설비공사 표준시방서 <br />
                                5) NFPA 12 Standard on Carbon Dioxide Extinguishing Systems <br />
                                6) NFPA 2001 Standard on Clean Agent Fire Extinguishing Systems
                            </p>
                        </div>
                    </div>
                </div>

                <button className={styles.EquipmentSituation2_button}>다음</button>
            </form>
        </div>
    );
};

export default GasEquipment2;
