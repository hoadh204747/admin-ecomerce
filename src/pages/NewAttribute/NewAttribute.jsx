import React, { useEffect, useState } from "react";
import './attribute.scss';
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import { createNewAttribute, getAllProduct, getAllAttr, newValue } from "../../services/productService";
import * as message from '../../components/Message/message'

const NewAttribute = () => {

    const [listAttr, setListAttr] = useState([])
    const [products, setProducts] = useState([])
    const [newAttr, setNewAttr] = useState('')
    const [valueAttr, setValueAttr] = useState({
        value: '',
        productId: '',
        attributeId: ''
    })

    const getListAttr = async () => {
        const data = await getAllAttr()
        setListAttr(data.result)
    }
    const fetchProduct = async () => {
        const data = await getAllProduct()
        setProducts(data.product)
    }
    useEffect(() => {
        getListAttr()
        fetchProduct()
    }, [])

    const changeHandle = (e) => {
        setValueAttr({ ...valueAttr, [e.target.name]: e.target.value });
    }

    const submit = async () => {
        let data = { name: newAttr }
        await createNewAttribute(data)
            .then(() => { setNewAttr('') })
    }

    const addValueToProd = async () => {
        await newValue(valueAttr)
            .then((result) => {
                if (result.success) {
                    message.success('Thêm thành công!');
                }
            })
    }

    return (
        <div className="home">
            <Sidebar />
            <div className="homeContainer">
                <Navbar />
                <div className="attribute-container">
                    <div className="attribute">
                        <div className="new-attr">
                            <div className="form-input">
                                <p>THÔNG SỐ SẢN PHẨM (Ram, Màu, Độ phân giải,...)</p>
                                <input onChange={(e) => { setNewAttr(e.target.value) }} value={newAttr} type="text" />
                            </div>
                            <button onClick={submit}>Thêm</button>
                        </div>
                    </div>

                    <div className="value-for-prod">
                        <div className="title">
                            <span>THÊM CÁC THÔNG SỐ VÀO SẢN PHẨM:</span>
                        </div>
                        <div>
                            <div className="form-input">
                                <p>CÁC GIÁ TRỊ CỦA THÔNG SỐ (Ram=8G, Color=vàng,...)</p>
                                <input onChange={changeHandle} value={valueAttr.value} type="text" name="value" />
                            </div>
                            <div className="form-input" style={{display:'flex', alignItems: 'center', gap: '10px'}}>
                                <span>SẢN PHẨM</span>
                                <select value={valueAttr.productId} onChange={changeHandle} name="productId" >
                                    <option value="" disabled>Chọn sản phẩm</option>
                                    {
                                        products.map((p, i) => {
                                            return (
                                                <option key={i} value={p._id}>{p.name}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="form-input" style={{display:'flex', alignItems: 'center', gap: '10px'}}>
                                <span>THÔNG SỐ</span>
                                <select onChange={changeHandle} value={valueAttr.attributeId} name="attributeId">
                                    <option value="" disabled>Chọn thông số</option>
                                    {
                                        listAttr.map((l, i) => {
                                            return (
                                                <option key={i} value={l._id}>{l.name}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <button onClick={addValueToProd}>Thêm giá trị</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewAttribute;