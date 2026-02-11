import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  region: { name: '', soato: '', change: true },
  district: { name: '', soato: '', change: false },
  neighborhood: { name: '', id: '', change: false }
}

const categorySlice = createSlice({
  name: 'categorySlice',
  initialState,
  reducers: {
    setCategoryRepublic: (state) => {
      state.region.change = true
      state.district.change = false
      state.neighborhood.change = false
    },
    setCategoryRegion: (state, { payload }) => {
      state.region.change = false
      state.district.change = true
      state.neighborhood.change = false
      state.region.name = payload.name
      state.region.soato = payload.soato
    },
    setCategoryDistrict: (state, { payload }) => {
      state.region.change = false
      state.district.change = false
      state.neighborhood.change = true
      state.district.name = payload.name
      state.district.soato = payload.soato
    },
    setCategoryNeighborhood: (state, { payload }) => {
      state.region.change = false
      state.district.change = false
      state.neighborhood.change = true
      state.neighborhood.name = payload.name
      state.neighborhood.id = payload.id
    },
    setCategoryReload: (state) => {
      state.region.soato = ''
      state.district.soato = ''
      state.neighborhood.id = ''
    }
  }
})

export const {
  setCategoryRepublic,
  setCategoryDistrict,
  setCategoryNeighborhood,
  setCategoryRegion,
  setCategoryReload
} = categorySlice.actions
export const selectCategoryData = (state: { categoryData: typeof initialState }) => state.categoryData

export default categorySlice.reducer
