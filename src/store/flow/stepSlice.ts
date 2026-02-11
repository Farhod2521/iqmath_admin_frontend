import { createSlice } from '@reduxjs/toolkit'

const initialState: any = {
  steps: []
}

const stepSlice = createSlice({
  name: 'stepSlice',
  initialState,
  reducers: {
    setSteps: (state, action) => {
      state.steps = action.payload
    },
    addStep: (state, action) => {
      state.steps = [...state.steps, action.payload]
    },
    removeStep: (state, action) => {
      state.steps = state.steps.filter((a: any) => a.id !== action.payload.id)
    },
    updateStep: (state, action) => {
      state.steps = state.steps.map((act: any) => (act.id === action.payload.id ? { ...act, ...action.payload } : act))
    },
    clearStep: (state) => {
      state.steps = []
    },
    clearOnSignOut: (state) => {
      state.steps = initialState.steps
    }
  }
})

export const { setSteps, addStep, removeStep, updateStep, clearStep, clearOnSignOut } = stepSlice.actions

export const selectSteps = (state: any) => state.steps.steps

export default stepSlice.reducer
