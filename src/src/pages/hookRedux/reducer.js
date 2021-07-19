import React,{ createContext, useReducer } from 'react'
export const MyContext = createContext()

const reducer = (state, action) => {
  console.log(state, action)
  switch (action.type) {
    case 'setName':
      return { ...state, name: action.name }
    case 'setAge':
      return { ...state, age: action.age }
    default:
      return state
  }
}

const data = { name: 'lili', age: 12 }
export const Reducer = (props) => {
  const [ state, dispatch ] = useReducer(reducer, data)
  return (
    <>
      <MyContext.Provider value={{ state, dispatch }}>
        {props.children}
      </MyContext.Provider>
    </>
  )
}
