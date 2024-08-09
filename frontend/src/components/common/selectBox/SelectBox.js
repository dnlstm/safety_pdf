import styles from './SelctBox.module.scss';
import Select from 'react-select';

const options1 = [
    {value: '40*15', label: '40*15'},
    {value: '65*15', label: '65*15'},
    {value: '80*15', label: '80*15'},
    {value: '기타', label: '기타'}
];

const options2 = [
    {value: '옥내 전용', label: '옥내 전용'},
    {value: '옥외 전용', label: '옥외 전용'},
    {value: 'SP 전용', label: 'SP 전용'},
    {value: '옥내/SP 전용', label: '옥내/SP 전용'}
];

const SelectBox = ({version, situation}) => {
    const handleSelectsituationChange = (option) => {
        // console.log('option', option);
        situation.field.onChange(option?.value);
    };

    const selectedOptions = version === '1' ? options1 : options2;

    return (
        <div className={styles.selectBox}>
            <Select isSearchable={false} options={selectedOptions} onChange={handleSelectsituationChange} value={selectedOptions.find(({value}) => value === situation.field.value)} />
        </div>
    );
};

export default SelectBox;
