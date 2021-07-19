const initState = 0
export function countReducer(preState = initState, action) {
  const { count, type } = action
  switch (type) {
    case 'add':
      return preState + count
    case 'del':
      return preState - count
    default:
      return preState
  }
}
