import {Navigate, useParams} from 'react-router-dom';

export const Navigateresult2 = () => {
    const {id} = useParams();

    return <Navigate to={`/${id}/evaluate/water/result2/0`} replace />;
};
