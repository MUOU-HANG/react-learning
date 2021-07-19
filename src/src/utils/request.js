import axios from 'axios'
import { message } from 'antd'

function get(url) {
  return new Promise((resolve, reject) => {
    axios.get(url).then((res) => {
      resolve(res.data)
    }).catch((err) => {
      console.log(err.response)
      message.error('Response err')
      reject(err)
    })
  })
}

function post(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data).then((res) => {
      resolve(res.data)
    }).catch((err) => {
      reject(err)
    })
  })
}

function getRequest(url, method,data) {
  if (method === 'get') {
    return get(url)
  } else if (method === 'post') {
    return post(url,data)
  }
}

export default getRequest