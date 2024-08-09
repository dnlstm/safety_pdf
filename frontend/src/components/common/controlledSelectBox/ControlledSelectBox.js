import React from 'react';
import {useController} from 'react-hook-form';
import SelectBox from '../selectBox/SelectBox';

const ControlledSelectBox = ({name, control, version}) => {
    const {field} = useController({name, control});
    return <SelectBox situation={field} version={version} />;
};

export default ControlledSelectBox;
