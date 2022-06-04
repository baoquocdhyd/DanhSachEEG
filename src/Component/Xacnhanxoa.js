import { Modal, Button } from 'react-bootstrap'
import axios from '../axios.js'
import { useState, useLayoutEffect } from 'react'

const ModalConfirmDel = (props) => {
  const { show, close, C, idForDelete, update } = props
const [f, setF] = useState('') 
  return (
    <div>
      <Modal
        show={show}
        onHide={close}
        backdrop="static"
        keyboard={false}
        animation={false}
        size=""
        centered>
        <Modal.Header closeButton>
          <Modal.Title>Xóa lịch hẹn</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <h5>
              Bệnh nhân: {idForDelete.ho} {idForDelete.ten}
            </h5>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="m-1 mx-5 shadow"
            variant="primary"
            onClick={async () => {
              let res = await axios.put('/api/put/statusoff', idForDelete)
              const A = await axios.get('/api/get')
							await update(A)
							{res?close():setF('')}
              // C(idForDelete)
              close()
            }}>
            Confirm
          </Button>
          <Button variant="secondary" onClick={close} className="m-1 mx-5 shadow">
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
export default ModalConfirmDel
