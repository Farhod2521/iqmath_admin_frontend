import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: any = {
  parallelGateways: []
}

const parallelSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setParallels: (state, action) => {
      state.parallelGateways = action.payload
    },
    addParallel: (state, action) => {
      state.parallelGateways = [...state.parallelGateways, action.payload]
    },
    removeParallel: (state, action) => {
      state.parallelGateways = state.parallelGateways.filter((a: any) => a.id !== action.payload.id)
    },
    updateParallel: (state, action) => {
      state.parallelGateways = state.parallelGateways.map((act: any) =>
        act.id === action.payload.id ? { ...act, ...action.payload } : act
      )
    },
    clearParallel: (state) => {
      state.parallelGateways = []
    },
    clearOnSignOut: (state) => {
      state.parallelGateways = initialState.parallelGateways
    }
  }
})

export const { setParallels, addParallel, removeParallel, updateParallel, clearParallel, clearOnSignOut } =
  parallelSlice.actions

export const selectParallel = (state: any) => state.parallel.parallelGateways

export default parallelSlice.reducer
