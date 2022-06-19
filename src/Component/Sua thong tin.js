import axios from '../axios'
import { useState, useLayoutEffect } from 'react'
import moment from 'moment'
import { Modal, Button, Form, Col, Row } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { Buffer } from 'buffer'

const Suathongtin = (props) => {
  const { show, closeAddNew, update, b, picture, setPicture } = props
  const [f, setF] = useState('')
  const [h, setH] = useState(false) //bất hoạt nút save
  const [url, setUrl] = useState('')

  const [a, setA] = useState({
    id: '',
    ho: '',
    ten: '',
    sohoso: '',
    gioitinh: '',
    namsinh: '',
    sodienthoai: '',
    ngayhendo: '',
    loaichidinh: '',
    tinhtrangdo: '',
    khoaphong: '',
    ngaydo: undefined,
    kythuavien: '',
    bacsi: '',
    ghichu: '',
    status: '',
    image: '',
  })
  let A = (e, T) => {
    setA({ ...a, [T]: e.target.value })
  }
  let B = async (a) => {
    try {
      await setH(true)

      let b = await axios.put('/api/put', a)
      const c = await axios.get('/api/get')
      await update(c)
      // closeAddNew()
      toast.info('Thay đổi thành công!')
      {
        b ? await closeAddNew() : setF('')
      }
      await setH(false)
    } catch (e) {
      console.log(e)
    }
  }
  let savePicture = async (a) => {
    try {
      await setH(true)
      let res = await axios.put('/api/put/picture', a)
      toast.info('Đã lưu ảnh thành công!')
      await setH(false)
    } catch (e) {
      console.log(e)
    }
  }
  useLayoutEffect(() => {
    let pic = ''
    b.image ? (pic = new Buffer(b.image.data, 'base64').toString('binary')) : setF('')
    setA({
      id: b.id,
      ho: b.ho,
      sohoso: b.sohoso,
      ten: b.ten,
      gioitinh: b.gioitinh,
      namsinh: b.namsinh,
      sodienthoai: b.sodienthoai,
      ngaynhanhen: moment(b.ngaynhanhen).format('YYYY-MM-DDTHH:mm'),
      ngayhendo: b.ngayhendo ? moment(b.ngayhendo).format('YYYY-MM-DDTHH:mm') : undefined,
      loaichidinh: b.loaichidinh,
      tinhtrangdo: b.tinhtrangdo,
      khoaphong: b.khoaphong,
      ngaydo: b.ngaydo ? moment(b.ngaydo).format('YYYY-MM-DDTHH:mm') : undefined,
      kythuavien: b.kythuavien,
      bacsi: b.bacsi,
      ghichu: b.ghichu,
      status: (b.status = true ? 1 : 0),
      image: picture ? picture : '',
    })
  }, [b])
  // console.log('Kiểm tra sau sửa', b.image)
  return (
    <div style={{}}>
      <Modal
        show={show}
        onHide={() => {
          closeAddNew()
          setPicture('')
          setUrl('')
        }}
        backdrop="static"
        keyboard={false}
        animation={false}
        style={{ width: '360px', paddingBottom: '100px' }}
        // size="sm"
        centered>
        <Modal.Header closeButton>
          <Modal.Title>Sửa thông tin</Modal.Title>
        </Modal.Header>
        <Modal.Footer
          style={{ justifyContent: 'flex-start', paddingBottom: '0px', paddingTop: '0px' }}>
          <Button
            variant="primary"
            size="sm"
            disabled={h}
            onClick={() => {
              B(a)
            }}>
            Save Changes
          </Button>
          <Button variant="secondary" size="sm" onClick={closeAddNew}>
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
                  defaultChecked={b.gioitinh === 'nam'}
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
                  defaultChecked={b.gioitinh === 'nữ'}
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
                value={moment(a.ngaynhanhen).format('YYYY-MM-DDTHH:mm')}
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
                value={b.ngayhendo ? moment(a.ngayhendo).format('YYYY-MM-DDTHH:mm') : undefined}
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
                value={b.ngaydo ? moment(a.ngaydo).format('YYYY-MM-DDTHH:mm') : undefined}
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

            <Form.Group className="">
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
                  backgroundImage: `url( ${url ? url : picture}  )`,
                  height: '200px',
                  backgroundSize: '100%',
                  backgroundRepeat: 'no-repeat',
                  border: ' 1px solid',
                  borderRadius: '5px',
                }}></div>
              <Button
                variant="primary"
                size="sm"
                disabled={h}
                onClick={() => {
                  savePicture(a)
                }}>
                Save only Picture
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer style={{ justifyContent: 'flex-start' }}>
          <Button
            variant="primary"
            size="sm"
            disabled={h}
            onClick={() => {
              B(a)
              setPicture('')
              setUrl('')
            }}>
            Save Changes
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              closeAddNew()
              setPicture('')
              setUrl('')
            }}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Suathongtin
