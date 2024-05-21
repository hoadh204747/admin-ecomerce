import './addproduct.scss';
import React, { useEffect, useState } from 'react';
import { getListCate, createProduct, uploadImg } from '../../services/productService';
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import * as message from '../../components/Message/message'

const AddProduct = () => {

    const [selectedImage, setSelectedImage] = useState(null);
    const [listCategory, setListCategory] = useState([])

    const getListCategory = async () => {
        const data = await getListCate()
        setListCategory(data.data)
    }

    useEffect(() => {
        getListCategory()
    }, [])

    const [images, setImages] = useState([]);

    const [product, setProduct] = useState({
        name: "",
        description: "",
        price: 0,
        discount: 0,
        instock: 0,
        brand: "",
        category: "",
        image: [],
    })

    const imageHandler = (e) => {
        setImages([...images, e.target.files[0]]);
    }

    const removeImage = (index) => {
        const newImages = [...images];
        newImages.splice(index, 1);
        setImages(newImages);
    }

    const openImageModal = (imgUrl) => {
        setSelectedImage(imgUrl);
    }

    const closeImageModal = () => {
        setSelectedImage(null);
    }

    const changeHandle = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value })
    }

    const [open, setOpen] = React.useState(false);
    // const handleClose = () => {
    //     setOpen(false);
    // };


    const handleSubmit = async () => {
        setOpen(true)
        let responseData;
        let formData = new FormData();
        images.forEach(image => {
            formData.append('product', image)
        })
        console.log(product)

        await uploadImg(formData)
            .then((resp) => {
                responseData = resp;
            })
        if (responseData.success) {
            product.image = responseData.imageUrl;
            await createProduct(product)
                .then((data) => {
                    setOpen(false)
                    message.success("Added product success")
                    window.location.reload()
                })
        }
    }

    return (
        <div className="home">
            <Sidebar />
            <div className="homeContainer">
                <Navbar />
                <div className='_title'>
                    <span>THÊM SẢN PHẨM MỚI</span>
                </div>
                <div className="add-product">
                    <div className="field-product">
                        <p>Name</p>
                        <input value={product.name} onChange={changeHandle} type="text" id="name" name='name' placeholder="Enter the name of product" />
                    </div>
                    <div className="field-product">
                        <p>Description</p>
                        <textarea value={product.description} onChange={changeHandle} id="description" name='description' cols={50} rows={7} placeholder="Write a description for your product"></textarea>
                    </div>
                    <div className="product-price">
                        <div className="field-product">
                            <p>Price ($)</p>
                            <input value={product.price} onChange={changeHandle} name='price' type="number" />
                        </div>
                        <div className="field-product">
                            <p>Discount (%)</p>
                            <input value={product.discount} onChange={changeHandle} name='discount' type="number" />
                        </div>
                        <div className="field-product">
                            <p>Số lượng</p>
                            <input value={product.instock} onChange={changeHandle} name='instock' type="number" />
                        </div>
                    </div>
                    <div className="product-type">
                        <div className="field-product">
                            <p>Category</p>
                            <select value={product.category} onChange={changeHandle} name='category'>
                                <option value="" selected disabled>Choose Category</option>
                                {
                                    listCategory.map((category, index) => {
                                        return (
                                            <option key={index} value={category._id}>{category.nameCategory}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className="field-product">
                            <p>Brand</p>
                            <input value={product.brand} onChange={changeHandle} name='brand' type="text" />
                        </div>
                    </div>
                    <div className="field-product">
                        <input onChange={imageHandler} type="file" name="" id="" />
                        <div className='list-img'>
                            {
                                images.map((img, index) => {
                                    return (
                                        <div key={index} style={{ position: 'relative', padding: '10px' }}>
                                            <div className="single-img">
                                                <img src={URL.createObjectURL(img)} onClick={() => openImageModal(URL.createObjectURL(img))} alt="" />
                                            </div>
                                            <div onClick={() => removeImage(index)} className="btn-close-img">
                                                x
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <button onClick={handleSubmit}>Add</button>
                </div>
                {selectedImage && (
                    <div className="image-modal">
                        <div className="modal-content">
                            <img src={selectedImage} alt="Large Image" />
                            <button onClick={closeImageModal}>Đóng X</button>
                        </div>
                    </div>
                )}
            </div>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
                // onClick={handleClose}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    );
}

export default AddProduct;