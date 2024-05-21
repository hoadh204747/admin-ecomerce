import * as httpRequest from '../utils/httpRequest';

export const getAllUsers = async () => {
    try {
        const res = await httpRequest.get('auth/all-users')
        return res;
    } catch (err) {
        console.log(err)
    }
}

export const blockUser = async (data) => {
    try{
        const res = await httpRequest.put('auth/block-user', data)
        return res;
    } catch(err){
        console.log(err)
    }
}