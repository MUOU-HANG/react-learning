import React, { useEffect, useState } from 'react'
import { Checkbox } from 'antd'
import Pubsub from 'pubsub-js'

export default function TotalApp() {
  let [ todos ] = useState([])
  const [ todosLength, setTodosLength ] = useState(0)
  const [ doneLength, setDoneLength ] = useState(0)
  useEffect(() => {
    Pubsub.subscribe('todos', (_, data) => {
      todos = data
      setTodosLength(data.length)
      setDoneLength(data.reduce((prev, todo) => prev + (todo.done ? 1 : 0), 0))
    })
  }, [])

  // const doneLength = todos.filter((item) => item.done === true).length
  const handelTotalCheckbox = (e) => {
    console.log(todos)
    const newTodos = todos.map((item) => {
      item.done = e.target.checked
      return item
    })
    console.log(newTodos)
    Pubsub.publish('todos', newTodos)
  }
  return (
    <div style={{ display: todosLength === 0 ? 'none' : 'block' }}>
      <Checkbox
        checked={todosLength === doneLength}
        onChange={handelTotalCheckbox}
      >
        已完成{doneLength}/全部{todosLength}
      </Checkbox>
    </div>
  )
}
