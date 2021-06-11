import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import Context from '../../Context';
import Handler from '../../Utility/Handler';

const ListCN = (props)=>{
  return props.data.map(item=>{
      return <option key={item.machinhanh} value={item.machinhanh}>{item.tenchinhanh}</option>

  })
}

const ListCT = (props) => {
  const [State, SetState] = useContext(Context);

    return props.data.map((item,index)=>{
      
      const Handler_SuaOnclick = async (event)=>{
        event.preventDefault();
        let res = await axios.get(`http://localhost:8080/SYS/GetPhieuNhanTien/${item.maphieunhantien}`)
        if (res.data.data !== undefined){
          SetState({type:"AllPNT",payload:[res.data.data[0]]});
          SetState({type:"QLPNTSTT",payload:1})
        }
    }
    const Handler_XoaOnClick = (event)=>{
        event.preventDefault();
            axios.delete(`http://localhost:8080/SYS/DeletePhieuNhanTien/${item.maphieunhantien}`).then((res,err)=>{
            let temp = async () => {
                alert("Xóa thông tin phiếu nhận tiền thành công");
                let res = await axios.get("http://localhost:8080/SYS/GetAllPhieuNhanTien");
                 if(res.data.data!==undefined) {
                  SetState({ type: "AllPNT", payload: res.data.data });
                  SetState({ type: "QLPNTSTT", payload: 0 })
                 }

            }
            res.data.access === 1 ? temp() : alert(`Xóa thông tin phiếu nhận tiền thất bại lỗi ${err}: ${res.data.error}`)
        })
        

    }
        return  (
        <tr key={item.maphieunhantien}>
            <td>{index}</td>
            <td>{item.maphieunhantien}</td>
            <td>{item.machinhanh}</td>
            <td>{item.manv}</td>
            <td>{item.noidung} </td>
            <td>{item.ngaynhan}</td>
            <td>
               {item.sotiennhan}
            </td>
            <td>
          <a href="update_nhanvien.html" style={{border: 'solid 1px black'}} onClick={(event)=>Handler_SuaOnclick(event)}> Sửa </a>
          <a href="xoa_nv.html" style={{border: 'solid 1px black'}} onClick={(event)=>Handler_XoaOnClick(event)}> Xóa </a> 
        </td>
          </tr>)
    })
}

export default function QLV() {
  const [State, SetState] = useContext(Context);
  
  const [NTInfo,SetNTInfo] = useState({});
  const [CNInfo,SetCNInfo] = useState([]);

  const Handler_Onchange = (event)=>{
    State.QLPNTSTT === 1 ?  SetNTInfo({...NTInfo,manv:State.NVInfo.manv,machinhanh:State.AllPNT[0].machinhanh,[event.target.name]:event.target.value}) : SetNTInfo({...NTInfo,manv:State.NVInfo.manv,[event.target.name]:event.target.value})
}
const Handler_SuaOnclick = (event)=>{
  event.preventDefault();
  axios.put(`http://localhost:8080/SYS/UpdatePhieuNhanTien`,NTInfo).then((res,err)=>{
      let temp = async () => {
          alert("Sửa thông tin phiếu nhận thành công");
          let res = await axios.get("http://localhost:8080/SYS/GetAllPhieuNhanTien");
                 if(res.data.data!==undefined) {
                    SetState({ type: "AllPNT", payload: res.data.data });
                    SetState({ type: "QLPNTSTT", payload: 0 })
                 }
      }
      res.data.access === 1 ? temp() : alert(`Sửa thông tin phiếu nhận thất bại lỗi ${err}: ${res.data.error}`)
  })
}
  const Handler_ThemOnClick = (event)=>{
    event.preventDefault();
    let temp =   () => {
      
        axios.post(`http://localhost:8080/SYS/InsertPhieuNhanTien`,NTInfo).then((res,err)=>{
          let temp2 = async () => {
              alert("Thêm phiếu nhận thành công");
              let res = await axios.get("http://localhost:8080/SYS/GetAllPhieuNhanTien");
               if(res.data.data!==undefined) {
                SetState({ type: "AllPNT", payload: res.data.data });
                SetState({ type: "QLPNTSTT", payload: 0 })
               }
          }
          res.data.access === 1 ? temp2() : alert(`Thêm thông tin phiếu nhận thất bại lỗi ${err}: ${res.data.error}`)
      }
      )
      
       
    }
    State.QLPNTSTT !==2? SetState({type:"QLPNTSTT",payload:2}) : temp();
}
  useEffect(() => {
    (() => {
      axios.get("http://localhost:8080/SYS/GetAllPhieuNhanTien").then((res,err) => {
        SetState({ type: "AllPNT", payload: res.data.data });
        SetState({ type: "QLPNTSTT", payload: 0 })
      })
      
    })()
  }, []);
  useEffect(()=>{
    SetNTInfo({...State.AllPNT[0]});
    (async()=>{
        let res = await axios.get("http://localhost:8080/NV/CA/GetAllChiNhanh");
        if(res.data.data!==undefined) SetCNInfo(res.data.data);
    })()
    if(State.QLPNTSTT === 2) SetNTInfo({});
},[State.QLPNTSTT])
  switch(State.QLPNTSTT){
    case 1: return (<div className="container-fluid mt--10">
   
    <h2>Sửa phiếu nhận</h2>
    <form method="post"> 
      <table className="tablesuanhanvien">
        <tbody><tr>
            <th>Chi nhánh</th>
            <td> <select style={{width: '75%'}} name="machinhanh" onChange={(event)=>Handler_Onchange(event)} placeholder={State.AllPNT[0].machinhanh} disabled>
                  <ListCN data={CNInfo}/>
                  </select>
            </td>
          </tr>
          <tr>
            <th>Mã phiếu nhận </th>
            <td><input className="form-control" type="text" name="maphieunhantien" onChange={(event)=>Handler_Onchange(event)} placeholder={State.AllPNT[0].maphieunhantien} disabled/> </td>
          </tr>
          <tr>
            <th>Nhân viên nhận tiền </th>
            <td><input className="form-control" type="text" name="manv" disabled onChange={(event)=>Handler_Onchange(event)} placeholder={State.AllPNT[0].manv} /> </td>
          </tr>
    
          <tr>
            <th>Ngày nhận </th>
            <td><input type="datetime-local"  name="ngaynhan" onChange={(event)=>Handler_Onchange(event)} placeholder={State.AllPNT[0].ngaynhan} /></td>
          </tr>   
          <tr>
            <th>Nội dung nhận </th>
            <td><input className="form-control" type="text" name="noidung"  id="diem"  onChange={(event)=>Handler_Onchange(event)} placeholder={State.AllPNT[0].noidung} onKeyPress={(event)=>Handler.Char(event)}/> </td>
          </tr>
          <tr>
            <th>Tổng tiền </th>
            <td><input className="form-control" type="text" name="sotiennhan" onChange={(event)=>Handler_Onchange(event)} placeholder={State.AllPNT[0].sotiennhan} onKeyPress={(event)=>Handler.Number(event)}/></td>
          </tr>
        </tbody></table>
      <button name="nhap" type="Sua" value="Xacnhan" style={{width: '20%'}} onClick={(event)=>Handler_SuaOnclick(event)}> Xác nhận </button>
    </form>
  </div>)
    case 2: return ( 
       <div className="container-fluid mt--10">
   
    <h2>Lập phiếu nhận</h2>
    <form method="post"> 
      <table className="tablesuanhanvien">
        <tbody><tr>
            <th>Chi nhánh</th>
            <td> <select style={{width: '75%'}} name="machinhanh" onChange={(event)=>Handler_Onchange(event)}>
               <option/>
                  <ListCN data={CNInfo}/>
                  </select>
            </td>
          </tr>
          <tr>
            <th>Tên phiếu nhận </th>
            <td><input className="form-control" type="text" name="maphieunhantien" onChange={(event)=>Handler_Onchange(event)} id="diem" onKeyPress={(event)=>Handler.Char(event)} /> </td>
          </tr>
          <tr>
            <th>Nhân viên nhận tiền </th>
            <td><input className="form-control" type="text" name="manv" disabled placeholder={State.NVInfo.manv} id="diem" /> </td>
          </tr>
    
          <tr>
            <th>Ngày nhận </th>
            <td><input type="datetime-local" id="Ngaynhap" name="ngaynhan" onChange={(event)=>Handler_Onchange(event)} /></td>
          </tr>   
          <tr>
            <th>Nội dung nhận </th>
            <td><input className="form-control" type="text" name="noidung"  id="diem"  onChange={(event)=>Handler_Onchange(event)} onKeyPress={(event)=>Handler.Char(event)}/> </td>
          </tr>
          <tr>
            <th>Tổng tiền </th>
            <td><input className="form-control" type="text" name="sotiennhan" onChange={(event)=>Handler_Onchange(event)} onKeyPress={(event)=>Handler.Number(event)} /></td>
          </tr>
        </tbody></table>
      <button name="nhap" type="Sua" value="Xacnhan" style={{width: '20%'}} onClick={(event)=>Handler_ThemOnClick(event)}> Xác nhận </button>
    </form>
  </div>)
    default:return (
      <div className="container-fluid mt--10">
        <h2> Quản lý Phiếu Nhận Tiền</h2>
        <form action method="get">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">STT</th>
                <th scope="col">Mã Phiếu</th>
                <th scope="col">Mã CN</th>
                <th scope="col">Mã NV</th>
                <th scope="col">Nội dung </th>
                <th scope="col">Ngày nhận</th>
                <th scope="col">Tổng tiền</th>
                <th scope="col">Thao tác cập nhật</th>
              </tr>
            </thead>
            <tbody>
              <ListCT data={State.AllPNT}/>
            </tbody>
          </table>
        </form>
        <h2 className="mt-3"><a href="add_nhanvien.html" style={{border: 'solid 1px black'}} onClick={(event)=>Handler_ThemOnClick(event)}> Thêm Phiếu Nhận </a> </h2>
      </div>
    )
  }
}
