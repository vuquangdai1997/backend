import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import Context from '../../Context';
import '../table.css'
const ListNV = (props) => {
  const [State, SetState] = useContext(Context);
  return props.data.map((item, index) => {

    return <tr  key={item?.masukien}>
      <td scope="row">{index}</td>
      <td>{item?.masukien}</td>
      <td>{item?.tensukien}</td>
      <td>{item?.chietkhau}</td>
      <td>{item?.noidung}</td>
      <td>{item?.tungay}</td>
      <td>{item?.denngay}</td>

    </tr>
  })
}
export default function SK() {
  const [State, SetState] = useContext(Context);

  useEffect(() => {
    (async () => {
      let res = await axios.get("http://localhost:8080/NV/SK/GetAllSK")
      if (res.data.data !== undefined) {
        SetState({ type: "AllSK", payload: res.data.data })
      }
    })()

  }, [])

  return (
    <div className="container-fluid mt--10">
      {/* table */}
      <h2> Thông tin sự kiện</h2>
      <br></br>
      <form action method="get">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">STT</th>
              <th scope="col">Mã Sự Kiện</th>
              <th scope="col">Tên Sự Kiện</th>
              <th scope="col">Chiết Khấu</th>
              <th scope="col">Nội Dung</th>
              <th scope="col">Từ Ngày</th>
              <th scope="col">Đến Ngày</th>
            </tr>
          </thead>
          <tbody>
            <ListNV data={State.AllSK} />
          </tbody>
        </table>
      </form>

    </div>
  )

  // GET NV
}
