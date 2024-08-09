import {useNavigate, useParams} from 'react-router-dom';
import styles from './EvaluateWaterResult2.module.scss';
import PerformanceTestTable2 from '../performanceTestTable2/PerformanceTestTable2';
import PerformanceTestChart2 from '../performanceTestChart2/PerformanceTestChart2';
import {useForm, useFieldArray, useWatch} from 'react-hook-form';
import {useEffect, useState} from 'react';
import axios from 'axios';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';

const EvaluateWaterResult2 = ({item, place, img, content, result}) => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const {id, page} = useParams();
    const [isOpen, setIsOpen] = useState(false);

    const handleModalNavigation = async () => {
        await axios.get(`/post/V2updateWaterAll/${id}`);
        navigate(`/${id}/evaluate/gas/result/0`, {replace: true});
    };

    const {register, handleSubmit, control, setValue} = useForm({
        defaultValues: {
            evaluationItems: item,
            evaluationLocation: '',
            Picture: [{picture1: '', picture2: ''}],
            newPicture: [{picture1: '', picture2: ''}],
            evaluationContent: content,
            evaluationResult: result,
            improvementResult: '',
            improvementContent: ''
        }
    });

    const Picture = useFieldArray({
        name: 'Picture',
        control
    });
    const newPicture = useFieldArray({
        name: 'newPicture',
        control
    });

    const WatchPicture = useWatch({
        control,
        name: 'Picture'
    });
    const WatchnewPicture = useWatch({
        control,
        name: 'newPicture'
    });

    const fetchData = async () => {
        const response = await axios.get(`/post/V2getLatestData/${id}/Water${page}`);
        return response.data;
    };
    const {data} = useQuery({
        queryKey: ['fetchData2', id, page],
        queryFn: fetchData,
        retry: false,
        refetchOnWindowFocus: false
    });

    useEffect(() => {
        const downloadAndConvertToFile = async (url) => {
            try {
                const fullUrl = `http://localhost:5000${url}`;
                const response = await axios.get(fullUrl, {responseType: 'blob'});
                const file = new File([response.data], url.split('/').pop(), {type: response.data.type});
                return file;
            } catch (error) {
                console.error(`Error downloading file from ${url}:`, error);
                throw error;
            }
        };

        const processPictures = async (picture1, picture2) => {
            const maxLength = Math.max(picture1.length, picture2.length);
            const formattedPictures = await Promise.all(
                Array.from({length: maxLength}).map(async (_, index) => {
                    const file1 = picture1[index] ? await downloadAndConvertToFile(picture1[index]?.picture1) : null;
                    const file2 = picture2[index] ? await downloadAndConvertToFile(picture2[index]?.picture2) : null;
                    return {picture1: file1, picture2: file2};
                })
            );
            return formattedPictures;
        };

        if (data) {
            const {evaluationItems, evaluationLocation, evaluationContent, evaluationResult, picture1 = [], picture2 = [], newPicture1 = [], newPicture2 = [], improvementResult, improvementContent} = data;

            setValue('evaluationItems', evaluationItems);
            setValue('evaluationLocation', evaluationLocation);
            setValue('evaluationContent', evaluationContent);
            setValue('evaluationResult', evaluationResult);

            processPictures(picture1, picture2)
                .then((formattedPictures) => {
                    setValue('Picture', formattedPictures);
                })
                .catch((error) => {
                    console.error('Error processing pictures:', error);
                });

            processPictures(newPicture1, newPicture2)
                .then((formattedPictures) => {
                    setValue('newPicture', formattedPictures);
                })
                .catch((error) => {
                    console.error('Error processing new pictures:', error);
                });
            setValue('improvementResult', improvementResult);
            setValue('improvementContent', improvementContent);
        }
    }, [data, setValue]);

    const update = (formData) => axios.post(`/post/V2evalimg/${id}/Water${page}`, formData);

    const updateMutation = useMutation({
        mutationFn: update,
        onSuccess: ({data}) => {
            Number(page ?? 1) + 1 < 6 && navigate(`/${id}/evaluate/water/result2/${Number(page ?? 1) + 1}`);
            data === '5 등록완료' && setIsOpen(true);
            queryClient.invalidateQueries(['fetchData', id, page]);
        }
    });

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append('evaluationItems', data.evaluationItems);
        formData.append('evaluationLocation', data.evaluationLocation);
        data.Picture.forEach((Picture) => {
            formData.append('picture1', Picture.picture1);
            formData.append('picture2', Picture.picture2);
        });

        formData.append('evaluationContent', data.evaluationContent);
        formData.append('evaluationResult', data.evaluationResult);
        formData.append('improvementResult', data.improvementResult);
        data.newPicture.forEach((newPicture) => {
            formData.append('newPicture1', newPicture.picture1);
            formData.append('newPicture2', newPicture.picture2);
        });

        formData.append('improvementContent', data.improvementContent);

        updateMutation.mutate(formData);
    };

    return (
        <div className={styles.EvaluateWaterResult2}>
            <div className={styles.EvaluateWaterResult2_slider}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.EvaluateWaterResult2_slider_wrap1}>
                        <div className={styles.EvaluateWaterResult2_slider_wrap1_left}>
                            <h3>평가항목</h3>
                        </div>
                        <div className={styles.EvaluateWaterResult2_slider_wrap1_right}>
                            <input {...register('evaluationItems')} spellCheck={false} autoComplete="off" />
                        </div>
                    </div>
                    <div className={styles.EvaluateWaterResult2_slider_wrap1}>
                        <div className={styles.EvaluateWaterResult2_slider_wrap1_left}>
                            <h3>평가위치</h3>
                        </div>
                        <div className={styles.EvaluateWaterResult2_slider_wrap1_right}>
                            <input {...register('evaluationLocation')} spellCheck={false} autoComplete="off" />
                        </div>
                    </div>
                    <div className={styles.EvaluateWaterResult2_slider_wrap1}>
                        <div className={styles.EvaluateWaterResult2_slider_wrap1_left}>
                            <h3>평가사진</h3>
                        </div>
                        <div className={styles.fullright}>
                            {Picture.fields.map((field, idx) => (
                                <div className={styles.fulldiv} key={field.id}>
                                    <div className={styles.EvaluateWaterResult2_slider_wrap1_rightP}>
                                        <p
                                            className={styles.p1}
                                            onClick={() => {
                                                setValue(`Picture.${idx}.picture1`, null);
                                            }}
                                        >
                                            ✖︎
                                        </p>
                                        <label>
                                            <h3>사진 선택</h3>
                                            <input
                                                type="file"
                                                onChange={(e) => {
                                                    const file = e.target.files[0];
                                                    setValue(`Picture.${idx}.picture1`, file);
                                                }}
                                            />
                                            {WatchPicture[idx]?.picture1 && <img className={styles.img1} src={URL.createObjectURL(WatchPicture[idx]?.picture1)} alt="Preview" />}
                                        </label>
                                        <p
                                            className={styles.p2}
                                            onClick={() => {
                                                setValue(`Picture.${idx}.picture2`, null);
                                                setValue(`File.${idx}.file2`, null);
                                            }}
                                        >
                                            ✖︎
                                        </p>
                                        <label>
                                            <h3>사진 선택</h3>
                                            <input
                                                type="file"
                                                onChange={(e) => {
                                                    const file = e.target.files[0];
                                                    setValue(`Picture.${idx}.picture2`, file);
                                                }}
                                            />
                                            {WatchPicture[idx]?.picture2 && <img className={styles.img2} src={URL.createObjectURL(WatchPicture[idx]?.picture2)} alt="Preview" />}
                                        </label>
                                    </div>
                                    <button className={styles.buttonDelete} type="button" onClick={() => Picture.remove(idx)}>
                                        -
                                    </button>
                                </div>
                            ))}
                            <button className={styles.buttonPlus} type="button" onClick={() => Picture.append({picture1: '', picture2: ''})}>
                                +
                            </button>
                        </div>
                    </div>
                    {page !== '11' ? (
                        <div className={styles.EvaluateWaterResult2_slider_wrap1}>
                            <div className={styles.EvaluateWaterResult2_slider_wrap1_left}>
                                <h3>평가내용</h3>
                            </div>
                            <div className={styles.EvaluateWaterResult2_slider_wrap1_right}>
                                <textarea {...register('evaluationContent')} style={{height: '203px', width: '100%'}} spellCheck={false} />
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className={styles.EvaluateWaterResult2_slider_wrap1}>
                                <div className={styles.EvaluateWaterResult2_slider_wrap1_left}>
                                    <h3>
                                        평가내용
                                        <br />
                                        A지구
                                    </h3>
                                </div>
                                <div className={styles.EvaluateWaterResult2_slider_wrap1_right}>
                                    <PerformanceTestTable2 majorminer="가 지역" />
                                    <p>※ 소화배관 내에는 상시 자연낙차 압력과 최소방수압력을 합친 압력 이상으로 가압되어 있는지 여부 확인</p>
                                </div>
                            </div>
                            <div className={styles.EvaluateWaterResult2_slider_wrap1}>
                                <div className={styles.EvaluateWaterResult2_slider_wrap1_left}>
                                    <h3>
                                        평가내용
                                        <br />
                                        A지구
                                    </h3>
                                </div>
                                <div className={styles.EvaluateWaterResult2_slider_wrap1_right}>
                                    <PerformanceTestTable2 majorminer="나 지역" />
                                    <p>※ 소화배관 내에는 상시 자연낙차 압력과 최소방수압력을 합친 압력 이상으로 가압되어 있는지 여부 확인</p>
                                </div>
                            </div>
                            <div className={styles.EvaluateWaterResult2_slider_wrap1}>
                                <div className={styles.EvaluateWaterResult2_slider_wrap1_left}>
                                    <h3>
                                        평가내용
                                        <br />
                                        A지구
                                    </h3>
                                </div>
                                <div className={styles.EvaluateWaterResult2_slider_wrap1_right}>
                                    <PerformanceTestTable2 majorminer="다 지역" />
                                    <p>※ 소화배관 내에는 상시 자연낙차 압력과 최소방수압력을 합친 압력 이상으로 가압되어 있는지 여부 확인</p>
                                </div>
                            </div>
                        </>
                    )}
                    <div className={styles.EvaluateWaterResult2_slider_wrap1}>
                        <div className={styles.EvaluateWaterResult2_slider_wrap1_left}>
                            <h3>
                                평과결과
                                <br />및<br />
                                개선방안
                            </h3>
                        </div>
                        <div className={styles.EvaluateWaterResult2_slider_wrap1_right}>
                            <textarea {...register('evaluationResult')} style={{width: '100%'}} spellCheck={false}></textarea>
                        </div>
                    </div>
                    {page === '10' && (
                        <>
                            <div className={styles.EvaluateWaterResult2_slider_wrap1}>
                                <div className={styles.EvaluateWaterResult2_slider_wrap1_left}>
                                    <h3>
                                        성능시험표
                                        <br />
                                        A지구
                                    </h3>
                                </div>
                                <div className={styles.EvaluateWaterResult2_slider_wrap1_right}>
                                    <PerformanceTestTable2 majorminer="주" />
                                </div>
                            </div>
                            <div className={styles.EvaluateWaterResult2_slider_wrap1}>
                                <div className={styles.EvaluateWaterResult2_slider_wrap1_left}>
                                    <h3>
                                        성능시험표
                                        <br />
                                        B지구
                                    </h3>
                                </div>
                                <div className={styles.EvaluateWaterResult2_slider_wrap1_right}>
                                    <PerformanceTestTable2 majorminer="예비" />
                                </div>
                            </div>
                            <div className={styles.EvaluateWaterResult2_slider_wrap1}>
                                <div className={styles.EvaluateWaterResult2_slider_wrap1_left}>
                                    <h3>
                                        성능시험표
                                        <br />
                                        C지구
                                    </h3>
                                </div>
                                <div className={styles.EvaluateWaterResult2_slider_wrap1_right}>
                                    <PerformanceTestTable2 majorminer="주" />
                                </div>
                            </div>
                            <div className={styles.EvaluateWaterResult2_slider_wrap1}>
                                <div className={styles.EvaluateWaterResult2_slider_wrap1_left}>
                                    <h3>
                                        성능시험
                                        <br />
                                        A곡선
                                    </h3>
                                </div>
                                <div className={styles.EvaluateWaterResult2_slider_wrap1_right}>
                                    <PerformanceTestChart2 type="A" />
                                </div>
                            </div>
                            <div className={styles.EvaluateWaterResult2_slider_wrap1}>
                                <div className={styles.EvaluateWaterResult2_slider_wrap1_left}>
                                    <h3>
                                        성능시험
                                        <br />
                                        B곡선
                                    </h3>
                                </div>
                                <div className={styles.EvaluateWaterResult2_slider_wrap1_right}>
                                    <PerformanceTestChart2 type="B" />
                                </div>
                            </div>
                            <div className={styles.EvaluateWaterResult2_slider_wrap1}>
                                <div className={styles.EvaluateWaterResult2_slider_wrap1_left}>
                                    <h3>
                                        성능시험
                                        <br />
                                        C곡선
                                    </h3>
                                </div>
                                <div className={styles.EvaluateWaterResult2_slider_wrap1_right}>
                                    <PerformanceTestChart2 type="C" />
                                </div>
                            </div>
                        </>
                    )}
                    <div className={styles.EvaluateWaterResult2_slider_wrap1}>
                        <div className={styles.EvaluateWaterResult2_slider_wrap1_left}>
                            <h3>개선결과</h3>
                        </div>
                        <textarea className={styles.EvaluateWaterResult2_slider_wrap1_right} {...register('improvementResult')} spellCheck={false}></textarea>
                    </div>
                    <div className={styles.EvaluateWaterResult2_slider_wrap1}>
                        <div className={styles.EvaluateWaterResult2_slider_wrap1_left}>
                            <h3>개선사진</h3>
                        </div>
                        <div className={styles.fullright}>
                            {newPicture.fields.map((field, idx) => (
                                <div className={styles.fulldiv} key={field.id}>
                                    <div className={styles.EvaluateWaterResult2_slider_wrap1_rightP}>
                                        <p
                                            className={styles.p1}
                                            onClick={() => {
                                                setValue(`newPicture.${idx}.picture1`, null);
                                            }}
                                        >
                                            ✖︎
                                        </p>
                                        <label>
                                            <h3>사진 선택</h3>
                                            <input
                                                type="file"
                                                onChange={(e) => {
                                                    const file = e.target.files[0];
                                                    setValue(`newPicture.${idx}.picture1`, file);
                                                }}
                                            />
                                            {WatchnewPicture[idx]?.picture1 && <img className={styles.img1} src={URL.createObjectURL(WatchnewPicture[idx]?.picture1)} alt="Preview" />}
                                        </label>
                                        <p
                                            className={styles.p2}
                                            onClick={() => {
                                                setValue(`newPicture.${idx}.picture2`, null);
                                            }}
                                        >
                                            ✖︎
                                        </p>
                                        <label>
                                            <h3>사진 선택</h3>
                                            <input
                                                type="file"
                                                onChange={(e) => {
                                                    const file = e.target.files[0];
                                                    setValue(`newPicture.${idx}.picture2`, file);
                                                }}
                                            />
                                            {WatchnewPicture[idx]?.picture2 && <img className={styles.img2} src={URL.createObjectURL(WatchnewPicture[idx]?.picture2)} alt="Preview" />}
                                        </label>
                                    </div>
                                    <button className={styles.buttonDelete} type="button" onClick={() => newPicture.remove(idx)}>
                                        -
                                    </button>
                                </div>
                            ))}
                            <button className={styles.buttonPlus} type="button" onClick={() => newPicture.append({picture1: '', picture2: ''})}>
                                +
                            </button>
                        </div>
                    </div>
                    <div className={styles.EvaluateWaterResult2_slider_wrap1}>
                        <div className={styles.EvaluateWaterResult2_slider_wrap1_left}>
                            <h3>개선내용</h3>
                        </div>
                        <textarea className={styles.EvaluateWaterResult2_slider_wrap1_right} {...register('improvementContent')} spellCheck={false}></textarea>
                    </div>
                    <button type="submit" className={styles.EvaluateWaterResult2_button}>
                        저장 후 다음
                    </button>
                    {isOpen && (
                        <div className={styles.modal}>
                            <p>저장 완료 후 가스계소화설비로 이동하시겠습니까?</p>
                            <button type="button" onClick={handleModalNavigation}>
                                이동
                            </button>
                            <button type="button" onClick={() => setIsOpen(false)}>
                                취소
                            </button>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default EvaluateWaterResult2;
