import React,{useState,useEffect,useContext} from 'react'
import axios from 'axios'
import Context from '../../Context';
import Handler from '../../Utility/Handler'

const ListNV = (props) => {
    const [State, SetState] = useContext(Context);
    return props.data.map((item,index)=>{

        const Handler_SuaOnclick = async (event)=>{
            event.preventDefault();
            let res = await axios.get(`http://localhost:8080/KH/GetInfo/${item.makh}`)
            if(res.data.data!==undefined){
              SetState({type:"AllKH",payload:[res.data.data[0]]});
              SetState({type:"QLKHSTT",payload:1})
            }
        }
        const Handler_XoaOnClick = (event)=>{
            event.preventDefault();
                axios.delete(`http://localhost:8080/KH/DeleteInfo/${item.makh}`).then((res,err)=>{
                let temp = async () => {
                    alert("Xóa thông tin KH thành công");
                    let res = await axios.get("http://localhost:8080/KH/GetAllInfo")
                    if(res.data.data!==undefined){
                      SetState({type:"AllKH",payload:res.data.data})
                     SetState({type:"QLKHSTT",payload:0});
                    }
                }
                res.data.access === 1 ? temp() : alert(`Xóa thông tin KH thất bại lỗi ${err}: ${res.data.error}`)
            })
            

        }
        return <tr key={item?.makh}>
        <th scope="row">{index}</th>
        <td>{item?.makh}</td>
        <td>{item?.tenkh}</td>
        <td>{item?.matkhau}</td>
        <td>{item?.email}</td>
        <td>{item?.diachi}</td>
        <td>{item?.sdt}</td>
        
        <td>
          <a href="update_nhanvien.html" style={{border: 'solid 1px black'}} onClick={(event)=>Handler_SuaOnclick(event)}> Sửa </a>
          <a href="xoa_nv.html" style={{border: 'solid 1px black'}} onClick={(event)=>Handler_XoaOnClick(event)}> Xóa </a> 
        </td>
      </tr>
    })
}


    
export default function KH() {
    const [State, SetState] = useContext(Context);
    const [KHInfo,SetKHInfo] = useState({});
    const Handler_Onchange = (event)=>{
        SetKHInfo({...KHInfo,[event.target.name]:event.target.value})
    }
    const Handler_SuaOnclick = (event)=>{
        event.preventDefault();
        axios.put(`http://localhost:8080/KH/UpdateInfo`,KHInfo).then((res,err)=>{
            let temp = async () => {
                alert("Sửa thông tin KH thành công");
                let res = await axios.get("http://localhost:8080/KH/GetAllInfo")
                if(res.data.data!==undefined){
                  SetState({type:"AllKH",payload:res.data.data})
                SetState({type:"QLKHSTT",payload:0});
                }
            }
            res.data.access === 1 ? temp() : alert(`Sửa thông tin KH thất bại lỗi ${err}: ${res.data.error}`)
        })
    }
    const Handler_ThemOnClick = (event)=>{
        event.preventDefault();
        let temp =   () => {
            axios.post(`http://localhost:8080/Regkh`,KHInfo).then((res,err)=>{
                let temp2 = async () => {
                    alert("Thêm thông tin KH thành công");
                    let res = await axios.get("http://localhost:8080/KH/GetAllInfo")
                  if(res.data.data!==undefined){
                      SetState({type:"AllKH",payload:res.data.data})
                    SetState({type:"QLKHSTT",payload:0});
                }
                }
                res.data.access === 1 ? temp2() : alert(`Thêm thông tin KH thất bại lỗi ${err}: ${res.data.error}`)
            }
            )
        }
        State.QLKHSTT !==2? SetState({type:"QLKHSTT",payload:2}) : temp();
    }
    
    useEffect(()=>{
        (async () => {
          let res = await axios.get("http://localhost:8080/KH/GetAllInfo")
          if(res.data.data!==undefined){
            SetState({type:"AllKH",payload:res.data.data})
            SetState({type:"QLKHSTT",payload:0});
            }
        })()
        
    },[])
    useEffect(()=>{
        SetKHInfo({...State.AllKH[0]});
        if(State.QLKHSTT===2) SetKHInfo({});
    },[State.QLKHSTT])

    switch(State.QLKHSTT){
        case 1: return(
        <div className="container-fluid mt--10">
        {/* table */}
        <h2> Sửa Thông Tin Khách Hàng</h2>
        <form> 
          <table className="table">
            <tbody>
 
              <tr>
              </tr><tr>
                <th>Mã Khách Hàng </th>
                <td><input className="form-control" type="text" name="makh" placeholder={State.AllKH[0].makh} id="diem" onChange={(event)=>Handler_Onchange(event)} disabled/> </td>
              </tr>   
              <tr>
                <th>Tên Khách Hàng</th>
                <td><input className="form-control" type="text" name="tenkh" placeholder={State.AllKH[0].tenkh} onKeyPress={(event)=>Handler.Char(event)} onChange={(event)=>Handler_Onchange(event)}/> </td>
              </tr>
              <tr>
                <th>Mật Khẩu</th>
                <td><input className="form-control" type="text" onKeyPress={(event)=>Handler.Char(event)} name="matkhau" placeholder={State.AllKH[0].matkhau} onChange={(event)=>Handler_Onchange(event)}/> </td>
              </tr>
              <tr>
                <th> Email </th>
                <td><input className="form-control" type="text" name="email" placeholder={State.AllKH[0].email} onKeyPress={(event)=>Handler.Email(event)} id="diem" onChange={(event)=>Handler_Onchange(event)} /></td>
              </tr>
              <tr>
                <th>Địa chỉ </th>                                       
                <td><input className="form-control" onKeyPress={(event)=>Handler.Char(event)} type="text" id="Ngaynhap" name="diachi" placeholder={State.AllKH[0].diachi} onChange={(event)=>Handler_Onchange(event)}/></td>
              </tr>
              <tr>
                <th>SĐT </th>                                       
                <td><input className="form-control" type="text" onKeyPress={(event)=>Handler.Number(event)} id="Ngaynhap" name="sdt" placeholder={State.AllKH[0].dengay} onChange={(event)=>Handler_Onchange(event)}/></td>
              </tr>
              <tr>
                <th>Ảnh KH</th>                                       
                <td><input className="form-control" type="file" id="Ngaynhap" name="anhkh" placeholder={State.AllKH[0].anhkh} onChange={(event)=>Handler_Onchange(event)}/></td>
              </tr>

            </tbody></table>
          <button name="sua" value="Xacnhan" style={{width: '20%'}} onClick={(event)=>Handler_SuaOnclick(event)}> Cập Nhật KH </button>
        </form>
      </div>)
        // SUA INFO NV
        case 2: return (
        <div className="container-fluid mt--10">
        {/* table */}
        <h2> Thêm Khách Hàng</h2>
        <form> 
          <table className="tablethemkhachhang">
            <tbody>
              <tr>
              </tr><tr>
                <th>Mã Khách Hàng </th>
                <td><input className="form-control" type="text" name="makh"  id="diem" onChange={(event)=>Handler_Onchange(event)}  onKeyPress={(event)=>Handler.Char(event)} /> </td>
              </tr>   
              <tr>
                <th>Tên Khách Hàng</th>
                <td><input className="form-control" type="text" name="tenkh"  onChange={(event)=>Handler_Onchange(event)} onKeyPress={(event)=>Handler.Char(event)} /></td>
              </tr>
              <tr>
                <th>Mật Khẩu</th>
                <td><input className="form-control" type="text" name="matkhau"  onChange={(event)=>Handler_Onchange(event)} onKeyPress={(event)=>Handler.Char(event)}/>  </td>
              </tr>
              <tr>
                <th> Email </th>
                <td><input className="form-control" type="text" name="email"  id="diem" onChange={(event)=>Handler_Onchange(event)} onKeyPress={(event)=>Handler.Email(event)} /></td>
              </tr>
              <tr>
                <th>Địa chỉ </th>                                       
                <td><input className="form-control"type="text" id="Ngaynhap" name="diachi"  onChange={(event)=>Handler_Onchange(event)} onKeyPress={(event)=>Handler.Char(event)}/></td>
              </tr>
              <tr>
                <th>SĐT </th>                                       
                <td><input className="form-control" type="text" id="Ngaynhap" name="sdt"  onChange={(event)=>Handler_Onchange(event)} onKeyPress={(event)=>Handler.Number(event)}/></td>
              </tr>
              <tr>
                <th>Ảnh KH</th>                                       
                <td><input className="form-control" type="file" id="Ngaynhap" name="anhkh"  onChange={(event)=>Handler_Onchange(event)}/></td>
              </tr>

            </tbody></table>
          <button name="them" value="Xacnhan" style={{width: '20%'}} onClick={(event)=>Handler_ThemOnClick(event)} > Thêm KH </button>
        </form>
      </div>
        )   
        //THem NV
        default:return (
            <div className="container-fluid mt--10">
            {/* table */}
            <h2> Quản lý Thông Tin Khách Hàng</h2>
            <form action method="get">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">STT</th>
                    <th scope="col">Mã KH</th>
                    <th scope="col">Tên KH</th>
                    <th scope="col">Mật Khẩu</th>
                    <th scope="col">Email</th>
                    <th scope="col">Địa chỉ</th>
                    <th scope="col">SĐT </th>
                    <th scope="col">Tác vụ Cập nhật</th>
                  </tr>
                </thead>
                <tbody>
                  <ListNV data={State.AllKH}/>
                </tbody>
              </table>
            </form>
            <h2 className="mt-3"><a href="add_nhanvien.html" style={{border: 'solid 1px black'}} onClick={(event)=>Handler_ThemOnClick(event)}> Thêm Khách Hàng </a> </h2>
          </div>
        )
    }
    // GET NV
}
