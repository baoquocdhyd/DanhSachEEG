import { useState, useEffect, useLayoutEffect } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
// import axios from '../axios.js'
import axios from 'axios'
import React from 'react'
import img1 from '../assets/image/IMG_2030.jpg'
// import img2 from 'http://localhost:8080/src/public/image/IMG_2434.jpg'

const Uploadfile1 = () => {
  const [name, setName] = useState()
  const [file, setFile] = useState()
  const [postup, setPostup] = useState()
  const send = async () => {
    try {
      const data = new FormData()
      data.append('name', name)
      data.append('file', file)
      const res = await axios.post('http://localhost:8080/upload-profile-pic', data)
      console.log('res', res)
      setPostup(res)
    } catch (e) {
      console.log(e)
    }
  }

  console.log('nhập file', URL.createObjectURL(file))
  // {
  //   postup ? console.log('sau upload', postup.filename) : console.log('sau upload', postup)
  // }
  console.log('sau upload', postup)
  return (
    <div>


      <Form.Group className="">
        <Form.Label>Hình ảnh</Form.Label>
        <Form.Control
          type="file"
          size="sm"
          id="file"
          accept="media_type"
          className="mb-3"
          style={{ width: '250px' }}
          onChange={(e) => {
            setFile(e.target.files[0])
          }}
        />
        <Button variant="primary" size="sm" className="mb-3" onClick={send}>
          Upload File
        </Button>
        <div
          style={{
            backgroundImage:
              `url(${URL.createObjectURL(file)}) `,
            height: '100px',
            width: '150px',
            backgroundSize: '100%',
            backgroundRepeat: 'no-repeat',
            border: ' 1px solid',
          }}></div>
        <img
          src={URL.createObjectURL(file)} 
          style={{
            height: '100px',
            width: '150px',
            backgroundSize: '100%',
            backgroundRepeat: 'no-repeat',
            border: ' 1px solid',
          }}></img>
      </Form.Group>
    </div>
  )
}

export default Uploadfile1

//
