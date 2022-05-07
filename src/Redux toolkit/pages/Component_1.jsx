import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {ADD_HOBBY, SET_ACTIVE_HOBBY} from '../reducers/reducer_1.js' 
import Component_2 from './Component_2' 
import casual from "casual-browserify";
const  Component_1 =  () => {
  const list = useSelector(state => state.photo_2.list)
  const activeId = useSelector(state => state.photo_2.activeId)
  const dispatch = useDispatch()
  const A = () => {
    const r = {
      id: casual.uuid,
      title: casual.title, }  
    const action = ADD_HOBBY(r)
    dispatch(action)
  } 


 

let {name, age} = {name: "Quốc", age: 40}
console.log(name) 
console.log(age) 

  return(
    <div className='home-page'>
      <h1>HomePage</h1> 
      <button onClick = {A}>Random</button> 
      <Component_2 
        list = {list} 
        activeId = {activeId} 
        Click = {(a) => {dispatch(SET_ACTIVE_HOBBY(a))} }
      ></Component_2>
    </div> 
  )
}
export default Component_1

