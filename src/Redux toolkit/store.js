import { configureStore } from "@reduxjs/toolkit";
import photo_1 from './reducers/reducer_1.js' 
const rootReducer = {
	photo_2 : photo_1,
} 
const store = configureStore({
	reducer: rootReducer,
})
export default store ;