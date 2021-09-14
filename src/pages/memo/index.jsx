import React, { useState, useEffect, useMemo, memo } from 'react'

const SonA = (props) => {
  console.log(props)
  const [ num, setNum ] = useState(0)

  useEffect(() => {
    console.log('sona 的值改变了')
  })
  return (
    <>
      <div>son ---- {num}</div>
      <button
        onClick={() => {
          setNum(num + 1)
        }}
      >
        点击更改sona的值
      </button>
    </>
  )
}
// SonA.propTypes = {
//   name: PropTypes.string,
// }
const SonB = () => {
  const [ num, setNum ] = useState(0)
  useEffect(() => {
    console.log('sonb 的值改变了')
  })
  return (
    <>
      <div>son ---- {num}</div>
      <button
        onClick={() => {
          setNum(num + 1)
        }}
      >
        点击更改sonb的值
      </button>
    </>
  )
}

const MemoDemo = () => {
  const [ num, setNum ] = useState(0)
  useMemo(() => {
    return num
  }, [ num ])
  return (
    <div>
      <SonA name={12} />
      <SonB />
      father--{num}
      <button
        onClick={() => {
          setNum(num + 1)
        }}
      >
        点击改变父组件的值
      </button>
    </div>
  )
}

export default memo(MemoDemo)
