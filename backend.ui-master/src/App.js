import react,{useReducer} from 'react';
import Context from './Context'
import {BrowserRouter as Router,
  Switch,
  Route} from "react-router-dom";
import NVBH from './Screen/NVBH';
import NVCN from './Screen/NVCN';
import NVT from './Screen/NVT';
import NVK from './Screen/NVK';
import Login from './Screen/Login';
function App() {
  const Store = {
    IsLogIn:false,
    // LOGIN
    NVInfo:{tennv:"err"},
    AllNVInfo:[],
    QLNVSTT:0,
    //NV INFO
    QLPCTSTT:0,
    QLPNTSTT:0,
    AllPCT:[],
    AllPNT:[],
    AllSK:[],
    QLSKSTT:0,
    //PHIEU CHI/NHAN/SK INFO
    AllDT:[],
    QLDTSTT:0,
    //Doanh thu
    AllHH:[],
    QLHHSTT:0,
    AllPN:[],
    QLPNSTT:0,
    AllCTPN:[],
    AllPX:[],
    QLPXSTT:0,
    AllCTPX:[],
    //HH/
    AllSP:[],
    QLSPSTT:0,
    AllCTSP:[],
    //San pham
    AllHD:[],
    AllCTHD:[],
    QLCTHDSTT:0,
    QLHDSTT:0,

    //Hoa don    
    AllKH:[],
    QLKHSTT:0,
    // Khach Hang  
    AllCN:[],
    QLCNSTT:0,
    //Chi Nhanh
    AllKHO:[],
    QLKHOSTT:0,
    //KHo
    AllNCC:[],
    QLNCCSTT:0,
    //NCC

    AllPTH:[],
    AllCTPTH:[],
    QLCTPTHSTT:0,
    QLPTHSTT:0,
    //Phieu tra hang
    NVCNSTT:0,
    NVKSTT:0,
    NVBHSTT:0,
    NVTSTT:0,
    // STT RENDER
  }
  const DisPatch = (state,action) => {
    switch(action.type){
      case "IsLogIn": {
        return {
          ...state,IsLogIn:!state.IsLogIn
        }
      }
      // LOGIN

      case "NVCNSTT": {
        return {
          ...state,NVCNSTT:action.payload
        }
      }
      case "NVKSTT": {
        return {
          ...state,NVKSTT:action.payload
        }
      }
      case "NVBHSTT": {
        return {
          ...state,NVBHSTT:action.payload
        }
      }
      case "NVTSTT": {
        return {
          ...state,NVTSTT:action.payload
        }
      }

     // STT RENDER
      case "NVInfo": {
        return {
          ...state,NVInfo:action.payload
        }
      }
      case "AllNVInfo": {
        return {
          ...state,AllNVInfo:action.payload
        }
      }
      case "QLNVSTT": {
        return {
          ...state,QLNVSTT:action.payload
        }
      }
       //NV INFO

      case "AllDT": {
              return {
                ...state,AllDT:action.payload
              }
            }
      case "QLDTSTT": {
              return {
                ...state,QLDTSTT:action.payload
              }
            }
       //Doanh thu INFO
      case "AllKH": {
              return {
                ...state,AllKH:action.payload
              }
            }
      case "QLKHSTT": {
              return {
                ...state,QLKHSTT:action.payload
              }
            }
       //KH INFO
       case "AllPCT": {
        return {
          ...state,AllPCT:action.payload
        }
      }
       case "AllPNT": {
        return {
          ...state,AllPNT:action.payload
        }
      }
      case "QLPCTSTT": {
        return {
          ...state,QLPCTSTT:action.payload
        }
      }
      case "QLPNTSTT": {
        return {
          ...state,QLPNTSTT:action.payload
        }
      }
       //PHIEU CHI nhan tien 
       case "AllSK": {
        return {
          ...state,AllSK:action.payload
        }
      }
      case "QLSKSTT": {
        return {
          ...state,QLSKSTT:action.payload
        }
      }
      // su kien
       case "AllCN": {
        return {
          ...state,AllCN:action.payload
        }
      }
      case "QLCNSTT": {
        return {
          ...state,QLCNSTT:action.payload
        }
      }
      // Chi nhanh
       case "AllKHO": {
        return {
          ...state,AllKHO:action.payload
        }
      }
      case "QLKHOSTT": {
        return {
          ...state,QLKHOSTT:action.payload
        }
      }
      // kho
       case "AllNCC": {
        return {
          ...state,AllNCC:action.payload
        }
      }
      case "QLNCCSTT": {
        return {
          ...state,QLNCCSTT:action.payload
        }
      }
      // kho
       case "AllHD": {
        return {
          ...state,AllHD:action.payload
        }
      }
       case "AllCTHD": {
        return {
          ...state,AllCTHD:action.payload
        }
      }
      case "QLCTHDSTT": {
        return {
          ...state,QLCTHDSTT:action.payload
        }
      }
      case "QLHDSTT": {
        return {
          ...state,QLHDSTT:action.payload
        }
      }
      // Hoa don
      case "AllPTH": {
        return {
          ...state,AllPTH:action.payload
        }
      }
       case "AllCTPTH": {
        return {
          ...state,AllCTPTH:action.payload
        }
      }
      case "QLCTPTHSTT": {
        return {
          ...state,QLCTPTHSTT:action.payload
        }
      }
      case "QLPTHSTT": {
        return {
          ...state,QLPTHSTT:action.payload
        }
      }
      //Phieu tra hang
       case "QLHHSTT":{
        return {
          ...state,QLHHSTT:action.payload
        }
      }
       case "AllHH":{
        return {
          ...state,AllHH:action.payload
        }
      }
      case "QLPNSTT":{
        return {
          ...state,QLPNSTT:action.payload
        }
      }
       case "AllPN":{
        return {
          ...state,AllPN:action.payload
        }
      }
       case "AllCTPN":{
        return {
          ...state,AllCTPN:action.payload
        }
      }
       case "AllPX":{
        return {
          ...state,AllPX:action.payload
        }
      }
       case "AllCTPX":{
        return {
          ...state,AllCTPX:action.payload
        }
      }
            
      case "QLPXSTT":{
        return {
          ...state,QLPXSTT:action.payload
        }
      }
      // Hang hoa
      case "AllSP":{
        return {
          ...state,AllSP:action.payload
        }
      }
       case "AllCTSP":{
        return {
          ...state,AllCTSP:action.payload
        }
      }
            
      case "QLSPSTT":{
        return {
          ...state,QLSPSTT:action.payload
        }
      }
      //SAn pham
      default: console.log("LOI DISPATCH");
    }
  }
  const [State,SetState] = useReducer(DisPatch,Store);
  return (
    <Context.Provider value={[State,SetState]}>
     <Router>
      <Switch>
        <Route exact path="/" component={Login}/>
        <Route path="/NVBH/:manv" component={NVBH}/>
        <Route path="/NVCN/:manv" component={NVCN}/>
        <Route path="/NVT/:manv" component={NVT}/>
        <Route path="/NVK/:manv" component={NVK}/>
      </Switch>

     </Router>
    </Context.Provider>
  );
}

export default App;
