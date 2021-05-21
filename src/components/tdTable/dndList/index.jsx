import React, { useState, useEffect, useContext, memo } from 'react';
import { SettingOutlined } from '@ant-design/icons';
import { Checkbox, Popover, Button } from 'antd';
import './index.less';

import GroupCheckboxList from './groupcheckList';

const DndListApp = ({ TableContext }) => {
  const [indeterminate, setIndeterminate] = useState(false); // 是否部分选中
  const [checkAll, setCheckAll] = useState(false); // 是否全部选中
  const { columns, columnsInner, setColumnsInner, treeData, setTreeData } =
    useContext(TableContext);
  useEffect(() => {
    if (treeData?.length === 0) initTreeData();
  }, [columns]);

  useEffect(() => {
    let _columnsInner = [];
    // 更新表头字段
    treeData.forEach((treeItem) => {
      columnsInner.forEach((columnsItem) => {
        if (treeItem.title === columnsItem.title) {
          _columnsInner.push(columnsItem);
        }
      });
      const { title, fixed, show } = treeItem;
      _columnsInner.map((item) => {
        if (item.title === title) {
          item.show = show;
          item.fixed = fixed;
        }
        return item;
      });
    });
    setColumnsInner(_columnsInner);
  }, [treeData]);

  useEffect(() => {
    // 处理treeData的全选、部分选的状态
    if (treeData && columnsInner) {
      const treeDataLength = treeData.length;
      const columnsInnerLength = columnsInner.filter(
        (item) => item.show
      ).length;
      if (columnsInnerLength !== 0 && treeDataLength !== columnsInnerLength)
        setIndeterminate(true);
      if (treeDataLength === columnsInnerLength) {
        setCheckAll(true);
        setIndeterminate(false);
      }
      if (columnsInnerLength === 0) {
        setCheckAll(false);
        setIndeterminate(false);
      }
    }
  }, [treeData, columnsInner]);

  const initTreeData = () => {
    // 初始化数据，通过columns数据构造tree数据，使其符合tree的数据结构
    let _columns = [];
    try {
      columns.forEach((item, index) => {
        _columns.push({
          title: item.title,
          key: index,
          value: item.title,
          fixed: item.fixed,
          show: true,
          checkable: true,
        });
      });
    } catch (e) {
      console.log('未传入字段');
    }
    setTreeData(_columns);
  };

  // 处理全选
  const onCheckAll = ({ target }) => {
    const checkAll = target.checked;
    setCheckAll(checkAll);
    if (treeData) {
      const _treeData = treeData;
      _treeData.map((item) => (item.show = checkAll));
      setTreeData([..._treeData]);
    }
  };

  // 列表勾选项触发后的事件
  const handelCheckboxEvent = (treeData) => {
    setTreeData(treeData);
  };

  // 重置按钮
  const handelReset = () => {
    initTreeData();
  };
  return (
    <>
      <Popover
        placement='bottomRight'
        title={
          <>
            <Checkbox
              indeterminate={indeterminate}
              // checkAll={checkAll}
              checked={checkAll}
              onChange={onCheckAll}
            >
              <span>列展示</span>
            </Checkbox>
            <Button type='link' onClick={handelReset}>
              重置
            </Button>
          </>
        }
        trigger='click'
        content={
          <GroupCheckboxList
            treeData={treeData}
            TableContext={TableContext}
            handelCheckboxEvent={handelCheckboxEvent}
          />
        }
      >
        <SettingOutlined style={{ fontSize: '16px', marginLeft: 10 }} />
      </Popover>
    </>
  );
};

export default memo(DndListApp);
