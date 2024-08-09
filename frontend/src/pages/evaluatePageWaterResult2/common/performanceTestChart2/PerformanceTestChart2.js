import React from 'react';
import styles from './PerformanceTestChart2.module.scss';
import {CartesianGrid, Line, Bar, ComposedChart, LineChart, XAxis, YAxis, Tooltip, ResponsiveContainer} from 'recharts';

const data = [{name: '0', red: 1.35}, {name: '100%', red: 1.21}, {name: '150%', red: 0.85}, {}, {}];

function PerformanceTestChart2({type}) {
    return (
        <div className={styles.PerformanceTestChart2In2}>
            <div className={styles.PerformanceTestChart2Table}>
                <div className={styles.PerformanceTestChart2Chart}>
                    <ResponsiveContainer width="98%" height="100%">
                        <LineChart data={data} width={500} height={300}>
                            <XAxis
                                dataKey="name"
                                label={{
                                    value: '유량(l/min)',

                                    position: 'insideBottomRight'
                                }}
                            />
                            <YAxis
                                domain={[0, 'dataMax + 1.65']}
                                label={{
                                    value: '양정(Mps)',
                                    angle: -90,
                                    position: 'insideLeft'
                                }}
                            />
                            <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
                            <Tooltip />
                            <Line type="monotone" dataKey="red" stroke="red" />
                        </LineChart>
                    </ResponsiveContainer>
                    <div className={styles.PerformanceTestChart2Chartbox}>{type}지구 주펌프1 성능시험 곡선</div>
                </div>
                <div className={styles.PerformanceTestChart2Chart2}>
                    <ResponsiveContainer width="98%" height="100%">
                        <ComposedChart data={data} width={500} height={300}>
                            <XAxis
                                dataKey="name"
                                label={{
                                    value: '유량(l/min)',

                                    position: 'insideBottomRight'
                                }}
                            />
                            <YAxis
                                domain={[0, 'dataMax + 1.65']}
                                label={{
                                    value: '양정(Mps)',
                                    angle: -90,
                                    position: 'insideLeft'
                                }}
                            />
                            <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
                            <Tooltip />
                            <Bar dataKey="red" barSize={20} fill="#413ea0" />
                            <Line type="monotone" dataKey="red" stroke="red" />
                        </ComposedChart>
                    </ResponsiveContainer>
                    <div className={styles.PerformanceTestChart2Chartbox2}>{type}지구 주펌프2 성능시험 곡선</div>
                </div>
            </div>
        </div>
    );
}
export default PerformanceTestChart2;
