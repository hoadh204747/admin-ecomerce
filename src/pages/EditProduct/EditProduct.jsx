import React, { useState, useEffect } from "react";
import './EditProduct.scss'
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import { getProduct, getListCate, updateProduct, uploadImg } from "../../services/productService";
import { useParams } from "react-router-dom";
import * as message from '../../components/Message/message'

const EditProduct = () => {

    const [hiddenImages, setHiddenImages] = useState([]); // state khi xóa sẽ tạm thời ẩn ảnh
    const [product, setProduct] = useState(null);
    const [images, setImages] = useState([]);
    const [listCategory, setListCategory] = useState([])
    const { productId } = useParams()

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                const data = await getProduct(productId);
                setProduct(data);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchProductData()
    }, [productId]);

    const [productDetail, setProductDetail] = useState({
        name: product?.name || '',
        description: product?.description || '',
        price: product?.price || '',
        discount: product?.discount || '',
        instock: product?.instock || '',
        brand: product?.brand || '',
        category: product?.category || '',
        image: product?.image || '',
    });

    useEffect(() => {
        setProductDetail(
            {
                name: product?.name,
                description: product?.description,
                price: product?.price,
                discount: product?.discount,
                instock: product?.instock,
                brand: product?.brand,
                category: product?.category,
                image: product?.image,
            }
        )
    }, [product?.name, product?.description, product?.price, product?.discount, product?.instock, product?.brand, product?.category, product?.image])

    const getListCategory = async () => {
        const data = await getListCate()
        setListCategory(data.data)
    }
    useEffect(() => {
        getListCategory()
    }, [])

    // const imageUrl = [];
    // const pushImage = (url) => {
    //     imageUrl.push(url)
    //     console.log(imageUrl)
    // }

    const handleSubmit = async () => {
        const data = {
            imageUrls: hiddenImages,
            name: productDetail.name,
            description: productDetail.description,
            price: productDetail.price,
            discount: productDetail.discount,
            instock: productDetail.instock,
            brand: productDetail.brand,
            category: productDetail.category,
            image: productDetail.image,
        };

        let formData = new FormData();
        images.forEach(image => {
            formData.append('product', image)
        })
        const result = await uploadImg(formData)
            
            if (result.success) {
                const filterImage = data.image.filter(item => !data.imageUrls.includes(item));
                data.image =  filterImage.concat(result.imageUrl);
                const res = await updateProduct(data, productId)
                    if(res.success){
                        message.success(res.message)
                        window.location.reload()
                    }
            } else {
                const filterImage = data.image.filter(item => !data.imageUrls.includes(item));
                data.image =  filterImage
                const res = await updateProduct(data, productId)
                    if(res.success){
                        message.success(res.message)
                        window.location.reload()
                    }
            }
    }

    const imageHandler = (e) => {
        setImages([...images, e.target.files[0]]);
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductDetail({ ...productDetail, [name]: value });
    };

    const handleImageClick = (img) => {
        setHiddenImages([...hiddenImages, img]);
    };

    const isHidden = (img) => {
        return hiddenImages.includes(img);
    };
    const removeImage = (index) => {
        const newImages = [...images];
        newImages.splice(index, 1);
        setImages(newImages);
    }

    return (
        <div className="home">
            <Sidebar />
            <div className="homeContainer">
                <Navbar />
                <div className='_title'>
                    <span>THAY ĐỔI THÔNG TIN SẢN PHẨM</span>
                </div>
                <div className="edit-product">
                    <div className="field-product">
                        <p>Name</p>
                        <input value={productDetail?.name} type="text" id="name" name='name' onChange={handleChange} />
                    </div>
                    <div className="field-product">
                        <p>Description</p>
                        <textarea value={productDetail?.description} id="description" name='description' cols={50} rows={7} onChange={handleChange}></textarea>
                    </div>
                    <div className="product-price">
                        <div className="field-product">
                            <p>Price ($)</p>
                            <input value={productDetail?.price} name='price' id="price" type="number" onChange={handleChange} />
                        </div>
                        <div className="field-product">
                            <p>Discount (%)</p>
                            <input value={productDetail?.discount} name='discount' type="number" onChange={handleChange} />
                        </div>
                        <div className="field-product">
                            <p>Số lượng</p>
                            <input value={productDetail?.instock} name='instock' type="number" onChange={handleChange} />
                        </div>
                    </div>
                    <div className="product-type">
                        <div className="field-product">
                            <p>Category</p>
                            <select value={productDetail?.category} onChange={handleChange} name='category' >
                                <option value={productDetail?.category} selected disabled>{product?.category.nameCategory}</option>
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
                            <input value={productDetail?.brand} name='brand' type="text" onChange={handleChange} />
                        </div>
                    </div>
                    <div className="field-product">
                        <div className='list-img'>
                            {
                                product?.image.map((img, index) => {
                                    return (
                                        !isHidden(img) && (
                                            <div key={index} style={{ position: 'relative', padding: '10px' }}>
                                                <div className="single-img" style={{ display: 'block' }}>
                                                    <img src={img} alt="" />
                                                </div>
                                                <div onClick={() => { handleImageClick(img); }} className="btn-close-img">
                                                        X
                                                </div>
                                            </div>
                                        )
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="field-product" style={{ marginTop: '20px' }}>
                        <p>Tải ảnh lên thay thế</p>
                        <input onChange={imageHandler} type="file" name="" id="" />
                        <div className='list-img'>
                            {
                                images.map((image, index) => {
                                    return (
                                        <div key={index} style={{ position: 'relative', padding: '10px' }}>
                                            <div className="single-img">
                                                <img src={URL.createObjectURL(image)} alt="" />
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
                    <button onClick={() => { handleSubmit() }} >Cập nhật</button>
                </div>
            </div>
        </div>
    );
}

export default EditProduct;