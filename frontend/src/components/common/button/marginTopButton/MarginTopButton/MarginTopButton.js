import React from 'react';
import styles from './MarginTopButton.module.scss';

const MarginTopButto = ({placeholder, register, name}) => {
    return <input className={name === 'id' ? styles.MarginTopButton__20 : styles.MarginTopButton__30} placeholder={placeholder} {...register(name)} autoComplete="off"></input>;
};
export default MarginTopButto;
