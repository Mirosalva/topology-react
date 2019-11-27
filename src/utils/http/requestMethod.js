/**
 * Author : Minerva-S
 * Create Time : 2019/11/27 11:26
 * Description :
 */
import Toast from '../components/Toast';

import Axios from 'axios';
import qs from 'qs';
import history from './history';

const axios = Axios.create({
  baseURL:'/operation-web/'
});

const localStorage = window.localStorage;
const sessionStorage = window.sessionStorage;

axios.interceptors.request.use(
    config => {
      if(config.method === 'post' || config.method === 'put' || config.method === 'delete') {
        config.data = qs.stringify(config.data)
      }
      if (sessionStorage.token){
        config.headers.Authorization = sessionStorage.token;
      }
      return config;
    },
   error =>{
      return Promise.reject(error);
    }
);

export async function post(requestParam, callback,autoQuit = true) {
  request('post',requestParam,callback,autoQuit);
}

export async function get(requestParam, callback,autoQuit = true) {
  request('get',requestParam,callback,autoQuit);
}

export async function request(method, requestParam, callback,autoQuit) {
  axios[method](requestParam.REQUEST_URL,requestParam.body,{
    headers:requestParam.headers
  }).then((response) => {
    if (response.status != 200 && response.status != '200') {
      Toast.hide();
      Toast.offline(requestErrorNotice(response.status),1,null,false);
      if (callback.onError){
        callback.onError();
      }
      if (callback.onComplete){
        callback.onComplete();
      }
      return false;
    } else {
      const responseJson = response.data;
      const {returnCode,returnMessage} = responseJson;
      // 这里根据错误码 使用弹框提示，与后端商定错误提示类型

      // if (returnCode == '2001') {
      //   resetToLogin();
      //   Toast.fail('请重新登录');
      //   return 0;
      // }
      callback.onSuccess(responseJson);
      if (callback.onComplete){
        callback.onComplete();
      }
    }
  }).catch((error) => {
    let message = error.message;
    if (error.message == 'Network request failed' || message == 'Failed to fetch' || message == 'Network Error') {
      message = callback.requestFailedMessage ? callback.requestFailedMessage : '当前网络不可用,请检查网络连接';
    }
    Toast.hide();
    Toast.offline(message,1,null,false);

    if (callback.onError) {
      callback.onError(error);
    }
    if (callback.onComplete) {
      callback.onComplete();
    }
  });
}

export function getJsonHeaders (token) {
  const headers = getHeaders();
  headers['Content-type'] = 'application/json';
  return headers;
}

export function getFileHeaders() {
  const headers = getHeaders();
  headers['Content-type'] =  'multipart/form-data';
  return headers;
}

export function getHeaders(token) {
  const headers = {
    'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
    token: token || '',
  };

  return headers;
}


export function requestErrorNotice(code) {
  const codeStr = code.toString();
  switch (codeStr) {
    default:
      return `当前网络不可用，请检查网络连接（错误码）：${code.toString()}`;
  }
}
