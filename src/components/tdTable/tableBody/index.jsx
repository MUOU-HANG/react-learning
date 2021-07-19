import React, { useContext, useState, memo } from 'react'
import { Table, Row, Col } from 'antd'
import './index.less'

const TdTable = (props) => {
  const [ selectedRowKeys, setSelectedRowKeys ] = useState([]) // 选中的列表key
  const data = { ...useContext(props.TableContext) }
  const {
    tableProps,
    setSelectedData,
    columnsInner,
    multiSelect = false
  } = data

  let columnsInnerShow
  try {
    columnsInnerShow = columnsInner.filter((item) => item.show) // 筛选show的值为true的表头
  } catch (e) {
    console.log('数据错误')
  }
  delete data.columns // 删除原先的columns，使表格走columnsInner渲染表头

  // 多选
  const onSelectChange = (val) => {
    setSelectedRowKeys(val)
    setSelectedData(val)
  }

  // 处理多选是否开启使用
  const handelRowSelection = () => {
    let rowSelection
    if (!multiSelect) {
      rowSelection = false
    } else {
      rowSelection =
        columnsInnerShow.length === 0
          ? false
          : { selectedRowKeys, onChange: onSelectChange }
    }
    return rowSelection
  }
  return (
    <>
      <Row>
        <Col span={24}>
          <Table
            columns={columnsInnerShow}
            rowSelection={handelRowSelection()}
            {...data}
            {...tableProps}
          />
        </Col>
      </Row>
    </>
  )
}

export default memo(TdTable)
