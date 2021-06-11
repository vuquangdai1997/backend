import React,{useState,useEffect,useContext} from 'react'
import axios from 'axios'
import Context from '../../Context';
import Handler from '../../Utility/Handler'

const ListNV = (props) => {
    const [State, SetState] = useContext(Context);
    return props.data.map((item,index)=>{

        const Handler_SuaOnclick = async (event)=>{
            event.preventDefault();
            let res = await axios.get(`http://localhost:8080/NV/CA/GetChiNhanh/${item.machinhanh}`)
            if(res.data.data!==undefined){
              SetState({type:"AllCN",payload:[res.data.data[0]]});
              SetState({type:"QLCNSTT",payload:1})
            }
        }
        const Handler_XoaOnClick = (event)=>{
            event.preventDefault();
                axios.delete(`http://localhost:8080/NV/CA/DeleteChiNhanh/${item.machinhanh}`).then((res,err)=>{
                let temp = async () => {
                    alert("Xóa thông tin chi nhánh thành công");
                    let res = await axios.get("http://localhost:8080/NV/CA/GetAllChiNhanh")
                    if(res.data.data!==undefined){
                      SetState({type:"AllCN",payload:res.data.data})
                     SetState({type:"QLCNSTT",payload:0});
                    }
                }
                res.data.access === 1 ? temp() : alert(`Xóa thông tin chi nhánh thất bại lỗi ${err}: ${res.data.error}`)
            })
            

        }
        return <tr key={item.machinhanh}>
        <td scope="row">{index}</td>
        <td>{item.machinhanh}</td>
        <td>{item.tenchinhanh}</td>
        <td>{item.diachi}</td>
        <td>{item.gmail}</td>
        <td>{item.sdt}</td>
        <td>{item.nganquy}</td>
        <td>
          <a href="update_nhanvien.html" style={{border: 'solid 1px black'}} onClick={(event)=>Handler_SuaOnclick(event)}> Sửa </a>
          <a href="xoa_nv.html" style={{border: 'solid 1px black'}} onClick={(event)=>Handler_XoaOnClick(event)}> Xóa </a> 
        </td>
      </tr>
    })
}


    
export default function CN() {
    const [State, SetState] = useContext(Context);
    const [CNInfo,SetCNInfo] = useState({});
    const Handler_Onchange = (event)=>{
        State.QLCNSTT !==2 ? SetCNInfo({...CNInfo,[event.target.name]:event.target.value}) : 
        SetCNInfo({...CNInfo,nganquy:0,[event.target.name]:event.target.value})
    }
    const Handler_SuaOnclick = (event)=>{
        event.preventDefault();
        axios.put(`http://localhost:8080/NV/CA/UpdateChiNhanh`,CNInfo).then((res,err)=>{
            let temp = async () => {
                alert("Sửa thông tin chi nhánh thành công");
                let res = await axios.get("http://localhost:8080/NV/CA/GetAllChiNhanh")
                if(res.data.data!==undefined){
                  SetState({type:"AllCN",payload:res.data.data})
                SetState({type:"QLCNSTT",payload:0});
                }
            }
            res.data.access === 1 ? temp() : alert(`Sửa thông tin chi nhánh thất bại lỗi ${err}: ${res.data.error}`)
        })
    }
    const Handler_ThemOnClick = (event)=>{
        event.preventDefault();
        let temp =   () => {
            axios.post(`http://localhost:8080/NV/CA/InsertChiNhanh`,CNInfo).then((res,err)=>{
                let temp2 = async () => {
                    alert("Thêm thông tin chi nhánh thành công");
                    let res = await axios.get("http://localhost:8080/NV/CA/GetAllChiNhanh")
                  if(res.data.data!==undefined){
                      SetState({type:"AllCN",payload:res.data.data})
                    SetState({type:"QLCNSTT",payload:0});
                }
                }
                res.data.access === 1 ? temp2() : alert(`Thêm thông tin chi nhánh thất bại lỗi ${err}: ${res.data.error}`)
            }
            )
        }
        State.QLCNSTT !==2? SetState({type:"QLCNSTT",payload:2}) : temp();
    }
    
    useEffect(()=>{
        (async () => {
          let res = await axios.get("http://localhost:8080/NV/CA/GetAllChiNhanh")
          if(res.data.data!==undefined){
             SetState({type:"AllCN",payload:res.data.data})
            SetState({type:"QLCNSTT",payload:0});
        }
        })()
        
    },[])
    useEffect(()=>{
        SetCNInfo({...State.AllCN[0]});
        if(State.QLCNSTT===2) SetCNInfo({});
    },[State.QLCNSTT])

    switch(State.QLCNSTT){
        case 1: return(
        <div className="container-fluid mt--10">
        {/* table */}
        <h2> Sửa Chi Nhánh</h2>

        <form> 
          <table className="tablesuanhanvien">
            <tbody>
              <tr>
              </tr><tr>
                <th>Mã Chi Nhánh </th>
                <td><input className="form-control" type="text" name="machinhanh" placeholder={State.AllCN[0].machinhanh} id="diem" onChange={(event)=>Handler_Onchange(event)} disabled/> </td>
              </tr>   
              <tr>
                <th>Tên Chi Nhánh</th>
                <td><input className="form-control" type="text" name="tenchinhanh" placeholder={State.AllCN[0].tenchinhanh} onChange={(event)=>Handler_Onchange(event)} onKeyPress={(event)=>Handler.Char(event)}/> </td>
              </tr>
              <tr>
                <th>Địa chỉ</th>
                <td><input className="form-control" type="text" name="diachi" placeholder={State.AllCN[0].diachi} onChange={(event)=>Handler_Onchange(event)} onKeyPress={(event)=>Handler.Char(event)}/> </td>
              </tr>
              <tr>
                <th> Gmail </th>
                <td><input className="form-control" type="text" name="gmail" placeholder={State.AllCN[0].gmail} id="diem" onChange={(event)=>Handler_Onchange(event)} onKeyPress={(event)=>Handler.Email(event)}/></td>
              </tr>
              <tr>
                <th>SDT </th>                                       
                <td><input type="text" id="Ngaynhap" name="sdt" placeholder={State.AllCN[0].sdt} onChange={(event)=>Handler_Onchange(event)} onKeyPress={(event)=>Handler.Number(event)}/></td>
              </tr>
              <tr>
                <th>Ngân Quỹ </th>                                       
                <td><input type="text" id="Ngaynhap" name="nganquy" placeholder={State.AllCN[0].nganquy} onChange={(event)=>Handler_Onchange(event)} disabled/></td>
              </tr>
            </tbody></table>
          <button name="sua" value="Xacnhan" style={{width: '20%'}} onClick={(event)=>Handler_SuaOnclick(event)}> Cập Nhật Chi Nhánh </button>
        </form>
      </div>)
        // SUA INFO NV
        case 2: return (
            <div className="container-fluid mt--10">
        {/* table */}
        <h2> Thêm Chi Nhánh </h2>
        <form>
        <table className="tablesuanhanvien">
            <tbody>
              <tr>
              </tr><tr>
                <th>Mã Chi Nhánh </th>
                <td><input className="form-control" type="text" name="machinhanh"  id="diem" onChange={(event)=>Handler_Onchange(event)} onKeyPress={(event)=>Handler.Char(event)}/> </td>
              </tr>   
              <tr>
                <th>Tên Chi Nhánh</th>
                <td><input className="form-control" type="text" name="tenchinhanh"  onChange={(event)=>Handler_Onchange(event)} onKeyPress={(event)=>Handler.Char(event)}/> </td>
              </tr>
              <tr>
                <th>Địa chỉ</th>
                <td><input className="form-control" type="text" name="diachi" onChange={(event)=>Handler_Onchange(event)} onKeyPress={(event)=>Handler.Char(event)}/> </td>
              </tr>
              <tr>
                <th> Gmail </th>
                <td><input className="form-control" type="text" name="gmail" id="diem" onChange={(event)=>Handler_Onchange(event)} onKeyPress={(event)=>Handler.Email(event)} /></td>
              </tr>
              <tr>
                <th>SDT </th>                                       
                <td><input type="text" id="Ngaynhap" name="sdt" onChange={(event)=>Handler_Onchange(event)} onKeyPress={(event)=>Handler.Number(event)}/></td>
              </tr>
              <tr>
                <th>Ngân Quỹ </th>                                       
                <td><input type="text" id="Ngaynhap" name="nganquy"  placeholder={0} onChange={(event)=>Handler_Onchange(event)} disabled/></td>
              </tr>
            </tbody></table>
          <button name="them" value="Xacnhan" style={{width: '20%'}} onClick={(event)=>Handler_ThemOnClick(event)} > Thêm Chi Nhánh </button>
        </form>
      </div>
        )   
        //THem NV
        
        default:return (
            <div className="container-fluid mt--10">
            {/* table */}
            <h2> Quản Lý Chi Nhánh</h2>
            <form action method="get">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">STT</th>
                    <th scope="col">Mã Chi Nhánh</th>
                    <th scope="col">Tên Chi Nhánh</th>
                    <th scope="col">Địa chỉ</th>
                    <th scope="col">Email</th>
                    <th scope="col">SDT</th>
                    <th scope="col">Ngân Quỹ </th>
                    <th scope="col">Tác vụ Cập nhật</th>
                  </tr>
                </thead>
                <tbody>
                  <ListNV data={State.AllCN}/>
                </tbody>
              </table>
            </form>
            <h2 className="mt-3"><a href="add_nhanvien.html" style={{border: 'solid 1px black'}} onClick={(event)=>Handler_ThemOnClick(event)}> Thêm Chi Nhánh </a> </h2>
          </div>
        )
    }
    // GET NV
}
