import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import './listproduct.scss';
import { getListCate, getAllProduct, updateSellProduct } from '../../services/productService';
import { DataGrid } from '@mui/x-data-grid';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';


const ListProduct = () => {

    const [listCategory, setListCategory] = useState([])

    const getListCategory = async () => {
        const data = await getListCate()
        setListCategory(data.data)
    }

    useEffect(() => {
        getListCategory()
    }, [])

    const [products, setProducts] = useState([])
    const fetchProduct = async () => {
        const data = await getAllProduct()
        setProducts(data.product)
    }
    useEffect(() => {
        fetchProduct()
    }, [])

    const handleSellProduct = async (data) => {
        const res = await updateSellProduct(data)
        if(res.success){
            alert("Thành công")
        }
        fetchProduct()
    }

    return (
        <div className="home">
            <Sidebar />
            <div className="homeContainer">
                <Navbar />

                <div className="list-product">
                    {
                        listCategory.map((category) => {
                            return (
                                <div className="type-product">
                                    <div className='title-category'>
                                        <span>{category.nameCategory}</span>
                                        <hr />
                                    </div>

                                    <DataGrid
                                        className='datagrid'
                                        rows={
                                            products
                                                .filter(product => category._id === product.category._id)
                                                .map((product, index) => ({
                                                    id: index,
                                                    namePro: {
                                                        image: product.image[0],
                                                        name: product.name
                                                    },
                                                    price: product.price,
                                                    discount: product.discount,
                                                    instock: product.instock,
                                                    sold: product.sold,
                                                    _sell: {
                                                        sell: product.sell,
                                                        productId: product._id
                                                    },
                                                    idPro: product._id
                                                }))
                                        }
                                        columns={
                                            [
                                                {
                                                    field: 'namePro',
                                                    headerName: 'Tên sản phẩm',
                                                    width: 500,
                                                    headerClassName: 'headerStyle', // Lớp CSS cho tiêu đề cột
                                                    cellClassName: 'cellStyle', // Lớp CSS cho nội dung của cột
                                                    renderCell: (param) => (
                                                        <div style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                                            <img style={{ width: '40px', height: '40px' }} src={param.value.image} alt="" />
                                                            <span>{param.value.name}</span>
                                                        </div>
                                                    )
                                                },
                                                {
                                                    field: 'price',
                                                    headerName: 'Giá tiền',
                                                    width: 200,
                                                    renderCell: (params) => (
                                                        <span>{params.value.toFixed(3)}.000₫</span>
                                                    )
                                                },
                                                { field: 'discount', headerName: 'Giảm giá (%)', width: 200 },
                                                { field: 'instock', headerName: 'Trong kho', width: 120 },
                                                {
                                                    field: 'sold', headerName: 'Đã bán', width: 120
                                                },
                                                { field: '_sell', headerName: 'Flash Sell', width: 180,
                                                    renderCell: (params) => (
                                                        <div>
                                                            {
                                                                params.value.sell
                                                                ? <div onClick={() => {handleSellProduct({productId: params.value.productId, sell: !params.value.sell})}}><CheckCircleOutlineOutlinedIcon style={{color:'green', cursor:'pointer'}}/></div>
                                                                : <div onClick={() => {handleSellProduct({productId: params.value.productId, sell: !params.value.sell})}}><CancelOutlinedIcon style={{color:'orange', cursor:'pointer'}}/></div>
                                                            }  
                                                        </div>
                                                    )
                                                },
                                                {
                                                    field: 'idPro', headerName: 'Quản lý', width: 150,
                                                    renderCell: (params) => (
                                                        <div style={{display:'flex', gap:'15px'}}>
                                                            <div style={{padding:'5px', background:'burlywood', borderRadius:'5px'}} className="edit"><Link style={{textDecoration:'none'}} to={`/products/edit/${params.value}`}>Sửa</Link></div>
                                                            <div style={{padding:'5px', background:'crimson', color:'white', borderRadius:'5px'}} className="delete">Xóa</div>
                                                        </div>
                                                    )
                                                },
                                            ]
                                        }
                                        initialState={{
                                            pagination: {
                                                paginationModel: { page: 0, pageSize: 5 },
                                            },
                                        }}
                                        pageSizeOptions={[5, 10, 20]}
                                        rowHeight={80}
                                    />

                                </div>
                            )
                        })
                    }
                </div>

            </div>
        </div>
    );
}

export default ListProduct;