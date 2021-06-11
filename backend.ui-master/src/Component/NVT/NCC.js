import React,{useState,useEffect,useContext} from 'react'
import axios from 'axios'
import Context from '../../Context';
import Handler from '../../Utility/Handler'

const ListNV = (props) => {
    const [State, SetState] = useContext(Context);
    return props.data.map((item,index)=>{

        const Handler_SuaOnclick = async (event)=>{
            event.preventDefault();
            let res = await axios.get(`http://localhost:8080/NV/NCC/GetNCC/${item.mancc}`)
            if(res.data.data!==undefined){
              SetState({type:"AllNCC",payload:[res.data.data[0]]});
              SetState({type:"QLNCCSTT",payload:1})
            }
        }
        const Handler_XoaOnClick = (event)=>{
            event.preventDefault();
                axios.delete(`http://localhost:8080/NV/NCC/DeleteNCC/${item.mancc}`).then((res,err)=>{
                let temp = async () => {
                    alert("Xóa thông tin Nhà cung cấp thành công");
                    let res = await axios.get("http://localhost:8080/NV/NCC/GetAllNCC")
                    if(res.data.data!==undefined){
                      SetState({type:"AllNCC",payload:res.data.data})
                     SetState({type:"QLNCCSTT",payload:0});
                    }
                }
                res.data.access === 1 ? temp() : alert(`Xóa thông tin nhà cung cấp thất bại lỗi ${err}: ${res.data.error}`)
            })
            

        }
        return <tr key={item.makho}>
        <td scope="row">{index}</td>
        <td>{item.mancc}</td>
        <td>{item.tenncc}</td>
        <td>{item.ghichu}</td>

 
        <td>
          <a href="update_nhanvien.html" style={{border: 'solid 1px black'}} onClick={(event)=>Handler_SuaOnclick(event)}> Sửa </a>
          <a href="xoa_nv.html" style={{border: 'solid 1px black'}} onClick={(event)=>Handler_XoaOnClick(event)}> Xóa </a> 
        </td>
      </tr>
    })
}


    
export default function Kho() {
    const [State, SetState] = useContext(Context);
    const [NCCInfo,SetNCCInfo] = useState({});
    const Handler_Onchange = (event)=>{
        SetNCCInfo({...NCCInfo,[event.target.name]:event.target.value})
    }
    const Handler_SuaOnclick = (event)=>{
        event.preventDefault();
        axios.put(`http://localhost:8080/NV/NCC/UpdateNCC`,NCCInfo).then((res,err)=>{
            let temp = async () => {
                alert("Sửa thông tin NCC thành công");
                let res = await axios.get("http://localhost:8080/NV/NCC/GetAllNCC")
                if(res.data.data!==undefined){
                  SetState({type:"AllNCC",payload:res.data.data})
                SetState({type:"QLNCCSTT",payload:0});
                }
            }
            res.data.access === 1 ? temp() : alert(`Sửa thông tin nhà cung cấp thất bại lỗi ${err}: ${res.data.error}`)
        })
    }
    const Handler_ThemOnClick = (event)=>{
        event.preventDefault();
        let temp =   () => {
            axios.post(`http://localhost:8080/NV/NCC/InsertNCC`,NCCInfo).then((res,err)=>{
                let temp2 = async () => {
                    alert("Thêm thông tin NCC thành công");
                    let res = await axios.get("http://localhost:8080/NV/NCC/GetAllNCC")
                  if(res.data.data!==undefined){
                      SetState({type:"AllNCC",payload:res.data.data})
                    SetState({type:"QLNCCSTT",payload:0});
                }
                }
                res.data.access === 1 ? temp2() : alert(`Thêm thông tin nhà cung cấp thất bại lỗi ${err}: ${res.data.error}`)
            }
            )
        }
        State.QLNCCSTT !==2? SetState({type:"QLNCCSTT",payload:2}) : temp();
    }
    
    useEffect(()=>{
        (async () => {
          let res = await axios.get("http://localhost:8080/NV/NCC/GetAllNCC")
          if(res.data.data!==undefined){
             SetState({type:"AllNCC",payload:res.data.data})
            SetState({type:"QLNCCSTT",payload:0});
        }
        })()
        
    },[])
    useEffect(()=>{
        SetNCCInfo({...State.AllNCC[0]});
        if(State.QLNCCSTT===2) SetNCCInfo({});
    },[State.QLNCCSTT])

    switch(State.QLNCCSTT){
        case 1: return(
        <div className="container-fluid mt--10">
        {/* table */}
        <h2> Sửa NCC</h2>
        <form> 
          <table className="tablesuanhanvien">
            <tbody>
              <tr>
              </tr><tr>
                <th>Mã NCC </th>
                <td><input className="form-control" type="text" name="mancc" placeholder={State.AllNCC[0].mancc} id="diem" onChange={(event)=>Handler_Onchange(event)} disabled/> </td>
              </tr>   
              <tr>
                <th>Tên Nhà Cung Cấp</th>
                <td><input className="form-control" type="text" name="tenncc" placeholder={State.AllNCC[0].tenncc} onChange={(event)=>Handler_Onchange(event)} onKeyPress={(event)=>Handler.Char(event)}/> </td>
              </tr>
              <tr>
                <th>Ghi chú</th>
                <td><input className="form-control" type="text-area" name="ghichu" placeholder={State.AllNCC[0].ghichu} onChange={(event)=>Handler_Onchange(event)} onKeyPress={(event)=>Handler.Char(event)} /> </td>
              </tr>
           
             
            </tbody></table>
            <br></br>
          <button name="sua" value="Xacnhan" style={{width: '20%'}} onClick={(event)=>Handler_SuaOnclick(event)}> Cập Nhật NCC </button>
        </form>
      </div>)
        // SUA INFO NV
        case 2: return (
            <div className="container-fluid mt--10">
        {/* table */}
        <h2> Thêm NCC </h2>
        <form>
        <table className="tablesuanhanvien">
            <tbody>
              <tr>
              </tr><tr>
                <th>Mã NCC </th>
                <td><input className="form-control" type="text" name="mancc"  id="diem" onChange={(event)=>Handler_Onchange(event)} onKeyPress={(event)=>Handler.Char(event)}/> </td>
              </tr>   
              <tr>
                <th>Tên Nhà Cung Cấp</th>
                <td><input className="form-control" type="text" name="tenncc"  onChange={(event)=>Handler_Onchange(event)} onKeyPress={(event)=>Handler.Char(event)}/> </td>
              </tr>
              <tr>
                <th>Ghi chú</th>
                <td><input className="form-control" type="text-area" name="ghichu"  onChange={(event)=>Handler_Onchange(event)} onKeyPress={(event)=>Handler.Char(event)}/> </td>
              </tr>
           
             
            </tbody></table>
            <br></br>
          <button name="them" value="Xacnhan" style={{width: '20%'}} onClick={(event)=>Handler_ThemOnClick(event)} > Thêm NCC </button>
        </form>
      </div>
        )   
        //THem NV
        
        default:return (
            <div className="container-fluid mt--10">
            {/* table */}
            <h2> Quản lý NCC</h2>
            <form action method="get">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">STT</th>
                    <th scope="col">Mã NCC</th>
                    <th scope="col">Tên NCC</th>
                    <th scope="col">Ghi chú</th>
                    <th scope="col">Tác vụ Cập nhật</th>
                  </tr>
                </thead>
                <tbody>
                  <ListNV data={State.AllNCC}/>
                </tbody>
              </table>
            </form>
            <h2 className="mt-3"><a href="add_nhanvien.html" style={{border: 'solid 1px black'}} onClick={(event)=>Handler_ThemOnClick(event)}> Thêm NCC </a> </h2>
          </div>
        )
    }
    // GET NV
}
