import axios from '../axios'
import { useState, useEffect, useLayoutEffect } from 'react'
import casual from 'casual-browserify'
import moment from 'moment'
import { Modal, Button, Form, Col, Row } from 'react-bootstrap'
import { toast } from 'react-toastify'

const Thembenhnhan = (props) => {
  const { show, closeAddNew, update } = props
  const [f, setF] = useState('')
  const [h, setH] = useState(false) //bất hoạt nút thêm
  const [url, setUrl] = useState('')

  const [a, setA] = useState({
    ho: '',
    ten: '',
    sohoso: '',
    gioitinh: '',
    namsinh: '',
    sodienthoai: '',
    ngaynhanhen: moment(Date.now()).format('YYYY-MM-DDTHH:mm'),
    ngayhendo: undefined,
    loaichidinh: '',
    tinhtrangdo: 'Đã hẹn',
    khoaphong: '',
    ngaydo: undefined,
    kythuavien: '',
    bacsi: '',
    ghichu: '',
    status: 1,
    image: '',
  })

  // const [a, setA] = useState({
  //   ho: casual.last_name,
  //   ten: casual.first_name,
  //   sohoso: Math.round(casual.random * 100000000),
  //   gioitinh: casual.boolean === true ? 1 : 0,
  //   namsinh: moment(-880866300000 + 2554416000000 * Math.random()).format('YYYY-MM-DD'),
  //   sodienthoai: casual.phone,
  //   ngaynhanhen: moment(1642013700000 + 31536000000 * Math.random()).format('YYYY-MM-DDTHH:mm'),
  //   ngayhendo: moment(1642013700000 + 31536000000 * Math.random()).format('YYYY-MM-DDTHH:mm'),
  //   loaichidinh: 'Thường quy',
  //   tinhtrangdo: 'Chưa hẹn',
  //   khoaphong: casual.company_name,
  //   ngaydo: moment(1642013700000 + 31536000000 * Math.random()).format('YYYY-MM-DDTHH:mm'),
  //   kythuavien: casual.full_name,
  //   bacsi: casual.full_name,
  //   ghichu: casual.description,
  //   image: '',
  // })
  let clearForm = () => {
    setA({
      ho: '',
      ten: '',
      sohoso: '',
      gioitinh: '',
      namsinh: '',
      sodienthoai: '',
      ngaynhanhen: moment(Date.now()).format('YYYY-MM-DDTHH:mm'),
      ngayhendo: undefined,
      loaichidinh: '',
      tinhtrangdo: 'Đã hẹn',
      khoaphong: '',
      ngaydo: undefined,
      kythuavien: '',
      bacsi: '',
      ghichu: '',
      status: 1,
      image: '',
    })
    setUrl('')
  }
  let A = (e, T) => {
    setA({ ...a, [T]: e.target.value })
  }
  let B = async (a) => {
    try {
      await setH(true)
      let b = await axios.post('/api/save', a)
      const c = await axios.get('/api/get')
      await update(c)
      // await clearForm()
      {
        b ? await clearForm() : setF('')
      }
      await setH(false)

      {
        b ? await closeAddNew() : setF('')
      }

      toast.info('Tạo mới thành công!')
    } catch (e) {
      console.log(e)
    }
  }
  // console.log('kiem tra b',b)
  // console.log('kiem tra them', a)
  return (
    <div style={{}}>
      <Modal
        show={show}
        onHide={closeAddNew}
        backdrop="static"
        keyboard={false}
        animation={false}
        // size="sm"
        style={{ width: '360px', paddingBottom: '100px' }}
        // className="col-sm-6"
        // sm={{width: '300px'}}
        centered>
        <Modal.Header closeButton>
          <Modal.Title>Thêm bệnh nhân</Modal.Title>
        </Modal.Header>
        <Modal.Footer
          style={{ justifyContent: 'flex-start', paddingBottom: '0px', paddingTop: '0px' }}>
          <Button
            variant="primary"
            size="sm"
            disabled={h}
            onClick={async () => {
              await B(a)
            }}>
            Thêm bệnh nhân
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              closeAddNew()
              clearForm()
            }}>
            Close
          </Button>
        </Modal.Footer>
        <Modal.Body style={{ paddingTop: '0px' }}>
          <Form>
            <Form.Group className="">
              <Form.Label>Họ và tên lót</Form.Label>
              <Form.Control
                type="text"
                size="sm"
                placeholder=""
                autoFocus
                onChange={(e) => {
                  A(e, 'ho')
                }}
                value={a.ho}
                id="ten"
              />
            </Form.Group>

            <Form.Group className="">
              <Form.Label>Tên *</Form.Label>
              <Form.Control
                type="text"
                size="sm"
                placeholder=""
                value={a.ten}
                onChange={(e) => {
                  A(e, 'ten')
                }}
              />
            </Form.Group>

            <Form.Group className="">
              <Form.Label>Số hồ sơ</Form.Label>
              <Form.Control
                type="text"
                size="sm"
                placeholder=""
                value={a.sohoso}
                onChange={(e) => {
                  A(e, 'sohoso')
                }}
              />
            </Form.Group>

            <Form.Group className="" as={Row}>
              <Col xs="4" sm="4" md="3" lg="3">
                <Form.Check
                  type="radio"
                  id=""
                  name="gioitinh"
                  label="Nam"
                  defaultChecked={a.gioitinh === 'nam'}
                  onClick={() => {
                    setA({ ...a, gioitinh: 'nam' })
                  }}
                />
              </Col>
              <Col xs="4" sm="4" md="3" lg="3">
                <Form.Check
                  type="radio"
                  id=""
                  name="gioitinh"
                  label="Nữ"
                  defaultChecked={a.gioitinh === 'nữ'}
                  onClick={() => {
                    setA({ ...a, gioitinh: 'nữ' })
                  }}
                />
              </Col>
            </Form.Group>

            <Form.Group className="">
              <Form.Label>Năm sinh</Form.Label>
              <Form.Control
                type="text"
                size="sm"
                placeholder=""
                onChange={(e) => {
                  A(e, 'namsinh')
                }}
                value={a.namsinh}
              />
            </Form.Group>

            <Form.Group className="">
              <Form.Label>Số điện thoại *</Form.Label>
              <Form.Control
                type="text"
                size="sm"
                placeholder=""
                onChange={(e) => {
                  A(e, 'sodienthoai')
                }}
                value={a.sodienthoai}
              />
            </Form.Group>

            {/* <Form.Group className="">
              <Form.Label>Ngày nhận hẹn</Form.Label>
              <Form.Control
                placeholder=""
                size="sm"
                type="datetime-local"
                className="" disabled
                value={a.ngaynhanhen}
                onChange={(e) => {
                  A(e, 'ngaynhanhen')
                }}
              />
            </Form.Group> */}

            <Form.Group className="">
              <Form.Label>Ngày hẹn đo</Form.Label>
              <Form.Control
                type="datetime-local"
                size="sm"
                placeholder=""
                value={a.ngayhendo}
                onChange={(e) => {
                  A(e, 'ngayhendo')
                }}
              />
            </Form.Group>

            <Form.Group className="">
              <Form.Label>Loại chỉ định</Form.Label>
              <Form.Select
                className=""
                value={a.loaichidinh}
                onChange={(e) => {
                  A(e, 'loaichidinh')
                }}>
                <option value=""></option>
                <option value="Thường quy">Thường quy</option>
                <option value="Thường quy (tại giường)">Thường quy (tại giường)</option>
                <option value="Giấc ngủ ngắn 60ph">Giấc ngủ ngắn 60ph</option>
                <option value="Giấc ngủ ngắn 60ph (tại giường)">
                  Giấc ngủ ngắn 60ph (tại giường)
                </option>
                <option value="Giấc ngủ trưa">Giấc ngủ trưa</option>
                <option value="8h">8h</option>
                <option value="8h (tại giường)">8h (tại giường)</option>
                <option value="Qua đêm">Qua đêm</option>
                <option value="Qua đêm (tại giường)">Qua đêm (tại giường)</option>
                <option value="24h">24h</option>
                <option value="24h (tại giường)">24h (tại giường)</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="">
              <Form.Label>Tình trạng đo</Form.Label>
              <Form.Select
                className=""
                value={a.tinhtrangdo}
                onChange={(e) => {
                  A(e, 'tinhtrangdo')
                }}>
                <option value="Chưa hẹn">Chưa hẹn</option>
                <option value="Đã hẹn">Đã hẹn</option>
                <option value="Đang đo">Đang đo</option>
                <option value="Đã đo">Đã đo</option>
                <option value="Đã có kết quả">Đã có kết quả</option>
                <option value="Đã liên hệ">Đã liên hệ</option>
                <option value="Đã trả kết quả">Đã trả kết quả</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="">
              <Form.Label>Khoa/phòng</Form.Label>
              <Form.Control
                type="text"
                size="sm"
                placeholder=""
                value={a.khoaphong}
                onChange={(e) => {
                  A(e, 'khoaphong')
                }}
              />
            </Form.Group>

            <Form.Group className="">
              <Form.Label>Ngày đo</Form.Label>
              <Form.Control
                type="datetime-local"
                placeholder=""
                size="sm"
                className=""
                value={a.ngaydo}
                onChange={(e) => {
                  A(e, 'ngaydo')
                }}
              />
            </Form.Group>

            <Form.Group className="">
              <Form.Label>Kỹ thuật viên</Form.Label>
              <Form.Control
                type="text"
                size="sm"
                placeholder=""
                value={a.kythuavien}
                onChange={(e) => {
                  A(e, 'kythuavien')
                }}
              />
            </Form.Group>

            <Form.Group className="">
              <Form.Label>Bác sĩ đọc</Form.Label>
              <Form.Control
                type="text"
                size="sm"
                placeholder=""
                className=""
                value={a.bacsi}
                onChange={(e) => {
                  A(e, 'bacsi')
                }}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Ghi chú</Form.Label>

              <Form.Control
                as="textarea"
                rows={2}
                placeholder=""
                size="sm"
                className=""
                value={a.ghichu}
                onChange={(e) => {
                  A(e, 'ghichu')
                }}
              />
            </Form.Group>

            <Form.Group className="">
              <Form.Label>Hình ảnh</Form.Label>
              <Form.Control
                type="file"
                size="sm"
                placeholder=""
                style={{ width: '250px' }}
                className=""
                onChange={async (e) => {
                  const toBase64 = (file) =>
                    new Promise((resolve, reject) => {
                      const reader = new FileReader()
                      reader.readAsDataURL(file)
                      reader.onload = () => resolve(reader.result)
                      reader.onerror = (error) => reject(error)
                    })
                  try {
                    const result = await toBase64(e.target.files[0])
                    const url = await URL.createObjectURL(e.target.files[0])
                    setA({ ...a, image: result })
                    setUrl(url)
                  } catch (error) {
                    console.error(error)
                  }
                }}
              />
              <div
                style={{
                  backgroundImage: `url( ${url}  )`,
                  height: '200px',
                  backgroundSize: '100%',
                  backgroundRepeat: 'no-repeat',
                  border: ' 1px solid',
                  borderRadius: '5px',
                }}></div>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer style={{ justifyContent: 'flex-start' }}>
          <Button
            variant="primary"
            size="sm"
            disabled={h}
            onClick={async () => {
              await B(a)
            }}>
            Thêm bệnh nhân
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              closeAddNew()
              clearForm()
            }}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Thembenhnhan
