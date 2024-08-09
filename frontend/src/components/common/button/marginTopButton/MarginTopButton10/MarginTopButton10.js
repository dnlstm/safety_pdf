import React from 'react';
import styles from './MarginTopButton10.module.scss';

const MarginTopButton10 = ({placeholder, register, name}) => {
    return <input className={styles.MarginTopButton10} placeholder={placeholder} {...register(name)} autoComplete="off"></input>;
};
export default MarginTopButton10;
