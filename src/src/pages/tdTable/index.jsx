import React from 'react'
import TdTable from '../../../components/tdTable'
import { Button, Input, Row, Col, DatePicker, Form, Select } from 'antd'
import moment from 'moment'
import { SwapRightOutlined } from '@ant-design/icons'
import { useAntdTable } from 'ahooks'
import './index.css'

const { RangePicker } = DatePicker
const { Search } = Input
const { Option } = Select

const TdTableApp = () => {
  const [ form ] = Form.useForm()

  const getTableData = ({ current, pageSize }, formData) => {
    formData = form.getFieldsValue()
    let query = `page=${current}&size=${pageSize}`
    Object.entries(formData).forEach(([ key, value ]) => {
      if (value) {
        query += `&${key}=${value}`
      }
    })

    return fetch(`https://randomuser.me/api?results=55&${query}`)
      .then((res) => res.json())
      .then((res) => ({
        total: res.info.results,
        list: res.results
      }))
  }

  const { tableProps, search } = useAntdTable(getTableData, {
    defaultPageSize: 5,
    form
  })

  const { submit, reset } = search

  // 表头设置
  const columns = [
    {
      title: 'name',
      dataIndex: [ 'name', 'last' ],
      width: 800,
      fixed: 'left'
      // render: ()=><a href="http://www.baidu.com">111</a>
    },
    {
      title: 'email',
      dataIndex: 'email',
      with: 400
    },
    {
      title: 'phone',
      dataIndex: 'phone',
      width: 400
    },
    {
      title: 'gender',
      dataIndex: 'gender',
      width: 400,
      fixed: 'right'
    }
  ]

  const handelMultiSelect = (val) => {
    console.log(val)
  }

  // 简洁表单
  const simpleForm = (
    <Form form={form}
      initialValues={{ payTime: [ moment(), moment() ] }}
    >
      <Row gutter={8}
        span={24}
      >
        <Col span={12}>
          <Form.Item name="name">
            <Search
              onSearch={submit}
              placeholder="请输入订单编号/交易流水号/邮箱等"
              style={{ width: '100%' }}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="payTime">
            <RangePicker style={{ width: '100%' }} />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  )

  // 高级表单
  const advanceForm = (
    <div className="advanceForm">
      <Form
        form={form}
        labelCol={{ span: 5, offset: 1 }}
        wrapperCol={{ span: 198 }}
      >
        <Row gutter={60}
          span={24}
        >
          <Col span={8}>
            <Form.Item label="订单编号"
              name="orderNo"
            >
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="收货邮箱"
              name="receiveEmail"
            >
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="用户邮箱"
              name="userEmail"
            >
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="决策结果"
              name="finalDes"
            >
              <Select>
                <Option value="">全部</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="收货国家"
              name="receiveCountry"
            >
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="账单国家"
              name="billCountty"
            >
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="IP国家"
              name="IPCountry"
            >
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="币种"
              name="billType"
            >
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="订单金额">
              <Input.Group>
                <Row>
                  <Col span={10}>
                    <Form.Item name="startAmount">
                      <Input placeholder="请输入" />
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Button block
                      disabled
                    >
                      <SwapRightOutlined />
                    </Button>
                  </Col>
                  <Col span={10}>
                    <Form.Item name="endAmount">
                      <Input
                        className="site-input-right"
                        placeholder="请输入"
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Input.Group>
            </Form.Item>
          </Col>
          <Col offset={16}
            span={8}
            style={{ textAlign: 'right' }}
          >
            <Button onClick={submit}
              style={{ marginRight: 8 }}
              type="primary"
            >
              查询
            </Button>
            <Button onClick={reset}>重置</Button>
          </Col>
        </Row>
      </Form>
    </div>
  )

  // 固定表单
  const fixedForm = (
    <Form form={form}
      initialValues={{ payTime: [ moment(), moment() ] }}
    >
      <Row gutter={8}
        span={24}
      >
        <Col offset={12}
          span={12}
        >
          <Form.Item name="payTime">
            <RangePicker style={{ width: '100%' }} />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  )

  return (
    <>
      <TdTable
        advanceForm={advanceForm}
        columns={columns}
        fixedForm={fixedForm}
        multiSelect
        multiSelectFn={handelMultiSelect}
        rowKey="email"
        scroll={{ x: 2000 }}
        simpleForm={simpleForm}
        {...tableProps}
      >
        {simpleForm}
      </TdTable>
    </>
  )
}

export default TdTableApp
