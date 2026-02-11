import { configureStore } from '@reduxjs/toolkit'
import authSlice from './auth/authSlice'
import themeSlice from './theme/themeSlice'
import headTailSlice from './flow/headTailSlice'
import stepSlice from './flow/stepSlice'
import relationSlice from './flow/relationSlice'
import parallelSlice from './flow/parallelSlice'
import modalFlowSlice from './flow/modalSlice'
import areaSlice from './dashboard/areaSlice'
import categorySlice from './dashboard/categorySlice'
import flowGroupSlice from './flow-group/flowGroupSlice'

const store = configureStore({
  reducer: {
    auth: authSlice,
    theme: themeSlice,
    headTail: headTailSlice,
    steps: stepSlice,
    relation: relationSlice,
    parallel: parallelSlice,
    flowModal: modalFlowSlice,
    areaData: areaSlice,
    categoryData: categorySlice,
    flowGroup: flowGroupSlice
  }
})

type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch

export type { RootState, AppDispatch }

export default store
