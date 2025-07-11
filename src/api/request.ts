

import { un } from "@uni-helper/uni-network";


const instance = un.create({
  baseUrl: '', // api here
  timeout: 5000,
});


instance.interceptors.request.use(
  function (config) {
    const token = uni.getStorageSync('token')
    config.headers = {
    }
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  function (error) {
    // 对请求错误做些什么
    if (!error?.config?.skipErrMsg) {
      uni.showToast({
        title: error.response?.data?.message || '服务端错误，请稍后再试',
        icon: "none",
        duration: 2500
      })
    }
    return Promise.reject(error);
  }
);

// 添加响应拦截器
instance.interceptors.response.use(
  function (response: any) {
    // 如果是上传 则需要序列化
    if (response.config?.adapter === 'upload') {
      response.data = JSON.parse(response.data)
    }
    return response.data
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数
    // 对响应错误做点什么
    if (error.config?.adapter === 'upload') {
      error.response.data = JSON.parse(error.response.data)
    }
    if (error.response?.status === 401 || error?.response?.data?.code === 401) {
      // 处理登录过期
    }
    if (!error?.config?.skipErrMsg) {
      uni.showToast({
        title: error.response?.data?.message || '服务端错误，请稍后再试',
        icon: "none",
        duration: 2500
      })
    }
    return Promise.reject(error);
  }
);

export default instance;
