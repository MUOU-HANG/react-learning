import { Button } from 'antd'
import React, { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import axios from 'axios'
import store from '../redux/store'
import Child from './Child'
import { MyContext } from './MyContext'
import { getTableData } from '../../service'

const TestApp = () => {
  const { t, i18n } = useTranslation()
  const [ count, setCount ] = useState(0)
  const [ num, setNum ] = useState(0)
  const inputRef = useRef(null)
  const save = useRef({ value: '123' })
  const add = () => {
    setCount(count + 1)
  }
  function handelAlert() {
    setTimeout(() => { alert('Your count is:' + count) }, 3000)
  }

  function handelSubmit() {
    axios.get('/api/item/马云/6252').then((res, err) => {
      console.log(res)
      console.log(err)
    })
  }

  function handelAdd() {
    store.dispatch({ type: 'add', count: 1 })
  }

  useEffect(() => {
    return () => {}
  })

  function handelClick() {
    const bug = true
    if (bug) {
      console.log(' clicked!')
    } else {
      console.log('no clicked!')
    }
  }

  return (
    <>
      <h2>1. 中英文切换</h2>
      <Button
        onClick={() => {
          i18n.changeLanguage(i18n.language === 'zh-CN' ? 'en' : 'zh-CN')
        }}
      >
        切换中/英文
      </Button>
      <h1>{t('help')}</h1>
      <hr />

      <h2>2. 加1操作</h2>
      <h3>{count}</h3>
      <button onClick={add}>click me</button>
      <button
        onClick={() => {
          setNum(num + 1)
        }}
      >
        click me
      </button>
      <button onClick={handelAlert}>alert me</button>
      <hr />

      <h2>3. 数据请求操作</h2>
      <input placeholder="please enter name" />
      <button onClick={handelSubmit}>search</button>
      <hr />

      <h2>4. Redux的使用</h2>
      <h3>当前统计的和是{store.getState()}</h3>
      <button onClick={handelAdd}>点我加1</button>
      <hr />

      <h2>5. useRef的使用</h2>
      <input ref={inputRef} />
      <button
        onClick={() => {
          console.log(inputRef)
        }}
      >
        获取Ref节点
      </button>
      <button
        onClick={() => {
          save.current.value = inputRef.current.value
          console.log(save)
        }}
      >
        获取输入框的值
      </button>
      <hr />
      <h2>6. useContext的使用</h2>
      <MyContext.Provider value={count}>
        <Child />
      </MyContext.Provider>
      <button
        onClick={() => {
          setCount(count + 1)
        }}
      >
        点击count加1
      </button>
      <hr />
      <h2>7. 数据请求的封装</h2>
      <button onClick={async() => {
        getTableData()
        // const { data } = await getTableData()
        // console.log(data)
      }}
      >异步获取数据</button>
      <hr />
      <h2>8. 标签测试</h2>
      <button onClick={handelClick}>babel test</button>

    </>
  )
}

export default TestApp
