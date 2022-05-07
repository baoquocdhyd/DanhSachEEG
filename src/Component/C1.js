import { useState, useLayoutEffect } from 'react'
import axios from '../axios.js'
import dateFormat from 'dateformat'
import moment from 'moment'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Thembenhnhan from './Thembenhnhan.js'
import Suathongtin from './Sua thong tin.js'
import Boloc from './Boloc.js'
import './table.scss'
const C1 = () => {
  const [a, setA] = useState([])
  const [b, setB] = useState([])
  const [c, setC] = useState(false)
  const [d, setD] = useState(false)
  const [sort, setSort] = useState({ ten: 0, ngayhendo: 0, ngaydo: 1 })

  const Fi = async () => {
    const A = await axios.get('/api/get')
    // const S = A.sort(function(a, b){
    //   let x = a.ngaydo;
    //   let y = b.ngaydo;
    //   if (x > y) {return -1;}
    //   if (x < y) {return 1;}
    //   return 0;
    // }
    // )
    setA(A)
  }
  useLayoutEffect(() => {
    Fi()
  }, [])

  const F = async (filterPatient) => {
    const A = await axios.get('/api/get')
    const data = await A.filter(function (a, b) {
      return (
        (a.ten
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/đ/g, 'd')
          .replace(/Đ/g, 'D')
          .includes(
            filterPatient.hoVaTen
              .toLowerCase()
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
              .replace(/đ/g, 'd')
              .replace(/Đ/g, 'D')
          ) ||
          a.ho
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd')
            .replace(/Đ/g, 'D')
            .includes(
              filterPatient.hoVaTen
                .toLowerCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .replace(/đ/g, 'd')
                .replace(/Đ/g, 'D')
            )) &&
        a.tinhtrangdo.includes(filterPatient.tinhTrangDo) &&
        a.ngayhendo >= filterPatient.henTuNgay &&
        (filterPatient.henDenNgay ? a.ngayhendo <= filterPatient.henDenNgay : true) &&
        a.ngaydo >= filterPatient.doTuNgay &&
        (filterPatient.doDenNgay ? a.ngaydo <= filterPatient.doDenNgay : true)
      )
    })

    // {
    //   console.log('Kiemtra data', data)
    //   console.log('Kiemtra .hoVaTen', filterPatient)
    // }
    setA(data)
    // {console.log('C1',data)}
  }

  let C = async (a) => {
    try {
      await axios.delete('/api/delete', { data: { id: a.id } })
      Fi()
    } catch (e) {
      console.log(e)
    }
  }
  const sortten = (a) => {
    setSort({ ...sort, ten: sort.ten === 0 ? 1 : sort.ten === 1 ? 2 : 0 })
  }
  const sortngayhendo = (a) => {
    setSort({ ...sort, ngayhendo: sort.ngayhendo === 0 ? 1 : sort.ngayhendo === 1 ? 2 : 0 })
  }
  const sortngaydo = (a) => {
    setSort({ ...sort, ngaydo: sort.ngaydo === 0 ? 1 : sort.ngaydo === 1 ? 2 : 0 })
  }
  return (
    <div>
      <h1 style={{ color: 'red', textAlign: 'center' }}>
        Danh sách hẹn điện não: {a.length} bệnh nhân{' '}
      </h1>
      <Boloc F={F} />
      <button
        onClick={() => {
          setD(true)
        }}>
        Thêm bệnh nhân
      </button>

      {!c && !d && (
        <table id="customers" className="mt-3 mx-2">
          <thead style={{ position: 'sticky', top: '0px' }}>
            <tr>
              <th style={{ width: '2%', minWidth: 20, textAlign: 'center' }}>id</th>
              <th
                style={{
                  width: '10%',
                  minWidth: 60,
                  maxWidth: 60,
                  textAlign: 'center',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  sortten()
                  console.log(sort)
                }}>
                Họ và Tên
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
                onClick={() => {
                  sortngayhendo()
                  console.log(sort)
                }}>
                Ngày hẹn đo
              </th>
              <th
                style={{
                  width: '8%',
                  minWidth: 40,
                  maxWidth: 60,
                  textAlign: 'center',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  sortngaydo()
                  console.log(sort)
                }}>
                Ngày đo EEG
              </th>
              <th style={{ width: '10%', maxWidth: 40, textAlign: 'center' }}>Loại chỉ định</th>
              <th style={{ width: '12%', maxWidth: 40, textAlign: 'center' }}>KTV</th>
              <th style={{ width: '15%', minWidth: 100, textAlign: 'center' }}>Ghi chú</th>
              <th style={{ width: '3%', minWidth: 10, textAlign: 'center' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {a.map((a, b) => {
              return (
                <tr key={b}>
                  <td style={{ textAlign: 'center', backgroundColor: 'pink' }}>{a.id}</td>
                  <td style={{ textTransform: 'capitalize' }}>
                    <div style={{ color: 'red', fontSize: '14px' }}>
                      {' '}
                      {a.ho} {a.ten}
                    </div>
                    <div> - SNV: {a.sohoso}</div>
                    <div>- SĐT: {a.sodienthoai}</div>
                  </td>
                  <td>
                    <div> {a.gioitinh === true ? 'Nam' : 'Nữ'}</div>
                    <div> {dateFormat(a.namsinh, 'yyyy')}</div>
                  </td>
                  <td style={{ textAlign: 'left', backgroundColor: 'rgb(195, 255, 217)' }}>
                    {moment(a.ngayhendo).format('HH:mmA ddd')} <br />
                    {moment(a.ngayhendo).format('DD-MM-YYYY ')}
                  </td>
                  <td style={{ textAlign: 'left', backgroundColor: 'lightBlue' }}>
                    {moment(a.ngaydo).format('HH:mmA ddd')} <br />
                    {moment(a.ngaydo).format('DD-MM-YYYY ')}
                  </td>
                  <td style={{ textTransform: 'capitalize' }}>
                    - {a.loaichidinh} <br /> - {a.tinhtrangdo} <br />- {a.khoaphong}
                  </td>

                  <td style={{ textTransform: 'capitalize' }}>
                    - KTV: {a.kythuavien} <br /> - BS: {a.bacsi}
                  </td>
                  <td>{a.ghichu}</td>
                  <td>
                    <button
                      onClick={() => {
                        setB(a)
                        setC(true)
                      }}>
                      Sửa
                    </button>
                    <button
                      onClick={() => {
                        C(a)
                      }}>
                      Xóa
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      )}

      {d && <Thembenhnhan />}
      {c && !d && <Suathongtin b={b} />}
    </div>
  )
}
export default C1
