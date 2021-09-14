import React, { useContext, useState } from 'react'
import { MyContext } from './MyContext'

function Child() {
  console.log('子组件更新了！')
  const [ count, setCount ] = useState(0)
  const state = useContext(MyContext)
  return (
    <>
      <div>收到的数据是：{state}</div>
      <div>
        子组件的数据：{count}
        <button
          onClick={() => {
            setCount(count + 1)
          }}
        >
          改变子组件的数据
        </button>
      </div>
    </>
  )
}

export default Child
