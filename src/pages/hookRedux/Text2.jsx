import React, { useContext } from 'react'
import { MyContext } from './reducer'
function Text2() {
  const { state, dispatch } = useContext(MyContext)
  return (
    <>
      <h2>text2的数据展示</h2>
      <div>
        <span>
          名字：{state?.name},年龄：{state?.age}
        </span>
        <button
          onClick={() => {
            dispatch({ type: 'setAge', age: 23 })
          }}
        >
          更改信息
        </button>
      </div>
    </>
  )
}

export default Text2
