import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import './listuser.scss'
import React, { useEffect, useState } from 'react';
import { getAllUsers, blockUser } from '../../services/authService';
import { DataGrid } from '@mui/x-data-grid'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';

const ListUser = () => {

    const [users, setUsers] = useState([])

    const fetchApiUsers = async () => {
        const res = await getAllUsers();
        setUsers(res)
    }
    useEffect(() => {
        fetchApiUsers()
    }, [])

    const handleBlockUser = async (data) => {
        const res = await blockUser(data)
        if (res.success) {
            alert("Thành công")
        }
        fetchApiUsers()
    }

    const columns = [
        { field: 'name', headerName: 'Tên', width: 150 },
        { field: 'phone', headerName: 'Số điện thoại', width: 150 },
        { field: 'email', headerName: 'Email', width: 250 },
        {
            field: 'action',
            headerName: "Quản lý",
            width: 150,
            renderCell: (params) => (
                <div>
                    {
                        params.value.block
                            ? <div onClick={() => { handleBlockUser({ userId: params.value.userId, block: !params.value.block }) }}>
                                <LockOutlinedIcon className='icon1' style={{color:'orange', cursor:'pointer'}} />
                            </div>
                            : <div onClick={() => { handleBlockUser({ userId: params.value.userId, block: !params.value.block }) }}>
                                <LockOpenOutlinedIcon className='icon2' style={{color:'green', cursor:'pointer'}} />
                            </div>
                    }
                </div>
            )
        }
    ];

    const rows = users.map((user, index) => (
        {
            id: index,
            name: user.name,
            phone: user.mobile,
            email: user.email,
            action: {
                userId: user._id,
                block: user.block
            }
        }
    ));

    return (
        <div className="home">
            <Sidebar />
            <div className="homeContainer">
                <Navbar />

                <div className='user-table'>
                    <DataGrid
                        className='datagrid'
                        rows={rows}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 10 },
                            },
                        }}
                        pageSizeOptions={[5, 10]}
                    // checkboxSelection
                    />
                </div>

            </div>
        </div>
    );
}

export default ListUser;