import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: any = {
  relations: []
}

const relationSlice = createSlice({
  name: 'relationSlice',
  initialState,
  reducers: {
    setRelations: (state, action) => {
      state.relations = action.payload
    },
    addRelation: (state, action) => {
      state.relations = [...state.relations, action.payload]
    },
    removeRelation: (state, action) => {
      state.relations = state.relations.filter((a: any) => a.id !== action.payload.id)
    },
    removeRelationTarget: (state, action) => {
      state.relations = state.relations.filter((a: any) => a.target !== action.payload.target)
    },
    removeRelationSource: (state, action) => {
      state.relations = state.relations.filter((a: any) => a.source !== action.payload.source)
    },
    updateRelation: (state, action) => {
      state.relations = state.relations.map((relation: any) =>
        relation.id === action.payload.id ? { ...relation, quantity: relation.quantity - 1 } : relation
      )
    },
    clearRelation: (state) => {
      state.relations = []
    },
    clearOnSignOut: (state) => {
      state.relations = initialState.relations
    }
  }
})

export const { setRelations, addRelation, removeRelation, updateRelation, clearRelation, clearOnSignOut } =
  relationSlice.actions

export const selectRelation = (state: any) => state.relation.relations

export default relationSlice.reducer
