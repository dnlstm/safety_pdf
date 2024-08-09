import React from 'react';
import styles from './EvaluateModal.module.scss';
import Modal from 'react-modal';
import {ModalStyles} from './Modalstyles';
import {useForm, useWatch} from 'react-hook-form';
import axios from 'axios';
import {useMutation, useQueryClient} from '@tanstack/react-query';

Modal.setAppElement('#root');

const EvaluateModal = ({isOpen, isClose}) => {
    const queryClient = useQueryClient();

    const {
        register,
        handleSubmit,
        setValue,
        control,
        reset
        // formState: {errors}
    } = useForm();
    const file = useWatch({name: 'file', control});

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

    const fetchCreateEV = (formData) => axios.post(`/post/newevaluation`, formData);

    const createMutation = useMutation({
        mutationFn: fetchCreateEV,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['list']});
        }
    });

    const createEV = (formData) => {
        createMutation.mutate(formData);
    };

    const onSubmit = (data) => {
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

        createEV(formData);
        reset();
        isClose();
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={isClose} style={ModalStyles(750, 650, 'white')} contentLabel="Pop up Message">
            <div onClick={isClose} className={styles.EvaluateModal__isclose}>
                ✖︎
            </div>
            <div className={styles.EvaluateModal}>
                <h2>평가 추가</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.EvaluateModal__info1}>
                        <div className={styles.EvaluateModal__info1__1}>사업장명</div>
                        <input className={styles.EvaluateModal__info1__2} {...register('buildingName')} autoComplete="off"></input>
                    </div>
                    <div className={styles.EvaluateModal__info1}>
                        <div className={styles.EvaluateModal__info1__1}>건축물소재지</div>
                        <input className={styles.EvaluateModal__info1__2} {...register('buildingAddress')} autoComplete="off"></input>
                    </div>
                    <div className={styles.EvaluateModal__info1}>
                        <div className={styles.EvaluateModal__info1__1}>건물구조</div>
                        <input className={styles.EvaluateModal__info1__2} {...register('buildingStructure')} autoComplete="off"></input>
                    </div>
                    <h3 className={styles.h3}>
                        사업장 전경 사진
                        <p onClick={handleClearImage}>✖︎</p>
                    </h3>

                    <label className={styles.EvaluateModal_picture2}>
                        <h3>사진 선택</h3>
                        <input type="file" className={styles.EvaluateModal_picture} onChange={handleFileChange} />
                        {file && <img src={file} alt="Preview" />}
                    </label>

                    <button>저장</button>
                </form>
            </div>
        </Modal>
    );
};

export default EvaluateModal;
