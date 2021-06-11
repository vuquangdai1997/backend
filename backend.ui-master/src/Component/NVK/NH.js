import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import Context from '../../Context';
import Handler from '../../Utility/Handler'

const ListPN = (props) => {
  const [State, SetState] = useContext(Context);
  return props.data.map((item) => {
    return <option key={item.maphieunhap} value={item.maphieunhap}>{item.maphieunhap}</option>
  })
}
const ListHH = (props) => {
  const [State, SetState] = useContext(Context);
  return props.data.map((item) => {
    return <option key={item.mahh} value={item.mahh}>{item.tenhh}</option>
  })
}
const ListNCC = (props) => {
  const [State, SetState] = useContext(Context);
  return props.data.map((item) => {
    return <option key={item.mancc} value={item.mancc}>{item.tenncc}</option>
  })
}
const ListMaNV = (props) => {
  const [State, SetState] = useContext(Context);
  return props.data.map((item) => {
    return <option key={item.manv} value={item.manv}>{item.tennv}</option>
  })
}
const ListKho = (props) => {
  const [State, SetState] = useContext(Context);
  return props.data.map((item) => {
    return <option key={item.makho} value={item.makho}>{item.tenkho}</option>
  })
}

const ListCT = props => {
  const [State, SetState] = useContext(Context);


  return props.data.map((item, index) => {
    const Handler_SuaOnclick = async (event) => {
      event.preventDefault();
      let res = await axios.get(`http://localhost:8080/SYS/GetCTPhieuNhap/${item.machitietphieunhap}`)
      if (res.data.data !== undefined) {
        SetState({ type: "AllCTPN", payload: [res.data.data[0]] });
        SetState({ type: "QLPNSTT", payload: -2 })
        //-2 là hiển thị trang sửa pnct
      }
    }
    const Handler_XoaOnClick = (event) => {
      event.preventDefault();
      axios.delete(`http://localhost:8080/SYS/DeleteCTPhieuNhap/${item.machitietphieunhap}`).then((res, err) => {
        let temp = async () => {
          alert("Xóa thông tin PNCT thành công");
          let res = await axios.get(`http://localhost:8080/SYS/GetAllCTPhieuNhap/${item.maphieunhap}`)
          if (res.data.data !== undefined) {
            SetState({ type: "AllCTPN", payload: res.data.data })
            SetState({ type: "QLPNSTT", payload: -1 });
          }
        }
        res.data.access === 1 ? temp() : alert(`Xóa thông tin PNCT thất bại lỗi ${err}: ${res.data.error}`)
      })
    }
    return <tr key={item?.machitietphieunhap}>
      <td scope="row">{index}</td>
      <td>{item?.machitietphieunhap}</td>
      <td>{item?.mahh}</td>
      <td>{item?.soluong}</td>
      <td>{item?.dongia}</td>
      <td>{item?.mancc}</td>
      <td><a href="update_nhanvien.html" style={{ border: 'solid 1px black' }} onClick={(event) => Handler_SuaOnclick(event)}> Sửa </a>
        <a href="xoa_nv.html" style={{ border: 'solid 1px black' }} onClick={(event) => Handler_XoaOnClick(event)}> Xóa </a> </td>
    </tr>
  })
}

const ListNV = (props) => {
  const [State, SetState] = useContext(Context);
  return props.data.map((item, index) => {

    const Handler_XemOnclick = async (event) => {
      event.preventDefault();
      let res = await axios.get(`http://localhost:8080/SYS/GetAllCTPhieuNhap/${item.maphieunhap}`)
      if (res.data.data !== undefined) {
        SetState({ type: "AllCTPN", payload: res.data.data });
        SetState({ type: "QLPNSTT", payload: -1 })
      }
    }
    const Handler_SuaOnclick = async (event) => {
      event.preventDefault();
      let res = await axios.get(`http://localhost:8080/SYS/GetPhieuNhap/${item.maphieunhap}`)
      if (res.data.data !== undefined) {
        SetState({ type: "AllPN", payload: [res.data.data[0]] });
        SetState({ type: "QLPNSTT", payload: 1 })
      }
    }
    const Handler_XoaOnClick = (event) => {
      event.preventDefault();
      axios.delete(`http://localhost:8080/SYS/DeletePhieuNhap/${item.maphieunhap}`).then((res, err) => {
        let temp = async () => {
          alert("Xóa thông tin phiếu nhập thành công");
          let res = await axios.get("http://localhost:8080/SYS/GetAllPhieuNhap")
          if (res.data.data !== undefined) {
            SetState({ type: "AllPN", payload: res.data.data })
            SetState({ type: "QLPNSTT", payload: 0 });
          }
        }
        res.data.access === 1 ? temp() : alert(`Xóa thông tin phiếu nhập thất bại lỗi ${err}: ${res.data.error}`)
      })


    }


    return <tr key={item?.maphieunhap}>
      <td scope="row">{index}</td>
      <td>{item?.maphieunhap}</td>
      <td>{item?.tenphieunhap}</td>
      <td>{item?.manv}</td>
      <td>{item?.makho}</td>
      <td>{item?.ngaynhap}</td>
      <td>{item?.tongtien}</td>

      <td>
        <a href="update_nhanvien.html" style={{ border: 'solid 1px black' }} onClick={(event) => Handler_XemOnclick(event)}> Xem </a>
        <a href="update_nhanvien.html" style={{ border: 'solid 1px black' }} onClick={(event) => Handler_SuaOnclick(event)}> Sửa </a>
        <a href="xoa_nv.html" style={{ border: 'solid 1px black' }} onClick={(event) => Handler_XoaOnClick(event)}> Xóa </a>
      </td>
    </tr>
  })
}



export default function NH() {
  const [State, SetState] = useContext(Context);
  const [PNInfo, SetPNInfo] = useState({});
  const [PNCTInfo, SetPNCTInfo] = useState({});
  const [KhoInfo, SetKhoInfo] = useState([]);
  const [NCCInfo, SetNCCInfo] = useState([]);
  const [HHInfo, SetHHInfo] = useState([]);
  const [MaNVInfo, SetMaNVInfo] = useState([]);



  const Handler_Onchange = (event) => {

    State.QLPNSTT !== 2 ? SetPNInfo({ ...PNInfo, [event.target.name]: event.target.value }) : SetPNInfo({ ...PNInfo, tongtien: 0, [event.target.name]: event.target.value })
  }
  const Handler_SuaOnclick = (event) => {
    event.preventDefault();
    axios.put(`http://localhost:8080/SYS/UpdatePhieuNhap`, PNInfo).then((res, err) => {
      let temp = async () => {
        alert("Sửa thông tin phiếu nhập thành công");
        let res = await axios.get("http://localhost:8080/SYS/GetAllPhieuNhap")
        if (res.data.data !== undefined) {
          SetState({ type: "AllPN", payload: res.data.data })
          SetState({ type: "QLPNSTT", payload: 0 });
        }
      }
      res.data.access === 1 ? temp() : alert(`Sửa thông tin phiếu nhập thất bại lỗi ${err}: ${res.data.error}`)
    })
  }
  const Handler_ThemOnClick = (event) => {
    event.preventDefault();
    let temp = () => {
      axios.post(`http://localhost:8080/SYS/InsertPhieuNhap`, PNInfo).then((res, err) => {
        let temp2 = async () => {
          alert("Thêm thông tin phiếu nhập thành công");
          let res = await axios.get("http://localhost:8080/SYS/GetAllPhieuNhap")
          if (res.data.data !== undefined) {
            SetState({ type: "AllPN", payload: res.data.data })
            SetState({ type: "QLPNSTT", payload: 0 });
          }
        }
        res.data.access === 1 ? temp2() : alert(`Thêm thông tin phiếu nhập thất bại lỗi ${err}: ${res.data.error}`)
      }
      )
    }

    State.QLPNSTT !== 2 ? SetState({ type: "QLPNSTT", payload: 2 }) : temp();
  }
  // THAO TÁC VỚI PHIẾU NHẬP
  // ------------------------------------------------------------------------

  const Handler_CTOnchange = (event) => {
    State.QLPNSTT !== -3 ? SetPNCTInfo({ ...PNCTInfo, machitietphieunhap: State.AllCTPN[0]?.machitietphieunhap, maphieunhap: State.AllCTPN[0]?.maphieunhap, [event.target.name]: event.target.value }) :
      SetPNCTInfo({ ...PNCTInfo, [event.target.name]: event.target.value })
  }
  const Handler_SuaCTOnclick = (event) => {
    event.preventDefault();
    axios.put(`http://localhost:8080/SYS/UpdateCTPhieuNhap`, PNCTInfo).then((res, err) => {
      let temp = async () => {
        alert("Sửa thông tin phiếu nhập thành công");
        let res = await axios.get(`http://localhost:8080/SYS/GetAllCTPhieuNhap/${State.AllCTPN[0]?.maphieunhap}`)
        if (res.data.data !== undefined) {
          SetState({ type: "AllCTPN", payload: res.data.data })
          SetState({ type: "QLPNSTT", payload: -1 });
        }
      }
      res.data.access === 1 ? temp() : alert(`Sửa thông tin phiếu nhập chi tiết thất bại lỗi ${err}: ${res.data.error}`)
    })
  }
  const Handler_ThemCTOnclick = (event) => {
    event.preventDefault();

    let temp = () => {
      axios.post(`http://localhost:8080/SYS/InsertCTPhieuNhap`, PNCTInfo).then((res, err) => {
        let temp2 = async () => {
          alert("Thêm thông tin phiếu nhập thành công");
          let res = await axios.get(`http://localhost:8080/SYS/GetAllCTPhieuNhap/${State.AllCTPN[0]?.maphieunhap}`)
          if (res.data.data !== undefined) {
            SetState({ type: "AllCTPN", payload: res.data.data })
            SetState({ type: "QLPNSTT", payload: -1 });
          }
        }
        res.data.access === 1 ? temp2() : alert(`Thêm thông tin phiếu nhập chi tiết thất bại lỗi ${err}: ${res.data.error}`)
      }
      )

    }
    State.QLPNSTT !== -3 ? SetState({ type: "QLPNSTT", payload: -3 }) : temp();

  }
  //THAO TÁC VỚI PHIẾU NHẬP CHI TIẾT
  //------------------------------------------------------------------
  useEffect(() => {
    (async () => {
      let res = await axios.get("http://localhost:8080/SYS/GetAllPhieuNhap")
      if (res.data.data !== undefined) {
        SetState({ type: "AllPN", payload: res.data.data })
        SetState({ type: "QLPNSTT", payload: 0 });
      }
    })()

  }, [])
  useEffect(() => {
    SetPNInfo({ ...State.AllPN[0] });
    (async () => {
      let res = await axios.get("http://localhost:8080/NV/KHO/GetAllKho");
      if (res.data.data !== undefined) SetKhoInfo(res.data.data);
      let res2 = await axios.get("http://localhost:8080/NV/GetAllInfoNV");
      if (res2.data.data !== undefined) SetMaNVInfo(res2.data.data);
      let res3 = await axios.get("http://localhost:8080/NV/NCC/GetAllNCC");
      if (res3.data.data !== undefined) SetNCCInfo(res3.data.data);
      let res4 = await axios.get("http://localhost:8080/Data/HH/GetAllHH");
      if (res3.data.data !== undefined) SetHHInfo(res4.data.data);
    })()
    if (State.QLPNSTT === 2) SetPNInfo({});
  }, [State.QLPNSTT])
  //   useEffect(()=>{

  //       if (State.AllCTPN[0]?.maphieunhap=== undefined) SetState({type:"AllCTPN",payload:[{maphieunhap:"null"}]})


  // })
  switch (State.QLPNSTT) {
    case -3: return (
      <div className="container-fluid mt--10">

        <h2> Thêm Phiếu Nhập Hàng Chi Tiết </h2>
        <form>
          <table className="tablesuanhanvien">
            <tbody>

              <tr>
                <th>Mã Phiếu Nhập</th>
                <td>
                  <select style={{ width: '75%' }} name="maphieunhap" onChange={(event) => Handler_CTOnchange(event)}>
                    <option />
                    <ListPN data={State.AllPN} />
                  </select>
                </td>
              </tr>

              <tr>
                <th>Mã Hàng Hóa</th>
                <td>
                  <select style={{ width: '75%' }} name="mahh" onChange={(event) => Handler_CTOnchange(event)}>
                    <option />
                    <ListHH data={HHInfo} />
                  </select>
                </td>
              </tr>

              <tr>
                <th>Nhà cung cấp</th>
                <td>
                  <select style={{ width: '75%' }} name="mancc" onChange={(event) => Handler_CTOnchange(event)}>
                    <option />
                    <ListNCC data={NCCInfo} />
                  </select>
                </td>
              </tr>
              <tr>
                <th>Số lượng </th>
                <td><input className="form-control" type="text" name="soluong" id="diem" onChange={(event) => Handler_CTOnchange(event)} onKeyPress={(event) => Handler.Number(event)} /> </td>
              </tr>
              <tr>
                <th>Đơn giá </th>
                <td><input className="form-control" type="text" name="dongia" id="diem" onChange={(event) => Handler_CTOnchange(event)} onKeyPress={(event) => Handler.Number(event)} /> </td>
              </tr>

            </tbody></table>
          <br></br>
          <button name="sua" value="Xacnhan" style={{ width: '20%' }} onClick={(event) => Handler_ThemCTOnclick(event)}> Thêm CTPN </button>
        </form>
      </div>)
    // SUA INFO NV

    case -2: return (
      <div className="container-fluid mt--10">

        <h2> Sửa Phiếu Nhập Hàng Chi Tiết </h2>
        <form>
          <table className="tablesuanhanvien">
            <tbody>

              <tr>
                <th>Mã Phiếu Nhập CT </th>
                <td><input className="form-control" type="text" name="machitietphieunhap" placeholder={State.AllCTPN[0].machitietphieunhap} id="diem" onChange={(event) => Handler_CTOnchange(event)} disabled /> </td>
              </tr>
              <tr>
                <th>Mã Phiếu Nhập </th>
                <td><input className="form-control" type="text" name="maphieunhap" placeholder={State.AllCTPN[0].maphieunhap} id="diem" onChange={(event) => Handler_CTOnchange(event)} disabled /> </td>
              </tr>
              <tr>
                <th>Mã Hàng Hóa</th>
                <td>
                  <select style={{ width: '75%' }} name="mahh" placeholder={State.AllCTPN[0].mahh} onChange={(event) => Handler_CTOnchange(event)}>
                    <option />
                    <ListHH data={HHInfo} />
                  </select>
                </td>
              </tr>

              <tr>
                <th>Nhà cung cấp</th>
                <td>
                  <select style={{ width: '75%' }} name="mancc" placeholder={State.AllCTPN[0].mancc} onChange={(event) => Handler_CTOnchange(event)}>
                    <option />
                    <ListNCC data={NCCInfo} />
                  </select>
                </td>
              </tr>
              <tr>
                <th>Số lượng </th>
                <td><input className="form-control" type="text" name="soluong" placeholder={State.AllCTPN[0].soluong} id="diem" onChange={(event) => Handler_CTOnchange(event)} onKeyPress={(event) => Handler.Number(event)} /> </td>
              </tr>
              <tr>
                <th>Đơn giá </th>
                <td><input className="form-control" type="text" name="dongia" placeholder={State.AllCTPN[0].dongia} id="diem" onChange={(event) => Handler_CTOnchange(event)} onKeyPress={(event) => Handler.Number(event)} /> </td>
              </tr>

            </tbody></table>
          <br></br>
          <button name="sua" value="Xacnhan" style={{ width: '20%' }} onClick={(event) => Handler_SuaCTOnclick(event)}> Cập Nhật CT PN </button>
        </form>
      </div>)
    // SUA INFO NV

    case -1: return (

      <div className="container-fluid mt--10">
        {/* table */}
        <h2> Quản lý Chi Tiết Phiếu Nhập</h2>
        <form action method="get">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">STT</th>
                <th scope="col">Mã CT Phiếu Nhập</th>
                <th scope="col">Mã HH</th>
                <th scope="col">Số lượng</th>
                <th scope="col">Đơn giá</th>
                <th scope="col">Nhà cung cấp</th>
                <th scope="col">Tác vụ khác</th>
              </tr>
            </thead>
            <tbody>
              <ListCT data={State.AllCTPN} />
            </tbody>
          </table>
        </form>
        <h2 className="mt-3"><a href="add_nhanvien.html" style={{ border: 'solid 1px black' }} onClick={(event) => Handler_ThemCTOnclick(event)}> Thêm CT Phiếu Nhập </a> </h2>
      </div>

    )

    //CHI TIẾT PHIẾU NHẬP
    case 1: return (
      <div className="container-fluid mt--10">

        <h2> Sửa Phiếu nhập</h2>
        <form>
          <table className="tablesuanhanvien">
            <tbody>

              <tr>
                <th>Mã Phiếu Nhập </th>
                <td><input className="form-control" type="text" name="maphieunhap" placeholder={State.AllPN[0].maphieunhap} id="diem" onChange={(event) => Handler_Onchange(event)} disabled /> </td>
              </tr>
              <tr>
                <th>Tên Phiếu Nhập </th>
                <td><input className="form-control" type="text" name="tenphieunhap" placeholder={State.AllPN[0].tenphieunhap} id="diem" onChange={(event) => Handler_Onchange(event)} onKeyPress={(event) => Handler.Char(event)} /> </td>
              </tr>
              <tr>
                <th>Mã NV </th>
                <td>
                  <select style={{ width: '75%' }} name="manv" placeholder={State.AllPN[0].manv} onChange={(event) => Handler_Onchange(event)}>
                    <option />
                    <ListMaNV data={MaNVInfo} />
                  </select>

                </td>
              </tr>
              <tr>
                <th>Kho</th>
                <td>
                  <select style={{ width: '75%' }} name="makho" placeholder={State.AllPN[0].makho} onChange={(event) => Handler_Onchange(event)}>
                    <option />
                    <ListKho data={KhoInfo} />
                  </select>
                </td>
              </tr>

              <tr>
                <th>Ngày nhập</th>
                <td><input className="form-control" type="datetime-local" name="ngaynhap" placeholder={State.AllPN[0].ngaynhap} onChange={(event) => Handler_Onchange(event)} /> </td>
              </tr>
              <tr>
                <th> Tổng tiền </th>
                <td><input className="form-control" type="text" name="tongtien" disabled placeholder={State.AllPN[0].tongtien} id="diem" onChange={(event) => Handler_Onchange(event)} /></td>
              </tr>

            </tbody></table>
          <br></br>
          <button name="sua" value="Xacnhan" style={{ width: '20%' }} onClick={(event) => Handler_SuaOnclick(event)}> Cập Nhật Phiếu Nhập </button>
        </form>
      </div>)
    // SUA INFO NV
    case 2: return (
      <div className="container-fluid mt--10">
        {/* table */}
        <h2> Thêm Phiếu Nhập </h2>
        <form>
          <table className="tablesuanhanvien">
            <tbody>

              <tr>
                <th>Mã Phiếu Nhập </th>
                <td><input className="form-control" type="text" name="maphieunhap" id="diem" onChange={(event) => Handler_Onchange(event)} onKeyPress={(event) => Handler.Char(event)} /> </td>
              </tr>
              <tr>
                <th>Tên Phiếu Nhập </th>
                <td><input className="form-control" type="text" name="tenphieunhap" id="diem" onChange={(event) => Handler_Onchange(event)} onKeyPress={(event) => Handler.Char(event)} /> </td>
              </tr>
              <tr>
                <th>Mã NV </th>
                <td>
                  <select style={{ width: '75%' }} name="manv" onChange={(event) => Handler_Onchange(event)}>
                    <option />
                    <ListMaNV data={MaNVInfo} />
                  </select>

                </td>
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
                <th>
                  <div className="mt-3"><select style={{ width: '45%' }}>
                    <option value>
                      Tên hàng hóa
                        </option>
                    <option value="tensp">hàng kho</option>
                    <option value="tensp">hàng cứu đông</option>
                  </select>
                    <label className=" ml-2 mr-2">Số lượng </label>
                    <input classsName="ml-2" type="number" name id />
                  </div>
                  <div className="mt-3"><select style={{ width: '50%' }}>
                    <option value>
                      Tên nhà cung cấp
                        </option>
                    <option value="tensp">NCC quang đại</option>
                    <option value="tensp">NCC xuân đông</option>
                  </select>
                  </div>
                  <div className="mt-4"> <a name id className="btn btn-primary" href="#" role="button">Lựa chọn
                        hàng hóa</a></div>
                </th><td>
                  <div>
                    <table className="tablechitietsanpham container-fluid mt-2">
                      <thead>
                        <tr>
                          <th>STT</th>
                          <th>Tên hàng hóa</th>
                          <th>Nhà cung cấp</th>
                          <th> Số lượng</th>
                          <th> Đơn giá</th>
                          <th>Thành tiền</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1</td>
                          <td> Cà Phê phân chồn</td>
                          <td> quang đại</td>
                          <td>2</td>
                          <td>4566</td>
                          <td>99999</td>
                        </tr>
                        <tr>
                          <td>2</td>
                          <td> Cà Phê đen</td>
                          <td> quang đại</td>
                          <td>2</td>
                          <td>4566</td>
                          <td>99999</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </td>
              </tr>
              <tr>
                <th> Tổng tiền </th>
                <td><input className="form-control" type="text" name="tongtien" placeholder={0} id="diem" onChange={(event) => Handler_Onchange(event)} /></td>
              </tr>

            </tbody></table>
          <br></br>
          <button name="them" value="Xacnhan" style={{ width: '20%' }} onClick={(event) => Handler_ThemOnClick(event)} > Thêm Phiếu Nhập </button>
        </form>
      </div>
    )
    //THem NV

    default: return (
      <div className="container-fluid mt--10">
        {/* table */}
        <h2> Quản lý Phiếu Nhập</h2>
        <form action method="get">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">STT</th>
                <th scope="col">Mã PN</th>
                <th scope="col">Tên PN</th>
                <th scope="col">Mã NV</th>
                <th scope="col">Mã Kho</th>
                <th scope="col">Ngày Nhập</th>
                <th scope="col">Tổng tiền </th>
                <th scope="col">Tác vụ khác </th>
              </tr>
            </thead>
            <tbody>
              <ListNV data={State.AllPN} />
            </tbody>
          </table>
        </form>
        <h2 className="mt-3"><a href="add_nhanvien.html" style={{ border: 'solid 1px black' }} onClick={(event) => Handler_ThemOnClick(event)}> Thêm Phiếu Nhập </a> </h2>
      </div>
    )
  }
  // GET NV
}
