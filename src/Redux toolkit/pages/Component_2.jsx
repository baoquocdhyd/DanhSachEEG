import React from "react";
import './Component_2.scss'
const Component_2 = (props) =>{
  return(
    <div className='home-page'>
		{props.list.map((a,b) => {
			return (
			<ul key = {b}>
				<li 
				onClick = {() => {props.Click(a)} }
				className = {a.id == props.activeId ? 'active' : ''}
				>{a.title}</li>
			</ul> 
			)
		} )}
    </div> 
  )
}
export default Component_2