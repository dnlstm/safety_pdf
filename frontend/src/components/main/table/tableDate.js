import dayjs from 'dayjs';

export const columns = [
    // {
    //     header: '평가정보',
    //     accessorKey: 'EvaluaterUpdate',
    //     size: 80
    //     // minSize: 50, // 최소 크기
    //     // maxSize: 100

    //     // 최대 크기
    //     // cell: (info) => console.log(info.column.id)
    // },
    {header: '번호', accessorKey: 'number', size: 40},
    {
        header: '건물명',
        accessorKey: 'buildingName',
        size: 200

        // minSize: 50 // 최소 크기
        // maxSize: 100, // 최대 크기
    },
    {header: '건물구조', accessorKey: 'buildingStructure', size: 80},
    {
        header: '주소',
        accessorKey: 'buildingAddress',
        size: 600

        // minSize: 50 // 최소 크기
    },
    {
        header: '전경 사진',
        accessorKey: 'picture',
        cell: ({row}) => {
            return (
                <div>
                    <img src={`http://localhost:5000${row.original.picture}`} alt="" style={{height: '38px'}} />
                </div>
            );
        },
        size: 100
    },
    {
        header: '등록일',
        accessorKey: 'createdAt',
        cell: ({row}) => {
            return dayjs(row.original.createdAt).format('YYYY/MM/DD');
        },
        size: 100
    },
    {
        header: '수정일',
        accessorKey: 'updatedAt',
        cell: ({row}) => {
            return dayjs(row.original.updatedAt).format('YYYY/MM/DD');
        },
        size: 100
    },
    {
        header: '상태',
        accessorKey: 'state',
        size: 50,
        cell: ({row}) => {
            return <div>{row.original.hasWaterAll ? '완료' : '진행 중'}</div>;
        }
    },
    {
        header: '삭제',
        accessorKey: 'delete',
        size: 40
        // cell: (info) => console.log(info.column.id)
    },
    {
        header: '보고서',
        accessorKey: 'EvaluateResult',
        size: 60
        // cell: (info) => console.log(info.column.id)
    }
];

// export const fetchlist = () => axios.get('/auth/list').then(({data}) => data);

// const {data, isPending, isError, error} = useQuery({
//     queryKey: ['list'],
//     queryFn: fetchlist
// });

// if (isPending) {
//     // return <FadeLoader />;
// }

// if (isError) {
//     return <div> 에러: {error.info?.message || 'Failed to fetch'} </div>;
// }
