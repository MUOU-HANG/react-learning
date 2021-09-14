import React from 'react'
import { Reducer } from './reducer'
import Text1 from './Text1'
import Text2 from './Text2'
function HookRedux() {
  return (
    <div>
      <Reducer>
        <Text1 />
        <Text2 />
      </Reducer>
    </div>
  )
}

export default HookRedux
