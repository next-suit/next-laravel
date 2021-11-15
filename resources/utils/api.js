import {date, datetime, toastError, toastInfo, toastWarning} from "./functions";
import axios from "axios";
import {PATHNAME} from "./const";

const api = axios.create({
    baseURL: location.pathname,
    headers: { Accept: 'application/json' },
});

api.interceptors.request.use(request => {
    let token = localStorage.getItem(`token_${PATHNAME}`);
    request.headers['Authorization'] = `Bearer ${token}`;

    let params = {
        page: $PAGE,
        rows: $ROWS,
    };
    if(request.params && request.params.dates && request.params.dates instanceof Array && request.params.dates.length === 2){
        params.dates = [
            date(request.params.dates[0]),
            date(request.params.dates[1]) + ' 23:59:59',
        ];
    }
    if(request.params && request.params.date && request.params.date instanceof Date){
        params.date = date(request.params.date);
    }
    if(request.params && request.params.datetime && request.params.datetime instanceof Date){
        params.datetime = datetime(request.params.datetime);
    }
    request.params = Object.assign({}, request.params || {}, params);

    return request;
}, function (error) {
    return Promise.reject(error);
})

api.interceptors.response.use(response => {
    if(response.data.code !== 0){
        toastWarning(response.data.message);
        return Promise.reject(response.data.message);
    }
    let data = response.data.data;
    return Promise.resolve(data);
}, errors => {
    if(errors.response.status === 401){
        // 不是未登录错误，就提示出来
        errors.response.data.message === 'Unauthenticated.' || toastInfo(errors.response.data.message);
        window.location.href = '#/login';
        return Promise.reject(errors.response.data.message);
    }
    if(errors.response.status === 422){
        let message = errors.response.data.message;
        if(errors.response.data.errors){
            let err_bags = [];
            for(let i in errors.response.data.errors){
                err_bags = [...errors.response.data.errors[i]];
                break;
            }
            message = err_bags[0];
        }
        toastWarning(message);
        return Promise.reject(message);
    }
    if(errors.response.status === 404){
        toastError('404 Not Found');
        return Promise.reject('404 Not Found');
    }
    if(errors.response.status === 503){
        toastError('暂时不提供服务');
        return Promise.reject('暂时不提供服务');
    }
    let message = "网络错误";
    if (errors.response) {
        message = errors.response.data.message;
    }else if (errors.request){
        message = "客户端网络不佳，请检查本机网络";
    }
    toastWarning(message);
    return Promise.reject(message);
})

export default api;
