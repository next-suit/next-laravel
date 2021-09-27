import {toaster, Message} from "rsuite";
import dayjs from "dayjs";

/**
 * 全局提示消息
 * @param message
 * @param type [info, success, warning, error]
 */
function toast(message, type = 'info') {
    if(!message){
        return;
    }
    toaster.push(<Message showIcon={true} type={type} duration={2500}>{message}</Message>, {
        placement: 'topCenter',
    })
}

function toastInfo(message){
    toast(message, 'info');
}

function toastSuccess(message){
    toast(message, 'success');
}

function toastWarning(message){
    toast(message, 'warning');
}

function toastError(message){
    toast(message, 'error');
}

function logger(...msgs){
    if(process.env.NODE_ENV === 'production'){
        return;
    }
    for(let i in msgs){
        console.info(typeof msgs[i]);
        console.log(msgs[i]);
    }
}


/**
 * 返回格式化 日期
 * @param date
 * @return {string}
 */
function date(date) {
    if(!date || !date instanceof Date){
        return '';
    }
    return dayjs(date).format('YYYY-MM-DD');
}

/**
 * 返回格式化 日期时间
 * @param date
 * @return {string}
 */
function  datetime(date) {
    if(!date || !date instanceof Date){
        return '';
    }
    return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
}

// 模拟等待时间
function wait(timeout){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('resolved')
        }, timeout);
    })
}

export {toast, toastInfo, toastSuccess, toastWarning, toastError, logger, date, datetime, wait}
