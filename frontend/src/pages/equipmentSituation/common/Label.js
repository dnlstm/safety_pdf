import styles from './Label.module.scss';

const Label = ({value1, value2, register, checkedValue}) => {
    return (
        <>
            <label className={styles.label}>
                <input type="radio" {...register} value={true} defaultChecked />
                {value1}
            </label>
            <label className={styles.label}>
                <input type="radio" {...register} value={false} defaultChecked={checkedValue === false} />
                {value2}
            </label>
        </>
    );
};

export default Label;
