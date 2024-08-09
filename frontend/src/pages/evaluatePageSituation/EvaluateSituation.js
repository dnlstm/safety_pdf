import React, {useEffect} from 'react';
import {useForm, useWatch} from 'react-hook-form';
import styles from './EvaluateSituation.module.scss';
import axios from 'axios';
import {useQuery} from '@tanstack/react-query';
import ReactModal2 from 'components/react-modal/ReactModal2';
import {MoonLoader} from 'react-spinners';
import {Navigate, useNavigate, useParams} from 'react-router-dom';

const EvaluateSituation = () => {
    const navigate = useNavigate();

    const {id} = useParams();

    const fetchevaluateSituation = () => axios.get(`/post/evaluateSituation/${id}`).then(({data}) => data);

    const {data, error, isPending} = useQuery({
        queryKey: ['evaluateSituation'],
        queryFn: fetchevaluateSituation,
        retry: false,
        refetchOnWindowFocus: false
    });

    const {
        register,
        handleSubmit,
        setValue,
        control

        // formState: {errors}
    } = useForm({
        defaultValues: {
            buildingName: data?.[0].buildingName,
            buildingAddress: data?.[0].buildingAddress,
            buildingStructure: data?.[0].buildingStructure,
            floorArea: data?.[0].floorArea,
            buildingArea: data?.[0].buildingArea,
            groundFloor: data?.[0].groundFloor,
            baseFloor: data?.[0].baseFloor,
            mainUse: data?.[0].mainUse,
            cirCularspeedUse: data?.[0].cirCularspeedUse,
            picture: data?.[0].picture
        }
    });

    useEffect(() => {
        if (data && data.length > 0) {
            setValue('buildingName', data[0].buildingName === 'undefined' ? '' : data[0].buildingName);
            setValue('buildingAddress', data[0].buildingAddress === 'undefined' ? '' : data[0].buildingAddress);
            setValue('buildingStructure', data[0].buildingStructure === 'undefined' ? '' : data[0].buildingStructure);
            setValue('floorArea', data[0].floorArea === 'undefined' ? '' : data[0].floorArea);
            setValue('buildingArea', data[0].buildingArea === 'undefined' ? '' : data[0].floorArea);
            setValue('groundFloor', data[0].groundFloor === 'undefined' ? '' : data[0].groundFloor);
            setValue('baseFloor', data[0].baseFloor === 'undefined' ? '' : data[0].baseFloor);
            setValue('mainUse', data[0].mainUse === 'undefined' ? '' : data[0].mainUse);
            setValue('cirCularspeedUse', data[0].cirCularspeedUse === 'undefined' ? '' : data[0].cirCularspeedUse);
            setValue('picture', data[0].picture === 'undefined' ? '' : data[0].picture);
        }
    }, [data, setValue]);

    const file = useWatch({name: 'file', control});
    const img = useWatch({name: 'picture', control});

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setValue('picture', file);
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setValue('file', imageUrl);
        }
    };

    const handleClearImage = () => {
        setValue('picture', null);
        setValue('file', null);
    };

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append('buildingName', data.buildingName);
        formData.append('buildingAddress', data.buildingAddress);

        // formData.append('Picture', data.Picture[0].picture1[0]);
        // formData.append('Picture', data.Picture[0].picture2[0]);
        // data.Picture.forEach((Picture) => {
        //     formData.append('Picture', Picture.picture1?.[0]);
        //     formData.append('Picture', Picture.picture2?.[0]);
        // });
        formData.append('buildingStructure', data.buildingStructure);
        formData.append('floorArea', data.floorArea);
        formData.append('buildingArea', data.buildingArea);

        formData.append('groundFloor', data.groundFloor);
        formData.append('baseFloor', data.baseFloor);
        formData.append('mainUse', data.mainUse);
        formData.append('cirCularspeedUse', data.cirCularspeedUse);
        formData.append('picture', data.picture);

        await axios.put(`/post/evaluateSituation/${id}`, formData);
        navigate(`/${id}/equipmentSituation`, {replace: true});
    };

    if (isPending) {
        return <ReactModal2 cname="text" title={<MoonLoader color="white" />} />;
    }

    if (error) {
        return <Navigate to={'/list'} replace />;
    }

    return (
        <div className={styles.EvaluateSituation}>
            <h2>건축물 현황</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.EvaluateSituation__info1}>
                    <div className={styles.EvaluateSituation__info1__1}>사업장명</div>
                    <input className={styles.EvaluateSituation__info1__2} {...register('buildingName')} />
                </div>
                <div className={styles.EvaluateSituation__info1}>
                    <div className={styles.EvaluateSituation__info1__1}>건축물소재지</div>
                    <input {...register('buildingAddress')} className={styles.EvaluateSituation__info1__2} />
                </div>
                <div className={styles.EvaluateSituation__info1}>
                    <div className={styles.EvaluateSituation__info1__1}>건물구조</div>
                    <input {...register('buildingStructure')} className={styles.EvaluateSituation__info1__2} />
                </div>
                <div className={styles.EvaluateSituation__info1}>
                    <div className={styles.EvaluateSituation__info1__1}>연면적</div>
                    <input {...register('floorArea')} className={styles.EvaluateSituation__info1__2} />
                </div>
                <div className={styles.EvaluateSituation__info1}>
                    <div className={styles.EvaluateSituation__info1__1}>건축면적</div>
                    <input {...register('buildingArea')} className={styles.EvaluateSituation__info1__2} />
                </div>
                <div className={styles.EvaluateSituation__info1}>
                    <div className={styles.EvaluateSituation__info1__1}>지상층수</div>
                    <input {...register('groundFloor')} className={styles.EvaluateSituation__info1__2} />
                </div>
                <div className={styles.EvaluateSituation__info1}>
                    <div className={styles.EvaluateSituation__info1__1}>지하층수</div>
                    <input {...register('baseFloor')} className={styles.EvaluateSituation__info1__2} />
                </div>
                <div className={styles.EvaluateSituation__info1}>
                    <div className={styles.EvaluateSituation__info1__1}>주용도</div>
                    <input {...register('mainUse')} className={styles.EvaluateSituation__info1__2} />
                </div>
                <div className={styles.EvaluateSituation__info1}>
                    <div className={styles.EvaluateSituation__info1__1}>주속용도</div>
                    <input {...register('cirCularspeedUse')} className={styles.EvaluateSituation__info1__2} />
                </div>
                {/* 나머지 입력 항목들도 비슷하게 처리 */}
                <h2 className={styles.h2}>
                    사업장 전경 사진
                    <p onClick={handleClearImage}>✖︎</p>
                </h2>
                <label className={styles.EvaluateSituation_picture2}>
                    <h3>사진 선택</h3>
                    <input type="file" className={styles.EvaluateSituation_picture} onChange={handleFileChange} />
                    {img && <img src={`http://localhost:5000${img}`} alt="Preview" />}
                    {file && <img src={file} alt="Preview" />}
                </label>
                <button className={styles.button} type="submit">
                    저장 후 다음
                </button>
            </form>
        </div>
    );
};

export default EvaluateSituation;
