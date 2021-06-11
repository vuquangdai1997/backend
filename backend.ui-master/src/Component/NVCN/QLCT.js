import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import Context from '../../Context';
import Handler from '../../Utility/Handler'

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
        let res = await axios.get(`http://localhost:8080/SYS/GetPhieuChiTien/${item.maphieuchitien}`)
        if (res.data.data !== undefined){
          SetState({type:"AllPCT",payload:[res.data.data[0]]});
          SetState({type:"QLPCTSTT",payload:1})
        }
    }
    const Handler_XoaOnClick = (event)=>{
        event.preventDefault();
            axios.delete(`http://localhost:8080/SYS/DeletePhieuChiTien/${item.maphieuchitien}`).then((res,err)=>{
            let temp = async () => {
                alert("Xóa thông tin phiếu chi tiền thành công");
                let res = await axios.get("http://localhost:8080/SYS/GetAllPhieuChiTien");
                 if(res.data.data!==undefined) {
                  SetState({ type: "AllPCT", payload: res.data.data });
                  SetState({ type: "QLPCTSTT", payload: 0 })
                 }

            }
            res.data.access === 1 ? temp() : alert(`Xóa thông tin phiếu chi thất bại thất bại lỗi ${err}: ${res.data.error}`)
        })
        

    }
        return  (
        <tr key={item?.maphieuchitien}>
            <td>{index}</td>
            <td>{item?.maphieuchitien}</td>
            <td>{item?.machinhanh}</td>
            <td>{item?.manv}</td>
            <td>{item?.noidung} </td>
            <td>{item?.ngaychi}</td>
            <td>
               {item?.sotienchi}
            </td>
            <td>
          <a href="update_nhanvien.html" style={{border: 'solid 1px black'}} onClick={(event)=>Handler_SuaOnclick(event)}> Sửa </a>
          <a href="xoa_nv.html" style={{border: 'solid 1px black'}} onClick={(event)=>Handler_XoaOnClick(event)}> Xóa </a> 
        </td>
          </tr>)
    })
}

export default function QLCT() {
  const [State, SetState] = useContext(Context);
  
  const [CTInfo,SetCTInfo] = useState({});
  const [CNInfo,SetCNInfo] = useState([]);

  const Handler_Onchange = (event)=>{
    if(State.QLPCTSTT===1) SetCTInfo({...CTInfo,machinhanh:State.AllPCT[0].machinhanh,manv:State.NVInfo.manv,[event.target.name]:event.target.value})
    else SetCTInfo({...CTInfo,manv:State.NVInfo.manv,[event.target.name]:event.target.value})
}
const Handler_SuaOnclick = (event)=>{
  event.preventDefault();
  axios.put(`http://localhost:8080/SYS/UpdatePhieuChiTien`,CTInfo).then((res,err)=>{
      let temp = async () => {
          alert("Sửa thông tin phiếu chi thành công");
          let res = await axios.get("http://localhost:8080/SYS/GetAllPhieuChiTien");
                 if(res.data.data!==undefined) {
                  SetState({ type: "AllPCT", payload: res.data.data });
                  SetState({ type: "QLPCTSTT", payload: 0 })
                 }
      }
      res.data.access === 1 ? temp() : alert(`Sửa thông tin phiếu chi thất bại lỗi ${err}: ${res.data.error}`)
  })
}
  const Handler_ThemOnClick = (event)=>{
    event.preventDefault();
    let temp =   () => {
      
        axios.post(`http://localhost:8080/SYS/InsertPhieuChiTien`,CTInfo).then((res,err)=>{
          let temp2 = async () => {
              alert("Thêm phiếu chi thành công");
              let res = await axios.get("http://localhost:8080/SYS/GetAllPhieuChiTien");
               if(res.data.data!==undefined) {
                SetState({ type: "AllPCT", payload: res.data.data });
                SetState({ type: "QLPCTSTT", payload: 0 })
               }
          }
          res.data.access === 1 ? temp2() : alert(`Thêm thông tin nv thất bại lỗi ${err}: ${res.data.error}`)
      }
      )
      
       
    }
    State.QLPCTSTT !==2? SetState({type:"QLPCTSTT",payload:2}) : temp();
}
  useEffect(() => {
    (() => {
      axios.get("http://localhost:8080/SYS/GetAllPhieuChiTien").then((res,err) => {
        SetState({ type: "AllPCT", payload: res.data.data });
        SetState({ type: "QLPCTSTT", payload: 0 })
      })
      
    })()
  }, []);
  useEffect(()=>{
    SetCTInfo({...State.AllPCT[0]});
    (async()=>{
        let res = await axios.get("http://localhost:8080/NV/CA/GetAllChiNhanh");
        if(res.data.data!==undefined) SetCNInfo(res.data.data);
    })()
    if(State.QLPCTSTT === 2) SetCTInfo({});
},[State.QLPCTSTT])
  switch(State.QLPCTSTT){
    case 1: return (<div className="container-fluid mt--10">
   
    <h2>Sửa phiếu chi</h2>
    <form method="post"> 
      <table className="tablesuanhanvien">
        <tbody><tr>
            <th>Chi nhánh</th>
            <td> <select style={{width: '75%'}} name="machinhanh" onChange={(event)=>Handler_Onchange(event)} placeholder={State.AllPCT[0].machinhanh} disabled>
                  <ListCN data={CNInfo}/>
                  </select>
            </td>
          </tr>
          <tr>
            <th>Mã phiếu chi </th>
            <td><input className="form-control" type="text" name="maphieuchitien" onChange={(event)=>Handler_Onchange(event)} placeholder={State.AllPCT[0].maphieuchitien} disabled/> </td>
          </tr>
          <tr>
            <th>Nhân viên chi tiền </th>
            <td><input className="form-control" type="text" name="manv" disabled onChange={(event)=>Handler_Onchange(event)} placeholder={State.AllPCT[0].manv} /> </td>
          </tr>
    
          <tr>
            <th>Ngày chi </th>
            <td><input type="datetime-local"  name="ngaychi" onChange={(event)=>Handler_Onchange(event)} placeholder={State.AllPCT[0].ngaychi} /></td>
          </tr>   
          <tr>
            <th>Nội dung chi </th>
            <td><input className="form-control" type="text" name="noidung"  id="diem"  onChange={(event)=>Handler_Onchange(event)} placeholder={State.AllPCT[0].noidung} onKeyPress={(event)=>Handler.Char(event)} /> </td>
          </tr>
          <tr>
            <th>Tổng tiền </th>
            <td><input className="form-control" type="text" name="sotienchi" onChange={(event)=>Handler_Onchange(event)} placeholder={State.AllPCT[0].sotienchi} onKeyPress={(event)=>Handler.Number(event)}/></td>
          </tr>
        </tbody></table>
      <button name="nhap" type="Sua" value="Xacnhan" style={{width: '20%'}} onClick={(event)=>Handler_SuaOnclick(event)}> Xác nhận </button>
    </form>
  </div>)
    case 2: return ( 
       <div className="container-fluid mt--10">
   
    <h2>Lập phiếu chi</h2>
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
            <th>Mã phiếu chi </th>
            <td><input className="form-control" type="text" name="maphieuchitien" onChange={(event)=>Handler_Onchange(event)} id="diem" onKeyPress={(event)=>Handler.Char(event)} /> </td>
          </tr>
          <tr>
            <th>Nhân viên chi tiền </th>
            <td><input className="form-control" type="text" name="manv" disabled placeholder={State.NVInfo.manv} id="diem" /> </td>
          </tr>
    
          <tr>
            <th>Ngày chi </th>
            <td><input type="datetime-local" id="Ngaynhap" name="ngaychi" onChange={(event)=>Handler_Onchange(event)} /></td>
          </tr>   
          <tr>
            <th>Nội dung chi </th>
            <td><input className="form-control" type="text" name="noidung"  id="diem"  onChange={(event)=>Handler_Onchange(event)} onKeyPress={(event)=>Handler.Char(event)}/> </td>
          </tr>
          <tr>
            <th>Tổng tiền </th>
            <td><input className="form-control" type="text" name="sotienchi" onChange={(event)=>Handler_Onchange(event)} onKeyPress={(event)=>Handler.Number(event)}/></td>
          </tr>
        </tbody></table>
        <br></br>
      <button name="nhap" type="Sua" value="Xacnhan" style={{width: '20%'}} onClick={(event)=>Handler_ThemOnClick(event)}> Xác nhận </button>
    </form>
  </div>)
    default:return (
      <div className="container-fluid mt--10">
        <h2> Quản lý Phiếu Chi Tiêu</h2>
        <form action method="get">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">STT</th>
                <th scope="col">Mã Phiếu</th>
                <th scope="col">Mã CN</th>
                <th scope="col">Mã NV</th>
                <th scope="col">Nội dung </th>
                <th scope="col">Ngày chi</th>
                <th scope="col">Tổng tiền</th>
                <th scope="col">Thao tác cập nhật</th>
              </tr>
            </thead>
            <tbody>
              <ListCT data={State.AllPCT}/>
            </tbody>
          </table>
        </form>
        <h2 className="mt-3"><a href="add_nhanvien.html" style={{border: 'solid 1px black'}} onClick={(event)=>Handler_ThemOnClick(event)}> Thêm Phiếu Chi </a> </h2>
      </div>
    )
  }
}
