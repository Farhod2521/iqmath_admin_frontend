import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Node, Edge } from 'react-flow-renderer'

export const initialFields = [
  {
    id: 17,
    label: 'Bino va inshoatga bo‘lgan huquq',
    fieldType: 'radio',
    optionsList: [
      { id: 24, label: "E'tirof etilmagan", value: '0' },
      { id: 23, label: "E'tirof etilgan", value: '1' }
    ]
  },
  {
    id: 20,
    label: 'Bogʻdorchilik shirkati aʼzosi',
    fieldType: 'radio',
    optionsList: [
      { id: 47, label: 'Aʼzosi emas', value: '0' },
      { id: 21, label: 'Aʼzosi', value: '1' }
    ]
  },
  {
    id: 21,
    label: 'Yer uchastkasi ajratilganligi',
    fieldType: 'radio',
    optionsList: [
      { id: 26, label: 'Ajratilmagan', value: '0' },
      { id: 25, label: 'Ajratilgan', value: '1' }
    ]
  },
  { id: 45, label: 'Xulosa fayli', fieldType: 'file', optionsList: [] },
  { id: 66, label: 'Qurilgan yili', fieldType: 'number', optionsList: [] },
  { id: 67, label: 'Qaror raqami', fieldType: 'string', optionsList: [] },
  { id: 68, label: 'Qaror sanasi', fieldType: 'date', optionsList: [] },
  { id: 75, label: 'Jamoatchilik dalolatnomasi', fieldType: 'file', optionsList: [] }
]

interface FlowState {
  list: any
  nodes: Node[]
  edges: Edge[]
  selectedOptionsMap: Record<string, Record<string, string[]>>
}
const emptySelectedOptions = {}

const initialState: FlowState = {
  list: initialFields,
  nodes: [{ id: 'flow-start', type: 'flowNode', position: { x: 0, y: 0 }, data: initialFields }],
  edges: [],
  selectedOptionsMap: emptySelectedOptions
}

const flowSlice = createSlice({
  name: 'group-flow',
  initialState,
  reducers: {
    setGroupList(state, action: PayloadAction<any[]>) {
      state.list = action.payload
    },
    setGroupNodes(state, action: PayloadAction<Node[]>) {
      state.nodes = action.payload
    },
    setGroupEdges(state, action: PayloadAction<Edge[]>) {
      state.edges = action.payload
    },
    addGroupEdge(state, action: PayloadAction<Edge>) {
      state.edges.push(action.payload)
    },
    addGroupNode(
      state,
      action: PayloadAction<{ id: string; type: string; position: { x: number; y: number }; data?: any }>
    ) {
      const newNode: Node = {
        id: action.payload.id,
        type: action.payload.type,
        position: action.payload.position,
        data: action.payload.data || {}
      }
      state.nodes.push(newNode)
    },
    removeGroupNode(state, action: PayloadAction<string>) {
      state.nodes = state.nodes.filter((node) => node.id !== action.payload)
    },
    removeGroupEdge(state, action: PayloadAction<string>) {
      state.edges = state.edges.filter((edge) => edge.id !== action.payload)
    },
    removeMultipleGroupNodes(state, action: PayloadAction<string[]>) {
      state.nodes = state.nodes.filter((node) => !action.payload.includes(node.id))
    },
    removeMultipleGroupEdges(state, action: PayloadAction<string[]>) {
      state.edges = state.edges.filter((edge) => !action.payload.includes(edge.id))
    },
    updateSelectedOptions(state, action: PayloadAction<{ nodeId: string; selectedOptions: Record<string, string[]> }>) {
      state.selectedOptionsMap[action.payload.nodeId] = action.payload.selectedOptions
    }
  }
})

export const {
  setGroupList,
  setGroupNodes,
  setGroupEdges,
  addGroupNode,
  addGroupEdge,
  removeGroupNode,
  removeGroupEdge,
  removeMultipleGroupNodes,
  removeMultipleGroupEdges,
  updateSelectedOptions
} = flowSlice.actions
export default flowSlice.reducer

export const selectGroupNodes = (state: { flowGroup: FlowState }) => state.flowGroup.nodes
export const selectGroupEdges = (state: { flowGroup: FlowState }) => state.flowGroup.edges
export const selectGroupList = (state: { flowGroup: FlowState }) => state.flowGroup.list

export const selectSelectedOptionsMap = (state: { flowGroup: FlowState }) => state.flowGroup.selectedOptionsMap

export const selectSelectedOptionsByNodeId = (nodeId: string) => (state: { flowGroup: FlowState }) =>
  state.flowGroup.selectedOptionsMap[nodeId] || emptySelectedOptions
