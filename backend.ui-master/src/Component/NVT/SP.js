import React,{useState,useEffect,useContext,useRef} from 'react'
import axios from 'axios'
import Context from '../../Context';
import Handler from '../../Utility/Handler'


const ListHH = (props) => {
    const [State, SetState] = useContext(Context);
    return props.data.map((item)=>{
        return <option key={item.mahh} value={item.mahh}>{item.tenhh}</option>
    })
}
const ListSP = (props) => {
    const [State, SetState] = useContext(Context);
    return props.data.map((item)=>{
        return <option key={item.masp} value={item.masp}>{item.tensp}</option>
    })
}



const ListCT = props => {
    const [State, SetState] = useContext(Context);

 
    return props.data.map((item,index)=>{
        const Handler_SuaOnclick = async (event)=>{
            event.preventDefault();
            let res = await axios.get(`http://localhost:8080/Data/SP/GetCTSanPham/${item.machitietsp}`)
            if(res.data.data!==undefined){
              SetState({type:"AllCTSP",payload:[res.data.data[0]]});
              SetState({type:"QLSPSTT",payload:-2})
              //-2 là hiển thị trang sửa spct
            }
        }
        const Handler_XoaOnClick = (event)=>
        {
            event.preventDefault();
            axios.delete(`http://localhost:8080/Data/SP/DeleteCTSanPham/${item.machitietsp}`).then((res,err)=>{
            let temp = async () => {
                alert("Xóa thông tin CT SP thành công");
                let res = await axios.get(`http://localhost:8080/Data/SP/GetAllCTSanPham/${item.masp}`)
                if(res.data.data!==undefined){
                SetState({type:"AllCTSP",payload:res.data.data})
                 SetState({type:"QLSPSTT",payload:-1});
                }
            }
            res.data.access === 1 ? temp() : alert(`Xóa thông tin CT SP thất bại lỗi ${err}: ${res.data.error}`)
        })
        }
        return <tr key={item.machitietsp}>
        <th scope="row">{index}</th>
        <td>{item.machitietsp}</td>
        <td>{item.mahh}</td>
        <td>{item.soluong}</td>
        <td><a href="update_nhanvien.html" style={{border: 'solid 1px black'}} onClick={(event)=>Handler_SuaOnclick(event)}> Sửa </a>
          <a href="xoa_nv.html" style={{border: 'solid 1px black'}} onClick={(event)=>Handler_XoaOnClick(event)}> Xóa </a> </td>
        </tr>
    })
}

const ListNV = (props) => {
    const [State, SetState] = useContext(Context);
    return props.data.map((item,index)=>{

        const Handler_XemOnclick = async (event)=>{
            event.preventDefault();
            let res = await axios.get(`http://localhost:8080/Data/SP/GetAllCTSanPham/${item.masp}`)
            if(res.data.data!==undefined){
              SetState({type:"AllCTSP",payload:res.data.data});
              SetState({type:"QLSPSTT",payload:-1})
            }
        }
        const Handler_SuaOnclick = async (event)=>{
            event.preventDefault();
            let res = await axios.get(`http://localhost:8080/Data/SP/GetSanPham/${item.masp}`)
            if(res.data.data!==undefined){
              SetState({type:"AllSP",payload:[res.data.data[0]]});
              SetState({type:"QLSPSTT",payload:1})
            }
        }
        const Handler_XoaOnClick = (event)=>{
            event.preventDefault();
                axios.delete(`http://localhost:8080/Data/SP/DeleteSanPham/${item.masp}`).then((res,err)=>{
                let temp = async () => {
                    alert("Xóa thông tin SP thành công");
                    let res = await axios.get("http://localhost:8080/Data/SP/GetAllSanPham")
                    if(res.data.data!==undefined){
                      SetState({type:"AllSP",payload:res.data.data})
                     SetState({type:"QLSPSTT",payload:0});
                    }
                }
                res.data.access === 1 ? temp() : alert(`Xóa thông tin SP thất bại lỗi ${err}: ${res.data.error}`)
            })
            

        }

       
        return <tr key={item.masp}>
        <td scope="row">{index}</td>
        <td>{item.masp}</td>
        <td>{item.tensp}</td>
        <td>{item.maloaisp}</td>
        <td>{item.giaban}</td>
        <td>{item.noidung}</td>
        <td>{item.trangthai}</td>
        
    
        <td>
          <a href="update_nhanvien.html" style={{border: 'solid 1px black'}} onClick={(event)=>Handler_XemOnclick(event)}> Xem </a>
          <a href="update_nhanvien.html" style={{border: 'solid 1px black'}} onClick={(event)=>Handler_SuaOnclick(event)}> Sửa </a>
          <a href="xoa_nv.html" style={{border: 'solid 1px black'}} onClick={(event)=>Handler_XoaOnClick(event)}> Xóa </a> 
        </td>
      </tr>
    })
}


    
export default function HD() {
    const [State, SetState] = useContext(Context);
    const [SPInfo,SetSPInfo] = useState({});
    const [SPCTInfo,SetSPCTInfo] = useState({});
    const [HHInfo,SetHHInfo] = useState([]);
    const spRef = useRef();


 

    const Handler_Onchange = (event)=>{
        SetSPInfo({...SPInfo,[event.target.name]:event.target.value,anhsp:window.location.origin +`/`+spRef.current.files[0]?.name})
        console.log()
        // State.QLSPSTT!==2 ? SetSPInfo({...SPInfo,[event.target.name]:event.target.value}) : SetSPInfo({...SPInfo,[event.target.name]:event.target.value})
    }
    const Handler_SuaOnclick = (event)=>{
        event.preventDefault();
        axios.put(`http://localhost:8080/Data/SP/UpdateSanPham`,SPInfo).then((res,err)=>{
            let temp = async () => {
                alert("Sửa thông tin SP thành công");
                let res = await axios.get("http://localhost:8080/Data/SP/GetAllSanPham")
                if(res.data.data!==undefined){
                SetState({type:"AllSP",payload:res.data.data})
                SetState({type:"QLSPSTT",payload:0});
                }
            }
            res.data.access === 1 ? temp() : alert(`Sửa thông tin SP thất bại lỗi ${err}: ${res.data.error}`)
        })
    }
    const Handler_ThemOnClick = (event)=>{
        event.preventDefault();
        let temp =   () => {
            axios.post(`http://localhost:8080/Data/SP/InsertSanPham`,SPInfo).then((res,err)=>{
                let temp2 = async () => {
                    alert("Thêm thông tin SP thành công");
                    let res = await axios.get("http://localhost:8080/Data/SP/GetAllSanPham")
                if(res.data.data!==undefined){
                SetState({type:"AllSP",payload:res.data.data})
                SetState({type:"QLSPSTT",payload:0});
                }
                }
                res.data.access === 1 ? temp2() : alert(`Thêm thông tin SP thất bại lỗi ${err}: ${res.data.error}`)
            }
            )
        }
        
        State.QLSPSTT !==2? SetState({type:"QLSPSTT",payload:2}) : temp();
    }
    // THAO TÁC VỚI PHIẾU NHẬP
       // ------------------------------------------------------------------------

        const Handler_CTOnchange = (event) => {
            State.QLSPSTT!== -3 ? SetSPCTInfo({...SPCTInfo,machitietsp:State.AllCTSP[0]?.machitietsp,masp:State.AllCTSP[0]?.masp,[event.target.name]:event.target.value}) : 
            SetSPCTInfo({...SPCTInfo,[event.target.name]:event.target.value})
        }
        const Handler_SuaCTOnclick = (event) => {
            event.preventDefault();
             axios.put(`http://localhost:8080/Data/SP/UpdateCTSanPham`,SPCTInfo).then((res,err)=>{
            let temp = async () => {
                alert("Sửa thông tin SP chi tiết thành công");
                let res = await axios.get(`http://localhost:8080/Data/SP/GetAllCTSanPham/${State.AllCTSP[0]?.masp}`)
                if(res.data.data!==undefined){
                SetState({type:"AllCTSP",payload:res.data.data})
                SetState({type:"QLSPSTT",payload:-1});
                }
            }
            res.data.access === 1 ? temp() : alert(`Sửa thông tin SP chi tiết thất bại lỗi ${err}: ${res.data.error}`)
        })
        }
        const Handler_ThemCTOnclick = (event)=>{
            event.preventDefault();

            let temp = () => {
                axios.post(`http://localhost:8080/Data/SP/InsertCTSanPham`,SPCTInfo).then((res,err)=>{
                    let temp2 = async () => {
                        alert("Thêm thông tin SP CT thành công");
                        let res = await axios.get(`http://localhost:8080/Data/SP/GetAllCTSanPham/${State.AllCTSP[0]?.masp}`)
                    if(res.data.data!==undefined){
                        SetState({type:"AllCTSP",payload:res.data.data})
                        SetState({type:"QLSPSTT",payload:-1});
                    }
                    }
                    res.data.access === 1 ? temp2() : alert(`Thêm thông tin SP chi tiết thất bại lỗi ${err}: ${res.data.error}`)
                }
                )
            
            }
            State.QLSPSTT !==-3? SetState({type:"QLSPSTT",payload:-3}) : temp();
        
    }
        //THAO TÁC VỚI PHIẾU NHẬP CHI TIẾT
       //------------------------------------------------------------------
    useEffect(()=>{
        (async () => {
            let res = await axios.get("http://localhost:8080/Data/SP/GetAllSanPham")
                if(res.data.data!==undefined){
                  SetState({type:"AllSP",payload:res.data.data})
                SetState({type:"QLSPSTT",payload:0});
                }
        })()
        
    },[])
    useEffect(()=>{
        SetSPInfo({...State.AllSP[0]});
        (async()=>{
            let res = await axios.get("http://localhost:8080/Data/HH/GetAllHH");
            if(res.data.data!==undefined) SetHHInfo(res.data.data);

        })()
        if(State.QLSPSTT===2) SetSPInfo({});
    },[State.QLSPSTT])
//     useEffect(()=>{  
//         if (State.AllCTSP[0]?.mahoadon=== undefined) SetState({type:"AllCTSP",payload:[{mahoadon:"null"}]})         
//   })
    switch(State.QLSPSTT){
        case -3: return (
            <div className="container-fluid mt--10">
            <h2> Thêm SP Chi Tiết </h2>
            <form> 
              <table className="tablesuanhanvien">
                <tbody>
                  <tr>
                    <th>Mã Sản Phẩm</th>
                    <td>
                      <select style={{width: '75%'}} name="masp" onChange={(event)=>Handler_CTOnchange(event)}>
                      <option/>
                      <ListSP data={State.AllSP}/>
                      </select>
                    </td>
                  </tr>
               
                  <tr>
                    <th>Mã Hàng Hóa</th>
                    <td>
                      <select style={{width: '75%'}} name="mahh" onChange={(event)=>Handler_CTOnchange(event)}>
                      <option/>
                      <ListHH data={HHInfo}/>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <th>Số lượng </th>
                    <td><input className="form-control" type="text" name="soluong"  id="diem" onChange={(event)=>Handler_CTOnchange(event)} onKeyPress={(event)=>Handler.Number(event)} /> </td>
                  </tr>   
                   
                </tbody></table>
              <button name="sua" value="Xacnhan" style={{width: '20%'}} onClick={(event)=>Handler_ThemCTOnclick(event)}> Thêm CT SP </button>
            </form>
          </div>)
            // SUA INFO NV
        
        case -2: return (
            <div className="container-fluid mt--10">

            <h2> Sửa SP Chi Tiết </h2>
            <form> 
              <table className="tablesuanhanvien">
                <tbody>
                 
                  <tr>
                    <th>Mã SP Chi Tiết </th>
                    <td><input className="form-control" type="text" name="machitietsp" placeholder={State.AllCTSP[0].machitietsp} id="diem" onChange={(event)=>Handler_CTOnchange(event)} disabled/> </td>
                  </tr>   
                  <tr>
                    <th>Mã Sản Phẩm </th>
                    <td>
                      <select style={{width: '75%'}} placeholder={State.AllCTSP[0].masp} name="masp" disabled onChange={(event)=>Handler_CTOnchange(event)}>
                      <option>{State.AllCTSP[0].masp}</option>
                      <ListSP data={State.AllSP}/>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <th>Mã Hàng Hóa</th>
                    <td>
                      <select style={{width: '75%'}} name="mahh" placeholder={State.AllCTSP[0].mahh} onChange={(event)=>Handler_CTOnchange(event)}>
                      <option/>
                      <ListHH data={HHInfo}/>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <th>Số lượng </th>
                    <td><input className="form-control" type="text" name="soluong" placeholder={State.AllCTSP[0].soluong} id="diem" onChange={(event)=>Handler_CTOnchange(event)} onKeyPress={(event)=>Handler.Number(event)} /> </td>
                  </tr>                      
                </tbody></table>
              <button name="sua" value="Xacnhan" style={{width: '20%'}} onClick={(event)=>Handler_SuaCTOnclick(event)}> Cập Nhật CT SP </button>
            </form>
          </div>)
            // SUA INFO NV
        
        case -1: return (
            
            <div className="container-fluid mt--10">
            {/* table */}

            <h2> Quản lý Chi Tiết Sản Phẩm</h2>
            <form action method="get">
              <table className="table">
                <thead>
                  <tr> 
                    <th scope="col">STT</th>
                    <th scope="col">Mã CT SP</th>
                    <th scope="col">Mã Hàng Hóa</th>
                    <th scope="col">Số lượng</th>
                    <th scope="col">Tác vụ khác</th>
                  </tr>
                </thead>
                <tbody>
                  <ListCT data={State.AllCTSP}/>
                </tbody>
              </table>
            </form>
            <h2 className="mt-3"><a href="add_nhanvien.html" style={{border: 'solid 1px black'}} onClick={(event)=>Handler_ThemCTOnclick(event)}> Thêm CT SP </a> </h2>
          </div>

        )
        
        //CHI TIẾT PHIẾU NHẬP
        case 1: return(
        <div className="container-fluid mt--10">
  
        <h2> Sửa SP</h2>
        <form> 
          <table className="tablesuanhanvien">
            <tbody>

              <tr>
                <th>Mã SP </th>
                <td><input className="form-control" type="text" name="masp" placeholder={State.AllSP[0].masp} id="diem" onChange={(event)=>Handler_Onchange(event)} disabled/> </td>
              </tr>   
             <tr>
                <th> Tên SP </th>
                <td><input className="form-control" type="text" name="tensp"  placeholder={State.AllSP[0].tensp} id="diem" onChange={(event)=>Handler_Onchange(event)} onKeyPress={(event)=>Handler.Char(event)}/></td>
              </tr>
             <tr>
                <th> Loại SP </th>
                <td><input className="form-control" type="text" name="maloaisp"  placeholder={State.AllSP[0].maloaisp} id="diem" onChange={(event)=>Handler_Onchange(event)} onKeyPress={(event)=>Handler.Char(event)}/></td>
            </tr>
             <tr>
                <th> Nội dung </th>
                <td><input className="form-control" type="text" name="noidung"  placeholder={State.AllSP[0].noidung} id="diem" onChange={(event)=>Handler_Onchange(event)} onKeyPress={(event)=>Handler.Char(event)} /></td>
            </tr>
             <tr>
                <th> Giá bán </th>
                <td><input className="form-control" type="text" name="giaban"  placeholder={State.AllSP[0].giaban} id="diem" onChange={(event)=>Handler_Onchange(event)} onKeyPress={(event)=>Handler.Number(event)}/></td>
            </tr>
             <tr>
                <th> Trạng thái </th>
                <td><input className="form-control" type="text" name="trangthai"  placeholder={State.AllSP[0].trangthai} id="diem" onChange={(event)=>Handler_Onchange(event)} onKeyPress={(event)=>Handler.Char(event)} /></td>
            </tr>
             <tr>
                <th> Ảnh SP </th>
                <td><input className="form-control" ref={spRef} type="file" name="anhsp"  placeholder={State.AllSP[0].anhsp} id="diem" onChange={(event)=>Handler_Onchange(event)} /></td>
            </tr>
            </tbody></table>
          <button name="sua" value="Xacnhan" style={{width: '20%'}} onClick={(event)=>Handler_SuaOnclick(event)}> Cập Nhật SP </button>
        </form>
      </div>)
        // SUA INFO NV
        case 2: return (
            <div className="container-fluid mt--10">
        {/* table */}
        <h2> Thêm SP </h2>
        <form>
        <table className="tablesuanhanvien">
            <tbody>

              <tr>
                <th>Mã SP </th>
                <td><input className="form-control" type="text" name="masp"  id="diem" onChange={(event)=>Handler_Onchange(event)} onKeyPress={(event)=>Handler.Char(event)} /> </td>
              </tr>   
             <tr>
                <th> Tên SP </th>
                <td><input className="form-control" type="text" name="tensp"   id="diem" onChange={(event)=>Handler_Onchange(event)} onKeyPress={(event)=>Handler.Char(event)}/></td>
              </tr>
             <tr>
                <th> Loại SP </th>
                <td><input className="form-control" type="text" name="maloaisp"   id="diem" onChange={(event)=>Handler_Onchange(event)} onKeyPress={(event)=>Handler.Char(event)}/></td>
            </tr>
             <tr>
                <th> Nội dung </th>
                <td><input className="form-control" type="text" name="noidung"  id="diem" onChange={(event)=>Handler_Onchange(event)} onKeyPress={(event)=>Handler.Char(event)}/></td>
            </tr>
             <tr>
                <th> Giá bán </th>
                <td><input className="form-control" type="text" name="giaban"  id="diem" onChange={(event)=>Handler_Onchange(event)} onKeyPress={(event)=>Handler.Number(event)} /></td>
            </tr>
             <tr>
                <th> Trạng thái </th>
                <td><input className="form-control" type="text" name="trangthai" id="diem" onChange={(event)=>Handler_Onchange(event)}  onKeyPress={(event)=>Handler.Char(event)}/></td>
            </tr>
             <tr>
                <th> Ảnh SP </th>
                <td><input className="form-control" type="file" ref={spRef} name="anhsp" id="diem" onChange={(event)=>Handler_Onchange(event)} /></td>
            </tr>
            </tbody></table>
          <button name="them" value="Xacnhan" style={{width: '20%'}} onClick={(event)=>Handler_ThemOnClick(event)} > Thêm SP </button>
        </form>
      </div>
        )   
        //THem NV
        
        default:return (
            <div className="container-fluid mt--10">
            {/* table */}
            <h2> Quản lý Thông Tin Sản Phẩm</h2>
            <form action method="get">
              <table className="table">
                <thead>
                  <tr> 
                    <th scope="col">STT</th>
                    <th scope="col">Mã SP</th>
                    <th scope="col">Tên SP</th>             
                    <th scope="col">Loại SP</th>                 
                    <th scope="col">Giá bán </th>
                    <th scope="col">Nội dung </th>
                    <th scope="col">Trạng thái</th>
                    <th scope="col">Tác vụ khác</th>

                  </tr>
                </thead>
                <tbody>
                  <ListNV data={State.AllSP}/>
                </tbody>
              </table>
            </form>
            <h2 className="mt-3"><a href="add_nhanvien.html" style={{border: 'solid 1px black'}} onClick={(event)=>Handler_ThemOnClick(event)}> Thêm Sản Phẩm </a> </h2>
          </div>
        )
    }
    // GET NV
}
