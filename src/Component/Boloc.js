import { useState, useEffect, useLayoutEffect } from 'react'
import { Modal, Button, Form, Row, Col } from 'react-bootstrap'
import axios from '../axios.js'
import moment from 'moment'

import ReactSelect from 'react-select'
import { components } from 'react-select'
import _ from 'lodash'
const Boloc = (props) => {
  const { update , setG} = props
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
  const F = async () => {
    if (filterPatient.hoVaTen==='admin') {setG(true) 

     setFilterPatient({
        hoVaTen: '',
        tinhTrangDo: '',
        henTuNgay: '',
        henDenNgay: '',
        doTuNgay: '',
        doDenNgay: '',
      })

    }
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
        // a.tinhtrangdo.includes(filterPatient.tinhTrangDo) &&

        (toArray.length != 0 ? _.includes(toArray, a.tinhtrangdo) : true) &&
        // _.includes(toArray, a.tinhtrangdo ) &&
        (filterPatient.henTuNgay ? moment(a.ngayhendo).format() >= (moment(filterPatient.henTuNgay).startOf("day").format() ) : true) &&
        (filterPatient.henDenNgay ? moment(a.ngayhendo).format() <= (moment(filterPatient.henDenNgay).endOf("day").format() ) : true) &&
        
        (filterPatient.doTuNgay ? moment(a.ngaydo).format() >= (moment(filterPatient.doTuNgay).startOf("day").format() ) : true) &&
        (filterPatient.doDenNgay ? moment(a.ngaydo).format() <= (moment(filterPatient.doDenNgay).endOf("day").format() ) : true) 
        
        
        // a.ngaydo >= filterPatient.doTuNgay &&
        // (filterPatient.doDenNgay ? a.ngaydo <= filterPatient.doDenNgay : true)
      )
    })

    await update(data)
  }
  const [optionSelected, setOptionSelected] = useState([])
  let toArray = _.map(optionSelected, 'value')
  // console.log('điều kiện toArray ', toArray)
  const stateOptions = [
    { value: 'Chưa hẹn', label: 'Chưa hẹn' },
    { value: 'Đã hẹn', label: 'Đã hẹn' },
    { value: 'Đang đo', label: 'Đang đo' },
    { value: 'Đã đo', label: 'Đã đo' },
    { value: 'Đã có kết quả', label: 'Đã có kết quả' },
    { value: 'Đã liên hệ', label: 'Đã liên hệ' },
    { value: 'Đã trả kết quả', label: 'Đã trả kết quả' },
  ]

  const Option = (props) => {
    return (
      <div>
        <components.Option {...props}>
          <input type="checkbox" checked={props.isSelected} onChange={() => null} />
          <label>{props.label}</label>
        </components.Option>
      </div>
    )
  }

  const [checkHen, setCheckHen] = useState(false)
  const [checkDo, setCheckDo] = useState(false)
  useEffect(() => {
    F()
  }, [filterPatient, optionSelected])
  // console.log('kiem tra trạng thái', moment(filterPatient.henDenNgay).format("'YYYY-MM-DDTHH:mm'"))
  // console.log('kiem tra trạng thái cuối ngày', moment(filterPatient.henDenNgay).startOf("day").format("x"))
  // console.log('kiem tra trạng tháihen den', moment(filterPatient.henTuNgay).hours(0).minutes(0).seconds(0).milliseconds(0).format('YYYY-MM-DDTHH:mm') )
  

  return (
    <div
      style={{
        height: 'auto',
        width: 380,
        marginBottom: '20px',
        paddingBottom: '10px',
        paddingLeft: '10px',
        paddingRight: '10px',
        marginLeft: '10px',
        backgroundColor: '#EAFAF1 ',
        borderRadius: '5px',
        border: '1px solid blue',
      }}
      className="shadow ">
      <Modal.Title style={{ margin: '5px', color: 'Blue' }}>Tìm Kiếm</Modal.Title>

      <Form>
        <Form.Group className="" as={Row}>
          <Form.Label style={{ width: '90px', padding: '0 0 0 10px' }}>Họ và tên</Form.Label>
          <Col style={{ padding: '0 10px 0 10px' }}>
            <Form.Control
              type="text"
              placeholder=""
              size="sm"
              className=""
              value={filterPatient.hoVaTen}
              onChange={(e) => {
                A(e, 'hoVaTen')
              }}
            />
          </Col>
        </Form.Group>

        <Form.Group className="" as={Row}>
          <Form.Label style={{ width: '90px', padding: '0 0 0 10px' }}>Trạng thái</Form.Label>
          <Col style={{ padding: '0 10px 0 10px' }}>
            <span
              // className="d-inline-block"
              style={{ fontSize: '12px' }}
              data-toggle="popover"
              data-trigger="focus"
              data-content="Please selecet account(s)">
              <ReactSelect
                options={stateOptions}
                isMulti
                closeMenuOnSelect={false}
                hideSelectedOptions={true}
                components={{ Option }}
                onChange={(e) => {
                  setOptionSelected(e)
                }}
                allowSelectAll={true}
                value={optionSelected}
              />
            </span>
          </Col>
        </Form.Group>

        <Form.Group className="" as={Row}>
          <Form.Label style={{ width: '30px', padding: '0 0 0 10px' }}>Hẹn</Form.Label>
          <Col style={{ width: '30px', padding: '0 10px 0 15px' }}>
            <Form.Control
              type="date"
              placeholder=""
              size="sm"
              className=""
              value={filterPatient.henTuNgay}
              onChange={(e) => {
                A(e, 'henTuNgay')
              }}
            />
          </Col>
          <Form.Label style={{ width: '30px', padding: '0 0 0 0' }}>Đến</Form.Label>
          <Col style={{ width: '30px', padding: '0 10px 0 5px' }}>
            <Form.Control
              type="date"
              placeholder=""
              size="sm"
              className=""
              value={filterPatient.henDenNgay}
              onChange={(e) => {
                A(e, 'henDenNgay')
              }}
            />
          </Col>
          <Col xs="1" sm="1" md="1" lg="1" style={{ width: '30px', padding: '0 10px 0 0px' }}>
            <Form.Check
              type="checkbox"
              // id=""
              // name="gioitinh"
              label=""
              checked={checkHen}
              onChange={() => null}
              onClick={() => {
                setCheckHen(!checkHen)
                {
                  !checkHen
                    ? setFilterPatient({
                        ...filterPatient,
                        henTuNgay: moment(Date.now()).format('YYYY-MM-DD'),
                        henDenNgay: moment(Date.now()).add(1, 'months').format(
                          'YYYY-MM-DD'
                        ),
                      })
                    : setFilterPatient({
                        ...filterPatient,
                        henTuNgay: '',
                        henDenNgay: '',
                      })
                }
              }}
            />
          </Col>
        </Form.Group>

        <Form.Group className="" as={Row}>
          <Form.Label style={{ width: '30px', padding: '0 0 0 10px' }}>Đo</Form.Label>
          <Col style={{ width: '30px', padding: '0 10px 0 15px' }}>
            <Form.Control
              type="date"
              placeholder=""
              size="sm"
              className=""
              value={filterPatient.doTuNgay}
              onChange={(e) => {
                A(e, 'doTuNgay')
              }}
            />
          </Col>
          <Form.Label style={{ width: '30px', padding: '0 0 0 0' }}>Đến</Form.Label>
          <Col style={{ width: '30px', padding: '0 10px 0 5px' }}>
            <Form.Control
              type="date"
              placeholder=""
              size="sm"
              className=""
              value={filterPatient.doDenNgay}
              onChange={(e) => {
                A(e, 'doDenNgay')
              }}
            />
          </Col>
          <Col xs="1" sm="1" md="1" lg="1" style={{ width: '30px', padding: '0 10px 0 0px' }}>
          <Form.Check
            type="checkbox"
            // id=""
            // name="gioitinh"
            label=""
            checked={checkDo}
            onChange={() => null}
            onClick={() => {
              {
                !checkDo
                  ? setFilterPatient((filterPatient, F) => {
                      return {
                        ...filterPatient,
                        doTuNgay: moment(Date.now() - moment.duration(1, 'months')).format(
                          'YYYY-MM-DD'
                        ),
                        doDenNgay: moment(Date.now() + moment.duration(1, 'weeks')).format(
                          'YYYY-MM-DD'
                        ),
                      }
                    }, F())
                  : setFilterPatient((filterPatient, F) => {
                      return {
                        ...filterPatient,
                        doTuNgay: '',
                        doDenNgay: '',
                      }
                    })
              }
              setCheckDo(!checkDo)
            }}
          />
          </Col>
        </Form.Group>
      </Form>
      <Row>
        <Button
          as={Col}
          variant="outline-danger"
          size="sm"
          className="m-1 mx-4 shadow"
          onClick={() => {
            F()
          }}>
          Lọc bệnh nhân
        </Button>
        <Button
          as={Col}
          variant="outline-info"
          size="sm"
          className="m-1 mx-4 shadow"
          onClick={async () => {
            await setCheckHen(false)
            await setCheckDo(false)
            await setOptionSelected([])
            await setFilterPatient({
              hoVaTen: '',
              tinhTrangDo: '',
              henTuNgay: '',
              henDenNgay: '',
              doTuNgay: '',
              doDenNgay: '',
            })
            const A = await axios.get('/api/get')
            update(A)
          }}>
          Xóa lọc
        </Button>
      </Row>
    </div>
  )
}

export default Boloc
