import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { message, Modal } from 'antd';
import * as NProgress from 'nprogress';
import * as qs from 'qs';

import { storageService } from './services';
import { track } from 'bizcharts';

track(false);

/** 请求数量加载进度条 */
let requestTotal = 0;

// message 配置
message.config({
  // 默认自动关闭延时间
  duration: 3
});

// axios 配置
axios.interceptors.request.use(requestInterceptor);
axios.interceptors.response.use(responseInterceptor, responseErrInterceptor);

/**
 * 拦截请求，添加token
 * @param config
 */
function requestInterceptor(config: AxiosRequestConfig) {
  if (!NProgress.isStarted()) {
    NProgress.start();
  }

  const token = storageService.get('token');
  requestTotal += 1;
  const params = qs.parse(window.location.search.substring(1));

  if (params.token) {
    config.headers.token = params.token;
  } else if (
    token &&
    config.url &&
    /api\//.test(config.url) &&
    !/api\/employees\/login/.test(config.url)
  ) {
    config.headers.token = token;
  }

  return config;
}

/**
 * 拦截正常响应，添加默认提示
 * @param res
 */
function responseInterceptor(res: AxiosResponse) {
  const methods = ['post', 'put', 'delete'];
  const data = res.data;

  if (
    res.config.method &&
    res.config.url &&
    methods.indexOf(res.config.method) !== -1 &&
    !/\/api\/employees\/login/.test(res.config.url)
  ) {
    if (!data.success) {
      const errMsg = data.customMsg || data.msg || '操作失败';
      message.error(errMsg);
      return Promise.reject('请求失败');
    } else {
      message.success('操作成功');
    }
  } else if (res.config.method === 'get') {
    if (data.code === '401') {
      Modal.warning({
        title: '登录超时，请重新登录',
        onOk() {
          storageService.remove('token');
          location.href = '/';
        }
      });
    }
    if (!data.success) {
      return Promise.reject('请求失败');
    }
  }
  requestTotal -= 1;
  if (requestTotal === 0 && NProgress.isStarted()) {
    NProgress.done();
  }
  return res;
}

/**
 * 拦截错误响应，添加默认提示
 * @param err
 */
function responseErrInterceptor(err: AxiosError) {
  const response = err.response;

  if (!response) {
    return Promise.reject('请求失败');
  }

  const status = response.status.toString();

  switch (true) {
    case /400/.test(status):
      message.error('请求参数错误');
      break;
    case /401/.test(status):
      // 待优化，可添加去抖功能
      Modal.warning({
        title: '登录超时，请重新登录',
        onOk() {
          storageService.remove('token');
          location.href = '/';
        }
      });
      break;
    case /415/.test(status):
      message.error('请求方法错误');
      break;
    case /^(5|6)/.test(status):
      message.error('服务端错误');
      break;
    default:
  }

  requestTotal -= 1;
  if (requestTotal === 0 && NProgress.isStarted()) {
    NProgress.done();
  }
  return Promise.reject('请求失败');
}
