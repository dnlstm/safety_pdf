import React, {useState} from 'react';
import styles from './Toggle.module.scss';

const Toggle = () => {
    const [isChecked, setIsChecked] = useState(false);

    const toggleHandler = () => {
        setIsChecked(!isChecked);
    };

    return (
        <div className={styles.Toggle}>
            <input type="checkbox" id="toggle" checked={isChecked} onChange={toggleHandler} />
            <label htmlFor="toggle" className={styles.toggleButton} />
        </div>
    );
};

export default Toggle;
