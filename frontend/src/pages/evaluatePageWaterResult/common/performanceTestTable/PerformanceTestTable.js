import React from 'react';
import styles from './PerformanceTestTable.module.scss';

function PerformanceTestTable({majorminer, setData0, setData100, setData150, register, setValue, i}) {
    return (
        <div className={styles.PerformanceTestTableContainer}>
            <div className={styles.a}>구분</div>
            <div className={styles.b}>체절운전</div>
            <div className={styles.c}>정격운전</div>
            <div className={styles.d}>150%운전</div>
            <div className={styles.e}>특이사항</div>
            <div className={styles.f}>{majorminer}</div>
            <div className={styles.g}>기준값</div>
            <div className={styles.p}>성능시험</div>

            <div className={styles.h}>
                <input {...register(`z${i}`)} />
            </div>
            <div className={styles.i}>
                <input {...register(`z${i + 1}`)} />
            </div>
            <div className={styles.j}>
                <input {...register(`z${i + 2}`)} />
            </div>
            <div className={styles.k}>
                <input {...register(`z${i + 3}`)} />
            </div>
            <div className={styles.l}>
                <input {...register(`z${i + 4}`)} />
            </div>
            <div className={styles.m}>
                <input {...register(`z${i + 5}`)} />
            </div>
            <div className={styles.n}>
                <input {...register(`z${i + 6}`)} />
            </div>
            <div className={styles.o}>
                <input {...register(`z${i + 7}`)} />
            </div>
            <div className={styles.q}>
                <input {...register(`z${i + 8}`)} />
            </div>
            <div className={styles.r}>
                <input {...register(`z${i + 9}`)} />
            </div>
            <div className={styles.s}>
                <input {...register(`z${i + 10}`)} />
            </div>
            <div className={styles.t}>
                <input {...register(`z${i + 11}`)} />
            </div>
            <div className={styles.u}>
                <input {...register(`z${i + 12}`)} />
            </div>
            <div className={styles.v}>
                <input {...register(`z${i + 13}`)} />
            </div>
            <div className={styles.w}>
                <input {...register(`z${i + 14}`)} />
            </div>
            <div className={styles.x}>
                <input {...register(`z${i + 15}`)} />
            </div>
            <div className={styles.y}>
                <input
                    {...register(`z${i + 16}`)}
                    onChange={(e) => {
                        setData0(e.target.value);
                        setValue(`z${i + 16}`, e.target.value);
                    }}
                />
            </div>
            <div className={styles.z}>
                <input
                    {...register(`z${i + 17}`)}
                    onChange={(e) => {
                        setData100(e.target.value);
                        setValue(`z${i + 17}`, e.target.value);
                    }}
                />
            </div>
            <div className={styles.aa}>
                <input
                    {...register(`z${i + 18}`)}
                    onChange={(e) => {
                        setData150(e.target.value);
                        setValue(`z${i + 18}`, e.target.value);
                    }}
                />
            </div>
            <div className={styles.ab}>
                <input {...register(`z${i + 19}`)} />
            </div>
        </div>
    );
}

export default PerformanceTestTable;
