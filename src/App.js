import './App.css'
import React from 'react'
import { ToastContainer, toast } from 'react-toastify'

// import Component_1 from "./Redux toolkit/pages/Component_1.jsx";
import C1 from './Component/C1.js'

// import C2 from "./Component/C2";
function App() {
  return (
    <div>
      <C1 />
      {/* <ThuchanhMUI/> */}
      {/* <DataTable/> */}
      {/* <Component_1/> */}

      {/* <C2 /> */}
      {/* <h1>Hello</h1> */}

      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  )
}

export default App
