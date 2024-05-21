import * as httpRequest from '../utils/httpRequest';

export const uploadImg = async (data) => {
    try{
        const res = await httpRequest.post('product/upload', data)
        return res;
    } catch(e){
        console.log(e);
    }
}

export const createProduct = async (data) => {
    try{
        const res = await httpRequest.post('product/create-product', data)
        return res;
    } catch(e){
        console.log(e);
    }
}

export const getAllProduct = async () => {
    try{
        const res = await httpRequest.get('/product');
        return res;
    } catch (e){
        console.log(e);
    }
}

export const getProduct = async (id) => {
    try{
        const res = await httpRequest.get(`/product/${id}`);
        return res;
    } catch (e){
        console.error('Failed to load product', e);
    }
}

export const getAttributeByProductId = async (id) => {
    try{
        const res = await httpRequest.get(`/attribute/${id}`);
        return res;
    } catch (e){
        console.log(e);
    }
}

export const getListCate = async () => {
    try{
        const res = await httpRequest.get('/category/list');
        return res;
    } catch (e){
        console.log(e)
    }
}

export const createNewAttribute = async (data) => {
    try{
        const res = await httpRequest.post('/create-attribute', data);
        return res;
    } catch(e){
        console.log(e)
    }
}

export const getAllAttr = async () => {
    try{
        const res = await httpRequest.get('/attributes');
        return res;
    } catch(e){
        console.log(e)
    }
}

export const newValue = async (data) => {
    try{
        const res = await httpRequest.post('/new-value', data);
        return res;
    } catch(e){
        console.log(e)
    }
}

export const updateProduct = async (data, id) => {
    try{
        const res = await httpRequest.put(`/product/update/${id}`, data)
        return res;
    } catch(e){
        console.log(e)
    }
}

export const updateSellProduct = async (data) => {
    try{
        const res = await httpRequest.put('/product/updatesell', data)
        return res;
    } catch(e){
        console.log(e)
    }
}
