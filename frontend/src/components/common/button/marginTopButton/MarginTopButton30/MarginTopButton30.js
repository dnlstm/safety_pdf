import React from 'react';
import styles from './MarginTopButton30.module.scss';

const MarginTopButton30 = ({placeholder, register, name}) => {
    return <input className={styles.MarginTopButton30} placeholder={placeholder} {...register(name)} autoComplete="off"></input>;
};

export default MarginTopButton30;
