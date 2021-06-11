import React,{useState,useEffect,useContext} from 'react'
import axios from 'axios'
import Context from '../../Context';
import Handler from '../../Utility/Handler'

const ListNV = (props) => {
    const [State, SetState] = useContext(Context);
    return props.data.map((item,index)=>{

        const Handler_SuaOnclick = async (event)=>{
            event.preventDefault();
            let res = await axios.get(`http://localhost:8080/NV/KHO/GetKho/${item.makho}`)
            if(res.data.data!==undefined){
              SetState({type:"AllKHO",payload:[res.data.data[0]]});
              SetState({type:"QLKHOSTT",payload:1})
            }
        }
        const Handler_XoaOnClick = (event)=>{
            event.preventDefault();
                axios.delete(`http://localhost:8080/NV/KHO/DeleteKho/${item.makho}`).then((res,err)=>{
                let temp = async () => {
                    alert("Xóa thông tin kho thành công");
                    let res = await axios.get("http://localhost:8080/NV/KHO/GetAllKho")
                    if(res.data.data!==undefined){
                      SetState({type:"AllKHO",payload:res.data.data})
                     SetState({type:"QLKHOSTT",payload:0});
                    }
                }
                res.data.access === 1 ? temp() : alert(`Xóa thông tin kho thất bại lỗi ${err}: ${res.data.error}`)
            })
            

        }
        return <tr key={item.makho}>
        <th scope="row">{index}</th>
        <td>{item.makho}</td>
        <td>{item.tenkho}</td>
        <td>{item.mota}</td>

 
        <td>
          <a href="update_nhanvien.html" style={{border: 'solid 1px black'}} onClick={(event)=>Handler_SuaOnclick(event)}> Sửa </a>
          <a href="xoa_nv.html" style={{border: 'solid 1px black'}} onClick={(event)=>Handler_XoaOnClick(event)}> Xóa </a> 
        </td>
      </tr>
    })
}


    
export default function Kho() {
    const [State, SetState] = useContext(Context);
    const [KHOInfo,SetKHOInfo] = useState({});
    const Handler_Onchange = (event)=>{
        SetKHOInfo({...KHOInfo,[event.target.name]:event.target.value})
    }
    const Handler_SuaOnclick = (event)=>{
        event.preventDefault();
        axios.put(`http://localhost:8080/NV/KHO/UpdateKho`,KHOInfo).then((res,err)=>{
            let temp = async () => {
                alert("Sửa thông tin kho thành công");
                let res = await axios.get("http://localhost:8080/NV/KHO/GetAllKho")
                if(res.data.data!==undefined){
                  SetState({type:"AllKHO",payload:res.data.data})
                SetState({type:"QLKHOSTT",payload:0});
                }
            }
            res.data.access === 1 ? temp() : alert(`Sửa thông tin kho thất bại lỗi ${err}: ${res.data.error}`)
        })
    }
    const Handler_ThemOnClick = (event)=>{
        event.preventDefault();
        let temp =   () => {
            axios.post(`http://localhost:8080/NV/KHO/InsertKho`,KHOInfo).then((res,err)=>{
                let temp2 = async () => {
                    alert("Thêm thông tin kho thành công");
                    let res = await axios.get("http://localhost:8080/NV/KHO/GetAllKho")
                  if(res.data.data!==undefined){
                      SetState({type:"AllKHO",payload:res.data.data})
                    SetState({type:"QLKHOSTT",payload:0});
                }
                }
                res.data.access === 1 ? temp2() : alert(`Thêm thông tin kho thất bại lỗi ${err}: ${res.data.error}`)
            }
            )
        }
        State.QLKHOSTT !==2? SetState({type:"QLKHOSTT",payload:2}) : temp();
    }
    
    useEffect(()=>{
        (async () => {
          let res = await axios.get("http://localhost:8080/NV/KHO/GetAllKho")
          if(res.data.data!==undefined){
             SetState({type:"AllKHO",payload:res.data.data})
            SetState({type:"QLKHOSTT",payload:0});
        }
        })()
        
    },[])
    useEffect(()=>{
        SetKHOInfo({...State.AllKHO[0]});
        if(State.QLKHOSTT===2) SetKHOInfo({});
    },[State.QLKHOSTT])

    switch(State.QLKHOSTT){
        case 1: return(
        <div className="container-fluid mt--10">
        {/* table */}
        <h2> Sửa Kho</h2>
        <form> 
          <table className="tablesuanhanvien">
            <tbody>
              <tr>
              </tr><tr>
                <th>Mã Kho </th>
                <td><input className="form-control" type="text" name="makho" placeholder={State.AllKHO[0].makho} id="diem" onChange={(event)=>Handler_Onchange(event)} disabled/> </td>
              </tr>   
              <tr>
                <th>Tên Kho</th>
                <td><input className="form-control" type="text" name="tenkho" placeholder={State.AllKHO[0].tenkho} onChange={(event)=>Handler_Onchange(event)} onKeyPress={(event)=>Handler.Char(event)}/> </td>
              </tr>
              <tr>
                <th>Mô tả</th>
                <td><input className="form-control" type="text-area" name="mota" placeholder={State.AllKHO[0].mota} onChange={(event)=>Handler_Onchange(event)} onKeyPress={(event)=>Handler.Char(event)}/> </td>
              </tr>
           
             
            </tbody></table>
            <br></br>
          <button name="sua" value="Xacnhan" style={{width: '20%'}} onClick={(event)=>Handler_SuaOnclick(event)}> Cập Nhật KHO </button>
        </form>
      </div>)
        // SUA INFO NV
        case 2: return (
            <div className="container-fluid mt--10">
        {/* table */}
        <h2> Thêm KHO </h2>
        <form>
          <table className="tablesuanhanvien">
            <tbody>
              <tr>
              </tr><tr>
                <th>Mã KhO </th>
                <td><input className="form-control" type="text" name="makho" onChange={(event)=>Handler_Onchange(event)} id="diem" onKeyPress={(event)=>Handler.Char(event)}/> </td>
              </tr>
              <tr>
                <th>Tên Kho</th>
                <td><input className="form-control" type="text" name="tenkho" onChange={(event)=>Handler_Onchange(event)} id="diem" onKeyPress={(event)=>Handler.Char(event)}/> </td>
              </tr>
              
              <tr>
                <th>Mô tả</th>
                <td><input className="form-control" type="text-area" name="mota" onChange={(event)=>Handler_Onchange(event)} id="diem" onKeyPress={(event)=>Handler.Char(event)} /> </td>
              </tr>
             
            </tbody></table>
            <br></br>
          <button name="them" value="Xacnhan" style={{width: '20%'}} onClick={(event)=>Handler_ThemOnClick(event)} > Thêm Kho </button>
        </form>
      </div>
        )   
        //THem NV
        
        default:return (
            <div className="container-fluid mt--10">
            {/* table */}
            <h2> Quản lý Kho</h2>
            <form action method="get">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">STT</th>
                    <th scope="col">Mã Kho</th>
                    <th scope="col">Tên Kho</th>
                    <th scope="col">Mô tả</th>
                    <th scope="col">Tác vụ Cập nhật</th>
                  </tr>
                </thead>
                <tbody>
                  <ListNV data={State.AllKHO}/>
                </tbody>
              </table>
            </form>
            <h2 className="mt-3"><a href="add_nhanvien.html" style={{border: 'solid 1px black'}} onClick={(event)=>Handler_ThemOnClick(event)}> Thêm Kho </a> </h2>
          </div>
        )
    }
    // GET NV
}
