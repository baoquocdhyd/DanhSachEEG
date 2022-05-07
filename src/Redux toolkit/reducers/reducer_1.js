import {createSlice} from '@reduxjs/toolkit'


let hR = createSlice ( {
  name: 'hRs',
  initialState: {
    list: [],
    activeId: null,
  },
  reducers: { 
    ADD_HOBBY : (state, action) => {
      state.list.push(action.payload)  } ,
    SET_ACTIVE_HOBBY: (state, action) => {
     state.activeId= action.payload.id } ,
  }
}) 
const {reducer, actions} = hR 
export const {ADD_HOBBY, SET_ACTIVE_HOBBY} = actions
export default reducer  