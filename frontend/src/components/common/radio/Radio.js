import styles from './Radio.module.scss';

const Radio = ({name, value, label}) => {
    return (
        <label className={styles.radio}>
            <input type="radio" name={name} value={value} className={styles.radioInput} />
            <span>{label}</span>
        </label>
    );
};

export default Radio;
