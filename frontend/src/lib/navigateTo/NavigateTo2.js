import {Navigate, useParams} from 'react-router-dom';

export const NavigateTo2 = () => {
    const {id} = useParams();

    return <Navigate to={`/${id}/evaluate/gas/result/0`} replace />;
};
