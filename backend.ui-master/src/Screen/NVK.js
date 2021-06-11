import React, { useState, useContext,useEffect } from 'react';
import Context from '../Context';
import {useHistory,useParams} from 'react-router-dom';
import axios from 'axios';
import Data from '../Component/NVK/Data';
export default function NVK() {
    const history = useHistory();
    const [State, SetState] = useContext(Context);
    const {manv} = useParams();

    const Handler_Search = async (event)=>{
      let temp=event.target.value;
      if(State.NVKSTT===0&&State.QLHHSTT===0){
        let res = await axios.get(`http://localhost:8080/Data/HH/SearchHH/${temp}`);
        SetState({type:"AllHH",payload:res.data.data});
      }
      else if (State.NVKSTT===1&&State.QLPNSTT===0){
        let res = await axios.get(`http://localhost:8080/SYS/SearchPhieuNhap/${temp}`);
        SetState({type:"AllPN",payload:res.data.data});
      }
      else if (State.NVKSTT===1&&State.QLPNSTT===-1){
        let res = await axios.get(`http://localhost:8080/SYS/SearchCTPhieuNhap/${temp}`);
        SetState({type:"AllCTPN",payload:res.data.data});
      }
      else if (State.NVKSTT===2&&State.QLPXSTT===0){
        let res = await axios.get(`http://localhost:8080/SYS/SearchPhieuXuat/${temp}`);
        SetState({type:"AllPX",payload:res.data.data});
      }
      else if (State.NVKSTT===2&&State.QLPXSTT===-1){
        let res = await axios.get(`http://localhost:8080/SYS/SearchCTPhieuXuat/${temp}`);
        SetState({type:"AllCTPX",payload:res.data.data});
      }
    }
    const Handler_LogOut = async (event)=>{
      event.preventDefault();
      let res = await axios.get("http://localhost:8080/Logout")
      if (res.data.access ===1) {
        SetState({type:"IsLogIn"});
        history.push("/");        
      }
    }
    const Handler_OnClick = (event,data) => {
        event.preventDefault();
        SetState({type:"NVKSTT",payload:data});
    }

    useEffect(()=>{
       (async () => {
        let res = await axios.get(`http://localhost:8080/NV/GetInfoNV/${manv}`)
        SetState({type:"NVInfo",payload:res.data.data[0]})
    })()
    },[])
    
    return (
        <div>
        <nav className="sidenav navbar navbar-vertical  fixed-left  navbar-expand-xs navbar-light bg-white" id="sidenav-main">
          <div className="scrollbar-inner">
            {/* Brand */}
            <div className="sidenav-header  align-items-center">
              <a className="navbar-brand" href='a' onClick={(event)=>Handler_OnClick(event,0)}>
                <img src="../assets/img/brand/blue.png" className="navbar-brand-img" alt="..." />
              </a>
            </div>
            <div className="navbar-inner mt-5">
              {/* Collapse */}
              <div className="collapse navbar-collapse" id="sidenav-collapse-main">
                {/* Nav items */}
                <ul className="navbar-nav">
                  <li className="nav-item ">
                    <div className="ml-3">
                      <h3> Quản lý hệ thống</h3>
                    </div>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link active" href="./QLchinhanh.html" onClick={(event)=>Handler_OnClick(event,0)}>
                      <i className="ni ni-tv-2 text-primary" />
                      <span className="nav-link-text">Trang chủ</span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="./nhanvien/nhanvien.html" onClick={(event)=>Handler_OnClick(event,1)}>
                      <i className="ni ni-single-02 text-yellow" />
                      <span className="nav-link-text">Nhập Hàng</span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="./QL_chitieu/qlthuchi.html" onClick={(event)=>Handler_OnClick(event,2)}>
                      <i className="ni ni-single-02 text-yellow" />
                      <span className="nav-link-text">Xuất Hàng</span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#" onClick={(event)=>Handler_OnClick(event,3)}>
                      <i className="ni ni-single-02 text-yellow" />
                      <span className="nav-link-text">Tồn kho</span>
                    </a>
                  </li>
                  
                </ul>
             
                <hr className="my-3" />
              
              </div></div></div></nav>
        {/* Main content */}
        <div className="main-content" id="panel">
          {/* Topnav */}
          <nav className="navbar navbar-top navbar-expand navbar-dark bg-primary border-bottom">
            <div className="container-fluid">
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                {/* Search form */}
                <form className="navbar-search navbar-search-light form-inline mr-sm-3" id="navbar-search-main">
                  <div className="form-group mb-0">
                    <div className="input-group input-group-alternative input-group-merge">
                      <div className="input-group-prepend">
                        <span className="input-group-text"><i className="fas fa-search" /></span>
                      </div>
                      <input className="form-control" placeholder="Search" type="text" onChange={(event)=>Handler_Search(event)}/>
                    </div>
                  </div>
                  <button type="button" className="close" data-action="search-close" data-target="#navbar-search-main" aria-label="Close">
                    <span aria-hidden="true" />
                  </button>
                </form>
                {/* Navbar links */}
                <ul className="navbar-nav align-items-center  ml-md-auto ">
                  <li className="nav-item d-xl-none">
                    {/* Sidenav toggler */}
                    <div className="pr-3 sidenav-toggler sidenav-toggler-dark" data-action="sidenav-pin" data-target="#sidenav-main">
                      <div className="sidenav-toggler-inner">
                        <i className="sidenav-toggler-line" />
                        <i className="sidenav-toggler-line" />
                        <i className="sidenav-toggler-line" />
                      </div>
                    </div>
                  </li>
                  <li className="nav-item d-sm-none">
                    <a className="nav-link" href="#" data-action="search-show" data-target="#navbar-search-main">
                      <i className="ni ni-zoom-split-in" />
                    </a>
                  </li>
                  <li className="nav-item dropdown">
                    <a className="nav-link" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <i className="ni ni-bell-55" />
                    </a>
                    <div className="dropdown-menu dropdown-menu-xl  dropdown-menu-right  py-0 overflow-hidden">
                      {/* Dropdown header */}
                      <div className="px-3 py-3">
                        <h6 className="text-sm text-muted m-0">Có <strong className="text-primary">Số thông
                            báo</strong> hóa đơn.
                        </h6>
                      </div>
                      {/* List group */}
                      <div className="list-group list-group-flush">
                        <a href="#!" className="list-group-item list-group-item-action">
                          <div className="row align-items-center">
                            <div className="col-auto">
                              {/* Hiển thị thông tin của list hóa đơn  */}
                            </div>
                            <div className="col ml--2">
                              <div className="d-flex justify-content-between align-items-center">
                                <div>
                                  <h4 className="mb-0 text-sm">Mã hóa đơn</h4>
                                </div>
                              </div>
                              <p className="text-sm mb-0"> Tên hóa đơn - số lượng sản phẩm - đơn giá- Tổng
                                tiền</p>
                            </div>
                          </div>
                        </a>
                        <a href="#!" className="list-group-item list-group-item-action">
                          <div className="row align-items-center">
                            <div className="col-auto">
                            </div>
                            <div className="col ml--2">
                              <div className="d-flex justify-content-between align-items-center">
                                <div>
                                  <h4 className="mb-0 text-sm">Mã hóa đơn</h4>
                                </div>
                              </div>
                              <p className="text-sm mb-0"> Tên hóa đơn - số lượng sản phẩm - đơn giá- Tổng
                                tiền</p>
                            </div>
                          </div>
                        </a>
                        <a href="#!" className="list-group-item list-group-item-action">
                          <div className="row align-items-center">
                            <div className="col-auto">
                            </div>
                            <div className="col ml--2">
                              <div className="d-flex justify-content-between align-items-center">
                                <div>
                                  <h4 className="mb-0 text-sm">Mã hóa đơn</h4>
                                </div>
                              </div>
                              <p className="text-sm mb-0"> Tên hóa đơn - số lượng sản phẩm - đơn giá- Tổng
                                tiền</p>
                            </div>
                          </div>
                        </a>
                        <a href="#!" className="list-group-item list-group-item-action">
                          <div className="row align-items-center">
                            <div className="col-auto">
                            </div>
                            <div className="col ml--2">
                              <div className="d-flex justify-content-between align-items-center">
                                <div>
                                  <h4 className="mb-0 text-sm">Mã hóa đơn</h4>
                                </div>
                              </div>
                              <p className="text-sm mb-0"> Tên hóa đơn - số lượng sản phẩm - đơn giá- Tổng
                                tiền</p>
                            </div>
                          </div>
                        </a>
                        <a href="#!" className="list-group-item list-group-item-action">
                          <div className="row align-items-center">
                            <div className="col-auto">
                            </div>
                            <div className="col ml--2">
                              <div className="d-flex justify-content-between align-items-center">
                                <div>
                                  <h4 className="mb-0 text-sm">Mã hóa đơn</h4>
                                </div>
                              </div>
                              <p className="text-sm mb-0"> Tên hóa đơn - số lượng sản phẩm - đơn giá- Tổng
                                tiền</p>
                            </div>
                          </div>
                        </a>
                      </div>
                      {/* View all */}
                      <a href="#!" className="dropdown-item text-center text-primary font-weight-bold py-3">Tất cả
                        các thông báo</a>
                    </div>
                  </li>
                </ul>
                <ul className="navbar-nav align-items-center  ml-auto ml-md-0 ">
                  <li className="nav-item dropdown">
                    <a className="nav-link pr-0" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <div className="media align-items-center">
                        <span className="avatar avatar-sm rounded-circle">
                          {/* <img alt="Image placeholder" src="../assets/img/theme/team-4.jpg"> */}
                        </span>
                        <div className="media-body  ml-2  d-none d-lg-block">
                          <span className="mb-0 text-sm  font-weight-bold">{State.NVInfo.tennv}</span>
                        </div>
                      </div>
                    </a>
                    <div className="dropdown-menu  dropdown-menu-right ">
                      <div className="dropdown-header noti-title">
                        <h6 className="text-overflow m-0">Welcome!</h6>
                      </div>
                      <a href="#!" className="dropdown-item">
                        <i className="ni ni-single-02" />
                        <span>Thông tin nhân viên</span>
                      </a>
                      <a href="#!" className="dropdown-item">
                        <i className="ni ni-settings-gear-65" />
                        <span>Cài đặt</span>
                      </a>
                     
                      <a href="#!" className="dropdown-item">
                        <i className="ni ni-support-16" />
                        <span>Quản lý tài khoản</span>
                      </a>
                      <div className="dropdown-divider" />
                      <a href="#!" className="dropdown-item" onClick={(event)=>Handler_LogOut(event)}>
                        <i className="ni ni-user-run" />
                        <span>Đăng xuất</span>
                      </a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </nav>

          <div className="container-fluid mt--10">
              <Data/>
          </div>
        </div>
      </div>
    )
}
