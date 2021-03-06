import { Input, Button, List } from 'antd'
import React, { useState } from 'react'
import './index.css'
let todolistdata = [
  { id: 1, value: '坚持打卡1', done: false },
  { id: 2, value: '坚持打卡2', done: true },
  { id: 3, value: '坚持打卡3', done: false },
  { id: 4, value: '坚持打卡4', done: false }
]
function TodoHookAPP() {
  const [ todoList ] = useState(todolistdata)
  const [ value, setValue ] = useState('')

  // 回车键操作
  function handelPressEnter(e) {
    const todoItem = {
      id: todoList.length + 1,
      value: e.target.value,
      done: false
    }
    todoList.push(todoItem)
    setValue('')
  }

  return (
    <div className="todo-box">
      <div className="todo-form">
        <h1>MY TODOLIST (HOOK)</h1>
        <Input
          onChange={(e) => setValue(e.target.value)}
          onPressEnter={handelPressEnter}
          placeholder="请输入todo事项，按回车键入"
          type="text"
          value={value}
        ></Input>
      </div>
      <TodoItem value={todoList} />
    </div>
  )
}

function TodoItem(props) {
  const [ todos, setTodos ] = useState(props.value)
  // 删除操作
  function handelDelete(id) {
    const newTodos = todos.filter((item) => {
      return item.id !== id
    })
    setTodos(newTodos)
  }
  // 完成操作
  function handelDone(id) {
    const newTodos = todos.map((item) => {
      if (item.id === id) item.done = true
      return item
    })
    setTodos(newTodos)
  }
  return (
    <div className="todo-list">
      <List
        bordered
        dataSource={todos}
        renderItem={(item) => (
          <List.Item

            actions={[
              <Button danger
                key="1"
                onClick={() => handelDelete(item.id)}
                type="text"
              >
                delete
              </Button>,
              <Button key="2"
                onClick={() => handelDone(item.id)}
                type="text"
              >
                done
              </Button>
            ]}
            className={item.done ? 'todo-done' : ''}
          >
            {item.value}
          </List.Item>
        )}
      />
    </div>
  )
}

export default TodoHookAPP
