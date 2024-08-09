import React from 'react';
import styles from './MarginTopButton20.module.scss';
import {PiWarningCircleFill} from 'react-icons/pi';

const MarginTopButton20 = ({placeholder, register, name, errors}) => {
    return (
        <div className={styles.MarginTopButton}>
            {name !== 'password' && name !== 'pwCheck' ? <input className={styles.MarginTopButton20} placeholder={placeholder} {...register(name)} autoComplete="off" /> : <input type="password" className={styles.MarginTopButton20} placeholder={placeholder} {...register(name)} autoComplete="off" />}
            {errors && (
                <p className={styles.errors}>
                    <span className={styles.errors_text}>{errors}</span>
                    <PiWarningCircleFill size={25} />
                </p>
            )}
        </div>
    );
};
export default MarginTopButton20;
