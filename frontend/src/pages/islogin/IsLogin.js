import {Navigate, Outlet} from 'react-router-dom';

import ReactModal2 from 'components/react-modal/ReactModal2';
import {MoonLoader} from 'react-spinners';
import {useQuery} from '@tanstack/react-query';
import axios from 'axios';

const IsLogin = () => {
    const fetchlogin = () => axios.get(`/auth/islogin`).then(({data}) => data);

    const {data, isPending, error} = useQuery({
        queryKey: ['islogin'],
        queryFn: fetchlogin,
        retry: false,
        refetchOnWindowFocus: false
    });

    if (isPending) {
        return <ReactModal2 cname="text" title={<MoonLoader color="white" />} />;
    }
    if (error) {
        return <Outlet />;
    }

    return data ? <Navigate to="/list" replace /> : <Outlet />;
};

export default IsLogin;
