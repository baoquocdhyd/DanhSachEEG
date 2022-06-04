import { useState, useLayoutEffect } from 'react'
import axios from '../axios.js'
import dateFormat from 'dateformat'
import moment from 'moment'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Thembenhnhan from './Thembenhnhan.js'
import ModalConfirmDel from './Xacnhanxoathatsu.js'
import Suathongtin from './Sua thong tin.js'
// import Boloc from './Boloc.js'
import { Button, Col, Row, Table } from 'react-bootstrap'
import { toast } from 'react-toastify'
import Bolocxoa from './Bolocxoa.js'

import './table.scss'
import _ from 'lodash'

const Tablexoa = (props) => {
  const { setG , update } = props

  const [a, setA] = useState([])
  const [b, setB] = useState([])
  const [c, setC] = useState(false) //thêm bệnh nhân
  const [d, setD] = useState(false) //sửa bệnh nhân
  const [e, setE] = useState(false) //nút thêm bệnh nhân
  const [f, setF] = useState(false) //modal xác nhận xóa
  const [idForDelete, setIdForDelete] = useState({}) //id của dòng xóa

  const [sortField, setSortField] = useState('id')
  const [sortOrder, setSortOrder] = useState('desc')

  const Fi = async () => {
    const A = await axios.get('/api/get/statusoff')
    await setA(A)
    toast.info('Cập nhật thành công!')
    setE(true)
  }
  useLayoutEffect(() => {
    Fi()
  }, [])
  const closeAddNew = () => {
    setF(false)
  }

  let C = async (a) => {
    try {
      const res = await axios.delete('/api/delete', { data: { id: a.id } })
      Fi()
    } catch (e) {
      console.log(e)
    }
  }
  const sort = (field, order) => {
    setSortField(field)
    setSortOrder(order)
    let b = _.cloneDeep(a)
    let c = _.orderBy(b, [field], [order])
    setA(c)
  }
  const sortTinhTrangDo = (field, order) => {
    setSortField(field)
    setSortOrder(order)
    let b = _.cloneDeep(a)
    let c = _.sortBy(b, function (element) {
      var rank = {
        'Chưa hẹn': 1,
        'Đã hẹn': 2,
        'Đang đo': 3,
        'Đã đo': 4,
        'Đã có kết quả': 5,
        'Đã trả kết quả': 6,
      }

      return rank[element.tinhtrangdo]
    })
    setA(c)
  }
  const sortTinhTrangDoRevert = (field, order) => {
    setSortField(field)
    setSortOrder(order)
    let b = _.cloneDeep(a)
    let c = _.sortBy(b, function (element) {
      var rank = {
        'Chưa hẹn': 6,
        'Đã hẹn': 5,
        'Đang đo': 4,
        'Đã đo': 3,
        'Đã có kết quả': 2,
        'Đã trả kết quả': 1,
      }

      return rank[element.tinhtrangdo]
    })
    setA(c)
  }

  const handleDelete = (userId) => {
    setF(true)
    setIdForDelete(userId)
  }

  // const [idForDelete, setIdForDelete] = useState({})

  // console.log('Kiem tra g', g)
  console.log('Kiem tra toàn bộ tải về', a)
  return (
    <div>
      <h1 style={{ color: 'red', textAlign: 'center' }} id="ten">
        Duyệt xóa: {a.length} bn
      </h1>
      <Bolocxoa update={setA} />

      <Button
        as={Col}
        xs="5"
        sm="4"
        md="3"
        lg="2"
        variant="success"
        size="sm"
        className=" mx-2 shadow"
        onClick={async () => {
          setG(false)
					const c = await axios.get('/api/get')
					await update(c)
					toast.info('Thay đổi thành công!')

        }}>
        Thoát
      </Button>
			<Button
            as={Col}
            xs="5"
            sm="4"
            md="3"
            lg="2"
            variant="success"
            size="sm"
            className=" mx-2 shadow"
            onClick={() => {
              Fi()
            }}>
            Refresh
          </Button>

      <Table striped bordered hover size="sm" className="m-2 table">
        <thead style={{ position: 'sticky', top: '0px' }} className="thead">
          <tr className="tr1">
            <th style={{ width: '2%', minWidth: 20, textAlign: 'center' }}>
              id
              <span style={{ float: 'right' }}>
                {sortField == 'id' && sortOrder == 'asc' && (
                  <i
                    className="fa-solid fa-arrow-down-a-z"
                    style={{ color: 'blue', fontSize: '16px', padding: '0 10px' }}
                    onClick={() => {
                      sort('id', 'desc')
                    }}></i>
                )}
                {sortField == 'id' && sortOrder == 'desc' && (
                  <i
                    className="fa-solid fa-arrow-down-z-a"
                    style={{ color: 'blue', fontSize: '16px', padding: '0 10px' }}
                    onClick={() => {
                      sort('id', 'asc')
                    }}></i>
                )}
                {sortField !== 'id' && (
                  <i
                    className="fa-solid fa-align-justify"
                    style={{ color: 'blue', fontSize: '16px', padding: '0 10px' }}
                    onClick={() => {
                      sort('id', 'desc')
                    }}></i>
                )}
              </span>
            </th>
            <th
              style={{
                width: '10%',
                minWidth: 60,
                maxWidth: 60,
                textAlign: 'center',
                cursor: 'pointer',
              }}
              onClick={() => {}}>
              Họ và Tên
              <span style={{ float: 'right' }}>
                {sortField == 'ten' && sortOrder == 'asc' && (
                  <i
                    className="fa-solid fa-arrow-down-a-z"
                    style={{ color: 'blue', fontSize: '16px', padding: '0 10px' }}
                    onClick={() => {
                      sort('ten', 'desc')
                    }}></i>
                )}
                {sortField == 'ten' && sortOrder == 'desc' && (
                  <i
                    className="fa-solid fa-arrow-down-z-a"
                    style={{ color: 'blue', fontSize: '16px', padding: '0 10px' }}
                    onClick={() => {
                      sort('ten', 'asc')
                    }}></i>
                )}
                {sortField !== 'ten' && (
                  <i
                    className="fa-solid fa-align-justify"
                    style={{ color: 'blue', fontSize: '16px', padding: '0 10px' }}
                    onClick={() => {
                      sort('ten', 'asc')
                    }}></i>
                )}
              </span>
            </th>
            <th style={{ width: '5%', minWidth: 20, textAlign: 'center' }}>Giới</th>
            <th
              style={{
                width: '8%',
                minWidth: 40,
                maxWidth: 60,
                textAlign: 'center',
                cursor: 'pointer',
              }}
              onClick={() => {}}>
              Ngày hẹn đo
              <span style={{ float: 'right' }}>
                {sortField == 'ngayhendo' && sortOrder == 'asc' && (
                  <i
                    className="fa-solid fa-arrow-down-a-z"
                    style={{ color: 'blue', fontSize: '16px', padding: '0 10px' }}
                    onClick={() => {
                      sort('ngayhendo', 'desc')
                    }}></i>
                )}
                {sortField == 'ngayhendo' && sortOrder == 'desc' && (
                  <i
                    className="fa-solid fa-arrow-down-z-a"
                    style={{ color: 'blue', fontSize: '16px', padding: '0 10px' }}
                    onClick={() => {
                      sort('ngayhendo', 'asc')
                    }}></i>
                )}
                {sortField !== 'ngayhendo' && (
                  <i
                    className="fa-solid fa-align-justify"
                    style={{ color: 'blue', fontSize: '16px', padding: '0 10px' }}
                    onClick={() => {
                      sort('ngayhendo', 'asc')
                    }}></i>
                )}
              </span>
            </th>
            <th
              style={{
                width: '8%',
                minWidth: 40,
                maxWidth: 60,
                textAlign: 'center',
                cursor: 'pointer',
              }}
              onClick={() => {}}>
              Ngày đo EEG
              <span style={{ float: 'right' }}>
                {sortField == 'ngaydo' && sortOrder == 'asc' && (
                  <i
                    className="fa-solid fa-arrow-down-a-z"
                    style={{ color: 'blue', fontSize: '16px', padding: '0 10px' }}
                    onClick={() => {
                      sort('ngaydo', 'desc')
                    }}></i>
                )}
                {sortField == 'ngaydo' && sortOrder == 'desc' && (
                  <i
                    className="fa-solid fa-arrow-down-z-a"
                    style={{ color: 'blue', fontSize: '16px', padding: '0 10px' }}
                    onClick={() => {
                      sort('ngaydo', 'asc')
                    }}></i>
                )}
                {sortField !== 'ngaydo' && (
                  <i
                    className="fa-solid fa-align-justify"
                    style={{ color: 'blue', fontSize: '16px', padding: '0 10px' }}
                    onClick={() => {
                      sort('ngaydo', 'asc')
                    }}></i>
                )}
              </span>
            </th>
            <th style={{ width: '10%', minWidth: 100, textAlign: 'center' }}>
              Tình trạng đo
              <span style={{ float: 'right' }}>
                {sortField == 'tinhtrangdo' && sortOrder == 'asc' && (
                  <i
                    className="fa-solid fa-arrow-down-a-z"
                    style={{ color: 'blue', fontSize: '16px', padding: '0 10px' }}
                    onClick={() => {
                      sortTinhTrangDoRevert('tinhtrangdo', 'desc')
                    }}></i>
                )}
                {sortField == 'tinhtrangdo' && sortOrder == 'desc' && (
                  <i
                    className="fa-solid fa-arrow-down-z-a"
                    style={{ color: 'blue', fontSize: '16px', padding: '0 10px' }}
                    onClick={() => {
                      sortTinhTrangDo('tinhtrangdo', 'asc')
                    }}></i>
                )}
                {sortField !== 'tinhtrangdo' && (
                  <i
                    className="fa-solid fa-align-justify"
                    style={{ color: 'blue', fontSize: '16px', padding: '0 10px' }}
                    onClick={() => {
                      sortTinhTrangDo('tinhtrangdo', 'asc')
                    }}></i>
                )}
              </span>
            </th>
            <th style={{ width: '12%', minWidth: 40, textAlign: 'center' }}>Action</th>
            <th style={{ width: '12%', maxWidth: 60, minWidth: 60, textAlign: 'center' }}>KTV</th>
            <th style={{ width: '15%', minWidth: 60, textAlign: 'center' }}>Ghi chú</th>
          </tr>
        </thead>
        <tbody>
          {a.map((a, b) => {
            return (
              <tr key={`users ${b}`}>
                <td style={{ textAlign: 'center', backgroundColor: 'pink' }}>{a.id}</td>
                <td style={{ textTransform: 'capitalize' }}>
                  <div style={{ color: 'red', fontSize: '14px' }}>
                    {a.ho} {a.ten}
                  </div>
                  <div style={{ fontSize: '10px' }}> - SHS: {a.sohoso}</div>
                  <div style={{ fontSize: '10px' }}>
                    - SĐT:
                    <a href={'tel:' + a.sodienthoai}>{a.sodienthoai}</a>
                  </div>
                </td>
                <td>
                  <div> {a.gioitinh}</div>
                  <div> {a.namsinh === null ? '' : moment(a.namsinh).format('YYYY')}</div>
                </td>
                <td style={{ textAlign: 'left', backgroundColor: 'rgb(195, 255, 217)' }}>
                  {a.ngayhendo === null ? '' : moment(a.ngayhendo).format('HH:mmA ddd')} <br />
                  {a.ngayhendo === null ? '' : moment(a.ngayhendo).format('DD-MM-YYYY ')}
                </td>
                <td style={{ textAlign: 'left', backgroundColor: 'lightBlue' }}>
                  {a.ngaydo === null ? '' : moment(a.ngaydo).format('HH:mmA ddd')} <br />
                  {a.ngaydo === null ? '' : moment(a.ngaydo).format('DD-MM-YYYY ')}
                </td>
                <td style={{ textTransform: 'capitalize' }}>
                  - {a.loaichidinh} <br /> - {a.tinhtrangdo} <br />- {a.khoaphong}
                </td>
                <td>
                  <Button
                    variant="outline-primary"
                    style={{ fontSize: '12px' }}
                    className="m-2 shadow"
                    size="sm"
                    onClick={async () => {
                      let res = await axios.put('/api/put/statuson', a)
                      const A = await axios.get('/api/get/statusoff')
                      setA(A)
                      toast.info('Trả lại thành công!')
                    }}>
                    Xuất hiện lại
                  </Button>
                  <Button
                    variant="outline-danger"
                    style={{ fontSize: '12px' }}
                    className="m-2 shadow"
                    size="sm"
                    onClick={() => {
                      setF(true)
                      setIdForDelete(a)
                    }}>
                    Xóa thật sự
                  </Button>
                </td>
                <td style={{ textTransform: 'capitalize', fontSize: '10px' }}>
                  - KTV: {a.kythuavien} <br /> - BS: {a.bacsi}
                </td>
                <td style={{ fontSize: '10px' }}>{a.ghichu}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>

      <ModalConfirmDel show={f} close={closeAddNew} C={C} idForDelete={idForDelete} update={setA} />
    </div>
  )
}
export default Tablexoa
