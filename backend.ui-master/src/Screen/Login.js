import React, { useState, useContext } from 'react';
import Context from '../Context';
import axios from 'axios';
import {useHistory} from 'react-router-dom'
export default function Login() {
    const [Log, SetLog] = useState({});
    const [State, SetState] = useContext(Context);
    const history = useHistory();
    const HandlerOnChange_LogIn = (event) => {
        SetLog({...Log,[event.target.name]:event.target.value});
    }
    const HandlerOnClick_LogIn = (event) => {
        event.preventDefault();
        axios.post("http://localhost:8080/Lognv",Log).then(async res=>{
            if(res.data.auth===1) {
                SetState({type:"IsLogIn"})
                if(res.data.access===1) {
                    history.replace(`/NVBH/${Log.manv}`);
                }
                else if(res.data.access===2){
                    history.replace(`/NVK/${Log.manv}`)
                }
                else if(res.data.access===3) {
                    history.replace(`/NVCN/${Log.manv}`)
                }
                else if (res.data.access===4) {
                    history.replace(`/NVT/${Log.manv}`)
                };
               
            }
            else alert("TAI KHOAN KHONG TON TAI");
        }).catch(err=>console.log(`loi dang nhap ${err}`))

    }


    if (State.IsLogIn === false) return (
        <div className="bg-default">
            {/* Main content */}
            <div className="main-content">
                {/* Header */}
                <div className="header bg-gradient-primary py-3 py-lg-4 pt-lg-5">
                    <div className="container">
                        <div className="header-body text-center mb-7">
                            <div className="row justify-content-center">
                                <div className="col-xl-5 col-lg-6 col-md-8 px-5">
                                    <h2 className="text-white">Welcome!</h2>
                                    <p className="text-lead text-white"> Quản Lý Cafe DDH</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="separator separator-bottom separator-skew zindex-100">
                        <svg x={0} y={0} viewBox="0 0 2560 100" preserveAspectRatio="none" version="1.1" xmlns="http://www.w3.org/2000/svg">
                            <polygon className="fill-default" points="2560 0 2560 100 0 100" />
                        </svg>
                    </div>
                </div>
                {/* Page content */}
                <div className="container mt--5 pb-6 ">
                    <div className="row justify-content-center">
                        <div className="col-lg-5 col-md-7">
                            <div className="card bg-secondary border-0 mb-0">
                                <div className="card-body px-lg-5 py-lg-5">
                                    <div className="text-center text-muted mb-4">
                                        <small>Đăng nhập</small>
                                    </div>
                                    <form role="form">
                                        <div className="form-group mb-3">
                                            <div className="input-group input-group-merge input-group-alternative">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text"><i className="ni ni-email-83" /></span>
                                                </div>
                                                <input className="form-control" name="manv" placeholder="Tài Khoản" type onChange={(event)=>HandlerOnChange_LogIn(event)} />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="input-group input-group-merge input-group-alternative">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text"><i className="ni ni-lock-circle-open" /></span>
                                                </div>
                                                <input className="form-control" placeholder="Password" type="password" name="matkhau"onChange={(event)=>HandlerOnChange_LogIn(event)}/>
                                            </div>
                                        </div>
                                        <div className="custom-control custom-control-alternative custom-checkbox">
                                            <input className="custom-control-input" id=" customCheckLogin" type="checkbox" />
                                            <label className="custom-control-label" htmlFor=" customCheckLogin">
                                                <span className="text-muted">Ghi nhớ</span>
                                            </label>
                                        </div>
                                        <div className="text-center ">
                                            {/* <button type="button" class="btn btn-primary my-4 " >Sign in</button> */}
                                            <button href="./dashboard.html" className="btn  btn-primary my-4" onClick={(event)=>HandlerOnClick_LogIn(event)}>Đăng nhập</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-6">
                                    <a href="#" className="text-light"><small>Forgot password?</small></a>
                                </div>
                                <div className="col-6 text-right">
                                    <a href="#" className="text-light"><small>Create new account</small></a>
                                    {/* TODO: CAN XU LY */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Footer */}
            <div className="py-6" id="footer-main">
                <div className="container">
                    <div className="row align-items-center justify-content-xl-end">
                        <div className="col-xl-6">
                            <ul className="nav nav-footer justify-content-center justify-content-xl-end">
                                <li className="nav-item">
                                    <address className="nav-link" target="_blank">Trang chủ</address>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" target="_blank">Quảng cáo</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" target="_blank">Liên hệ</a>
                                    {/* TODO: CẦN THAY ĐỔI LINK */}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
          
        </div>
    )
    else return <div/>
}
