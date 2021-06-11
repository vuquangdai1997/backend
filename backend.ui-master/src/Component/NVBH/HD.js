import React,{useState,useEffect,useContext} from 'react'
import axios from 'axios'
import Context from '../../Context';
import Handler from '../../Utility/Handler'

const ListHD = (props) => {
    const [State, SetState] = useContext(Context);
    return props.data.map((item)=>{
        return <option key={item.mahoadon} value={item.mahoadon}>{item.mahoadon}</option>
    })
}
const ListKH = (props) => {
    const [State, SetState] = useContext(Context);
    return props.data.map((item)=>{
        return <option key={item.makh} value={item.makh}>{item.makh}</option>
    })
}
const ListSP = (props) => {
    const [State, SetState] = useContext(Context);
    return props.data.map((item)=>{
        return <option key={item.masp} value={item.masp}>{item.tensp}</option>
    })
}
const ListCN = (props) => {
    const [State, SetState] = useContext(Context);
    return props.data.map((item)=>{
        return <option key={item.machinhanh} value={item.machinhanh}>{item.tenchinhanh}</option>
    })
}
const ListSK = (props) => {
    const [State, SetState] = useContext(Context);
    return props.data.map((item)=>{
        return <option key={item.masukien} value={item.masukien}>{item.tensukien}</option>
    })
}


const ListCT = props => {
    const [State, SetState] = useContext(Context);

 
    return props.data.map((item,index)=>{
        const Handler_SuaOnclick = async (event)=>{
            event.preventDefault();
            let res = await axios.get(`http://localhost:8080/SYS/GetCTHD/${item.machitiethoadon}`)
            if(res.data.data!==undefined){
              SetState({type:"AllCTHD",payload:[res.data.data[0]]});
              SetState({type:"QLHDSTT",payload:-2})
              //-2 là hiển thị trang sửa pnct
            }
        }
        const Handler_XoaOnClick = (event)=>
        {
            event.preventDefault();
            axios.delete(`http://localhost:8080/SYS/DeleteCTHD/${item.mahoadon}/${item.machitiethoadon}`).then((res,err)=>{
            let temp = async () => {
                alert("Xóa thông tin CTHD thành công");
                let res = await axios.get(`http://localhost:8080/SYS/GetAllCTHD/${item.mahoadon}`)
                if(res.data.data!==undefined){
                SetState({type:"AllCTHD",payload:res.data.data})
                 SetState({type:"QLHDSTT",payload:-1});
                }
            }
            res.data.access === 1 ? temp() : alert(`Xóa thông tin CTHD thất bại lỗi ${err}: ${res.data.error}`)
        })
        }
        return <tr key={item?.machitiethoadon}>
        <td scope="row">{index}</td>
        <td>{item?.machitiethoadon}</td>
        <td>{item?.masp}</td>
        <td>{item?.tensp}</td>
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
            let res = await axios.get(`http://localhost:8080/SYS/GetAllCTHD/${item.mahoadon}`)
            if(res.data.data!==undefined){
              SetState({type:"AllCTHD",payload:res.data.data});
              SetState({type:"QLHDSTT",payload:-1})
            }
        }
        const Handler_SuaOnclick = async (event)=>{
            event.preventDefault();
            let res = await axios.get(`http://localhost:8080/SYS/GetHD/${item.mahoadon}`)
            if(res.data.data!==undefined){
              SetState({type:"AllHD",payload:[res.data.data[0]]});
              SetState({type:"QLHDSTT",payload:1})
            }
        }
        const Handler_XoaOnClick = (event)=>{
            event.preventDefault();
                axios.delete(`http://localhost:8080/SYS/DeleteHoaDon/${item.mahoadon}`).then((res,err)=>{
                let temp = async () => {
                    alert("Xóa thông tin hóa đơn thành công");
                    let res = await axios.get("http://localhost:8080/SYS/GetAllHD")
                    if(res.data.data!==undefined){
                      SetState({type:"AllHD",payload:res.data.data})
                     SetState({type:"QLHDSTT",payload:0});
                    }
                }
                res.data.access === 1 ? temp() : alert(`Xóa thông tin hóa đơn thất bại lỗi ${err}: ${res.data.error}`)
            })
            

        }

       
        return <tr key={item?.mahoadon}>
        <td scope="row">{index}</td>
        <td>{item?.mahoadon}</td>
        <td>{item?.tenhoadon}</td>
        <td>{item?.makh}</td>
        <td>{item?.machinhanh}</td>
        <td>{item?.masukien}</td>
        <td>{item?.sdt}</td> 
        <td>{item?.diachi}</td>
        <td>{item?.ghichu}</td>
        <td>{item?.ngaytao}</td>
        <td>{item?.trangthai}</td>
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
    const [HDInfo,SetHDInfo] = useState({});
    const [HDCTInfo,SetHDCTInfo] = useState({});
    const [KHInfo,SetKHInfo] = useState([]);
    const [SPInfo,SetSPInfo] = useState([]);
    const [SKInfo,SetSKInfo] = useState([]);
    const [CNInfo,SetCNInfo] = useState([]);

 

    const Handler_Onchange = (event)=>{
        
        State.QLHDSTT!==2 ? SetHDInfo({...HDInfo,[event.target.name]:event.target.value}) : SetHDInfo({...HDInfo,tongtien:0,[event.target.name]:event.target.value})
    }
    const Handler_SuaOnclick = (event)=>{
        event.preventDefault();
        axios.put(`http://localhost:8080/SYS/UpdateHoaDon`,HDInfo).then((res,err)=>{
            let temp = async () => {
                alert("Sửa thông tin hóa đơn thành công");
                let res = await axios.get("http://localhost:8080/SYS/GetAllHD")
                if(res.data.data!==undefined){
                SetState({type:"AllHD",payload:res.data.data})
                SetState({type:"QLHDSTT",payload:0});
                }
            }
            res.data.access === 1 ? temp() : alert(`Sửa thông tin hóa đơn thất bại lỗi ${err}: ${res.data.error}`)
        })
    }
    const Handler_ThemOnClick = (event)=>{
        event.preventDefault();
        let temp =   () => {
            axios.post(`http://localhost:8080/SYS/InsertHoaDon`,HDInfo).then((res,err)=>{
                let temp2 = async () => {
                    alert("Thêm thông tin hóa đơn thành công");
                    let res = await axios.get("http://localhost:8080/SYS/GetAllHD")
                if(res.data.data!==undefined){
                SetState({type:"AllHD",payload:res.data.data})
                SetState({type:"QLHDSTT",payload:0});
                }
                }
                res.data.access === 1 ? temp2() : alert(`Thêm thông tin hóa đơn thất bại lỗi ${err}: ${res.data.error}`)
            }
            )
        }
        
        State.QLHDSTT !==2? SetState({type:"QLHDSTT",payload:2}) : temp();
    }
    // THAO TÁC VỚI PHIẾU NHẬP
       // ------------------------------------------------------------------------

        const Handler_CTOnchange = (event) => {
            State.QLHDSTT!== -3 ? SetHDCTInfo({...HDCTInfo,machitiethoadon:State.AllCTHD[0]?.machitiethoadon,mahoadon:State.AllCTHD[0]?.mahoadon,[event.target.name]:event.target.value}) : 
            SetHDCTInfo({...HDCTInfo,[event.target.name]:event.target.value})
        }
        const Handler_SuaCTOnclick = (event) => {
            event.preventDefault();
             axios.put(`http://localhost:8080/SYS/UpdateCTHD`,HDCTInfo).then((res,err)=>{
            let temp = async () => {
                alert("Sửa thông tin hóa đơn chi tiết thành công");
                let res = await axios.get(`http://localhost:8080/SYS/GetAllCTHD/${State.AllCTHD[0]?.mahoadon}`)
                if(res.data.data!==undefined){
                SetState({type:"AllCTHD",payload:res.data.data})
                SetState({type:"QLHDSTT",payload:-1});
                }
            }
            res.data.access === 1 ? temp() : alert(`Sửa thông tin hóa đơn chi tiết thất bại lỗi ${err}: ${res.data.error}`)
        })
        }
        const Handler_ThemCTOnclick = (event)=>{
            event.preventDefault();

            let temp = () => {
                axios.post(`http://localhost:8080/SYS/InsertCTHD`,HDCTInfo).then((res,err)=>{
                    let temp2 = async () => {
                        alert("Thêm thông tin hóa đơn CT thành công");
                        let res = await axios.get(`http://localhost:8080/SYS/GetAllCTHD/${State.AllCTHD[0]?.mahoadon}`)
                    if(res.data.data!==undefined){
                        SetState({type:"AllCTHD",payload:res.data.data})
                        SetState({type:"QLHDSTT",payload:-1});
                    }
                    }
                    res.data.access === 1 ? temp2() : alert(`Thêm thông tin hóa đơn chi tiết thất bại lỗi ${err}: ${res.data.error}`)
                }
                )
            
            }
            State.QLHDSTT !==-3? SetState({type:"QLHDSTT",payload:-3}) : temp();
        
    }
        //THAO TÁC VỚI PHIẾU NHẬP CHI TIẾT
       //------------------------------------------------------------------
    useEffect(()=>{
        (async () => {
            let res = await axios.get("http://localhost:8080/SYS/GetAllHD")
                if(res.data.data!==undefined){
                  SetState({type:"AllHD",payload:res.data.data})
                SetState({type:"QLHDSTT",payload:0});
                }
        })()
        
    },[])
    useEffect(()=>{
        SetHDInfo({...State.AllHD[0]});
        (async()=>{
            let res = await axios.get("http://localhost:8080/KH/GetAllInfo");
            if(res.data.data!==undefined) SetKHInfo(res.data.data);
            let res2 = await axios.get("http://localhost:8080/Data/SP/GetAllSanPham");
            if(res2.data.data!==undefined) SetSPInfo(res2.data.data);
            let res3 = await axios.get("http://localhost:8080/NV/CA/GetAllChiNhanh");
            if(res3.data.data!==undefined) SetCNInfo(res3.data.data);
            let res4 = await axios.get("http://localhost:8080/NV/SK/GetAllSK");
            if(res3.data.data!==undefined) SetSKInfo(res4.data.data);
        })()
        if(State.QLHDSTT===2) SetHDInfo({});
    },[State.QLHDSTT])
//     useEffect(()=>{  
//         if (State.AllCTHD[0]?.mahoadon=== undefined) SetState({type:"AllCTHD",payload:[{mahoadon:"null"}]})         
//   })
    switch(State.QLHDSTT){
        case -3: return (
            <div className="container-fluid mt--10">
            <h2> Thêm Hóa Đơn Chi Tiết </h2>
            <form> 
              <table className="table">
                <tbody>
                
                  <tr>
                    <th>Mã Hóa Đơn</th>
                    <td>
                      <select style={{width: '75%'}} name="mahoadon" onChange={(event)=>Handler_CTOnchange(event)}>
                      <option/>
                      <ListHD data={State.AllHD}/>
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
                    <td><input className="form-control" type="text" name="soluong" onKeyPress={(event)=>Handler.Number(event)} id="diem" onChange={(event)=>Handler_CTOnchange(event)} /> </td>
                  </tr>   
                  <tr>
                    <th>Đơn giá </th>
                    <td><input className="form-control" type="text" name="dongia" onKeyPress={(event)=>Handler.Number(event)} id="diem" onChange={(event)=>Handler_CTOnchange(event)} /> </td>
                  </tr>   
                   
                </tbody></table>
              <button name="sua" value="Xacnhan" style={{width: '20%'}} onClick={(event)=>Handler_ThemCTOnclick(event)}> Thêm CTHD </button>
            </form>
          </div>)
            // SUA INFO NV
        
        case -2: return (
            <div className="container-fluid mt--10">

            <h2> Sửa Hóa Đơn Chi Tiết </h2>
            <form> 
              <table className="table">
                <tbody>
                 
                  <tr>
                    <th>Mã Hóa Đơn Chi Tiết </th>
                    <td><input className="form-control" type="text" name="machitiethoadon" placeholder={State.AllCTHD[0].machitiethoadon} id="diem" onChange={(event)=>Handler_CTOnchange(event)} disabled/> </td>
                  </tr>   
                  <tr>
                    <th>Mã Hóa Đơn </th>
                    <td><input className="form-control" type="text" name="mahoadon" placeholder={State.AllCTHD[0].mahoadon} id="diem" onChange={(event)=>Handler_CTOnchange(event)} disabled/> </td>
                  </tr>   
                  <tr>
                    <th>Mã Sản Phẩm</th>
                    <td>
                      <select style={{width: '75%'}} name="masp" placeholder={State.AllCTHD[0].masp} onChange={(event)=>Handler_CTOnchange(event)}>
                      <option/>
                      <ListSP data={SPInfo}/>
                      </select>
                    </td>
                  </tr>
               
                  <tr>
                    <th>Số lượng </th>
                    <td><input className="form-control" type="text" name="soluong" placeholder={State.AllCTHD[0].soluong} onKeyPress={(event)=>Handler.Number(event)} id="diem" onChange={(event)=>Handler_CTOnchange(event)} /> </td>
                  </tr>   
                  <tr>
                    <th>Đơn giá </th>
                    <td><input className="form-control" type="text" name="dongia" placeholder={State.AllCTHD[0].dongia} id="diem" onKeyPress={(event)=>Handler.Number(event)} onChange={(event)=>Handler_CTOnchange(event)} /> </td>
                  </tr>   
                   
                </tbody></table>
              <button name="sua" value="Xacnhan" style={{width: '20%'}} onClick={(event)=>Handler_SuaCTOnclick(event)}> Cập Nhật CT HD </button>
            </form>
          </div>)
            // SUA INFO NV
        
        case -1: return (
            
            <div className="container-fluid mt--10">
            {/* table */}

            <h2> Quản lý Chi Tiết Hóa Đơn</h2>
            <form action method="get">
              <table className="table">
                <thead>
                  <tr> 
                    <th scope="col">STT</th>
                    <th scope="col">Mã CT Hóa Đơn</th>
                    <th scope="col">Mã SP</th>
                    <th scope="col">Tên SP</th>
                    <th scope="col">Số lượng</th>
                    <th scope="col">Đơn giá</th>
                    <th scope="col">Tác vụ khác</th>
                  </tr>
                </thead>
                <tbody>
                  <ListCT data={State.AllCTHD}/>
                </tbody>
              </table>
            </form>
            <h2 className="mt-3"><a href="add_nhanvien.html" style={{border: 'solid 1px black'}} onClick={(event)=>Handler_ThemCTOnclick(event)}> Thêm CT Hóa Đơn </a> </h2>
          </div>

        )
        
        //CHI TIẾT PHIẾU NHẬP
        case 1: return(
        <div className="container-fluid mt--10">
  
        <h2> Sửa Hóa Đơn</h2>
        <form> 
          <table className="table">
            <tbody>

              <tr>
                <th>Mã Hóa Đơn </th>
                <td><input className="form-control" type="text" name="mahoadon" placeholder={State.AllHD[0].mahoadon} id="diem" onChange={(event)=>Handler_Onchange(event)} disabled/> </td>
              </tr>   
              <tr>
                <th>Tên Hóa Đơn </th>
                <td><input className="form-control" type="text" name="tenhoadon" placeholder={State.AllHD[0].tenhoadon} id="diem" onKeyPress={(event)=>Handler.Char(event)} onChange={(event)=>Handler_Onchange(event)} /> </td>
              </tr>   
              <tr>
                <th>Mã KH </th>
                <td>
                <select style={{width: '75%'}} name="makh" disabled placeholder={State.AllHD[0].makh} onChange={(event)=>Handler_Onchange(event)}>
                  <option/>
                  <ListKH data={KHInfo}/>
                  </select>
                </td>
              </tr>   
              <tr>
                <th>Chi Nhánh</th>
                <td>
                  <select style={{width: '75%'}} name="machinhanh" placeholder={State.AllHD[0].machinhanh} onChange={(event)=>Handler_Onchange(event)}>
                  <option/>
                  <ListCN data={CNInfo}/>
                  </select>
                </td>
              </tr>
              <tr>
                <th>Sự Kiện</th>
                <td>
                  <select style={{width: '75%'}} name="masukien" placeholder={State.AllHD[0].masukien} onChange={(event)=>Handler_Onchange(event)}>
                  <option/>
                  <ListSK data={SKInfo}/>
                  </select>
                </td>
              </tr>     
            <tr>
                <th>SDT </th>
                <td><input className="form-control" type="text" name="sdt" placeholder={State.AllHD[0].sdt} id="diem" onKeyPress={(event)=>Handler.Number(event)} onChange={(event)=>Handler_Onchange(event)} /> </td>
              </tr>   
            <tr>
                <th>Địa chỉ </th>
                <td><input className="form-control" onKeyPress={(event)=>Handler.Char(event)} type="text" name="diachi" placeholder={State.AllHD[0].diachi} id="diem" onChange={(event)=>Handler_Onchange(event)} /> </td>
              </tr>   
            <tr>
                <th>Ghi chú </th>
                <td><input className="form-control" type="text" onKeyPress={(event)=>Handler.Char(event)} name="ghichu" placeholder={State.AllHD[0].ghichu} id="diem" onChange={(event)=>Handler_Onchange(event)} /> </td>
              </tr>   
            
              <tr>
                <th>Ngày Tạo</th>
                <td><input className="form-control" type="datetime-local" name="ngaytao" placeholder={State.AllHD[0].ngaytao} onChange={(event)=>Handler_Onchange(event)}/> </td>
              </tr>
              <tr>
                <th>Trạng thái </th>
                <td><input className="form-control" type="text" onKeyPress={(event)=>Handler.Char(event)} name="trangthai" placeholder={State.AllHD[0].trangthai} id="diem" onChange={(event)=>Handler_Onchange(event)} /> </td>
              </tr>   
              <tr>
                <th> Tổng tiền </th>
                <td><input className="form-control" type="text" name="tongtien" disabled placeholder={State.AllHD[0].tongtien} id="diem" onChange={(event)=>Handler_Onchange(event)} /></td>
              </tr>
              
            </tbody></table>
          <button name="sua" value="Xacnhan" style={{width: '20%'}} onClick={(event)=>Handler_SuaOnclick(event)}> Cập Nhật Hóa Đơn </button>
        </form>
      </div>)
        // SUA INFO NV
        case 2: return (
          <div className="container-fluid mt--10" >
          {/* table */}
          <h2>Lập hóa đơn</h2>
          <form>
            <table className="tablelaphoadon">
              <tbody>
                <tr>
                  <th>Tên chi nhánh</th>
                  <td><select style={{width: '75%'}}>
                      <option value>
                        Tên chi nhánh
                      </option>
                      <option value>Chi nhánh 1</option>
                      <option value>chi nhánh 2</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <th>Mã hóa đơn</th>
                  <td><input className="form-control" type="text" name="hanghoa" defaultValue id="diem" /></td>
                </tr>
                <tr>
                  <th>Sự kiện giảm giá</th>
                  <td><select style={{width: '75%'}}>
                      <option value>
                        Sự kiện giảm giá
                      </option>
                      <option value>Giảm giá tháng 3</option>
                      <option value>Giảm giá tháng 4</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <th>Mã khách hàng </th>
                  <td><input className="form-control" type="text" name="hanghoa" defaultValue id="diem" /></td>
                </tr>
                <tr>
                  <th>Ngày tạo </th>
                  <td><input type="date" id="Ngaynhap" name="Ngaynhap" /></td>
                </tr>
                <tr>
                  <th>Trạng thái </th>
                  <td><input className="form-control" type="text" name="hanghoa" defaultValue id="trangthai" /></td>
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
                  <th>Tổng số lượng </th>
                  <td><input className="form-control" type="text" name="Tongtien" defaultValue id="diem" /></td>
                </tr>
                <tr>
                  <th>Tổng tiền </th>
                  <td><input className="form-control" type="text" name="Tongtien" defaultValue id="diem" /></td>
                </tr>
              </tbody></table>
              <br></br>
            <button name="them" type="Sua" value="Xacnhan" style={{width: '20%'}}> Xác nhận </button>
          </form>
        </div>
        )   
        //THem NV
        
        default:return (
            <div className="container-fluid mt--10">
            {/* table */}
            <h2> Quản Lý Hóa Đơn</h2>
            <br></br>
            <form action method="get">
              <table className="table">
                <thead>
                  <tr> 
                    <th scope="col">STT</th>
                    <th scope="col">Mã HD</th>
                    <th scope="col">Tên HD</th>
                    <th scope="col">Mã KH</th>
                    <th scope="col">Mã CN</th>
                    <th scope="col">Mã SK</th>
                    <th scope="col">SDT</th>
                    <th scope="col">Địa chỉ</th>
                    <th scope="col">Ghi chú</th>
                    <th scope="col">Ngày Tạo</th>
                    <th scope="col">Trạng thái</th>
                    <th scope="col">Tổng tiền </th>
                    <th scope="col">Tác vụ khác </th>
                  </tr>
                </thead>
                <tbody>
                  <ListNV data={State.AllHD}/>
                </tbody>
              </table>
            </form>
            <h2 className="mt-3"><a href="add_nhanvien.html" style={{border: 'solid 1px black'}} onClick={(event)=>Handler_ThemOnClick(event)}> Thêm Hóa Đơn </a> </h2>
          </div>
        )
    }
    // GET NV
}
