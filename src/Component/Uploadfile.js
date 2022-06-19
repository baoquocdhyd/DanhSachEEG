import { useState, useEffect, useLayoutEffect } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import axios from '../axios.js'
import React from 'react'
// import img1 from '../assets/image/IMG_2434.jpg'

const Uploadfile = () => {
  const [a, setA] = useState()
  const [file, setFile] = useState()
  const [fileName, setFileName] = useState('')

  const saveFile = (e) => {
    setFile(e.target.files[0])
    setFileName(e.target.files[0].name)
  }

  const uploadFile = async (e) => {
    const formData = {'file':file}
    // formData.append('file', file)
    // formData.append('fileName', fileName)
    console.log('formData', formData)

    try {
      const res = await axios.post( "http://localhost:3000/upload",formData);
      console.log(res);
    } catch (ex) {
      console.log(ex)
    }
  }
  console.log('file', file)
  console.log('fileName', fileName)
  return (
    <div>
      <Form.Group className="">
        <Form.Label>Hình ảnh</Form.Label>
        <Form.Control
          type="file"
          size="sm"
					className="mb-3"
          style={{ width: '250px' }}
          onChange={saveFile}
        />
        <Button
          variant="primary"
          size="sm"
          className="mb-3"
					onClick={uploadFile}
        >
          Upload File
        </Button>
        <div
          style={{
            backgroundImage: ``,
            height: '100px',
            width: '150px',
            backgroundSize: '50%',
            backgroundRepeat: 'no-repeat',
            border: ' 1px solid',
          }}></div>
      </Form.Group>
      
     
    </div>
  )
}

export default Uploadfile


// https://www.tutsmake.com/react-js-node-js-file-upload-tutorial-with-example/