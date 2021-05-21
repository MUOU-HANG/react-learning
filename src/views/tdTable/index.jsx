import React from 'react';
import TdTable from '../../components/tdTable';
import { Button, Input, Row, Col, DatePicker, Form, Select } from 'antd';
import moment from 'moment';
import { SwapRightOutlined } from '@ant-design/icons';
import { useAntdTable } from 'ahooks';
import './index.css';

const { RangePicker } = DatePicker;
const { Search } = Input;
const { Option } = Select;

const TdTableApp = () => {
  const [form] = Form.useForm();

  const getTableData = ({ current, pageSize }, formData) => {
    formData = form.getFieldsValue();
    let query = `page=${current}&size=${pageSize}`;
    Object.entries(formData).forEach(([key, value]) => {
      if (value) {
        query += `&${key}=${value}`;
      }
    });

    return fetch(`https://randomuser.me/api?results=55&${query}`)
      .then((res) => res.json())
      .then((res) => ({
        total: res.info.results,
        list: res.results,
      }));
  };

  const { tableProps, search } = useAntdTable(getTableData, {
    defaultPageSize: 5,
    form,
  });

  const { submit, reset } = search;

  // 表头设置
  const columns = [
    {
      title: 'name',
      dataIndex: ['name', 'last'],
      width: 800,
      fixed: 'left',
      render: () => {
        return <a href='http://www.baidu.com'>111</a>;
      },
    },
    {
      title: 'email',
      dataIndex: 'email',
      with: 400,
    },
    {
      title: 'phone',
      dataIndex: 'phone',
      width: 400,
    },
    {
      title: 'gender',
      dataIndex: 'gender',
      width: 400,
      fixed: 'right',
    },
  ];

  const handelMultiSelect = (val) => {
    console.log(val);
  };

  // 简洁表单
  const simpleForm = (
    <Form form={form} initialValues={{ payTime: [moment(), moment()] }}>
      <Row span={24} gutter={8}>
        <Col span={12}>
          <Form.Item name='name'>
            <Search
              onSearch={submit}
              style={{ width: '100%' }}
              placeholder='请输入订单编号/交易流水号/邮箱等'
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name='payTime'>
            <RangePicker style={{ width: '100%' }} />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );

  // 高级表单
  const advanceForm = (
    <div className='advanceForm'>
      <Form
        form={form}
        labelCol={{ span: 5, offset: 1 }}
        wrapperCol={{ span: 198 }}
      >
        <Row span={24} gutter={60}>
          <Col span={8}>
            <Form.Item label='订单编号' name='orderNo'>
              <Input placeholder='请输入' />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label='收货邮箱' name='receiveEmail'>
              <Input placeholder='请输入' />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label='用户邮箱' name='userEmail'>
              <Input placeholder='请输入' />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label='决策结果' name='finalDes'>
              <Select>
                <Option value=''>全部</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label='收货国家' name='receiveCountry'>
              <Input placeholder='请输入' />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label='账单国家' name='billCountty'>
              <Input placeholder='请输入' />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label='IP国家' name='IPCountry'>
              <Input placeholder='请输入' />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label='币种' name='billType'>
              <Input placeholder='请输入' />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label='订单金额'>
              <Input.Group>
                <Row>
                  <Col span={10}>
                    <Form.Item name='startAmount'>
                      <Input placeholder='请输入' />
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Button disabled block>
                      <SwapRightOutlined />
                    </Button>
                  </Col>
                  <Col span={10}>
                    <Form.Item name='endAmount'>
                      <Input
                        className='site-input-right'
                        placeholder='请输入'
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Input.Group>
            </Form.Item>
          </Col>
          <Col span={8} offset={16} style={{ textAlign: 'right' }}>
            <Button type='primary' style={{ marginRight: 8 }} onClick={submit}>
              查询
            </Button>
            <Button onClick={reset}>重置</Button>
          </Col>
        </Row>
      </Form>
    </div>
  );

  // 固定表单
  const fixedForm = (
    <Form form={form} initialValues={{ payTime: [moment(), moment()] }}>
      <Row span={24} gutter={8}>
        <Col span={12} offset={12}>
          <Form.Item name='payTime'>
            <RangePicker style={{ width: '100%' }} />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );

  return (
    <>
      <TdTable
        multiSelect
        scroll={{ x: 2000 }}
        rowKey='email'
        columns={columns}
        fixedForm={fixedForm}
        advanceForm={advanceForm}
        simpleForm={simpleForm}
        multiSelectFn={handelMultiSelect}
        {...tableProps}
      >
        {simpleForm}
      </TdTable>
    </>
  );
};

export default TdTableApp;
