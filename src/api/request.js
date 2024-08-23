import axios from 'axios'
import { Message, Notification } from 'element-ui'
import qs from 'qs'
import * as storage from '@/utils/storage'
const CURRENT_USER = 'user'

const APPLICATION_JSON = 'application/json; charset=UTF-8'
const MULTIPART_FORM_DATA = 'multipart/form-data'
const APPLICATION_FORM_URLENCODED = 'application/x-www-form-urlencoded; charset=UTF-8'

const axiosConfig = (config) => {
  return axios(config).then(response => {
    return response.data || response
  }).catch(err => {
    console.log(err)
    return Promise.reject(err)
  })
}
const downFile = (disposition, blob) => {
  if (disposition && disposition.split(';')[0] === 'attachment') {
    let fileName = disposition.split(';')[1].split('filename=')[1]
    const fileNameUnicode = disposition.split('filename*=')[1]
    if (fileNameUnicode) { // 当存在 filename* 时，取filename* 并进行解码（为了解决中文乱码问题）
      fileName = decodeURIComponent(fileNameUnicode.split("''")[1])
    }
    fileName = fileName.replace(/"/g, '')
    if ('msSaveOrOpenBlob' in navigator) { // IE10+下载
      navigator.msSaveBlob(blob, fileName)
    } else { // 非IE下载 //if("download" in document.createElement("a"))
      const link = document.createElement('a')
      link.download = fileName
      link.style.display = 'none'
      link.href = URL.createObjectURL(blob)
      document.body.appendChild(link)
      link.click()
      URL.revokeObjectURL(link.href) // 释放URL 对象
      document.body.removeChild(link)
    }
  }
}
const readAsText = (blob) => {
  const promise = new Promise(function(resolve, reject) {
    const fr = new FileReader()
    fr.onload = function(e) {
      resolve(JSON.parse(e.target.result))
    }
    fr.onerror = function(e) {
      console.log(e)
      reject({ code: 300, message: '响应解析错误' })
    }
    fr.readAsText(blob)
  })
  return promise
}
const validCode = (res) => {
  const promise = new Promise(function(resolve, reject) {
    if (res.code && res.code !== 200) {
      if (res.code === 401) { // 未授权
        location.reload()
      }
      Notification.error(res.message)
      reject(res)
    } else {
      resolve(res)
    }
  })
  return promise
}
const commonPromise = (response, isBlob) => {
  if (isBlob) {
    readAsText(response.data).then(res => {
      return validCode(res)
    }).catch(e => {
      return Promise.reject(e)
    })
  } else {
    return validCode(response.data || response)
  }
}

// 请求拦截器
axios.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.reject(error)
})

// 响应拦截器
axios.interceptors.response.use(response => {
  if (response.config && response.config.responseType && response.config.responseType === 'blob') { // 这里只处理blob类型,用于文件下载
    const disposition = response.headers['content-disposition']
    if (response.data.type == 'application/json') { // blob 消息响应
      return commonPromise(response, true)
    } else if (response.config.autoDown) {
      downFile(disposition, response.data)
      return Promise.resolve({ code: 200, message: '下载成功' })
    } else {
      return response
    }
  } else {
    return commonPromise(response)
  }
}, error => {
  console.log('err' + error)// for debug
  Message({
    message: error.message,
    type: 'error',
    duration: 5 * 1000
  })
  return Promise.reject(error)
}
)

export default {
  post(url, data, form, settingConfig) {
    const contentType = form ? form === 'multipart' ? MULTIPART_FORM_DATA : APPLICATION_FORM_URLENCODED : APPLICATION_JSON
    const config = {
      baseURL: '',
      method: 'post',
      url,
      timeout: 60000,
      data: form && form !== 'multipart' ? qs.stringify(data) : data,
      headers: {
        'Content-Type': contentType,
        'x-token': storage.get(CURRENT_USER).token
      }
    }
    return axiosConfig({ ...config, ...settingConfig })
  },
  down(url, data, form, autoDown) {
    const contentType = form ? form === 'multipart' ? MULTIPART_FORM_DATA : APPLICATION_FORM_URLENCODED : APPLICATION_JSON
    const config = {
      baseURL: '',
      method: 'post',
      url,
      timeout: 60000,
      data: data,
      responseType: 'blob',
      autoDown: autoDown,
      headers: {
        'Content-Type': contentType,
        'x-token': storage.get(CURRENT_USER).token
      }
    }
    return axiosConfig(config)
  },
  get(url, params) {
    const config = {
      method: 'get',
      url,
      params, // get 请求时带的参数
      timeout: 30000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'x-token': storage.get(CURRENT_USER).token
      }
    }
    return axiosConfig(config)
  },
  gatwayPost(url, data, form, settingConfig) {
    const contentType = form ? form === 'multipart' ? MULTIPART_FORM_DATA : APPLICATION_FORM_URLENCODED : APPLICATION_JSON
    const config = {
      baseURL: '',
      method: 'post',
      url,
      timeout: 60000,
      data: form && form !== 'multipart' ? qs.stringify(data) : data,
      headers: {
        'Content-Type': contentType,
        'x-authority-token': storage.get(CURRENT_USER).token,
        'x-app-code': 2,
      }
    }
    return axiosConfig({ ...config, ...settingConfig })
  },
}
