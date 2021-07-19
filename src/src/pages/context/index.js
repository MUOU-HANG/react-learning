import React, {
  createContext,
  useContext,
  useState,
  createRef,
  forwardRef
} from 'react'
import { withRouter } from 'react-router-dom'
const PublicState = createContext()
const ShowValue = () => {
  const ref = createRef()
  console.log(ref)
  return (
    <div>
      father:{PublicState.name}
      <ShowChildrenValue />
      <ShowData ref={ref}>ref test</ShowData>
    </div>
  )
}
const ShowData = forwardRef((props, ref) => (
  <button ref={ref}>{props.children}</button>
))
const ShowChildrenValue = forwardRef((props, ref) => {
  const context = useContext(PublicState)
  const handelDataChange = () => {
    context.handelDataChange({ name: 'lisi' })
  }
  return (
    <div>
      children:{context.data.name}
      <br />
      <button onClick={handelDataChange}
        ref={ref}
      >
        change data
      </button>
    </div>
  )
})
const App = () => {
  const [ data, setData ] = useState({ name: 'zhangsan' })
  const handelDataChange = (value) => {
    setData(value)
  }
  return (
    <PublicState.Provider value={{ data, handelDataChange }}>
      <ShowValue />
    </PublicState.Provider>
  )
}

export default withRouter(App)
