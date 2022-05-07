import React from "react";
// import PropTypes from 'prop-types' 
import './HobbyList.css'
// HobbyList.propTypes = {
// 	hobbyList: PropTypes.array,
// 	activeId : PropTypes.number,
// 	onHobbyClick: PropTypes.func,
// };
// HobbyList.defaultProps = {
// 	hobbyList: [],
// 	activeId: null, 
// 	onHobbyClick: null,
// }

const Component_2 = (props) =>{
	// const {hobbyList,activeId,onHobbyClick} = props
	
  return(
    <div className='home-page'>
    {/* <h1>HomePage 1111</h1>  */}

		{props.list.map((a,b) => {
			// console.log(a) 
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