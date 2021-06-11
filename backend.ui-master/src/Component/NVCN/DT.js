import React,{useState,useEffect,useContext,useRef} from 'react'
import axios from 'axios'
import Context from '../../Context';





    
export default function DT() {
    const [State, SetState] = useContext(Context);
    const [Day,setDay] = useState('');
    const [Year,setYear] = useState('');
    const [Month,setMonth] = useState('');
    
    const HandlerOnChange =(event)=>{
        let temp = new Date(event.target.value);
        
        setYear(temp.getFullYear());
        setDay(temp.getDate())
        setMonth(temp.getMonth()+1);
        
    }
    const HandlerNgay = (event)=>{
        event.preventDefault();
        (async () => {
            let res = await axios.get(`http://localhost:8080/NV/GetDTDay/${State.NVInfo.machinhanh}/${Day}/${Month}/${Year}`)
            if(res.data.data!==undefined){
              SetState({type:"AllDT",payload:res.data.data});        
              SetState({type:"QLDTSTT",payload:0});
          }
          })()
    }
    const HandlerThang = (event)=>{
        event.preventDefault();
        (async () => {
            let res = await axios.get(`http://localhost:8080/NV/GetDTMonth/${State.NVInfo.machinhanh}/${Month}/${Year}`)
            if(res.data.data!==undefined){
              SetState({type:"AllDT",payload:res.data.data});
              SetState({type:"QLDTSTT",payload:0});
          }
          })()
    }
    const HandlerNam = (event)=>{
        event.preventDefault();
        (async () => {
            let res = await axios.get(`http://localhost:8080/NV/GetDTYear/${State.NVInfo.machinhanh}/${Year}`)
            if(res.data.data!==undefined){
              SetState({type:"AllDT",payload:res.data.data});
              SetState({type:"QLDTSTT",payload:0});
          }
          })()
    }
    useEffect(()=>{
        (async () => {
          let res = await axios.get(`http://localhost:8080/NV/CA/GetChiNhanh/${State.NVInfo.machinhanh}`)
          if(res.data.data!==undefined){
            SetState({type:"AllCN",payload:res.data.data})
            SetState({type:"AllDT",payload:[]})
            SetState({type:"QLDTSTT",payload:0});
        }
        })()
        
    },[])

   return (
    <div className="container-fluid mt--10">
    {/* table */}
    <br />
    <h2> Doanh thu chi tiết</h2>
    <div>
      <h3> Tên chi nhánh: {State.AllCN[0]?.tenchinhanh}</h3>
      <div>
        <h3> Địa chỉ : {State.AllCN[0]?.diachi}</h3>
      </div>
      <div>
        <div className="doanhthutheongay" style={{backgroundColor: 'rgb(231, 247, 241)'}}>
          <div>
            <h4> <input type="date" id="Ngaynhap" name="Ngaybatdau" onChange={(event)=>HandlerOnChange(event)} /> </h4>
            <button onClick={(event)=>HandlerNgay(event)} style={{border: 'solid 1px black',marginRight:'10px'}}>Ngày</button>
            <button onClick={(event)=>HandlerThang(event)} style={{border: 'solid 1px black',marginRight:'10px'}}>Tháng</button>
            <button onClick={(event)=>HandlerNam(event)} style={{border: 'solid 1px black',marginRight:'10px'}}>Năm</button>
            <div>
              <h2> Doanh Thu Chi Tiết</h2>
              <p> Tổng số hóa đơn: {State.AllDT[0]?.sohoadon == "" ? "Khong co hoa don" :State.AllDT[0]?.sohoadon }</p>
              <p> Tổng số tiền: {State.AllDT[0]?.tongtien == null ? "0 VND": `${State.AllDT[0]?.tongtien} VND`}</p>
            </div>
          </div>
        </div>
      </div>
      <div>
        
      </div>
    </div>
  </div>
        )
    // GET NV
}
