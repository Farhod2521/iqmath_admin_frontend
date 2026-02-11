import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  headTail: [
    {
      id: '1',
      type: 'start', // input node
      data: { label: 'Input Node' },
      position: { x: 24, y: 24 }
    }
  ]
}

const headTailSlice = createSlice({
  name: 'headTailSlice',
  initialState,
  reducers: {
    setHeadTail: (state, action) => {
      state.headTail = action.payload
    },
    addTail: (state, action) => {
      state.headTail = [...state.headTail, action.payload]
    },
    removeTail: (state, action) => {
      state.headTail = state.headTail.filter((a) => a.id !== action.payload.id)
    },
    updateHeadTail: (state, action) => {
      state.headTail = state.headTail.map((act) => (act.id === action.payload.id ? { ...act, ...action.payload } : act))
    },
    clearHeadTail: (state) => {
      state.headTail = []
    },
    clearOnSignOut: (state) => {
      state.headTail = initialState.headTail
    }
  }
})

export const { setHeadTail, addTail, removeTail, updateHeadTail, clearHeadTail, clearOnSignOut } = headTailSlice.actions

export const selectHeadTail = (state: any) => state.headTail.headTail

export default headTailSlice.reducer
