import React,{useState,useEffect,useContext} from 'react'
import axios from 'axios'
import Context from '../../Context';
import Handler from '../../Utility/Handler'
import'../table.css'
const ListHD = (props) => {
    const [State, SetState] = useContext(Context);
    return props.data.map((item)=>{
        return <option key={item.mahoadon} value={item.mahoadon}>{item.mahoadon}</option>
    })
}

const ListPTH = (props) => {
    const [State, SetState] = useContext(Context);
    return props.data.map((item)=>{
        return <option key={item.maphieutrahang} value={item.maphieutrahang}>{item.maphieutrahang}</option>
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
            let res = await axios.get(`http://localhost:8080/SYS/GetCTPhieuTraHang/${item.maphieutrahangchitiet}`)
            if(res.data.data!==undefined){
              SetState({type:"AllCTPTH",payload:[res.data.data[0]]});
              SetState({type:"QLPTHSTT",payload:-2})
              //-2 là hiển thị trang sửa pnct
            }
        }
        const Handler_XoaOnClick = (event)=>
        {
            event.preventDefault();
            axios.delete(`http://localhost:8080/SYS/DeleteCTPhieuTraHang/${item.maphieutrahangchitiet}`).then((res,err)=>{
            let temp = async () => {
                alert("Xóa thông tin PTH thành công");
                let res = await axios.get(`http://localhost:8080/SYS/GetAllCTPhieuTraHang/${item.maphieutrahang}`)
                if(res.data.data!==undefined){
                SetState({type:"AllCTPTH",payload:res.data.data})
                 SetState({type:"QLPTHSTT",payload:-1});
                }
            }
            res.data.access === 1 ? temp() : alert(`Xóa thông tin CT PTH thất bại lỗi ${err}: ${res.data.error}`)
        })
        }
        return <tr key={item?.maphieutrahangchitiet}>
        <td scope="row">{index}</td>
        <td>{item?.maphieutrahangchitiet}</td>
        <td>{item?.masp}</td>
        <td>{item?.soluong}</td>
        <td>{item?.dongia}</td>
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
            let res = await axios.get(`http://localhost:8080/SYS/GetAllCTPhieuTraHang/${item.maphieutrahang}`)
            if(res.data.data!==undefined){
              SetState({type:"AllCTPTH",payload:res.data.data});
              SetState({type:"QLPTHSTT",payload:-1})
            }
        }
        const Handler_SuaOnclick = async (event)=>{
            event.preventDefault();
            let res = await axios.get(`http://localhost:8080/SYS/GetPhieuTraHang/${item.maphieutrahang}`)
            if(res.data.data!==undefined){
              SetState({type:"AllPTH",payload:[res.data.data[0]]});
              SetState({type:"QLPTHSTT",payload:1})
            }
        }
        const Handler_XoaOnClick = (event)=>{
            event.preventDefault();
                axios.delete(`http://localhost:8080/SYS/DeletePhieuTraHang/${item.maphieutrahang}`).then((res,err)=>{
                let temp = async () => {
                    alert("Xóa thông tin PTH thành công");
                    let res = await axios.get("http://localhost:8080/SYS/GetAllPhieuTraHang")
                    if(res.data.data!==undefined){
                      SetState({type:"AllPTH",payload:res.data.data})
                     SetState({type:"QLPTHSTT",payload:0});
                    }
                }
                res.data.access === 1 ? temp() : alert(`Xóa thông tin PTH thất bại lỗi ${err}: ${res.data.error}`)
            })
            

        }

       
        return <tr key={item?.maphieutrahang}>
        <th scope="row">{index}</th>
        <td>{item?.maphieutrahang}</td>
        <td>{item?.mahoadon}</td>
        <td>{item?.ngaytra}</td>
        <td>{item?.tongtien}</td>
    
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
    const [PTHInfo,SetPTHInfo] = useState({});
    const [PTHCTInfo,SetPTHCTInfo] = useState({});
    const [HDInfo,SetHDInfo] = useState([]);
    const [SPInfo,SetSPInfo] = useState([]);


 

    const Handler_Onchange = (event)=>{
        
        State.QLPTHSTT!==2 ? SetPTHInfo({...PTHInfo,[event.target.name]:event.target.value}) : SetPTHInfo({...PTHInfo,tongtien:0,[event.target.name]:event.target.value})
    }
    const Handler_SuaOnclick = (event)=>{
        event.preventDefault();
        axios.put(`http://localhost:8080/SYS/UpdatePhieuTraHang`,PTHInfo).then((res,err)=>{
            let temp = async () => {
                alert("Sửa thông tin PTH thành công");
                let res = await axios.get("http://localhost:8080/SYS/GetAllPhieuTraHang")
                if(res.data.data!==undefined){
                SetState({type:"AllPTH",payload:res.data.data})
                SetState({type:"QLPTHSTT",payload:0});
                }
            }
            res.data.access === 1 ? temp() : alert(`Sửa thông tin PTH thất bại lỗi ${err}: ${res.data.error}`)
        })
    }
    const Handler_ThemOnClick = (event)=>{
        event.preventDefault();
        let temp =   () => {
            axios.post(`http://localhost:8080/SYS/InsertPhieuTraHang`,PTHInfo).then((res,err)=>{
                let temp2 = async () => {
                    alert("Thêm thông tin hóa đơn thành công");
                    let res = await axios.get("http://localhost:8080/SYS/GetAllPhieuTraHang")
                if(res.data.data!==undefined){
                SetState({type:"AllPTH",payload:res.data.data})
                SetState({type:"QLPTHSTT",payload:0});
                }
                }
                res.data.access === 1 ? temp2() : alert(`Thêm thông tin PTH thất bại lỗi ${err}: ${res.data.error}`)
            }
            )
        }
        
        State.QLPTHSTT !==2? SetState({type:"QLPTHSTT",payload:2}) : temp();
    }
    // THAO TÁC VỚI PHIẾU NHẬP
       // ------------------------------------------------------------------------

        const Handler_CTOnchange = (event) => {
            State.QLPTHSTT!== -3 ? SetPTHCTInfo({...PTHCTInfo,maphieutrahangchitiet:State.AllCTPTH[0]?.maphieutrahangchitiet,mahoadon:State.AllCTPTH[0]?.mahoadon,[event.target.name]:event.target.value}) : 
            SetPTHCTInfo({...PTHCTInfo,[event.target.name]:event.target.value})
        }
        const Handler_SuaCTOnclick = (event) => {
            event.preventDefault();
             axios.put(`http://localhost:8080/SYS/UpdateCTPhieuTraHang`,PTHCTInfo).then((res,err)=>{
            let temp = async () => {
                alert("Sửa thông tin PTH chi tiết thành công");
                let res = await axios.get(`http://localhost:8080/SYS/GetAllCTPhieuTraHang/${State.AllCTPTH[0]?.maphieutrahang}`)
                if(res.data.data!==undefined){
                SetState({type:"AllCTPTH",payload:res.data.data})
                SetState({type:"QLPTHSTT",payload:-1});
                }
            }
            res.data.access === 1 ? temp() : alert(`Sửa thông tin PTH chi tiết thất bại lỗi ${err}: ${res.data.error}`)
        })
        }
        const Handler_ThemCTOnclick = (event)=>{
            event.preventDefault();

            let temp = () => {
                axios.post(`http://localhost:8080/SYS/InsertCTPhieuTraHang`,PTHCTInfo).then((res,err)=>{
                    let temp2 = async () => {
                        alert("Thêm thông tin hóa đơn CT thành công");
                        let res = await axios.get(`http://localhost:8080/SYS/GetAllCTPhieuTraHang/${State.AllCTPTH[0]?.maphieutrahang}`)
                    if(res.data.data!==undefined){
                        SetState({type:"AllCTPTH",payload:res.data.data})
                        SetState({type:"QLPTHSTT",payload:-1});
                    }
                    }
                    res.data.access === 1 ? temp2() : alert(`Thêm thông tin PTH chi tiết thất bại lỗi ${err}: ${res.data.error}`)
                }
                )
            
            }
            State.QLPTHSTT !==-3? SetState({type:"QLPTHSTT",payload:-3}) : temp();
        
    }
        //THAO TÁC VỚI PHIẾU NHẬP CHI TIẾT
       //------------------------------------------------------------------
    useEffect(()=>{
        (async () => {
            let res = await axios.get("http://localhost:8080/SYS/GetAllPhieuTraHang")
                if(res.data.data!==undefined){
                  SetState({type:"AllPTH",payload:res.data.data})
                SetState({type:"QLPTHSTT",payload:0});
                }
        })()
        
    },[])
    useEffect(()=>{
        SetPTHInfo({...State.AllPTH[0]});
        (async()=>{
            let res = await axios.get("http://localhost:8080/SYS/GetAllHD");
            if(res.data.data!==undefined) SetHDInfo(res.data.data);
            let res2 = await axios.get("http://localhost:8080/Data/SP/GetAllSanPham");
            if(res2.data.data!==undefined) SetSPInfo(res2.data.data);

        })()
        if(State.QLPTHSTT===2) SetPTHInfo({});
    },[State.QLPTHSTT])
//     useEffect(()=>{  
//         if (State.AllCTPTH[0]?.mahoadon=== undefined) SetState({type:"AllCTPTH",payload:[{mahoadon:"null"}]})         
//   })
    switch(State.QLPTHSTT){
        case -3: return (
            <div className="container-fluid mt--10">
            <h2> Thêm PTH Chi Tiết </h2>
            <form> 
              <table className="table">
                <tbody>
                  <tr>
                    <th>Mã Phiếu Trả Hàng</th>
                    <td>
                      <select style={{width: '75%'}} name="maphieutrahang" onChange={(event)=>Handler_CTOnchange(event)}>
                      <option/>
                      <ListPTH data={State.AllPTH}/>
                      </select>
                    </td>
                  </tr>
               
                  <tr>
                    <th>Mã Sản Phẩm</th>
                    <td>
                      <select style={{width: '75%'}} name="masp" onChange={(event)=>Handler_CTOnchange(event)}>
                      <option/>
                      <ListSP data={SPInfo}/>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <th>Số lượng </th>
                    <td><input className="form-control" type="text" name="soluong"  id="diem" onChange={(event)=>Handler_CTOnchange(event)} onKeyPress={(event)=>Handler.Number(event)}/> </td>
                  </tr>   
                  <tr>
                    <th>Đơn giá </th>
                    <td><input className="form-control" type="text" name="dongia"  id="diem" onChange={(event)=>Handler_CTOnchange(event)} onKeyPress={(event)=>Handler.Number(event)}/> </td>
                  </tr>   
                   
                </tbody></table>
              <button name="sua" value="Xacnhan" style={{width: '20%'}} onClick={(event)=>Handler_ThemCTOnclick(event)}> Thêm CT PTH </button>
            </form>
          </div>)
            // SUA INFO NV
        
        case -2: return (
            <div className="container-fluid mt--10">

            <h2> Sửa PTH Chi Tiết </h2>
            <form> 
              <table className="table">
                <tbody>
                 
                  <tr>
                    <th>Mã PTH Chi Tiết </th>
                    <td><input className="form-control" type="text" name="maphieutrahangchitiet" placeholder={State.AllCTPTH[0].maphieutrahangchitiet} id="diem" onChange={(event)=>Handler_CTOnchange(event)} disabled/> </td>
                  </tr>   
                  <tr>
                    <th>Mã Phiếu Trả Hàng</th>
                    <td>
                      <select style={{width: '75%'}} placeholder={State.AllCTPTH[0].maphieutrahang} name="maphieutrahang" disabled onChange={(event)=>Handler_CTOnchange(event)}>
                      <option/>
                      <ListPTH data={State.AllPTH}/>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <th>Mã Sản Phẩm</th>
                    <td>
                      <select style={{width: '75%'}} name="masp" placeholder={State.AllCTPTH[0].masp} onChange={(event)=>Handler_CTOnchange(event)}>
                      <option/>
                      <ListSP data={SPInfo}/>
                      </select>
                    </td>
                  </tr>
               
                  <tr>
                    <th>Số lượng </th>
                    <td><input className="form-control" type="text" name="soluong" placeholder={State.AllCTPTH[0].soluong} id="diem" onChange={(event)=>Handler_CTOnchange(event)} onKeyPress={(event)=>Handler.Number(event)}/> </td>
                  </tr>   
                  <tr>
                    <th>Đơn giá </th>
                    <td><input className="form-control" type="text" name="dongia" placeholder={State.AllCTPTH[0].dongia} id="diem" onKeyPress={(event)=>Handler.Number(event)} onChange={(event)=>Handler_CTOnchange(event)} /> </td>
                  </tr>   
                   
                </tbody></table>
              <button name="sua" value="Xacnhan" style={{width: '20%'}} onClick={(event)=>Handler_SuaCTOnclick(event)}> Cập Nhật CT PTH </button>
            </form>
          </div>)
            // SUA INFO NV
        
        case -1: return (
            
            <div className="container-fluid mt--10">
            {/* table */}

            <h2> Quản lý Chi Tiết Phiếu Trả Hàng</h2>
            <form action method="get">
              <table className="table">
                <thead>
                  <tr> 
                    <th scope="col">STT</th>
                    <th scope="col">Mã CT PTH</th>
                    <th scope="col">Mã SP</th>
                    <th scope="col">Số lượng</th>
                    <th scope="col">Đơn giá</th>
                    <th scope="col">Tác vụ khác</th>
                  </tr>
                </thead>
                <tbody>
                  <ListCT data={State.AllCTPTH}/>
                </tbody>
              </table>
            </form>
            <h2 className="mt-3"><a href="add_nhanvien.html" style={{border: 'solid 1px black'}} onClick={(event)=>Handler_ThemCTOnclick(event)}> Thêm CT PTH </a> </h2>
          </div>

        )
        
        //CHI TIẾT PHIẾU NHẬP
        case 1: return(
        <div className="container-fluid mt--10">
  
        <h2> Sửa PTH</h2>
        <form> 
          <table className="table">
            <tbody>

              <tr>
                <th>Mã PTH </th>
                <td><input className="form-control" type="text" name="maphieutrahang" placeholder={State.AllPTH[0].maphieutrahang} id="diem" onChange={(event)=>Handler_Onchange(event)} disabled/> </td>
              </tr>   
              <tr>
                    <th>Mã Hóa Đơn</th>
                    <td>
                      <select style={{width: '75%'}} placeholder={State.AllCTPTH[0]?.mahoadon} name="mahoadon" disabled onChange={(event)=>Handler_Onchange(event)}>
                      <option/>
                      <ListHD data={HDInfo}/>
                      </select>
                    </td>
                  </tr>
              <tr>
                <th>Ngày Trả</th>
                <td><input className="form-control" type="datetime-local" name="ngaytra" placeholder={State.AllPTH[0].ngaytao} onChange={(event)=>Handler_Onchange(event)}/> </td>
              </tr>
              <tr>
                <th> Tổng tiền </th>
                <td><input className="form-control" type="text" name="tongtien" disabled placeholder={State.AllPTH[0].tongtien} id="diem" onChange={(event)=>Handler_Onchange(event)} /></td>
              </tr>
              
            </tbody></table>
          <button name="sua" value="Xacnhan" style={{width: '20%'}} onClick={(event)=>Handler_SuaOnclick(event)}> Cập Nhật Phiếu Trả Hàng </button>
        </form>
      </div>)
        // SUA INFO NV
        case 2: return (
            <div className="container-fluid mt--10">
        {/* table */}
        <h2> Thêm Phiếu Trả Hàng </h2>
        <form>
        <table className="tablephieutrahang">
            <tbody>
            <tr>
                <th>Mã PTH </th>
                <td><input className="form-control" type="text" name="maphieutrahang"  id="diem" onChange={(event)=>Handler_Onchange(event)} onKeyPress={(event)=>Handler.Char(event)}/> </td>
              </tr>   
              <tr>
                    <th>Mã Hóa Đơn</th>
                    <td>
                      <select style={{width: '75%'}} name="mahoadon" onChange={(event)=>Handler_Onchange(event)}>
                      <option/>
                      <ListHD data={HDInfo}/>
                      </select>
                    </td>
                  </tr> 
              <tr>
                <th>Ngày Trả</th>
                <td><input className="form-control" type="datetime-local" name="ngaytra"  onChange={(event)=>Handler_Onchange(event)}/> </td>
              </tr>
              <tr>
                  <th>
                    <div className="mt-3"><select style={{width: '50%'}}>
                        <option value>
                          Tên sản phẩm
                        </option>
                        <option value="tensp">Cà phê đen</option>
                        <option value="tensp">Cà phê phân chồn</option>
                      </select>
                      <label className=" ml-2 mr-2">Số lượng </label>
                      <input  classsName ="ml-2" type="number" name id />
                    </div>
                    <div className="mt-4"> <a name id className="btn btn-primary" href="#" role="button">Lựa chọn
                        sản phẩm</a></div>
                  </th><td>
                    <div>
                      <table className="tablechitietsanpham container-fluid mt-2">
                        <thead>
                          <tr>
                            <th>STT</th>
                            <th>Tên sản phẩm</th>
                            <th> Số lượng</th>
                            <th> Đơn giá</th>
                            <th>Thành tiền</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>1</td>
                            <td> Cà Phê phân chồn</td>
                            <td>2</td>
                            <td>4566</td>
                            <td>99999</td>
                          </tr>
                          <tr>
                            <td>2</td>
                            <td> Cà Phê đen</td>
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
                <th> Tổng Tiền </th>
                <td><input className="form-control" type="text" name="tongtien" id="diem" onChange={(event)=>Handler_Onchange(event)} /></td>
              </tr>
            </tbody></table>
          <button name="them" value="Xacnhan" style={{width: '20%'}} onClick={(event)=>Handler_ThemOnClick(event)} > Thêm PTH </button>
        </form>
      </div>
        )   
        //THem NV
        
        default:return (
            <div className="container-fluid mt--10 ">
            {/* table */}
            <h2> Quản lý Phiếu Trả Hàng</h2>
            <form action method="get">
              <table className="table">
                <thead>
                  <tr> 
                    <th scope="col">STT</th>
                    <th scope="col">Mã PTH</th>
                    <th scope="col">Mã HD</th>             
                    <th scope="col">Ngày Trả</th>                 
                    <th scope="col">Tổng tiền </th>
                    <th scope="col">Tác vụ </th>
                  </tr>
                </thead>
                <tbody>
                  <ListNV data={State.AllPTH}/>
                </tbody>
              </table>
            </form>
            <h2 className="mt-3"><a href="add_nhanvien.html" style={{border: 'solid 1px black', padding:'5px'}} onClick={(event)=>Handler_ThemOnClick(event)}> Thêm  Phiếu Trả Hàng </a> </h2>
          </div>
        )
    }
    // GET NV
}
