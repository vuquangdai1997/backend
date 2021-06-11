import React,{useState,useEffect,useContext} from 'react'
import axios from 'axios'
import Context from '../../Context';
import Handler from '../../Utility/Handler'

const ListPN = (props) => {
    const [State, SetState] = useContext(Context);
    return props.data.map((item)=>{
        return <option key={item.maphieuxuat} value={item.maphieuxuat}>{item.maphieuxuat}</option>
    })
}
const ListHH = (props) => {
    const [State, SetState] = useContext(Context);
    return props.data.map((item)=>{
        return <option key={item.mahh} value={item.mahh}>{item.tenhh}</option>
    })
}
const ListCN = (props) => {
    const [State, SetState] = useContext(Context);
    return props.data.map((item)=>{
        return <option key={item.machinhanh} value={item.machinhanh}>{item.tenchinhanh}</option>
    })
}
const ListMaNV = (props) => {
    const [State, SetState] = useContext(Context);
    return props.data.map((item)=>{
        return <option key={item.manv} value={item.manv}>{item.tennv}</option>
    })
}
const ListKho = (props) => {
    const [State, SetState] = useContext(Context);
    return props.data.map((item)=>{
        return <option key={item.makho} value={item.makho}>{item.tenkho}</option>
    })
}

const ListCT = props => {
    const [State, SetState] = useContext(Context);

 
    return props.data.map((item,index)=>{
        const Handler_SuaOnclick = async (event)=>{
            event.preventDefault();
            let res = await axios.get(`http://localhost:8080/SYS/GetCTPhieuXuat/${item.machitietphieuxuat}`)
            if(res.data.data!==undefined){
              SetState({type:"AllCTPX",payload:[res.data.data[0]]});
              SetState({type:"QLPXSTT",payload:-2})
              //-2 là hiển thị trang sửa pnct
            }
        }
        const Handler_XoaOnClick = (event)=>
        {
            event.preventDefault();
            axios.delete(`http://localhost:8080/SYS/DeleteCTPhieuXuat/${item.machitietphieuxuat}`).then((res,err)=>{
            let temp = async () => {
                alert("Xóa thông tin PXCT thành công");
                let res = await axios.get(`http://localhost:8080/SYS/GetAllCTPhieuXuat/${item.maphieuxuat}`)
                if(res.data.data!==undefined){
                SetState({type:"AllCTPX",payload:res.data.data})
                 SetState({type:"QLPXSTT",payload:-1});
                }
            }
            res.data.access === 1 ? temp() : alert(`Xóa thông tin PXCT thất bại lỗi ${err}: ${res.data.error}`)
        })
        }
        return <tr key={item?.machitietphieuxuat}>
        <td scope="row">{index}</td>
        <td>{item?.machitietphieuxuat}</td>
        <td>{item?.mahh}</td>
        <td>{item?.soluong}</td>
        <td>{item?.dongia}</td>
        <td>{item?.makho}</td>
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
            let res = await axios.get(`http://localhost:8080/SYS/GetAllCTPhieuXuat/${item.maphieuxuat}`)
            if(res.data.data!==undefined){
              SetState({type:"AllCTPX",payload:res.data.data});
              SetState({type:"QLPXSTT",payload:-1})
            }
        }
        const Handler_SuaOnclick = async (event)=>{
            event.preventDefault();
            let res = await axios.get(`http://localhost:8080/SYS/GetPhieuXuat/${item.maphieuxuat}`)
            if(res.data.data!==undefined){
              SetState({type:"AllPX",payload:[res.data.data[0]]});
              SetState({type:"QLPXSTT",payload:1})
            }
        }
        const Handler_XoaOnClick = (event)=>{
            event.preventDefault();
                axios.delete(`http://localhost:8080/SYS/DeletePhieuXuat/${item.maphieuxuat}`).then((res,err)=>{
                let temp = async () => {
                    alert("Xóa thông tin phiếu xuất thành công");
                    let res = await axios.get("http://localhost:8080/SYS/GetAllPhieuXuat")
                    if(res.data.data!==undefined){
                         SetState({type:"AllPX",payload:res.data.data})
                         SetState({type:"QLPXSTT",payload:0});
                    }
                }
                res.data.access === 1 ? temp() : alert(`Xóa thông tin phiếu xuất thất bại lỗi ${err}: ${res.data.error}`)
            })
            

        }
        return <tr className= 'table' key={item?.maphieuxuat}>
        <td scope="row">{index}</td>
        <td>{item?.maphieuxuat}</td>
        <td>{item?.tenphieuxuat}</td>
        <td>{item?.manv}</td>
        <td>{item?.machinhanh}</td>
        <td>{item?.ngayxuat}</td>
        <td>{item?.tongtien}</td>
    
        <td>
          <a href="update_nhanvien.html" style={{border: 'solid 1px black'}} onClick={(event)=>Handler_XemOnclick(event)}> Xem </a>
          <a href="update_nhanvien.html" style={{border: 'solid 1px black'}} onClick={(event)=>Handler_SuaOnclick(event)}> Sửa </a>
          <a href="xoa_nv.html" style={{border: 'solid 1px black'}} onClick={(event)=>Handler_XoaOnClick(event)}> Xóa </a> 
        </td>
      </tr>
    })
} 
export default function XH() {
    const [State, SetState] = useContext(Context);
    const [PXInfo,SetPXInfo] = useState({});
    const [PXCTInfo,SetPXCTInfo] = useState({});
    const [KhoInfo,SetKhoInfo] = useState([]);
    const [CNInfo,SetCNInfo] = useState([]);
    const [HHInfo,SetHHInfo] = useState([]);
    const [MaNVInfo,SetMaNVInfo] = useState([]);

 

    const Handler_Onchange = (event)=>{
        
        State.QLPXSTT!==2 ? SetPXInfo({...PXInfo,[event.target.name]:event.target.value}) : SetPXInfo({...PXInfo,tongtien:0,[event.target.name]:event.target.value})
    }
    const Handler_SuaOnclick = (event)=>{
        event.preventDefault();
        axios.put(`http://localhost:8080/SYS/UpdatePhieuXuat`,PXInfo).then((res,err)=>{
            let temp = async () => {
                alert("Sửa thông tin phiếu xuất thành công");
                let res = await axios.get("http://localhost:8080/SYS/GetAllPhieuXuat")
                if(res.data.data!==undefined){
                SetState({type:"AllPX",payload:res.data.data})
                SetState({type:"QLPXSTT",payload:0});
                }
            }
            res.data.access === 1 ? temp() : alert(`Sửa thông tin phiếu xuất thất bại lỗi ${err}: ${res.data.error}`)
        })
    }
    const Handler_ThemOnClick = (event)=>{
        event.preventDefault();
        let temp =   () => {
            axios.post(`http://localhost:8080/SYS/InsertPhieuXuat`,PXInfo).then((res,err)=>{
                let temp2 = async () => {
                    alert("Thêm thông tin phiếu xuất thành công");
                    let res = await axios.get("http://localhost:8080/SYS/GetAllPhieuXuat")
                if(res.data.data!==undefined){
                SetState({type:"AllPX",payload:res.data.data})
                SetState({type:"QLPXSTT",payload:0});
                }
                }
                res.data.access === 1 ? temp2() : alert(`Thêm thông tin phiếu xuất thất bại lỗi ${err}: ${res.data.error}`)
            }
            )
        }
        
        State.QLPXSTT !==2? SetState({type:"QLPXSTT",payload:2}) : temp();
    }
    // THAO TÁC VỚI PHIẾU NHẬP
       // ------------------------------------------------------------------------

        const Handler_CTOnchange = (event) => {
            State.QLPXSTT!== -3 ? SetPXCTInfo({...PXCTInfo,machitietphieuxuat:State.AllCTPX[0]?.machitietphieuxuat,maphieuxuat:State.AllCTPX[0]?.maphieuxuat,[event.target.name]:event.target.value}) : 
            SetPXCTInfo({...PXCTInfo,[event.target.name]:event.target.value})
        }
        const Handler_SuaCTOnclick = (event) => {
            event.preventDefault();
             axios.put(`http://localhost:8080/SYS/UpdateCTPhieuXuat`,PXCTInfo).then((res,err)=>{
            let temp = async () => {
                alert("Sửa thông tin phiếu xuất thành công");
                let res = await axios.get(`http://localhost:8080/SYS/GetAllCTPhieuXuat/${State.AllCTPX[0]?.maphieuxuat}`)
                if(res.data.data!==undefined){
                SetState({type:"AllCTPX",payload:res.data.data})
                SetState({type:"QLPXSTT",payload:-1});
                }
            }
            res.data.access === 1 ? temp() : alert(`Sửa thông tin phiếu xuất chi tiết thất bại lỗi ${err}: ${res.data.error}`)
        })
        }
        const Handler_ThemCTOnclick = (event)=>{
            event.preventDefault();

            let temp = () => {
                axios.post(`http://localhost:8080/SYS/InsertCTPhieuXuat`,PXCTInfo).then((res,err)=>{
                    let temp2 = async () => {
                        alert("Thêm thông tin phiếu xuất CT thành công");
                        let res = await axios.get(`http://localhost:8080/SYS/GetAllCTPhieuXuat/${State.AllCTPX[0]?.maphieuxuat}`)
                    if(res.data.data!==undefined){
                        SetState({type:"AllCTPX",payload:res.data.data})
                        SetState({type:"QLPXSTT",payload:-1});
                    }
                    }
                    res.data.access === 1 ? temp2() : alert(`Thêm thông tin phiếu xuất chi tiết thất bại lỗi ${err}: ${res.data.error}`)
                }
                )
            
            }
            State.QLPXSTT !==-3? SetState({type:"QLPXSTT",payload:-3}) : temp();
        
    }
        //THAO TÁC VỚI PHIẾU NHẬP CHI TIẾT
       //------------------------------------------------------------------
    useEffect(()=>{
        (async () => {
            let res = await axios.get("http://localhost:8080/SYS/GetAllPhieuXuat")
                if(res.data.data!==undefined){
                  SetState({type:"AllPX",payload:res.data.data});
                  SetState({type:"QLPXSTT",payload:0});
                }
        })()
        
    },[])
    useEffect(()=>{
        SetPXInfo({...State.AllPX[0]});
        (async()=>{
            let res = await axios.get("http://localhost:8080/NV/KHO/GetAllKho");
            if(res.data.data!==undefined) SetKhoInfo(res.data.data);
            let res2 = await axios.get("http://localhost:8080/NV/GetAllInfoNV");
            if(res2.data.data!==undefined) SetMaNVInfo(res2.data.data);
            let res3 = await axios.get("http://localhost:8080/NV/CA/GetAllChiNhanh");
            if(res3.data.data!==undefined) SetCNInfo(res3.data.data);
            let res4 = await axios.get("http://localhost:8080/Data/HH/GetAllHH");
            if(res3.data.data!==undefined) SetHHInfo(res4.data.data);
        })()
        if(State.QLPXSTT===2) SetPXInfo({});
    },[State.QLPXSTT])
 
    switch(State.QLPXSTT){
        case -3: return (
            <div className="container-fluid mt--10">
      
            <h2> Thêm Phiếu Xuất Hàng Chi Tiết </h2>
            <form> 
              <table className="tablesuanhanvien">
                <tbody>
                  <tr>
                    <th>Mã Phiếu Xuất</th>
                    <td>
                      <select style={{width: '75%'}} name="maphieuxuat" onChange={(event)=>Handler_CTOnchange(event)}>
                      <option/>
                      <ListPN data={State.AllPX}/>
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
                    <th>Kho</th>
                    <td>
                      <select style={{width: '75%'}} name="makho" onChange={(event)=>Handler_CTOnchange(event)}>
                      <option/>
                      <ListKho data={KhoInfo}/>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <th>Số lượng </th>
                    <td><input className="form-control" type="text" name="soluong"  id="diem" onChange={(event)=>Handler_CTOnchange(event)} onKeyPress={(event)=>Handler.Number(event)} /> </td>
                  </tr>   
                  <tr>
                    <th>Đơn giá </th>
                    <td><input className="form-control" type="text" name="dongia"  id="diem" onChange={(event)=>Handler_CTOnchange(event)} onKeyPress={(event)=>Handler.Number(event)}/> </td>
                  </tr>   
                   
                </tbody></table>
                <br></br>
              <button name="sua" value="Xacnhan" style={{width: '20%'}} onClick={(event)=>Handler_ThemCTOnclick(event)}> Thêm CTPX </button>
            </form>
          </div>)
            // SUA INFO NV
        
        case -2: return (
            <div className="container-fluid mt--10">
      
            <h2> Sửa Phiếu Xuất Hàng Chi Tiết </h2>
            <form> 
              <table className="tablesuanhanvien">
                <tbody>
                 
                  <tr>
                    <th>Mã Phiếu Xuất CT </th>
                    <td><input className="form-control" type="text" name="machitietphieuxuat" placeholder={State.AllCTPX[0].machitietphieuxuat} id="diem" onChange={(event)=>Handler_CTOnchange(event)} disabled/> </td>
                  </tr>   
                  <tr>
                    <th>Mã Phiếu Xuất </th>
                    <td><input className="form-control" type="text" name="maphieuxuat" placeholder={State.AllCTPX[0].maphieuxuat} id="diem" onChange={(event)=>Handler_CTOnchange(event)} disabled/> </td>
                  </tr>   
                  <tr>
                    <th>Mã Hàng Hóa</th>
                    <td>
                      <select style={{width: '75%'}} name="mahh" placeholder={State.AllCTPX[0].mahh} onChange={(event)=>Handler_CTOnchange(event)}>
                      <option/>
                      <ListHH data={HHInfo}/>
                      </select>
                    </td>
                  </tr>
               
                  <tr>
                    <th>Kho</th>
                    <td>
                      <select style={{width: '75%'}} name="makho" placeholder={State.AllCTPX[0].makho} onChange={(event)=>Handler_CTOnchange(event)}>
                      <option/>
                      <ListKho data={KhoInfo}/>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <th>Số lượng </th>
                    <td><input className="form-control" type="text" name="soluong" placeholder={State.AllCTPX[0].soluong} id="diem" onChange={(event)=>Handler_CTOnchange(event)} onKeyPress={(event)=>Handler.Number(event)}/> </td>
                  </tr>   
                  <tr>
                    <th>Đơn giá </th>
                    <td><input className="form-control" type="text" name="dongia" placeholder={State.AllCTPX[0].dongia} id="diem" onChange={(event)=>Handler_CTOnchange(event)} onKeyPress={(event)=>Handler.Number(event)}/> </td>
                  </tr>   
                   
                </tbody></table>
                <br></br>
              <button name="sua" value="Xacnhan" style={{width: '20%'}} onClick={(event)=>Handler_SuaCTOnclick(event)}> Cập Nhật CT PX </button>
            </form>
          </div>)
            // SUA INFO NV
        
        case -1: return (
            
            <div className="container-fluid mt--10">
            {/* table */}
            <h2> Quản lý Chi Tiết Phiếu Xuất</h2>
            <form action method="get">
              <table className="table">
                <thead>
                  <tr> 
                    <th scope="col">STT</th>
                    <th scope="col">Mã CT Phiếu Xuất</th>
                    <th scope="col">Mã HH</th>
                    <th scope="col">Số lượng</th>
                    <th scope="col">Đơn giá</th>
                    <th scope="col">Kho</th>
                    <th scope="col">Tác vụ khác</th>
                  </tr>
                </thead>
                <tbody>
                  <ListCT data={State.AllCTPX}/>
                </tbody>
              </table>
            </form>
            <h2 className="mt-3"><a href="add_nhanvien.html" style={{border: 'solid 1px black'}} onClick={(event)=>Handler_ThemCTOnclick(event)}> Thêm CT Phiếu Xuất </a> </h2>
          </div>

        )
        
        //CHI TIẾT PHIẾU NHẬP
        case 1: return(
        <div className="container-fluid mt--10">
      
        <h2> Sửa Phiếu Xuất</h2>
        <form> 
          <table className="tablesuanhanvien">
            <tbody>

              <tr>
                <th>Mã Phiếu Xuất </th>
                <td><input className="form-control" type="text" name="maphieuxuat" placeholder={State.AllPX[0].maphieuxuat} id="diem" onChange={(event)=>Handler_Onchange(event)} disabled/> </td>
              </tr>   
              <tr>
                <th>Tên Phiếu Xuất </th>
                <td><input className="form-control" type="text" name="tenphieuxuat" placeholder={State.AllPX[0].tenphieuxuat} id="diem" onChange={(event)=>Handler_Onchange(event)} onKeyPress={(event)=>Handler.Char(event)} /> </td>
              </tr>   
              <tr>
                <th>Mã NV </th>
                <td>
                <select style={{width: '75%'}} name="manv" placeholder={State.AllPX[0].manv} onChange={(event)=>Handler_Onchange(event)}>
                  <option/>
                  <ListMaNV data={MaNVInfo}/>
                  </select>
                   
                </td>
              </tr>   
              <tr>
                <th>Chi nhánh</th>
                <td>
                  <select style={{width: '75%'}} name="machinhanh" placeholder={State.AllPX[0].machinhanh} onChange={(event)=>Handler_Onchange(event)}>
                  <option/>
                  <ListCN data={CNInfo}/>
                  </select>
                </td>
              </tr>
                     
              <tr>
                <th>Ngày xuất</th>
                <td><input className="form-control" type="datetime-local" name="ngayxuat" placeholder={State.AllPX[0].ngayxuat} onChange={(event)=>Handler_Onchange(event)}/> </td>
              </tr>
              <tr>
                <th> Tổng tiền </th>
                <td><input className="form-control" type="text" name="tongtien" disabled placeholder={State.AllPX[0].tongtien} id="diem" onChange={(event)=>Handler_Onchange(event)} /></td>
              </tr>
              
            </tbody></table>
            <br></br>
          <button name="sua" value="Xacnhan" style={{width: '20%'}} onClick={(event)=>Handler_SuaOnclick(event)}> Cập Nhật Phiếu Xuất </button>
        </form>
      </div>)
        // SUA INFO NV
        case 2: return (
            <div className="container-fluid mt--10">
        {/* table */}
        <h2> Thêm Phiếu Xuất </h2>
        <form>
        <table className="tablesuanhanvien">
            <tbody>

              <tr>
                <th>Mã Phiếu Xuất </th>
                <td><input className="form-control" type="text" name="maphieuxuat" id="diem" onChange={(event)=>Handler_Onchange(event)} onKeyPress={(event)=>Handler.Char(event)}/> </td>
              </tr>   
              <tr>
                <th>Tên Phiếu Xuất </th>
                <td><input className="form-control" type="text" name="tenphieuxuat" id="diem" onChange={(event)=>Handler_Onchange(event)} onKeyPress={(event)=>Handler.Char(event)}/> </td>
              </tr>   
              <tr>
                <th>Mã NV </th>
                <td>
                <select style={{width: '75%'}} name="manv"  onChange={(event)=>Handler_Onchange(event)}>
                  <option/>
                  <ListMaNV data={MaNVInfo}/>
                  </select>
                   
                </td>
              </tr>   
              <tr>
                <th>Chi nhánh</th>
                <td>
                  <select style={{width: '75%'}} name="machinhanh"  onChange={(event)=>Handler_Onchange(event)}>
                  <option/>
                  <ListCN data={CNInfo}/>
                  </select>
                </td>
              </tr>
                     
              <tr>
                <th>Ngày Xuất</th>
                <td><input className="form-control" type="datetime-local" name="ngayxuat"   onChange={(event)=>Handler_Onchange(event)}/> </td>
              </tr>
              <tr>
                  <th>
                    <div className="mt-3"><select style={{width: '50%'}}>
                        <option value>
                          Tên hàng hóa
                        </option>
                        <option value="tensp">hàng hóa khô</option>
                        <option value="tensp">hàng hóa địa phương</option>
                      </select>
                      <label className=" ml-2 mr-2">Số lượng </label>
                      <input  classsName ="ml-2" type="number" name id />
                    </div>
                    <div className="mt-3"><select style={{width: '50%'}}>
                        <option value>
                          Tên kho
                        </option>
                        <option value="tensp">Kho văn cao</option>
                        <option value="tensp">hàng địa phương</option>
                      </select>
                    </div>
                    <div className="mt-4"> <a name id className="btn btn-primary" href="#" role="button">Lựa chọn
                        hàng hóa</a>
                    </div>
                  </th><td>
                    <div>
                      <table className="tablechitietsanpham container-fluid mt-2">
                        <thead>
                          <tr>
                            <th>STT</th>
                            <th>Tên hàng hóa</th>
                            <th>Tên kho</th>
                            <th> Số lượng</th>
                            <th> Đơn giá</th>
                            <th>Thành tiền</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>1</td>
                            <td> Cà Phê phân chồn</td>
                            <td> kho quang đại </td>
                            <td>2</td>
                            <td>4566</td>
                            <td>99999</td>
                          </tr>
                          <tr>
                            <td>2</td>
                            <td> Cà Phê đen</td>
                            <td> kho quang đại </td>
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
                <td><input className="form-control" type="text" name="tongtien"  placeholder={0} id="diem" onChange={(event)=>Handler_Onchange(event)} /></td>
              </tr>
              
            </tbody></table>
            <br></br>
          <button name="them" value="Xacnhan" style={{width: '20%'}} onClick={(event)=>Handler_ThemOnClick(event)} > Thêm Phiếu Xuất </button>
        </form>
      </div>
        )   
        //THem NV
        
        default:return (
            <div className="container-fluid mt--10">
            {/* table */}
            <h2> Quản lý Phiếu Xuất</h2>
            <form action method="get">
              <table className="table">
                <thead>
                  <tr> 
                    <th scope="col">STT</th>
                    <th scope="col">Mã PX</th>
                    <th scope="col">Tên PX</th>
                    <th scope="col">Mã NV</th>
                    <th scope="col">Mã CN</th>
                    <th scope="col">Ngày Xuất</th>
                    <th scope="col">Tổng tiền </th>
                    <th scope="col">Tác vụ khác </th>
                  </tr>
                </thead>
                <tbody>
                  <ListNV data={State.AllPX}/>
                </tbody>
              </table>
            </form>
            <h2 className="mt-3"><a href="add_nhanvien.html" style={{border: 'solid 1px black'}} onClick={(event)=>Handler_ThemOnClick(event)}> Thêm Phiếu Xuất </a> </h2>
          </div>
        )
    }
    // GET NV
}
