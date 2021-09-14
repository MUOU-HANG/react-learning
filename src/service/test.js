import getRequest from '../utils/request'
const GET = 'get'
const POST = 'post'

// 测试数据接口
export const getTableData = () => {
  return getRequest('',POST,{ type:1,city:'长沙' })
}

export const getMarkdown = () => {
  return getRequest('http://localhost:9527/',GET)
}

