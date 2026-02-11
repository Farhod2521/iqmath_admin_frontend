import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  region: { name: '', soato: '', change: true },
  district: { name: '', soato: '', change: false },
  neighborhood: { name: '', id: '', change: false }
}

const areaSlice = createSlice({
  name: 'areaSlice',
  initialState,
  reducers: {
    setAreaRepublic: (state) => {
      state.region.change = true
      state.district.change = false
      state.neighborhood.change = false
    },
    setAreaRegion: (state, { payload }) => {
      state.region.change = false
      state.district.change = true
      state.neighborhood.change = false
      state.region.name = payload.name
      state.region.soato = payload.soato
    },
    setAreaDistrict: (state, { payload }) => {
      state.region.change = false
      state.district.change = false
      state.neighborhood.change = true
      state.district.name = payload.name
      state.district.soato = payload.soato
    },
    setAreaNeighborhood: (state, { payload }) => {
      state.region.change = false
      state.district.change = false
      state.neighborhood.change = true
      state.neighborhood.name = payload.name
      state.neighborhood.id = payload.id
    },
    setAreaReload: (state) => {
      state.region.soato = ''
      state.district.soato = ''
      state.neighborhood.id = ''
    }
  }
})

export const { setAreaRepublic, setAreaDistrict, setAreaNeighborhood, setAreaRegion, setAreaReload } = areaSlice.actions
export const selectAreaData = (state: { areaData: typeof initialState }) => state.areaData

export default areaSlice.reducer
