import React, { useState, useEffect } from 'react'
import Pubsub from 'pubsub-js'
import { Checkbox, Button } from 'antd'
import styles from '../index.module.css'

export default function ListApp() {
  const [ todos, setTodos ] = useState([
    { id: 1, done: false, value: '吃饭' },
    { id: 2, done: false, value: '睡觉' },
    { id: 3, done: false, value: '打豆豆' }
  ])
  Pubsub.publish('todos', todos)
  useEffect(() => {
    Pubsub.subscribe('todos', (_, data) => {
      setTodos(data)
    })
  }, [])
  const changeTodos = (newTodos) => {
    setTodos(newTodos)
  }
  const handelCheckboxEvent = (i) => {
    return (event) => {
      const newTodos = todos.map((todo) => {
        if (todo.id === i) {
          todo.done = event.target.checked
        }
        return todo
      })
      changeTodos(newTodos)
    }
  }
  const handelDel = (id) => {
    return () => {
      const newTodos = todos.filter((todo) => todo.id !== id)
      changeTodos(newTodos)
    }
  }
  return (
    <div className={styles.checkboxs}>
      {todos.map(({ id, value, done }) => (
        <div className={styles.checkbox}
          key={id}
        >
          <Checkbox
            checked={done}
            className={done ? styles.textGrey : ''}
            onChange={handelCheckboxEvent(id)}
          >
            {value}
          </Checkbox>
          <Button className={styles.btn}
            onClick={handelDel(id)}
            type="link"
          >
            删除
          </Button>
        </div>
      ))}
    </div>
  )
}
