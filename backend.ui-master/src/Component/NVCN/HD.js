import React,{useState,useEffect,useContext} from 'react'
import axios from 'axios'
import Context from '../../Context';

const ListCTNV = (props) => {
    return props.data.map((item,index)=>{
        return <tr key={item.machitiethoadon}>
        <td scope="row">{index}</td>
        <td>{item.machitiethoadon}</td>
        <td>{item.tensp}</td>
        <td>{item.masp}</td>
        <td>{item.soluong}</td>
        <td>{item.dongia}</td>
        </tr>
    })
}

const ListNV = (props) => {
    const [State, SetState] = useContext(Context);
    return props.data.map((item,index)=>{
        const Handler_ChitietOnclick = async (event)=>{
            event.preventDefault();
            let res = await axios.get(`http://localhost:8080/SYS/GetAllCTHD/${item.mahoadon}`)
            if(res.data.data!==undefined){
              SetState({type:"AllCTHD",payload:res.data.data});
              SetState({type:"QLHDSTT",payload:-1})
            }
            ///GetAllCTHD/:mahoadon
        }

        return <tr key={item.mahoadon}>
        <td scope="row">{index}</td>
        <td>{item.mahoadon}</td>
        <td>{item.tenhoadon}</td>
        <td>{item.machinhanh}</td>
        <td>{item.makh}</td>
        <td>{item.masukien}</td>
        <td>{item.ngaytao}</td>
        <td>{item.sdt}</td>
        <td>{item.diachi}</td>
        <td>{item.ghichu}</td>
        <td>{item.trangthai}</td>
        <td>{item.tongtien}</td>
        <td>
          <a href="update_nhanvien.html" style={{border: 'solid 1px black'}} onClick={(event)=>Handler_ChitietOnclick(event)}> Chi tiết </a>
          
        </td>
      </tr>
    })
}


    
export default function HD() {
    const [State, SetState] = useContext(Context);
   
    useEffect(()=>{
        (async () => {
          let res = await axios.get("http://localhost:8080/SYS/GetAllHD")
          if(res.data.data!==undefined){
            SetState({type:"AllHD",payload:res.data.data})
            SetState({type:"QLHDSTT",payload:0});
        }
        })()
        
    },[])

    switch(State.QLHDSTT){
        case -1: return (
            <div className="container-fluid mt--10">
            {/* table */}
            <h2> Thông tin chi tiết hóa đơn {State.AllCTHD[0].mahoadon} </h2>
            <form action method="get">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">STT</th>
                    <th scope="col">Mã chi tiết hóa đơn</th>
                    <th scope="col">Tên SP</th>
                    <th scope="col">Mã SP</th>
                    <th scope="col">Số lượng</th>
                    <th scope="col">Đơn giá</th>
                  </tr>
                </thead>
                <tbody>
                  <ListCTNV data={State.AllCTHD}/>
                </tbody>
              </table>
            </form>
            
          </div>
        )
        // XEM ALL CHI TIET HOA DON
  
        
        
        default:return (
            <div className="container-fluid mt--10">
            {/* table */}
            <h2> Thông tin hóa đơn</h2>
            <form action method="get">
              <table className="tablehoadon">
                <thead>
                  <tr>
                    <th scope="col">STT</th>
                    <th scope="col">Mã HĐ</th>
                    <th scope="col">Tên HĐ</th>
                    <th scope="col">Mã Chi Nhánh</th>
                    <th scope="col">Mã KH</th>
                    <th scope="col">Mã SK</th>
                    <th scope="col">Ngày Tạo</th>
                    <th scope="col">SDT</th>
                    <th scope="col">Địa Chỉ</th>
                    <th scope="col">Ghi Chú</th>
                    <th scope="col">Trạng Thái</th>
                    <th scope="col">Tổng Tiền</th>
                    <th scope="col">Tác Vụ Khác</th>
                  </tr>
                </thead>
                <tbody>
                  <ListNV data={State.AllHD}/>
                </tbody>
              </table>
            </form>
            
          </div>
        )
    }
    // GET NV
}
