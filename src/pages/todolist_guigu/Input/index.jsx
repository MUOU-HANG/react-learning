import React from 'react'
import { Input } from 'antd'

export default function InputApp({ todos, changeTodos }) {
  const handelAddTodoToArr = (e) => {
    const { target, keyCode } = e
    if (keyCode === 13) {
      const newTodos = {
        id: todos.length + 1,
        done: false,
        value: target.value
      }
      changeTodos([ newTodos, ...todos ])
    }
  }

  return (
    <div>
      <Input
        onKeyDown={handelAddTodoToArr}
        placeholder="请输入你的任务名称，按回车键确认"
      />
    </div>
  )
}
