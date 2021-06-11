import React,{useState,useEffect,useContext} from 'react'
import axios from 'axios'
import Context from '../../Context';

const ListCTNV = (props) => {
    return props.data.map((item,index)=>{
        return <tr key={item.maphieutrahangchitiet}>
        <th scope="row">{index}</th>
        <td>{item.maphieutrahangchitiet}</td>
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
            let res = await axios.get(`http://localhost:8080/SYS/GetAllCTPhieuTraHang/${item.maphieutrahang}`)
            if(res.data.data!==undefined){
              SetState({type:"AllCTPTH",payload:res.data.data});
              SetState({type:"QLPTHSTT",payload:-1})
            }
            ///GetAllCTHD/:mahoadon
        }

        return <tr key={item.maphieutrahang}>
        <th scope="row">{index}</th>
        <td>{item.maphieutrahang}</td>
        <td>{item.mahoadon}</td>
        <td>{item.ngaytra}</td>
        <td>{item.tongtien}</td>
        <td>
          <a href="update_nhanvien.html" style={{border: 'solid 1px black'}} onClick={(event)=>Handler_ChitietOnclick(event)}> Chi tiết </a>
          
        </td>
      </tr>
    })
}


    
export default function PTH() {
    const [State, SetState] = useContext(Context);
   
    useEffect(()=>{
        (async () => {
          let res = await axios.get("http://localhost:8080/SYS/GetAllPhieuTraHang")
          if(res.data.data!==undefined){
            SetState({type:"AllPTH",payload:res.data.data})
            SetState({type:"QLPTHSTT",payload:0});
        }
        })()
        
    },[])

    switch(State.QLPTHSTT){
        case -1: return (
            <div className="container-fluid mt--10">
            {/* table */}
            <h2> Thông tin chi tiết phiếu trả hàng {State.AllCTPTH[0]?.maphieutrahang} </h2>
            <form action method="get">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">STT</th>
                    <th scope="col">Mã chi tiết phiếu trả hàng</th>
                    <th scope="col">Mã SP</th>
                    <th scope="col">Số lượng</th>
                    <th scope="col">Đơn giá</th>
                  </tr>
                </thead>
                <tbody>
                  <ListCTNV data={State.AllCTPTH}/>
                </tbody>
              </table>
            </form>
            
          </div>
        )
        // XEM ALL CHI TIET HOA DON
  
        
        
        default:return (
            <div className="container-fluid mt--10">
            {/* table */}
            <h2> Thông tin phiếu trả hàng</h2>
            <form action method="get">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">STT</th>
                    <th scope="col">Mã Phiếu Trả Hàng</th>
                    <th scope="col">Mã hóa đơn</th>
                    <th scope="col">Ngày trả</th>
                    <th scope="col">Tổng tiền</th>
                    <th scope="col">Tác vụ khác</th>
                  </tr>
                </thead>
                <tbody>
                  <ListNV data={State.AllPTH}/>
                </tbody>
              </table>
            </form>
            
          </div>
        )
    }
    // GET NV
}
