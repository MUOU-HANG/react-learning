import React, { useState, useEffect } from 'react'
import CheckBoxList from '../checkBoxList'

const GroupCheckListApp = ({ treeData = [], handelCheckboxEvent }) => {
  const [ leftList, setLeftList ] = useState([]) // 固定在左侧（列首）
  const [ rightList, setRightList ] = useState([]) // 固定在右侧（列尾）
  const [ noFixed, setNoFixed ] = useState([]) // 不固定

  const handelSortTreeData = (treeData) => {
    // 数据分类处理
    let _leftList = [] // 固定在左边
    let _rightList = [] // 固定在右边
    let _noFixed = [] // 不固定
    if (treeData) {
      treeData.map((item) => {
        if (item.fixed) {
          if (item.fixed === 'left') _leftList.push(item)
          if (item.fixed === 'right') _rightList.push(item)
        } else {
          _noFixed.push(item)
        }
        return true
      })
      setLeftList(_leftList)
      setRightList(_rightList)
      setNoFixed(_noFixed)
    }
    const _treeData = [ ..._leftList, ..._noFixed, ..._rightList ]
    return _treeData
  }

  useEffect(() => {
    handelSortTreeData(treeData)
  }, [ treeData ])

  const handelConcatList = (type, list) => {
    if (type === 'left') setLeftList(list)
    if (type === 'right') setRightList(list)
    if (type === undefined) setNoFixed(list)
    // 更新列表勾选状态
    const _treeData = handelSortTreeData([
      ...leftList,
      ...noFixed,
      ...rightList
    ])
    handelCheckboxEvent(_treeData)
  }

  return (
    <>
      <CheckBoxList
        handelConcatList={handelConcatList}
        title={noFixed?.length !== 0 ? '不固定' : ''}
        treeData={noFixed}
        type={undefined}
      />
      <CheckBoxList
        handelConcatList={handelConcatList}
        title={leftList?.length !== 0 ? '固定在首部' : ''}
        treeData={leftList}
        type="left"
      />
      <CheckBoxList
        handelConcatList={handelConcatList}
        title={rightList?.length !== 0 ? '固定在尾部' : ''}
        treeData={rightList}
        type="right"
      />
    </>
  )
}

export default GroupCheckListApp
