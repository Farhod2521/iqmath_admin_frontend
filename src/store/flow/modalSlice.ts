import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  open: false,
  source: null,
  currentElement: null,
  type: null
}

const modalFlowSlice = createSlice({
  name: 'modalFlowSlice',
  initialState,
  reducers: {
    flowOpenModal: (state, action) => {
      state.open = true
      state.source = action.payload
      state.currentElement = null
      state.type = action.payload.type
    },
    flowCloseModal: (state) => {
      state.open = false
      state.source = null
      state.currentElement = null
      state.type = null
    },
    flowToggleModal: (state) => {
      state.open = !state.open
    },
    flowEditModal: (state, action) => {
      state.open = true
      state.currentElement = action.payload
      state.type = action.payload.type
    }
  }
})

export const { flowOpenModal, flowCloseModal, flowToggleModal, flowEditModal } = modalFlowSlice.actions

export const selectFlowModal = (state: any) => state.flowModal

export default modalFlowSlice.reducer
