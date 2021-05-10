import React, { useState } from "react";
import { Form, Input, Button, Tag, Table, Select, Row, Col, Card } from "antd";
import "./index.css";
import { useAntdTable } from "ahooks";

const { Option } = Select;
const getTableDataService = () => {
  const data = [
    {
      orderId: "#1043503",
      checkRes: 0,
      payMoney: "100.1 CNY",
      payTime: "2021-3-21 13:30",
      decRes: "通过",
      account: "34272437247",
      dealId: "34509234959",
      orderTotalMoney: "100.1 CNY",
      resouceIp: "17.34.54.112",
    },
    {
      orderId: "#1043505",
      checkRes: 1,
      payMoney: "100.1 CNY",
      payTime: "2021-3-21 13:30",
      decRes: "通过",
      account: "34272437247",
      dealId: "34509234959",
      orderTotalMoney: "100.1 CNY",
      resouceIp: "17.34.54.112",
    },
    {
      orderId: "#1043505",
      checkRes: 2,
      payMoney: "100.1 CNY",
      payTime: "2021-3-21 13:30",
      decRes: "通过",
      account: "34272437247",
      dealId: "34509234959",
      orderTotalMoney: "100.1 CNY",
      resouceIp: "17.34.54.112",
    },
  ];
  return new Promise((resolve, reject) => {
    resolve(data);
  });
};

const handelCheckRes = (key) => {
  switch (key) {
    case 0:
      return { color: "#2FC25B", text: "赔付成功" };
    case 1:
      return { color: "#F04864", text: "赔付失败" };
    case 2:
      return { color: "#FAAD14", text: "未审核" };
    default:
      break;
  }
};

// 表格表头信息
const columns = [
  { title: "订单编号", dataIndex: "orderId" },
  {
    title: "审核结果",
    dataIndex: "checkRes",
    render: (_, record) => {
      const { color, text } = handelCheckRes(record.checkRes);
      return (
        <Tag style={{ width: "80px", textAlign: "center" }} color={color}>
          {text}
        </Tag>
      );
    },
  },
  { title: "赔付金额", dataIndex: "payMoney" },
  { title: "支付时间", dataIndex: "payTime" },
  { title: "决策结果", dataIndex: "decRes" },
  { title: "账号", dataIndex: "account" },
  { title: "交易流水号", dataIndex: "dealId" },
  { title: "订单总额", dataIndex: "orderTotalMoney" },
  { title: "来源IP", dataIndex: "resouceIp" },
  {
    title: "操作",
    dataIndex: "oper",
    key: "oper",
    render: () => <Button type="link">查看详情</Button>,
  },
];
const App = () => {
  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState([]);
  const { tableProps, search, run: tableDataRun } = useAntdTable(
    getTableDataService,
    {
      // manual: true,
      onSuccess: (res) => {
        setDataSource(res);
      },
      formatResult: (res) => {
        const total = res.length;
        const list = res;
        return { total, list };
      },
    }
  );

  const { submit } = search;

  const SearchForm = (
    <Card style={{ width: "95%", margin: "10px auto" }}>
      <Form form={form}>
        <Row gutter={[16, 8]}>
          <Col span={6}>
            <Form.Item label="订单编号" name="orderId">
              <Input placeholder=" 请输入" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="账号" name="account">
              <Input placeholder=" 请输入" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="审核结果" name="account">
              <Select placeholder="请输入">
                <Option key="0">全部</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="交易流水号" name="account">
              <Input placeholder=" 请输入" />
            </Form.Item>
          </Col>
          <Col span={24} style={{ textAlign: "right" }}>
            <Button type="primary" onClick={submit}>
              查询
            </Button>
            <Button
              style={{ marginLeft: "8px" }}
              onClick={() => {
                form.resetFields();
              }}
            >
              重置
            </Button>
          </Col>
        </Row>
      </Form>
    </Card>
  );

  return (
    <div>
      {SearchForm}
      <Card style={{ width: "95%", margin: "10px auto" }}>
        <Table columns={columns} rowKey="_id" {...tableProps} />
      </Card>
    </div>
  );
};

export default App;
