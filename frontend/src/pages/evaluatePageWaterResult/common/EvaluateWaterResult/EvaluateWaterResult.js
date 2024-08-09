import {useNavigate, useParams} from 'react-router-dom';
import styles from './EvaluateWaterResult.module.scss';
import PerformanceTestTable from '../performanceTestTable/PerformanceTestTable';
import PerformanceTestChart from '../performanceTestChart/PerformanceTestChart';
import {useForm, useFieldArray, useWatch} from 'react-hook-form';
import {useEffect, useState} from 'react';
import axios from 'axios';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';

const EvaluateWaterResult = ({item, place, img, content, result}) => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const {id, page} = useParams();
    const [isOpen, setIsOpen] = useState(false);

    const [a1data0, seta1Data0] = useState('');
    const [a1data100, seta1Data100] = useState('');
    const [a1data150, seta1Data150] = useState('');
    const [a2data0, seta2Data0] = useState('');
    const [a2data100, seta2Data100] = useState('');
    const [a2data150, seta2Data150] = useState('');

    const [b1data0, setb1Data0] = useState('');
    const [b1data100, setb1Data100] = useState('');
    const [b1data150, setb1Data150] = useState('');
    const [b2data0, setb2Data0] = useState('');
    const [b2data100, setb2Data100] = useState('');
    const [b2data150, setb2Data150] = useState('');

    const [c1data0, setc1Data0] = useState('');
    const [c1data100, setc1Data100] = useState('');
    const [c1data150, setc1Data150] = useState('');
    const [c2data0, setc2Data0] = useState('');
    const [c2data100, setc2Data100] = useState('');
    const [c2data150, setc2Data150] = useState('');

    const handleModalNavigation = async () => {
        await axios.get(`/post/updateWaterAll/${id}`);
        navigate(`/${id}/evaluate/water/result2/0`, {replace: true});
    };

    const {
        register,
        handleSubmit,
        control,

        // formState: {errors},
        setValue
    } = useForm({
        defaultValues: {
            evaluationItems: item,
            evaluationLocation: '',
            Picture: [{picture1: '', picture2: ''}],
            newPicture: [{picture1: '', picture2: ''}],
            evaluationContent: content,
            evaluationResult: result,
            improvementResult: '',
            improvementContent: '',
            ...Array.from({length: 120}, (_, i) => ({[`z${i + 1}`]: ''}))
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
        const response = await axios.get(`/post/getLatestData/${id}/Water${page}`);
        return response.data;
    };
    const {data} = useQuery({
        queryKey: ['fetchData', id, page],
        queryFn: fetchData,
        retry: false,
        refetchOnWindowFocus: false
    });

    useEffect(() => {
        const downloadAndConvertToFile = async (url) => {
            try {
                const fullUrl = `http://localhost:5000${url}`;
                const response = await axios.get(fullUrl, {responseType: 'blob'});
                if (response.status === 200) {
                    const file = new File([response.data], url.split('/').pop(), {type: response.data.type});
                    return file;
                } else {
                    console.error(`Failed to download file from ${url}: Status code ${response.status}`);
                    return null;
                }
            } catch (error) {
                console.error(`Error downloading file from ${url}:`, error);
                return null;
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
            return formattedPictures.filter((picture) => picture.picture1 || picture.picture2); // 유효한 파일만 반환
        };

        if (data) {
            const {evaluationItems, evaluationLocation, evaluationContent, evaluationResult, picture1 = [], picture2 = [], newPicture1 = [], newPicture2 = [], improvementResult, improvementContent, transformed = []} = data;

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

            // transformed 데이터 설정
            transformed.forEach((chunk, chunkIndex) => {
                chunk.forEach((item, itemIndex) => {
                    const baseIndex = chunkIndex * 20 + itemIndex * 4;
                    setValue(`z${baseIndex + 1}`, item.equipInput);
                    setValue(`z${baseIndex + 2}`, item.equipInput2);
                    setValue(`z${baseIndex + 3}`, item.equipInput3);
                    setValue(`z${baseIndex + 4}`, item.equipInput4);
                });
            });
        }
    }, [data, setValue]);

    const update = (formData) => axios.post(`/post/evalimg/${id}/Water${page}`, formData);

    const updateMutation = useMutation({
        mutationFn: update,
        onSuccess: ({data}) => {
            Number(page ?? 1) + 1 < 13 && navigate(`/${id}/evaluate/water/result/${Number(page ?? 1) + 1}`);
            data === '12 등록완료' && setIsOpen(true);
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

        for (let i = 1; i < 121; i++) {
            formData.append(`z`, data[`z${i}`]);
        }

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
        <div className={styles.EvaluateWaterResult}>
            <div className={styles.EvaluateWaterResult_slider}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.EvaluateWaterResult_slider_wrap1}>
                        <div className={styles.EvaluateWaterResult_slider_wrap1_left}>
                            <h3>평가항목</h3>
                        </div>
                        <div className={styles.EvaluateWaterResult_slider_wrap1_right}>
                            <input {...register('evaluationItems')} spellCheck={false} autoComplete="off" />
                        </div>
                    </div>
                    <div className={styles.EvaluateWaterResult_slider_wrap1}>
                        <div className={styles.EvaluateWaterResult_slider_wrap1_left}>
                            <h3>평가위치</h3>
                        </div>
                        <div className={styles.EvaluateWaterResult_slider_wrap1_right}>
                            <input {...register('evaluationLocation')} spellCheck={false} autoComplete="off" />
                        </div>
                    </div>
                    <div className={styles.EvaluateWaterResult_slider_wrap1}>
                        <div className={styles.EvaluateWaterResult_slider_wrap1_left}>
                            <h3>평가사진</h3>
                        </div>
                        <div className={styles.fullright}>
                            {Picture.fields.map((field, idx) => (
                                <div className={styles.fulldiv} key={field.id}>
                                    <div className={styles.EvaluateWaterResult_slider_wrap1_rightP}>
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

                    <div className={styles.EvaluateWaterResult_slider_wrap1}>
                        <div className={styles.EvaluateWaterResult_slider_wrap1_left}>
                            <h3>평가내용</h3>
                        </div>
                        <div className={styles.EvaluateWaterResult_slider_wrap1_right}>
                            <textarea {...register('evaluationContent')} style={{height: '203px'}} spellCheck={false} />
                        </div>
                    </div>

                    <div className={styles.EvaluateWaterResult_slider_wrap1}>
                        <div className={styles.EvaluateWaterResult_slider_wrap1_left}>
                            <h3>
                                평과결과
                                <br />및<br />
                                개선방안
                            </h3>
                        </div>
                        <div className={styles.EvaluateWaterResult_slider_wrap1_right}>
                            <textarea {...register('evaluationResult')} spellCheck={false}></textarea>
                        </div>
                    </div>
                    {page === '10' && (
                        <>
                            <div className={styles.EvaluateWaterResult_slider_wrap1}>
                                <div className={styles.EvaluateWaterResult_slider_wrap1_left}>
                                    <h3>
                                        성능시험표
                                        <br />
                                        A-1
                                    </h3>
                                </div>
                                <div className={styles.EvaluateWaterResult_slider_wrap1_right}>
                                    <PerformanceTestTable majorminer="주" setData0={seta1Data0} setData100={seta1Data100} setData150={seta1Data150} register={register} setValue={setValue} i={1} />
                                </div>
                            </div>
                            <div className={styles.EvaluateWaterResult_slider_wrap1}>
                                <div className={styles.EvaluateWaterResult_slider_wrap1_left}>
                                    <h3>
                                        성능시험표
                                        <br />
                                        A-2
                                    </h3>
                                </div>
                                <div className={styles.EvaluateWaterResult_slider_wrap1_right}>
                                    <PerformanceTestTable majorminer="주" setData0={seta2Data0} setData100={seta2Data100} setData150={seta2Data150} register={register} setValue={setValue} i={21} />
                                </div>
                            </div>
                            <div className={styles.EvaluateWaterResult_slider_wrap1}>
                                <div className={styles.EvaluateWaterResult_slider_wrap1_left}>
                                    <h3>
                                        성능시험표
                                        <br />
                                        B-1
                                    </h3>
                                </div>
                                <div className={styles.EvaluateWaterResult_slider_wrap1_right}>
                                    <PerformanceTestTable majorminer="주" setData0={setb1Data0} setData100={setb1Data100} setData150={setb1Data150} register={register} setValue={setValue} i={41} />
                                </div>
                            </div>
                            <div className={styles.EvaluateWaterResult_slider_wrap1}>
                                <div className={styles.EvaluateWaterResult_slider_wrap1_left}>
                                    <h3>
                                        성능시험표
                                        <br />
                                        B-2
                                    </h3>
                                </div>
                                <div className={styles.EvaluateWaterResult_slider_wrap1_right}>
                                    <PerformanceTestTable majorminer="주" setData0={setb2Data0} setData100={setb2Data100} setData150={setb2Data150} register={register} setValue={setValue} i={61} />
                                </div>
                            </div>
                            <div className={styles.EvaluateWaterResult_slider_wrap1}>
                                <div className={styles.EvaluateWaterResult_slider_wrap1_left}>
                                    <h3>
                                        성능시험표
                                        <br />
                                        C-1
                                    </h3>
                                </div>
                                <div className={styles.EvaluateWaterResult_slider_wrap1_right}>
                                    <PerformanceTestTable majorminer="주" setData0={setc1Data0} setData100={setc1Data100} setData150={setc1Data150} register={register} setValue={setValue} i={81} />
                                </div>
                            </div>
                            <div className={styles.EvaluateWaterResult_slider_wrap1}>
                                <div className={styles.EvaluateWaterResult_slider_wrap1_left}>
                                    <h3>
                                        성능시험표
                                        <br />
                                        C-2
                                    </h3>
                                </div>
                                <div className={styles.EvaluateWaterResult_slider_wrap1_right}>
                                    <PerformanceTestTable majorminer="주" setData0={setc2Data0} setData100={setc2Data100} setData150={setc2Data150} register={register} setValue={setValue} i={101} />
                                </div>
                            </div>

                            <div className={styles.EvaluateWaterResult_slider_wrap1}>
                                <div className={styles.EvaluateWaterResult_slider_wrap1_left}>
                                    <h3>
                                        성능시험
                                        <br />
                                        A곡선
                                    </h3>
                                </div>
                                <div className={styles.EvaluateWaterResult_slider_wrap1_right}>
                                    <div className={styles.PerformanceTestChartIn2}>
                                        <div className={styles.PerformanceTestChartTable}>
                                            <PerformanceTestChart title="A-1 성능시험 곡선" data0={a1data0} data100={a1data100} data150={a1data150} />
                                            <PerformanceTestChart title="A-2 성능시험 곡선" data0={a2data0} data100={a2data100} data150={a2data150} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.EvaluateWaterResult_slider_wrap1}>
                                <div className={styles.EvaluateWaterResult_slider_wrap1_left}>
                                    <h3>
                                        성능시험
                                        <br />
                                        B곡선
                                    </h3>
                                </div>
                                <div className={styles.EvaluateWaterResult_slider_wrap1_right}>
                                    <div className={styles.PerformanceTestChartIn2}>
                                        <div className={styles.PerformanceTestChartTable}>
                                            <PerformanceTestChart title="B-1 성능시험 곡선" data0={b1data0} data100={b1data100} data150={b1data150} />
                                            <PerformanceTestChart title="B-2 성능시험 곡선" data0={b2data0} data100={b2data100} data150={b2data150} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.EvaluateWaterResult_slider_wrap1}>
                                <div className={styles.EvaluateWaterResult_slider_wrap1_left}>
                                    <h3>
                                        성능시험
                                        <br />
                                        C곡선
                                    </h3>
                                </div>
                                <div className={styles.EvaluateWaterResult_slider_wrap1_right}>
                                    <div className={styles.PerformanceTestChartIn2}>
                                        <div className={styles.PerformanceTestChartTable}>
                                            <PerformanceTestChart title="C-1 성능시험 곡선" data0={c1data0} data100={c1data100} data150={c1data150} />
                                            <PerformanceTestChart title="C-2 성능시험 곡선" data0={c2data0} data100={c2data100} data150={c2data150} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                    <div className={styles.EvaluateWaterResult_slider_wrap1}>
                        <div className={styles.EvaluateWaterResult_slider_wrap1_left}>
                            <h3>개선결과</h3>
                        </div>
                        <textarea className={styles.EvaluateWaterResult_slider_wrap1_right} {...register('improvementResult')} spellCheck={false}></textarea>
                    </div>
                    <div className={styles.EvaluateWaterResult_slider_wrap1}>
                        <div className={styles.EvaluateWaterResult_slider_wrap1_left}>
                            <h3>개선사진</h3>
                        </div>
                        <div className={styles.fullright}>
                            {newPicture.fields.map((field, idx) => (
                                <div className={styles.fulldiv} key={field.id}>
                                    <div className={styles.EvaluateWaterResult_slider_wrap1_rightP}>
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
                                            {WatchnewPicture[idx]?.picture2 && <img className={styles.img1} src={URL.createObjectURL(WatchnewPicture[idx]?.picture2)} alt="Preview" />}
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
                    <div className={styles.EvaluateWaterResult_slider_wrap1}>
                        <div className={styles.EvaluateWaterResult_slider_wrap1_left}>
                            <h3>개선내용</h3>
                        </div>
                        <textarea className={styles.EvaluateWaterResult_slider_wrap1_right} {...register('improvementContent')} spellCheck={false}></textarea>
                    </div>
                    <button className={styles.EvaluateWaterResult_button}>저장 후 다음</button>
                    {isOpen && (
                        <div className={styles.modal}>
                            <p>저장 완료 후 옥내·외 소화전설비로 이동하시겠습니까?</p>
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

export default EvaluateWaterResult;
