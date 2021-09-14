import React, { useContext } from 'react'
import { MyContext } from './reducer'
function Text1() {
  const { state, dispatch } = useContext(MyContext)
  return (
    <>
      <h2>text1的数据展示</h2>
      <div>
        <span>
          名字：{state?.name},年龄：{state?.age}
        </span>
        <button
          onClick={() => {
            dispatch({ type: 'setName', name: 'text1' })
          }}
        >
          更改信息
        </button>
      </div>
    </>
  )
}

export default Text1
