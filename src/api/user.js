import request from '@/utils/request.js'
export const userLogin =data=>{
    return request({
        method:'POST',
        url:'/v1_0/authorizations',
        data
    })
} 
export const sendCode =mobile=>{
    return request({
        method:'get',
        url:`/v1_0/sms/codes/${mobile}`,
    })
}
export const userInfo =()=>{
    return request({
        method:'get',
        url:'/v1_0/user/profile',
    })
} 

