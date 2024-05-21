import * as httpRequest from '../utils/httpRequest';

export const getAllOrder = async (status) => {
    try{
        const res = await httpRequest.get('/orders-n', {params: {status}})
        return res;
    } catch(e){
        console.log(e);
    }
}

export const updateOrder = async (data) => {
    try{
        const res = await httpRequest.put('/update-order', data)
        return res;
    } catch(e){
        console.log(e)
    }
}