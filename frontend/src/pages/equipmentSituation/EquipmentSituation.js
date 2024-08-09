import styles from './EquipmentSituation.module.scss';
import {useForm} from 'react-hook-form';
import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import Label from './common/Label';
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import {MoonLoader} from 'react-spinners';
import {useEffect} from 'react';
import ReactModal2 from 'components/react-modal/ReactModal2';

const EquipmentSituation = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const queryClient = useQueryClient();

    const {
        register,
        handleSubmit,
        setValue,
        reset

        // formState: {errors}
    } = useForm();

    const fetchEquipmentData = async () => {
        const {data} = await axios.get(`/post/equipmentSituation/${id}`);
        return data;
    };

    const {data, isPending} = useQuery({
        queryKey: ['equipmentData'],
        queryFn: fetchEquipmentData,
        retry: false,
        refetchOnWindowFocus: false
    });

    const mutation = useMutation({
        mutationFn: (newData) => axios.post(`/post/equipmentSituation/${id}`, newData),
        onSuccess: () => {
            queryClient.invalidateQueries(['equipmentData']);
            navigate(`/${id}/evaluate/water/result/`, {replace: true});
        }
    });

    useEffect(() => {
        if (data && data[0]) {
            Object.keys(data[0]).forEach((key) => {
                if (key !== '_id' && key !== 'evaluateId' && key !== '__v') {
                    setValue(`note${key}`, data[0][key].note);
                }
            });
        }
        return () => {
            reset(); // 컴포넌트 언마운트 시 폼을 초기화
        };
    }, [data, setValue, reset]);

    const onSubmit = async (data) => {
        mutation.mutate(data);
    };

    if (isPending) {
        return <ReactModal2 cname="text" title={<MoonLoader color="white" />} />;
    }

    const itemLabels = ['소화기구', '옥내소화전설비', '간이스프링클러설비', '옥외소화전설비', '스프링클러설비', '포소화설비', '이산화탄소소화설비', '할론소화설비', '할로겐화합물/불활성기체', '고체에어로졸', '물분무 · 미분무소화설비', '분말 · 소화설비', '수동식소화기구', '자동식소화기구', '자동소화장치', '간이소화장치', '호스', '호스릴', '습식', '건식', '준비작동식', '일제살수식', '포소화전', '포헤드', '포워터 스프링클러', '고정포방출설비'];

    const itemLabels2 = [
        '비상방송설비',
        '비상경보설비',
        '단독경보형감지기',
        '누전경보기',
        '자동화재탐지설비',
        '시각경보기',
        '자동화재속보설비',
        '가스누설경보기',
        '피난기구',
        '공기안전매트',
        '인명구조기구',
        '완강기 등 기타',
        '유도등 및 유도표지',
        '피난구유도등',
        '거실통로유도등',
        '통로유도등(복도 / 계단)',
        '객석유도등',
        '축광/발광유도선',
        '유도표지',
        '비상조명등 설비',
        '휴대용비상조명등',
        '비상조명등',
        '소화소주',
        '상수도소화설비',
        '재연설비',
        '연결송수관설비',
        '거실',
        '부속실',
        '습식',
        '건식',
        '연결살수설비',
        '비상콘센트설비',
        '무선통신보조설비',
        '연소방지설비'
    ];

    const cLabels = ['공동구', '비상전원 비상벌전기', '발전기 종류', '배터리', '배연창', '비상용 승강기', '피난용 승강기', '계단', '피난', '특별피난', '방화구획', '층별', '면적별', '용도별', '벽 및 바닥 광통부 마감', '커튼월 마감', '방화셔터', '일체형', '일반형', '방화문', '창호', '소방관진입창', '완강기 창호', '내장재', '불연', '준불연', '난연', '옥상광장', '방염'];

    return (
        <div className={styles.EquipmentSituation}>
            <h2>소화설비 현황</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.EquipmentSituation_slider_grid}>
                    <div className={styles.a1}>
                        <h3>항목</h3>
                    </div>
                    <div className={styles.a2}>
                        <h3>소화설비</h3>
                    </div>
                    <div className={styles.a3}>
                        <h3> 물분무 소화설비등</h3>
                    </div>
                    <div className={styles.a4}>
                        <h3>소화설비명</h3>
                    </div>

                    {itemLabels.map((label, index) => (
                        <div key={index} className={styles[`a${index + 5}`]}>
                            {label}
                        </div>
                    ))}

                    <div className={styles.a31}>
                        <h3>해당여부</h3>
                    </div>

                    {Array.from({length: 22}, (_, index) => {
                        return (
                            <div className={styles[`a${index + 32}`]} key={`applicable${index + 1}`}>
                                <Label checkedValue={data && data[0] && data[0][index + 1] && data[0][index + 1].applicable} value1="해당" value2="해당 없음" register={register(`applicable${index + 1}`)} />
                            </div>
                        );
                    })}

                    <div className={styles.a54}>
                        <h3>
                            특기사항
                            <br />
                            (면제 및 대체설비 설치여부 등)
                        </h3>
                    </div>

                    {Array.from({length: 22}, (_, index) => {
                        return (
                            <div className={styles[`a${index + 55}`]} key={`specialSkill${index + 1}`}>
                                <Label checkedValue={data && data[0] && data[0][index + 1] && data[0][index + 1].specialSkill} value1="해당" value2="해당 없음" register={register(`specialSkill${index + 1}`)} />
                            </div>
                        );
                    })}

                    <div className={styles.a77}>
                        <h3>비고</h3>
                    </div>

                    {Array.from({length: 22}, (_, index) => (
                        <input key={`note${index + 1}`} {...register(`note${index + 1}`)} className={`${styles[`a${index + 78}`]} ${styles.inputCenter}`} />
                    ))}
                </div>
                <div className={styles.EquipmentSituation_slider_grid2}>
                    <div className={styles.b1}>
                        <h3>항목</h3>
                    </div>
                    <div className={styles.b2}>
                        <h3>경보설비</h3>
                    </div>
                    <div className={styles.b3}>
                        <h3>피난설비</h3>
                    </div>
                    <div className={styles.b4}>
                        <h3>소화활동설비</h3>
                    </div>
                    <div className={styles.b5}>
                        <h3>소화설비명</h3>
                    </div>
                    {itemLabels2.map((label, index) => (
                        <div key={index} className={styles[`b${index + 6}`]}>
                            {label}
                        </div>
                    ))}
                    <div className={styles.b40}>
                        <h3>해당여부</h3>
                    </div>
                    {Array.from({length: 29}, (_, index) => (
                        <div className={styles[`b${index + 41}`]} key={`applicable${index + 23}`}>
                            <Label checkedValue={data && data[0] && data[0][index + 1] && data[0][index + 23].applicable} value1="해당" value2="해당 없음" register={register(`applicable${index + 23}`)} />
                        </div>
                    ))}
                    <div className={styles.b70}>
                        <h3>
                            {' '}
                            특기사항
                            <br />
                            (면제 및 대체설비 설치여부 등)
                        </h3>
                    </div>
                    {Array.from({length: 29}, (_, index) => (
                        <div className={styles[`b${index + 71}`]} key={`specialSkill${index + 23}`}>
                            <Label checkedValue={data && data[0] && data[0][index + 1] && data[0][index + 23].specialSkill} value1="해당" value2="해당 없음" register={register(`specialSkill${index + 23}`)} />
                        </div>
                    ))}
                    <div className={styles.b100}>
                        <h3>비고</h3>
                    </div>
                    {Array.from({length: 29}, (_, index) => (
                        <input key={`note${index + 23}`} {...register(`note${index + 23}`)} className={`${styles[`b${index + 101}`]} ${styles.inputCenter}`} />
                    ))}
                </div>
                <div className={styles.EquipmentSituation_slider_grid3}>
                    <div className={styles.c1}>
                        <h3>항목</h3>
                    </div>
                    <div className={styles.c2}>
                        <h3>건축방재</h3>
                    </div>
                    <div className={styles.c3}>
                        <h3>소화설비명</h3>
                    </div>
                    {cLabels.map((label, index) => (
                        <div className={styles[`c${index + 4}`]} key={`cLabel${index + 4}`}>
                            {label}
                        </div>
                    ))}
                    <div className={styles.c33}>
                        <h3>해당여부</h3>
                    </div>
                    {Array.from({length: 23}, (_, index) => (
                        <div className={styles[`c${index + 34}`]} key={`applicable${index + 52}`}>
                            <Label checkedValue={data && data[0] && data[0][index + 1] && data[0][index + 52].applicable} value1="해당" value2="해당 없음" register={register(`applicable${index + 52}`)} />
                        </div>
                    ))}

                    <div className={styles.c57}>
                        <h3>
                            {' '}
                            특기사항
                            <br />
                            (면제 및 대체설비 설치여부 등)
                        </h3>
                    </div>
                    {Array.from({length: 23}, (_, index) => (
                        <div className={styles[`c${index + 58}`]} key={`specialSkill${index + 52}`}>
                            <Label checkedValue={data && data[0] && data[0][index + 1] && data[0][index + 52].specialSkill} value1="해당" value2="해당 없음" register={register(`specialSkill${index + 52}`)} />
                        </div>
                    ))}
                    <div className={styles.c81}>
                        <h3>비고</h3>
                    </div>
                    {Array.from({length: 23}, (_, index) => (
                        <input key={`note${index + 52}`} {...register(`note${index + 52}`)} className={`${styles[`c${index + 82}`]} ${styles.inputCenter}`} />
                    ))}
                </div>
                <button>저장 후 다음</button>
            </form>
        </div>
    );
};

export default EquipmentSituation;
