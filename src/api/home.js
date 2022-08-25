import request from '@/utils/request.js'
export const userChannel =()=>{
    return request({
        method:'get',
        url:'/v1_0/user/channels',
    })
} 
export const getArticleList =params=>{
    return request({
        method:'get',
        url:'/v1_0/articles',
        params
    })
} 
