import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import Context from '../../Context';
import Handler from '../../Utility/Handler'

const ListKho = (props) => {
  const [State, SetState] = useContext(Context);
  return props.data.map((item) => {
    return <option key={item.makho} value={item.makho}>{item.tenkho}</option>
  })
}
const ListNV = (props) => {
  const [State, SetState] = useContext(Context);
  return props.data.map((item, index) => {

    const Handler_SuaOnclick = async (event) => {
      event.preventDefault();
      let res = await axios.get(`http://localhost:8080/Data/HH/GetHH/${item.mahh}`)
      if (res.data.data !== undefined) {
        SetState({ type: "AllHH", payload: [res.data.data[0]] });
        SetState({ type: "QLHHSTT", payload: 1 })
      }
    }
    const Handler_XoaOnClick = (event) => {
      event.preventDefault();
      axios.delete(`http://localhost:8080/Data/HH/DeleteHH/${item.mahh}`).then((res, err) => {
        let temp = async () => {
          alert("Xóa thông tin hàng hóa thành công");
          let res = await axios.get("http://localhost:8080/Data/HH/GetAllHH")
          if (res.data.data !== undefined) {
            SetState({ type: "AllHH", payload: res.data.data })
            SetState({ type: "QLHHSTT", payload: 0 });
          }
        }
        res.data.access === 1 ? temp() : alert(`Xóa thông tin hàng hóa thất bại lỗi ${err}: ${res.data.error}`)
      })
    }
    return <tr key={item?.mahh}>
      <td scope="row">{index}</td>
      <td>{item?.mahh}</td>
      <td>{item?.tenhh}</td>
      <td>{item?.maloaihh}</td>
      <td>{item?.makho}</td>
      <td>{item?.ngaynhap}</td>
      <td>{item?.gianhap}</td>
      <td>{item?.donvitinh}</td>
      <td>{item?.soluong}</td>
      <td>
        <a href="update_nhanvien.html" style={{ border: 'solid 1px black' }} onClick={(event) => Handler_SuaOnclick(event)}> Sửa </a>
        <a href="xoa_nv.html" style={{ border: 'solid 1px black' }} onClick={(event) => Handler_XoaOnClick(event)}> Xóa </a>
      </td>
    </tr>
  })
}
export default function HH() {
  const [State, SetState] = useContext(Context);
  const [HHInfo, SetHHInfo] = useState({});
  const [KhoInfo, SetKhoInfo] = useState([]);

  const Handler_Onchange = (event) => {

    State.QLHHSTT !== 2 ? SetHHInfo({ ...HHInfo, [event.target.name]: event.target.value }) : SetHHInfo({ ...HHInfo, soluong: 0, [event.target.name]: event.target.value })
  }
  const Handler_SuaOnclick = (event) => {
    event.preventDefault();
    axios.put(`http://localhost:8080/Data/HH/UpdateHH`, HHInfo).then((res, err) => {
      let temp = async () => {
        alert("Sửa thông tin hàng hóa thành công");
        let res = await axios.get("http://localhost:8080/Data/HH/GetAllHH")
        if (res.data.data !== undefined) {
          SetState({ type: "AllHH", payload: res.data.data })
          SetState({ type: "QLHHSTT", payload: 0 });
        }
      }
      res.data.access === 1 ? temp() : alert(`Sửa thông tin hàng hóa thất bại lỗi ${err}: ${res.data.error}`)
    })
  }
  const Handler_ThemOnClick = (event) => {
    event.preventDefault();
    let temp = () => {
      axios.post(`http://localhost:8080/Data/HH/InsertHH`, HHInfo).then((res, err) => {
        let temp2 = async () => {
          alert("Thêm thông tin hàng hóa thành công");
          let res = await axios.get("http://localhost:8080/Data/HH/GetAllHH")
          if (res.data.data !== undefined) {
            SetState({ type: "AllHH", payload: res.data.data })
            SetState({ type: "QLHHSTT", payload: 0 });
          }
        }
        res.data.access === 1 ? temp2() : alert(`Thêm thông tin hàng hóa thất bại lỗi ${err}: ${res.data.error}`)
      }
      )
    }
    State.QLHHSTT !== 2 ? SetState({ type: "QLHHSTT", payload: 2 }) : temp();
  }

  useEffect(() => {
    (async () => {
      let res = await axios.get("http://localhost:8080/Data/HH/GetAllHH")
      if (res.data.data !== undefined) {
        SetState({ type: "AllHH", payload: res.data.data })
        SetState({ type: "QLHHSTT", payload: 0 });
      }
    })()

  }, [])
  useEffect(() => {
    SetHHInfo({ ...State.AllHH[0] });
    (async () => {
      let res = await axios.get("http://localhost:8080/NV/KHO/GetAllKho");
      if (res.data.data !== undefined) SetKhoInfo(res.data.data);
    })()
    if (State.QLHHSTT === 2) SetHHInfo({});
  }, [State.QLHHSTT])

  switch (State.QLHHSTT) {
    case 1: return (
      <div className="container-fluid mt--10">

        <h2> Sửa Hàng Hóa</h2>
        <form>
          <table className="tablesuanhanvien">
            <tbody>

              <tr>
                <th>Mã Hàng Hóa </th>
                <td><input className="form-control" type="text" name="mahh" placeholder={State.AllHH[0].mahh} id="diem" onChange={(event) => Handler_Onchange(event)} disabled /> </td>
              </tr>
              <tr>
                <th>Tên Hàng Hóa </th>
                <td><input className="form-control" type="text" name="tenhh" placeholder={State.AllHH[0].tenhh} id="diem" onChange={(event) => Handler_Onchange(event)} onKeyPress={(event) => Handler.Char(event)} /> </td>
              </tr>
              <tr>
                <th>Loại Hàng Hóa </th>
                <td><input className="form-control" type="text" name="maloaihh" placeholder={State.AllHH[0].maloaihh} id="diem" onChange={(event) => Handler_Onchange(event)} onKeyPress={(event) => Handler.Char(event)} /> </td>
              </tr>
              <tr>
                <th>Kho</th>
                <td>
                  <select style={{ width: '75%' }} name="makho" placeholder={State.AllHH[0].makho} onChange={(event) => Handler_Onchange(event)}>
                    <option />
                    <ListKho data={KhoInfo} />
                  </select>
                </td>
              </tr>
              <tr>
                <th>Ngày nhập</th>
                <td><input className="form-control" type="datetime-local" name="ngaynhap" placeholder={State.AllHH[0].ngaynhap} onChange={(event) => Handler_Onchange(event)} /> </td>
              </tr>
              <tr>
                <th> Giá nhập </th>
                <td><input className="form-control" type="text" name="gianhap" placeholder={State.AllHH[0].gianhap} id="diem" onChange={(event) => Handler_Onchange(event)} onKeyPress={(event) => Handler.Number(event)} /></td>
              </tr>
              <tr>
                <th>Đơn vị tính </th>
                <td><input type="text" id="Ngaynhap" name="donvitinh" placeholder={State.AllHH[0].donvitinh} onChange={(event) => Handler_Onchange(event)} onKeyPress={(event) => Handler.Char(event)} /></td>
              </tr>
              <tr>
                <th>Số lượng </th>
                <td><input type="text" id="Ngaynhap" name="soluong" disabled placeholder={State.AllHH[0].soluong} onChange={(event) => Handler_Onchange(event)} /></td>
              </tr>
            </tbody></table>
          <br></br>
          <button name="sua" value="Xacnhan" style={{ width: '20%' }} onClick={(event) => Handler_SuaOnclick(event)}> Cập Nhật Hàng Hóa </button>
        </form>
      </div>)
    // SUA INFO NV
    case 2: return (
      <div className="container-fluid mt--10">
        {/* table */}
        <h2> Thêm Hàng Hóa </h2>
        <form>
          <table className="tablesuanhanvien">
            <tbody>

              <tr>
                <th>Mã Hàng Hóa </th>
                <td><input className="form-control" type="text" name="mahh" id="diem" onChange={(event) => Handler_Onchange(event)} onKeyPress={(event) => Handler.Char(event)} /> </td>
              </tr>
              <tr>
                <th>Tên Hàng Hóa </th>
                <td><input className="form-control" type="text" name="tenhh" id="diem" onChange={(event) => Handler_Onchange(event)} onKeyPress={(event) => Handler.Char(event)} /> </td>
              </tr>
              <tr>
                <th>Loại Hàng Hóa </th>
                <td><input className="form-control" type="text" name="maloaihh" id="diem" onChange={(event) => Handler_Onchange(event)} onKeyPress={(event) => Handler.Char(event)} /> </td>
              </tr>
              <tr>
                <th>Kho</th>
                <td>
                  <select style={{ width: '75%' }} name="makho" onChange={(event) => Handler_Onchange(event)}>
                    <option />
                    <ListKho data={KhoInfo} />
                  </select>
                </td>
              </tr>
              <tr>
                <th>Ngày nhập</th>
                <td><input className="form-control" type="datetime-local" name="ngaynhap" onChange={(event) => Handler_Onchange(event)} /> </td>
              </tr>
              <tr>
                <th> Giá nhập </th>
                <td><input className="form-control" type="text" name="gianhap" id="diem" onChange={(event) => Handler_Onchange(event)} onKeyPress={(event) => Handler.Number(event)} /></td>
              </tr>
              <tr>
                <th>Đơn vị tính </th>
                <td><input type="text" id="Ngaynhap" name="donvitinh" onChange={(event) => Handler_Onchange(event)} onKeyPress={(event) => Handler.Char(event)} /></td>
              </tr>
              <tr>
                <th>Số lượng </th>
                <td><input type="text" id="Ngaynhap" name="soluong" disabled placeholder={0} onChange={(event) => Handler_Onchange(event)} /></td>
              </tr>
            </tbody></table>
          <br></br>
          <button name="them" value="Xacnhan" style={{ width: '20%' }} onClick={(event) => Handler_ThemOnClick(event)} > Thêm Hàng Hóa </button>
        </form>
      </div>
    )
    //THem NV

    default: return (
      <div className="container-fluid mt--10">
        {/* table */}
        <h2> Quản lý Hàng Hóa</h2>
        <form action method="get">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">STT</th>
                <th scope="col">Mã HH</th>
                <th scope="col">Tên HH</th>
                <th scope="col">Mã Loại HH</th>
                <th scope="col">Mã Kho</th>
                <th scope="col">Ngày Nhập</th>
                <th scope="col">Giá Nhập </th>
                <th scope="col">Đơn vị tính </th>
                <th scope="col">Số lượng </th>
                <th scope="col">Tác vụ Cập nhật</th>
              </tr>
            </thead>
            <tbody>
              <ListNV data={State.AllHH} />
            </tbody>
          </table>
        </form>
        <h2 className="mt-3"><a href="add_nhanvien.html" style={{ border: 'solid 1px black' }} onClick={(event) => Handler_ThemOnClick(event)}> Thêm Hàng Hóa </a> </h2>
      </div>
    )
  }
  // GET NV
}
