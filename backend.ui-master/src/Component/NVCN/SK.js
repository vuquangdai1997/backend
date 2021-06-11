import React,{useState,useEffect,useContext} from 'react'
import axios from 'axios'
import Context from '../../Context';
import Handler from '../../Utility/Handler';

const ListNV = (props) => {
    const [State, SetState] = useContext(Context);
    return props.data.map((item,index)=>{

        const Handler_SuaOnclick = async (event)=>{
            event.preventDefault();
            let res = await axios.get(`http://localhost:8080/NV/SK/GetSK/${item.masukien}`)
            if(res.data.data!==undefined){
              SetState({type:"AllSK",payload:[res.data.data[0]]});
              SetState({type:"QLSKSTT",payload:1})
            }
        }
        const Handler_XoaOnClick = (event)=>{
            event.preventDefault();
                axios.delete(`http://localhost:8080/NV/SK/DeleteSK/${item.masukien}`).then((res,err)=>{
                let temp = async () => {
                    alert("Xóa thông tin sự kiện thành công");
                    let res = await axios.get("http://localhost:8080/NV/SK/GetAllSK")
                    if(res.data.data!==undefined){
                      SetState({type:"AllSK",payload:res.data.data})
                     SetState({type:"QLSKSTT",payload:0});
                    }
                }
                res.data.access === 1 ? temp() : alert(`Xóa thông tin sự kiện thất bại lỗi ${err}: ${res.data.error}`)
            })
            

        }
        return <tr key={item.masukien}>
        <th scope="row">{index}</th>
        <td>{item.masukien}</td>
        <td>{item.tensukien}</td>
        <td>{item.chietkhau}</td>
        <td>{item.tungay}</td>
        <td>{item.denngay}</td>
        <td>{item.noidung}</td>
        <td>
          <a href="update_nhanvien.html" style={{border: 'solid 1px black'}} onClick={(event)=>Handler_SuaOnclick(event)}> Sửa </a>
          <a href="xoa_nv.html" style={{border: 'solid 1px black'}} onClick={(event)=>Handler_XoaOnClick(event)}> Xóa </a> 
        </td>
      </tr>
    })
}


    
export default function SK() {
    const [State, SetState] = useContext(Context);
    const [SKInfo,SetSKInfo] = useState({});
    const Handler_Onchange = (event)=>{
        SetSKInfo({...SKInfo,[event.target.name]:event.target.value})
    }
    const Handler_SuaOnclick = (event)=>{
        event.preventDefault();
        axios.put(`http://localhost:8080/NV/SK/UpdateSK`,SKInfo).then((res,err)=>{
            let temp = async () => {
                alert("Sửa thông tin sự kiện thành công");
                let res = await axios.get("http://localhost:8080/NV/SK/GetAllSK")
                if(res.data.data!==undefined){
                  SetState({type:"AllSK",payload:res.data.data})
                SetState({type:"QLSKSTT",payload:0});
                }
            }
            res.data.access === 1 ? temp() : alert(`Sửa thông tin sự kiện thất bại lỗi ${err}: ${res.data.error}`)
        })
    }
    const Handler_ThemOnClick = (event)=>{
        event.preventDefault();
        let temp =   () => {
            axios.post(`http://localhost:8080/NV/SK/InsertSK`,SKInfo).then((res,err)=>{
                let temp2 = async () => {
                    alert("Thêm thông tin sự kiện thành công");
                    let res = await axios.get("http://localhost:8080/NV/SK/GetAllSK")
                  if(res.data.data!==undefined){
                      SetState({type:"AllSK",payload:res.data.data})
                    SetState({type:"QLSKSTT",payload:0});
                }
                }
                res.data.access === 1 ? temp2() : alert(`Thêm thông tin sự kiện thất bại lỗi ${err}: ${res.data.error}`)
            }
            )
        }
        State.QLSKSTT !==2? SetState({type:"QLSKSTT",payload:2}) : temp();
    }
    
    useEffect(()=>{
        (async () => {
          let res = await axios.get("http://localhost:8080/NV/SK/GetAllSK")
          if(res.data.data!==undefined){
             SetState({type:"AllSK",payload:res.data.data})
            SetState({type:"QLSKSTT",payload:0});
        }
        })()
        
    },[])
    useEffect(()=>{
        SetSKInfo({...State.AllSK[0]});
        if(State.QLSKSTT===2) SetSKInfo({});
    },[State.QLSKSTT])

    switch(State.QLSKSTT){
        case 1: return(
        <div className="container-fluid mt--10">
        {/* table */}
        <h2> Sửa Sự Kiện</h2>
        <form> 
          <table className="tablesuanhanvien">
            <tbody>
              <tr>
              </tr><tr>
                <th>Mã Sự Kiện </th>
                <td><input className="form-control" type="text" name="masukien" placeholder={State.AllSK[0].masukien} id="diem" onChange={(event)=>Handler_Onchange(event)} disabled/> </td>
              </tr>   
              <tr>
                <th>Tên Sự Kiện</th>
                <td><input className="form-control" type="text" name="tensukien" placeholder={State.AllSK[0].tensukien} onChange={(event)=>Handler_Onchange(event)} onKeyPress={(event)=>Handler.Char(event)}/> </td>
              </tr>
              <tr>
                <th>Nội dung</th>
                <td><input className="form-control" type="text" name="noidung" placeholder={State.AllSK[0].noidung} onChange={(event)=>Handler_Onchange(event)} onKeyPress={(event)=>Handler.Char(event)}/> </td>
              </tr>
              <tr>
                <th> Chiết khấu </th>
                <td><input className="form-control" type="text" name="chietkhau" placeholder={State.AllSK[0].chietkhau} id="diem" onChange={(event)=>Handler_Onchange(event)} onKeyPress={(event)=>Handler.Number(event)}/></td>
              </tr>
              <tr>
                <th>Từ ngày </th>                                       
                <td><input type="datetime-local" id="Ngaynhap" name="tungay" placeholder={State.AllSK[0].tungay} onChange={(event)=>Handler_Onchange(event)}/></td>
              </tr>
              <tr>
                <th>Đến ngày </th>                                       
                <td><input type="datetime-local" id="Ngaynhap" name="denngay" placeholder={State.AllSK[0].dengay} onChange={(event)=>Handler_Onchange(event)}/></td>
              </tr>
            </tbody></table>
          <button name="sua" value="Xacnhan" style={{width: '20%'}} onClick={(event)=>Handler_SuaOnclick(event)}> Cập Nhật Sự Kiện </button>
        </form>
      </div>)
        // SUA INFO NV
        case 2: return (
            <div className="container-fluid mt--10">
        {/* table */}
        <h2> Thêm Sự Kiện </h2>
        <form>
          <table className="tablesuanhanvien">
            <tbody>
              <tr>
              </tr><tr>
                <th>Mã Sự Kiện </th>
                <td><input className="form-control" type="text" name="masukien" onKeyPress={(event)=>Handler.Char(event)} onChange={(event)=>Handler_Onchange(event)} id="diem" /> </td>
              </tr>
              <tr>
                <th>Tên Sự Kiện</th>
                <td><input className="form-control" type="text" name="tensukien" onKeyPress={(event)=>Handler.Char(event)} onChange={(event)=>Handler_Onchange(event)} id="diem" /> </td>
              </tr>
              
              <tr>
                <th>Nội Dung</th>
                <td><input className="form-control" type="text" name="noidung" onKeyPress={(event)=>Handler.Char(event)} onChange={(event)=>Handler_Onchange(event)} id="diem" /> </td>
              </tr>
              <tr>
                <th>Chiết khấu</th>
                <td><input className="form-control" type="text" name="chietkhau" onKeyPress={(event)=>Handler.Char(event)} onChange={(event)=>Handler_Onchange(event)} id="diem" /> </td>
              </tr>
            
              <tr>
                <th>Từ ngày </th>                                       
                <td><input type="datetime-local" id="Ngaynhap" name="tungay" onChange={(event)=>Handler_Onchange(event)}/></td>
              </tr>
              <tr>
                <th>Đến ngày </th>                                       
                <td><input type="datetime-local" id="Ngaynhap" name="denngay" onChange={(event)=>Handler_Onchange(event)}/></td>
              </tr>
            
            </tbody></table>
          <button name="them" value="Xacnhan" style={{width: '20%'}} onClick={(event)=>Handler_ThemOnClick(event)} > Thêm Sự Kiện </button>
        </form>
      </div>
        )   
        //THem NV
        
        default:return (
            <div className="container-fluid mt--10">
            {/* table */}
            <h2> Quản lý Sự Kiện</h2>
            <form action method="get">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">STT</th>
                    <th scope="col">Mã sự kiện</th>
                    <th scope="col">Tên sự kiện</th>
                    <th scope="col">Phần trăm chiết khấu</th>
                    <th scope="col">Từ ngày</th>
                    <th scope="col">Đến ngày</th>
                    <th scope="col">Nội dung </th>
                    <th scope="col">Tác vụ Cập nhật</th>
                  </tr>
                </thead>
                <tbody>
                  <ListNV data={State.AllSK}/>
                </tbody>
              </table>
            </form>
            <h2 className="mt-3"><a href="add_nhanvien.html" style={{border: 'solid 1px black'}} onClick={(event)=>Handler_ThemOnClick(event)}> Thêm Sự Kiện </a> </h2>
          </div>
        )
    }
    // GET NV
}
