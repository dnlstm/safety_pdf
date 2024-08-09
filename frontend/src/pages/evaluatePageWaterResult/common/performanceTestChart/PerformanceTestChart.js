import React from 'react';
import styles from './PerformanceTestChart.module.scss';
import {CartesianGrid, Line, LineChart, XAxis, YAxis, Tooltip, ResponsiveContainer} from 'recharts';

function PerformanceTestChart({title, data0, data100, data150}) {
    const data = [{name: '0', red: data0}, {name: '100%', red: data100}, {name: '150%', red: data150}, {}, {}];

    return (
        <div className={styles.PerformanceTestChartChart}>
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
                        domain={[0, 2]}
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
            <div className={styles.PerformanceTestChartChartbox}>{title}</div>
        </div>
    );
}
export default PerformanceTestChart;
