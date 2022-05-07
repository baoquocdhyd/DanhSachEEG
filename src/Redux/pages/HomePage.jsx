import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Component_2 from './Component_2' 
import casual from "casual-browserify";
import {action_1a, action_1b} from '../actions/action_1.js' 
// HomePage.propTypes = {};
const  HomePage =  () => {
  const list = useSelector(state => state.hobby.list)
  const activeId = useSelector(state => state.hobby.activeId)
  const dispatch = useDispatch()
  // thiết lập hàm thêm nội dung bằng cách random
  const A = () => {
    const r = {
      id: casual.uuid,
      title: casual.title, }  
    const action = action_1a(r)
      // {type: "ADD_HOBBY", payload: a };
    dispatch(action)
  } 
console.log(list) 
  //Hàm Click : truyền vào component con với tham số là dữ liệu  của từng dòng <li> được nhấn vào
  // const Click = (a) => {
  //   const action = action_2(a)
  //   dispatch(action_2(a))  } 
  // console.log('activeId',activeId) 
  return(
    <div className='home-page'>
      <h1>HomePage</h1> 
      <button onClick = {A}>Random</button> 
      <Component_2   //chèn component_2
        list = {list} 
        activeId = {activeId} 
        Click = {(a) => {dispatch(action_1b(a))} }
      ></Component_2>
    </div> 
  )
}
export default HomePage

