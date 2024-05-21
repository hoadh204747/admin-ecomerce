import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../../components/Sidebar/Sidebar';
import Navbar from '../../components/Navbar/Navbar';
import './brand.scss';

import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';

const Brand = () => {

    const httpRequest = axios.create({
        baseURL: process.env.REACT_APP_API_URL
    })

    const [listCategory, setListCategory] = useState([])
    const [nameCategory, setNameCategory] = useState('')

    const getListCategory = async () => {
        await httpRequest.get('/category/list')
            .then(response => {
                setListCategory(response.data.data)
            })
    }

    const handleSubmit = async () => {
        await httpRequest.post('/category/create', { nameCategory })
            .then(() => { setNameCategory('') })
        await getListCategory()
    }

    const deleteCategory = async (id) => {
        await httpRequest.delete(`/category/${id}`)
        await getListCategory()
    }

    useEffect(() => {
        getListCategory()
    }, [listCategory])

    return (

        <div className="home">
            <Sidebar />
            <div className="homeContainer">
                <Navbar />
                <div className="brand">

                    <div className="new-brand">
                        <div className='form-input'>
                            <p>New Category</p>
                            <input onChange={(e) => { setNameCategory(e.target.value) }} value={nameCategory} type="text" />
                        </div>
                        <button onClick={handleSubmit}>Add</button>
                    </div>
                    <div className="list-brand">
                        <div className="title">
                            <ListOutlinedIcon />
                            <span>CATEGORIES</span>
                        </div>
                        {
                            listCategory.map((category, index) => {
                                return (
                                    <div>
                                        <div className="category">
                                            <li>{category.nameCategory}</li>
                                            <DeleteForeverOutlinedIcon onClick={() => { deleteCategory(category._id) }} className='icon' />
                                        </div>
                                        <hr />
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Brand;