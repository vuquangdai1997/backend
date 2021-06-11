import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import Context from '../../Context';
import Handler from '../../Utility/Handler'

const ListNV = (props) => {
  const [State, SetState] = useContext(Context);
  return props.data.map((item, index) => {

    const Handler_SuaOnclick = async (event) => {
      event.preventDefault();
      let res = await axios.get(`http://localhost:8080/NV/GetInfoNV/${item.manv}`)
      if (res.data.data !== undefined) {
        SetState({ type: "AllNVInfo", payload: [res.data.data[0]] });
        SetState({ type: "QLNVSTT", payload: 1 })
      }
    }
    const Handler_XoaOnClick = (event) => {
      event.preventDefault();
      if (item.manv === State.NVInfo.manv) alert("Không thể xóa tài khoản này");
      else {
        axios.delete(`http://localhost:8080/NV/DeleteNV/${item.manv}`).then((res, err) => {
          let temp = async () => {
            alert("Xóa thông tin nv thành công");
            let res = await axios.get("http://localhost:8080/NV/GetAllInfoNV")
            if (res.data.data !== undefined) {
              SetState({ type: "AllNVInfo", payload: res.data.data })
              SetState({ type: "QLNVSTT", payload: 0 });
            }
          }
          res.data.access === 1 ? temp() : alert(`Xóa thông tin nv thất bại lỗi ${err}: ${res.data.error}`)
        })
      }

    }
    return <tr key={item.manv}>
      <td scope="row">{index}</td>
      <td>{item.manv}</td>
      <td>{item.tennv}</td>
      <td>{item.machuvu}</td>
      <td>{item.ngaysinh}</td>
      <td>{item.cmnd}</td>
      <td>{item.sdt}</td>
      <td>{item.diachi}</td>
      <td>{item.email}</td>
      <td>{item.machinhanh}</td>
      <td>
        <a href="update_nhanvien.html" style={{ border: 'solid 1px black' }} onClick={(event) => Handler_SuaOnclick(event)}> Sửa </a>
        <a href="xoa_nv.html" style={{ border: 'solid 1px black' }} onClick={(event) => Handler_XoaOnClick(event)}> Xóa </a>
      </td>
    </tr>
  })
}
const ListCN = (props) => {
  return props.data.map(item => {
    return <option key={item.machinhanh} value={item.machinhanh}>{item.tenchinhanh}</option>

  })
}


export default function QLNV() {
  const [State, SetState] = useContext(Context);
  const [NVInfo, SetNVInfo] = useState({});
  const [CNInfo, SetCNInfo] = useState([]);
  const Handler_Onchange = (event) => {
    State.QLNVSTT === 1 ? SetNVInfo({ ...NVInfo, machinhanh: State.AllNVInfo[0].machinhanh, [event.target.name]: event.target.value }) :
      SetNVInfo({ ...NVInfo, [event.target.name]: event.target.value })
  }
  const Handler_SuaOnclick = (event) => {
    event.preventDefault();
    axios.put(`http://localhost:8080/NV/UpdateInfoNV`, NVInfo).then((res, err) => {
      let temp = async () => {
        alert("Sửa thông tin nv thành công");
        let res = await axios.get("http://localhost:8080/NV/GetAllInfoNV")
        if (res.data.data !== undefined) {
          SetState({ type: "AllNVInfo", payload: res.data.data })
          SetState({ type: "QLNVSTT", payload: 0 });
        }
      }
      res.data.access === 1 ? temp() : alert(`Sửa thông tin nv thất bại lỗi ${err}: ${res.data.error}`)
    })
  }
  const Handler_ThemOnClick = (event) => {
    event.preventDefault();
    let temp = () => {
      axios.post(`http://localhost:8080/NV/InsertNV`, NVInfo).then((res, err) => {
        let temp2 = async () => {
          alert("Thêm thông tin nhân viên thành công");
          let res = await axios.get("http://localhost:8080/NV/GetAllInfoNV")
          if (res.data.data !== undefined) {
            SetState({ type: "AllNVInfo", payload: res.data.data })
            SetState({ type: "QLNVSTT", payload: 0 });
          }
        }
        res.data.access === 1 ? temp2() : alert(`Thêm thông tin nv thất bại lỗi ${err}: ${res.data.error}`)
      }
      )
    }
    State.QLNVSTT !== 2 ? SetState({ type: "QLNVSTT", payload: 2 }) : temp();
  }

  useEffect(() => {
    (async () => {
      let res = await axios.get("http://localhost:8080/NV/GetAllInfoNV")
      if (res.data.data !== undefined) {
        SetState({ type: "AllNVInfo", payload: res.data.data })
        SetState({ type: "QLNVSTT", payload: 0 })
      }
    })()

  }, [])
  useEffect(() => {
    SetNVInfo({ ...State.AllNVInfo[0] });
    (async () => {
      let res = await axios.get("http://localhost:8080/NV/CA/GetAllChiNhanh");
      if (res.data.data !== undefined) SetCNInfo(res.data.data);
    })()
    if (State.QLNVSTT === 2) SetNVInfo({});
  }, [State.QLNVSTT])

  switch (State.QLNVSTT) {
    case 1: return (
      <div className="container-fluid mt--10">
        {/* table */}
        <h2> Sửa nhân viên</h2>
        <form>
          <table className="tablesuanhanvien">
            <tbody><tr>
              <th>Tên Chi nhánh</th>
              <td>
                <select style={{ width: '75%' }} name="machinhanh" onChange={(event) => Handler_Onchange(event)} placeholder={State.AllNVInfo[0].machinhanh} >
                  <ListCN data={CNInfo} />
                </select>
              </td>
            </tr>
              <tr>
              </tr><tr>
                <th>Mã Nhân viên </th>
                <td><input className="form-control" type="text" name="manv" placeholder={State.AllNVInfo[0].manv} id="diem" onChange={(event) => Handler_Onchange(event)} disabled /> </td>
              </tr>
              <tr>
                <th>Tên nhân viên</th>
                <td><input className="form-control" type="text" name="tennv" placeholder={State.AllNVInfo[0].tennv} onChange={(event) => Handler_Onchange(event)} onKeyPress={(event) => Handler.Char(event)} /> </td>
              </tr>
              <tr>
                <th>Mật khẩu</th>
                <td><input className="form-control" type="text" name="matkhau" placeholder={State.AllNVInfo[0].matkhau} onChange={(event) => Handler_Onchange(event)} onKeyPress={(event) => Handler.Char(event)} /> </td>
              </tr>
              <tr>
                <th>Ngày sinh </th>
                <td><input type="datetime-local" id="Ngaynhap" name="ngaysinh" placeholder={State.AllNVInfo[0].ngaysinh} onChange={(event) => Handler_Onchange(event)} /></td>
              </tr>
              <tr>
                <th>CCCD </th>
                <td><input className="form-control" type="text" name="cmnd" placeholder={State.AllNVInfo[0].cmnd} id="diem" onChange={(event) => Handler_Onchange(event)} onKeyPress={(event) => Handler.Number(event)} /></td>
              </tr>
              <tr>
                <th>SĐT </th>
                <td><input className="form-control" type="text" name="sdt" placeholder={State.AllNVInfo[0].sdt} id="diem" onChange={(event) => Handler_Onchange(event)} onKeyPress={(event) => Handler.Number(event)} /></td>
              </tr>
              <tr>
                <th>Địa chỉ </th>
                <td><input className="form-control" type="text" name="diachi" placeholder={State.AllNVInfo[0].diachi} id="diem" onChange={(event) => Handler_Onchange(event)} onKeyPress={(event) => Handler.Char(event)} /></td>
              </tr>
              <tr>
                <th>Lương cơ bản</th>
                <td><input className="form-control" type="text" name="luongcoban" placeholder={State.AllNVInfo[0].luongcoban} onChange={(event) => Handler_Onchange(event)} id="diem" onKeyPress={(event) => Handler.Number(event)} /> </td>
              </tr>
              <tr>
                <th>Hệ số lương</th>
                <td><input className="form-control" type="text" name="hesoluong" onChange={(event) => Handler_Onchange(event)} placeholder={State.AllNVInfo[0].hesoluong} id="diem" onKeyPress={(event) => Handler.Number(event)} /> </td>
              </tr>
            </tbody></table>
          <button name="sua" value="Xacnhan" style={{ width: '20%' }} onClick={(event) => Handler_SuaOnclick(event)}> Cập Nhật Nhân viên </button>
        </form>
      </div>)
    // SUA INFO NV
    case 2: return (
      <div className="container-fluid mt--10">
        {/* table */}
        <h2> Thêm NV </h2>
        <form>
          <table className="tablesuanhanvien">
            <tbody><tr>
              <th>Tên Chi nhánh</th>
              <td>
                <select style={{ width: '75%' }} name="machinhanh" onChange={(event) => Handler_Onchange(event)}>
                  <option />
                  <ListCN data={CNInfo} />
                </select>
              </td>
            </tr>
              <tr>
              </tr><tr>
                <th>Mã Nhân viên </th>
                <td><input className="form-control" type="text" name="manv" onChange={(event) => Handler_Onchange(event)} id="diem" onKeyPress={(event) => Handler.Char(event)} /> </td>
              </tr>
              <tr>
                <th>Tên nhân viên</th>
                <td><input className="form-control" type="text" name="tennv" onChange={(event) => Handler_Onchange(event)} id="diem" onKeyPress={(event) => Handler.Char(event)} /> </td>
              </tr>
              <tr>
                <th>Chức Vụ</th>
                <td>
                  <select style={{ width: '75%' }} name="machucvu" onChange={(event) => Handler_Onchange(event)} >
                    <option></option>
                    <option value={1}>
                      Nhân viên bán hàng
                    </option>
                    <option value={2}>
                      Nhân viên kho
                    </option>
                    <option value={3}>
                      Nhân viên chi nhánh
                    </option>
                    {/* <option value={4}>
                      Nhân viên tổng
                    </option> */}
                  </select>
                </td>
              </tr>
              <tr>
                <th>Lương cơ bản</th>
                <td><input className="form-control" type="text" name="luongcoban" onChange={(event) => Handler_Onchange(event)} id="diem" onKeyPress={(event) => Handler.Number(event)} /> </td>
              </tr>
              <tr>
                <th>Hệ số lương</th>
                <td><input className="form-control" type="text" name="hesoluong" onChange={(event) => Handler_Onchange(event)} id="diem" onKeyPress={(event) => Handler.Number(event)} /> </td>
              </tr>
              <tr>
                <th>Mật khẩu</th>
                <td><input className="form-control" type="text" name="matkhau" onChange={(event) => Handler_Onchange(event)} id="diem" onKeyPress={(event) => Handler.Char(event)} /> </td>
              </tr>
              <tr>
                <th>Ngày sinh </th>
                <td><input type="datetime-local" id="Ngaynhap" name="ngaysinh" onChange={(event) => Handler_Onchange(event)} /></td>
              </tr>
              <tr>
                <th>CCCD </th>
                <td><input className="form-control" type="text" name="cmnd" onChange={(event) => Handler_Onchange(event)} id="diem" onKeyPress={(event) => Handler.Number(event)} /></td>
              </tr>
              <tr>
                <th>SĐT </th>
                <td><input className="form-control" type="text" name="sdt" onChange={(event) => Handler_Onchange(event)} id="diem" onKeyPress={(event) => Handler.Number(event)} /></td>
              </tr>
              <tr>
                <th>Địa chỉ </th>
                <td><input className="form-control" type="text" name="diachi" onChange={(event) => Handler_Onchange(event)} id="diem" onKeyPress={(event) => Handler.Char(event)} /></td>
              </tr>
              <tr>
                <th>Email </th>
                <td><input className="form-control" type="text" name="email" onChange={(event) => Handler_Onchange(event)} id="diem" onKeyPress={(event) => Handler.Email(event)} /></td>
              </tr>
              <tr>
                <th>Ảnh NV </th>
                <td><input type="file" name="anhnv" onChange={(event) => Handler_Onchange(event)} /></td>
              </tr>
            </tbody></table>
          <button name="them" value="Xacnhan" style={{ width: '20%' }} onClick={(event) => Handler_ThemOnClick(event)} > Thêm Nhân viên </button>
        </form>
      </div>
    )
    //THem NV

    default: return (
      <div className="container-fluid mt--10">
        {/* table */}
        <h2> Quản lý Nhân viên</h2>
        <form action method="get">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">STT</th>
                <th scope="col">Mã NV</th>
                <th scope="col">Tên Nhân viên</th>
                <th scope="col">Chức vụ</th>
                <th scope="col">Ngày sinh</th>
                <th scope="col">CCCD</th>
                <th scope="col">SĐT </th>
                <th scope="col">Địa chỉ </th>
                <th scope="col">Email</th>
                <th scope="col">Thuộc chi nhánh</th>
                <th scope="col">Tác vụ Cập nhật</th>
              </tr>
            </thead>
            <tbody>
              <ListNV data={State.AllNVInfo} />
            </tbody>
          </table>
        </form>
        <h2 className="mt-3"><a href="add_nhanvien.html" style={{ border: 'solid 1px black' }} onClick={(event) => Handler_ThemOnClick(event)}> Thêm Nhân Viên </a> </h2>
      </div>
    )
  }
  // GET NV
}
