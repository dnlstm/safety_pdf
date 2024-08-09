import {Navigate, useParams} from 'react-router-dom';

export const NavigateTo = () => {
    const {id} = useParams();

    return <Navigate to={`/${id}/evaluate/water/result/0`} replace />;
};
