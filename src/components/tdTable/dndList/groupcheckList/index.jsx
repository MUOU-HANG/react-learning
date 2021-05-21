import React, { useState, useEffect } from 'react';
import CheckBoxList from '../checkBoxList';

const GroupCheckListApp = ({ treeData = [], handelCheckboxEvent }) => {
  const [leftList, setLeftList] = useState([]); // 固定在左侧（列首）
  const [rightList, setRightList] = useState([]); // 固定在右侧（列尾）
  const [noFixed, setNoFixed] = useState([]); // 不固定
  useEffect(() => {
    handelSortTreeData(treeData);
  }, [treeData]);

  const handelSortTreeData = (treeData) => {
    // 数据分类处理
    let _leftList = []; // 固定在左边
    let _rightList = []; // 固定在右边
    let _noFixed = []; // 不固定
    if (treeData) {
      treeData.map((item) => {
        if (item.fixed) {
          if (item.fixed === 'left') _leftList.push(item);
          if (item.fixed === 'right') _rightList.push(item);
        } else {
          _noFixed.push(item);
        }
        return true;
      });
      setLeftList(_leftList);
      setRightList(_rightList);
      setNoFixed(_noFixed);
    }
    const _treeData = [..._leftList, ..._noFixed, ..._rightList];
    return _treeData;
  };

  const handelConcatList = (type, list) => {
    if (type === 'left') setLeftList(list);
    if (type === 'right') setRightList(list);
    if (type === undefined) setNoFixed(list);
    // 更新列表勾选状态
    const _treeData = handelSortTreeData([
      ...leftList,
      ...noFixed,
      ...rightList,
    ]);
    handelCheckboxEvent(_treeData);
  };

  return (
    <>
      <CheckBoxList
        title={noFixed?.length !== 0 ? '不固定' : ''}
        type={undefined}
        treeData={noFixed}
        handelConcatList={handelConcatList}
      />
      <CheckBoxList
        title={leftList?.length !== 0 ? '固定在首部' : ''}
        type='left'
        treeData={leftList}
        handelConcatList={handelConcatList}
      />
      <CheckBoxList
        title={rightList?.length !== 0 ? '固定在尾部' : ''}
        type='right'
        treeData={rightList}
        handelConcatList={handelConcatList}
      />
    </>
  );
};

export default GroupCheckListApp;
