import React, { useState, useContext, memo } from 'react';
import './index.less';
import DndList from '../dndList';
import { Button, Row, Col } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';

// 高级表单
const TableBarApp = ({ TableContext, customForm }) => {
  const [isSimple, setIsSimple] = useState(true); // 是否展示简洁表单
  const {
    selectedData,
    columnsInner,
    multiSelect,
    advanceForm,
    fixedForm,
    simpleFrom,
    multiSelectFn = () => {},
  } = useContext(TableContext); // 共享数据
  const columnsInnerShowLen = columnsInner.filter((item) => item.show).length;
  // 处理多条记录
  const handelMultiRow = () => {
    multiSelectFn(selectedData);
  };

  // 处理批量上报是否开启使用
  const handelMultiRowBtn = () => {
    let rowSelection;
    if (!multiSelect) {
      rowSelection = false;
    } else {
      rowSelection = columnsInnerShowLen === 0 ? false : true;
    }
    return rowSelection;
  };

  // 简洁/高级搜索切换
  const handelToggleSimple = () => {
    setIsSimple(!isSimple);
  };

  return (
    <>
      <div>
        <Row gutter={8} span={24}>
          <Col span={1}>
            {handelMultiRowBtn() ? (
              <Button type='primary' onClick={handelMultiRow}>
                批量上报
              </Button>
            ) : null}
          </Col>
          <Col span={18} offset={3} style={{ textAlign: 'right' }}>
            {isSimple ? (customForm ? customForm : simpleFrom) : null}
            {isSimple ? null : fixedForm}
          </Col>
          <Col span={2} style={{ textAlign: 'right' }}>
            <div className={'rightBar'}>
              <span>
                {advanceForm ? (
                  <Button
                    icon={isSimple ? <DownOutlined /> : <UpOutlined />}
                    onClick={handelToggleSimple}
                  />
                ) : null}
              </span>
              <div
                className={'settingStyle'}
                onClick={() => {
                  setIsSimple(true);
                }}
              >
                <DndList TableContext={TableContext} />
              </div>
            </div>
          </Col>
        </Row>
        <Row span={24}>
          <Col span={24}>{isSimple ? null : advanceForm}</Col>
        </Row>
      </div>
    </>
  );
};

export default memo(TableBarApp);
