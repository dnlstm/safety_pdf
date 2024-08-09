import React from 'react';
import styles from './PerformanceTestTable2.module.scss';

function PerformanceTestTable2({majorminer}) {
    return (
        <div className={styles.PerformanceTestTable2Container}>
            <div className={styles.a}>구분</div>
            <div className={styles.b}>체절운전</div>
            <div className={styles.c}>정격운전</div>
            <div className={styles.d}>150%운전</div>
            <div className={styles.e}>특이사항</div>
            <div className={styles.f}>{majorminer}</div>
            <div className={styles.g}>기준값</div>
            <div className={styles.h}>0</div>
            <div className={styles.i}>1200</div>
            <div className={styles.j}>1800</div>
            <div className={styles.k}>유량</div>
            <div className={styles.l}>1.4</div>
            <div className={styles.m}>1</div>
            <div className={styles.n}>0.65</div>
            <div className={styles.o}>압력</div>
            <div className={styles.p}>성능시험</div>
            <div className={styles.q}>0</div>
            <div className={styles.r}>1200</div>
            <div className={styles.s}>1800</div>
            <div className={styles.t}>
                <input />
            </div>
            <div className={styles.u}></div>
            <div className={styles.v}></div>
            <div className={styles.w}></div>
            <div className={styles.x}>22년 종합보고서</div>
            <div className={styles.y}>1.38</div>
            <div className={styles.z}>1.24</div>
            <div className={styles.aa}>0.92</div>
            <div className={styles.ab}>성능시험결과</div>
        </div>
    );
}
export default PerformanceTestTable2;
