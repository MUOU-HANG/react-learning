import React from 'react'
// import { Input, Checkbox } from 'antd'
import InputApp from './Input'
import ListApp from './List'
import TotalApp from './Total'
import styles from './index.module.css'

export default function TodoList() {
  return (
    <>
      <div className={styles.container}>
        <InputApp />
        <ListApp />
        <TotalApp />

        {/* <Input placeholder='请输入你的任务名称，按回车键确认' />
        {todos.map((v) => (
          <div>
            <Checkbox key={v.id} onChange={handelCheckboxEvent(v.id)}>
              {v.value}
            </Checkbox>
          </div>
        ))}
        <Checkbox>
          已完成{todos.filter((item) => item.done === true).length}/全部
          {todos.length}
        </Checkbox> */}
      </div>
    </>
  )
}
