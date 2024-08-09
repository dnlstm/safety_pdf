import {flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable} from '@tanstack/react-table';
import {columns} from './tableDate';
import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import './Table.scss';
import {FaTrash} from 'react-icons/fa';
import ReactModal3 from 'components/react-modal/ReactModal3';
import {IoDocumentText} from 'react-icons/io5';
import axios from 'axios';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {MoonLoader} from 'react-spinners';
import ReactModal2 from 'components/react-modal/ReactModal2';

const Table = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [sorting, setSorting] = useState([]);
    const [filtering, setFiltering] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [deleteId, setDeleteId] = useState('');

    const fetchdeleteEV = (id) => axios.post(`/auth/deleteEV`, {id});
    const deleteMutation = useMutation({
        mutationFn: fetchdeleteEV,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['list']});
        }
    });

    const deleteEV = (deleteId) => () => {
        deleteMutation.mutate(deleteId);
    };

    const handleClick = (cell) => (e) => {
        setIsOpen(true);
        setDeleteId(cell.row.original._id);
    };

    const fetchlist = () => axios.get(`/auth/list`).then(({data}) => data);

    const {data, isPending, error, isFetching} = useQuery({
        queryKey: ['list'],
        queryFn: fetchlist,
        retry: false,
        refetchOnWindowFocus: false
    });

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        columnResizeMode: 'onChange',
        state: {
            sorting,
            globalFilter: filtering
        },
        initialState: {
            pagination: {
                pageSize: 18
            }
        },
        onSortingChange: setSorting,
        onGlobalFilterChange: setFiltering
    });

    if (isPending) {
        return <ReactModal2 cname="text" title={<MoonLoader color="white" />} />;
    }
    if (isFetching) {
        return <ReactModal2 cname="text" title={<MoonLoader color="white" />} />;
    }

    if (error) {
        return <div className="react-lod"> 에러: {error.message || 'Failed to fetch'} </div>;
    }

    // 빈 행을 계산합니다.
    const emptyRowsCount = table.getState().pagination.pageSize - table.getRowModel().rows.length;
    const emptyRows = Array(emptyRowsCount).fill(null); // 빈 행의 개수를 채워 넣습니다.

    return (
        <div className="qq">
            <div className="tt">
                <button onClick={() => window.location.reload()}>새로고침</button>
                <button>조건검색</button>
            </div>
            <div className="table_contain">
                <table width={table.getTotalSize()}>
                    <thead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th className={header.id} key={header.id} width={header.getSize()} onClick={header.column.getToggleSortingHandler()} onMouseDown={header.getResizeHandler()} onTouchStart={header.getResizeHandler()}>
                                        {header.isPlaceholder ? null : (
                                            <div>
                                                {flexRender(header.column.columnDef.header, header.getContext())}
                                                {{asc: ' ⭡', desc: ' ⭣'}[header.column.getIsSorted() ?? null]}
                                                <div className={`resizer ${header.column.getIsResizing() ? 'isResizing' : ''}`} onMouseDown={header.getResizeHandler()} onTouchStart={header.getResizeHandler()} />
                                            </div>
                                        )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map((row, idx) => (
                            <tr key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <td
                                        onClick={() => {
                                            cell.column.id !== 'EvaluateResult' && cell.column.id !== 'delete' && navigate(`/${cell.row.original._id}/buildingSituation`);
                                        }}
                                        className={`${cell.column.id}`}
                                        key={cell.id}
                                        width={cell.column.getSize()}
                                    >
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        {cell.column.id === 'EvaluateResult' && cell.row.original.hasWaterAll && (
                                            <div className="EvaluateContainer-btn1">
                                                <a href={`http://localhost:5000/uploads/${cell.row.original._id}-uploads/pdf/${cell.row.original._id}.pdf`} target="_blank" rel="noopener noreferrer">
                                                    <div className="EvaluateContainer-btn1-center">
                                                        <IoDocumentText size={20} />
                                                    </div>
                                                </a>
                                            </div>
                                        )}
                                        {cell.column.id === 'delete' && (
                                            <div onClick={handleClick(cell)} className="delete">
                                                <FaTrash size={15} />
                                            </div>
                                        )}
                                        {cell.column.id === 'number' && <span onClick={() => axios.get(`/post/create-pdf/${cell.row.original._id}`).then(({data}) => data)}>{idx + 1 + table.getState().pagination.pageIndex * 18}</span>}
                                    </td>
                                ))}
                            </tr>
                        ))}
                        {emptyRows.map(
                            (
                                _,
                                idx // 빈 행을 그립니다.
                            ) => (
                                <tr key={`empty-${idx}`}>
                                    {table.getVisibleFlatColumns().map((column) => (
                                        <td key={column.id} width={column.getSize()}>
                                            &nbsp;
                                        </td>
                                    ))}
                                </tr>
                            )
                        )}
                    </tbody>
                </table>
            </div>
            <div className="bb">
                <button onClick={() => table.previousPage()}>이전</button>
                <span>
                    {table.getState().pagination.pageIndex + 1}p of {table.getPageCount().toLocaleString()}p
                </span>
                <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                    다음
                </button>
            </div>
            {isOpen && <ReactModal3 deleteEV={deleteEV(deleteId)} isOpen={isOpen} setIsOpen={setIsOpen} tilte="삭제하시겠습니까?" />}
        </div>
    );
};

export default Table;
