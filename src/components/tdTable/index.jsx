import React, { createContext, useState, useEffect, memo } from 'react';
import { ConfigProvider } from 'antd';

import zhCN from 'antd/es/locale/zh_CN';
import TableBody from './tableBody';
import TableBar from './tableBar';
import './index.less';

const TableContext = createContext();
const { Provider } = TableContext;

const TdTableApp = (props) => {
  const { width = '95%', columns } = props;
  const [selectedData, setSelectedData] = useState([]); // 存储勾选的数据
  const [columnsInner, setColumnsInner] = useState([]); // 转换表头字段
  const [treeData, setTreeData] = useState([]);

  const propsContext = {
    ...props,
    treeData,
    setTreeData,
    selectedData,
    setSelectedData,
    columnsInner,
    setColumnsInner,
  };

  useEffect(() => {
    try {
      if (treeData.length === 0) {
        const _columns = Object.assign(columns);
        setColumnsInner(_columns);
        _columns.map((item) => (item.show = true));
      }
    } catch (e) {
      console.log('未传入表头字段');
    }
  }, [columns]);

  return (
    <>
      <Provider value={{ ...propsContext }}>
        <div style={{ width, margin: '20px auto' }}>
          <ConfigProvider locale={zhCN}>
            <TableBar TableContext={TableContext} customForm={props.children} />
            <TableBody TableContext={TableContext} />
          </ConfigProvider>
        </div>
      </Provider>
    </>
  );
};

export default memo(TdTableApp);
