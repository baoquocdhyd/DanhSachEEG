import { useState, useEffect, useLayoutEffect } from 'react'
import moment from 'moment'

const Boloc = ({ F }) => {
  const [filterPatient, setFilterPatient] = useState({
    hoVaTen: '',
    tinhTrangDo: '',
    henTuNgay: '',
    henDenNgay: '',
    doTuNgay: '',
    doDenNgay: '',
  })
  let A = (e, T) => {
    setFilterPatient({ ...filterPatient, [T]: e.target.value })
  }
  console.log('kiem tra filterPatient', filterPatient)
  return (
    <div
      style={{
        width: '100%',
        height: 240,
        maxWidth: 380,
        marginBottom: '20px',
        paddingBottom: '10px',
        paddingLeft: '5px',
        marginLeft: '10px',
        position: 'relative',
        border: '1px solid black',
      }}>
      <h3 style={{ margin: '5px' }}>Tìm Kiếm</h3>
      <div>
        <div className="">
          <label style={{ padding: '5px' }}>Họ và tên</label>
          <input
            type="text"
            className=""
            style={{ height: '28px', width: '220px', left: '70px' }}
            onChange={(e) => {
              A(e, 'hoVaTen')
            }}
            value={filterPatient.hoVaTen}
          />
        </div>
      </div>
      <div>
        <div className="">
          <label className="" style={{ padding: '5px' }}>
            Tình trạng
          </label>
          <select
            className=""
            value={filterPatient.tinhTrangDo}
            style={{ height: '28px', width: '220px', left: '70px' }}
            onChange={(e) => {
              A(e, 'tinhTrangDo')
            }}>
            <option defaultValue value=""></option>
            <option value="Chưa hẹn">Chưa hẹn</option>
            <option value="Đã hẹn">Đã hẹn</option>
            <option value="Đang đo">Đang đo</option>
            <option value="Đã đo">Đã đo</option>
            <option value="Đã có kết quả">Đã có kết quả</option>
            <option value="Đã trả kết quả">Đã trả kết quả</option>
          </select>
        </div>
      </div>
      <div>
        <div className="">
          <label style={{ padding: '5px' }}>Ngày hẹn </label>
          <input
            type="date"
            className=""
            style={{ height: '28px', width: '120px', left: '70px' }}
            value={filterPatient.henTuNgay}
            onChange={(e) => {
              A(e, 'henTuNgay')
            }}
          />
          <label style={{ position: 'absolute', left: '210px', padding: '5px' }}>đến</label>
          <input
            type="date"
            className=""
            style={{ height: '28px', width: '120px', left: '230px' }}
            value={filterPatient.henDenNgay}
            onChange={(e) => {
              A(e, 'henDenNgay')
            }}
          />
        </div>

        <div className="">
          <label style={{ padding: '5px' }}>Ngày đo </label>
          <input
            type="date"
            className=""
            style={{ height: '28px', width: '120px', left: '70px' }}
            value={filterPatient.doTuNgay}
            onChange={(e) => {
              A(e, 'doTuNgay')
            }}
          />
          <label style={{ position: 'absolute', left: '210px', padding: '5px' }}>đến</label>
          <input
            type="date"
            className=""
            style={{ height: '28px', width: '120px', left: '230px' }}
            value={filterPatient.doDenNgay}
            onChange={(e) => {
              A(e, 'doDenNgay')
            }}
          />
        </div>
      </div>
      <button
        onClick={() => {
          F(filterPatient)
        }}
        style={{ height: '30px', width: '120px', left: '30px', position: 'absolute' }}
        className="btn btn-primary btn-sm">
        Lọc bệnh nhân
      </button>
    </div>
  )
}

export default Boloc
