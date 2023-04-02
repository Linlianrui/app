import { v4 as uuidv4 } from 'uuid';
//需要生成一个随机的字符串，并且每次执行不能发生变化，游客身份一直存储
export const getUUID=()=>{
    //先从本地存储获取uuid
    let uuid_token = localStorage.getItem('UUIDTOKEN');
    if(!uuid_token){
        //生成游客临时身份
        uuid_token = uuidv4();
        //本地存储
        localStorage.setItem('UUIDTOKEN',uuid_token);
    }
    //必须要有返回值，否则undefined
    return uuid_token;
}