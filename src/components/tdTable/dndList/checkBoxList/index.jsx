import React, { useState, useEffect } from 'react'
import {
  VerticalAlignBottomOutlined,
  VerticalAlignTopOutlined,
  VerticalAlignMiddleOutlined
} from '@ant-design/icons'
import { Tree, Tooltip } from 'antd'

// 拖拽列表分类组件
const CheckBoxList = (props) => {
  const { title, type, treeData, handelConcatList } = props
  const [ checkedKeys, setCheckedKeys ] = useState([])

  // 选中回显
  useEffect(() => {
    let _check = []
    treeData.forEach((item) => {
      if (item.show) _check.push(item.key)
    })
    setCheckedKeys(_check)
  }, [ treeData ])

  // 拖拽功能
  const onDrop = ({ dragNode, dragNodesKeys, node }) => {
    const _treeData = treeData
    // 删除原节点
    dragNodesKeys.forEach((element) => {
      _treeData.map((item, index) => item.key === element ? _treeData.splice(index, 1) : null
      )
    })
    // 插入新节点
    const __treeData = JSON.parse(JSON.stringify(_treeData))
    __treeData.map((list, index) => {
      if (list.key === node.key) {
        _treeData.splice(index + 1, 0, dragNode)
      }
      return _treeData
    })
    handelConcatList(type, [ ..._treeData ])
  }

  // 点击勾选时，更改表头
  const onCheck = (val) => {
    const _treeData = treeData
    _treeData.map(
      (item) => (item.show = val.includes(item.key) ? true : false)
    )
    setCheckedKeys(val)
    handelConcatList(type, [ ..._treeData ])
  }

  // 当点击取消/固定按钮时执行的动作
  const handelFixedEvent = (fixed, title) => {
    const _treeData = treeData
    _treeData.map((item) => {
      if (item.title === title) {
        item.fixed = fixed
      }
      return item
    })
    handelConcatList(type, [ ..._treeData ])
  }
  return (
    <>
      <span style={{ marginLeft: 20, color: 'grey' }}>{title}</span>
      <Tree
        checkable
        checkedKeys={checkedKeys}
        draggable
        onCheck={onCheck}
        onDrop={onDrop}
        selectable={false}
        style={{ width: '100%' }}
        titleRender={(nodeData) => {
          return (
            <div className="listStyle">
              <span>{nodeData.title}</span>
              <span className="iconStyle">
                {type !== 'left' ? (
                  <Tooltip title="固定在列首">
                    <VerticalAlignBottomOutlined
                      onClick={(e) => {
                        handelFixedEvent('left', nodeData.title)
                        e.stopPropagation()
                      }}
                    />
                  </Tooltip>
                ) : null}

                {type !== 'right' ? (
                  <Tooltip title="固定在列尾">
                    <VerticalAlignTopOutlined
                      onClick={(e) => {
                        handelFixedEvent('right', nodeData.title)
                        e.stopPropagation()
                      }}
                    />
                  </Tooltip>
                ) : null}

                {type !== undefined ? (
                  <Tooltip title="不固定">
                    <VerticalAlignMiddleOutlined
                      onClick={(e) => {
                        handelFixedEvent(undefined, nodeData.title)
                        e.stopPropagation()
                      }}
                    />
                  </Tooltip>
                ) : null}
              </span>
            </div>
          )
        }}
        treeData={treeData}
      />
    </>
  )
}

export default CheckBoxList
