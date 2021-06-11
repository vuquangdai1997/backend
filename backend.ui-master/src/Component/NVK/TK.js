import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import Context from '../../Context';
import Handler from '../../Utility/Handler'

const ListKho = (props) => {
    const [State, SetState] = useContext(Context);
    return props.data.map((item) => {
        return <option key={item.makho} value={item.makho}>{item.tenkho}</option>
    })
}
const ListNV = (props) => {
    const [State, SetState] = useContext(Context);
    return props.data.map((item, index) => {

        const Handler_SuaOnclick = async (event) => {
            event.preventDefault();
            let res = await axios.get(`http://localhost:8080/Data/HH/GetHH/${item.mahh}`)
            if (res.data.data !== undefined) {
                SetState({ type: "AllHH", payload: [res.data.data[0]] });
                SetState({ type: "QLHHSTT", payload: -1 })
            }
        }
        const Handler_XoaOnClick = (event) => {
            event.preventDefault();
            axios.delete(`http://localhost:8080/Data/HH/DeleteHH/${item.mahh}`).then((res, err) => {
                let temp = async () => {
                    alert("Xóa thông tin hàng hóa thành công");
                    let res = await axios.get("http://localhost:8080/Data/HH/GetAllHH")
                    if (res.data.data !== undefined) {
                        SetState({ type: "AllHH", payload: res.data.data })
                        SetState({ type: "QLHHSTT", payload: 0 });
                    }
                }
                res.data.access === 1 ? temp() : alert(`Xóa thông tin hàng hóa thất bại lỗi ${err}: ${res.data.error}`)
            })
        }
        return <tr key={item?.mahh}>
            <td scope="row">{index}</td>
            <td>{item?.mahh}</td>
            <td>{item?.tenhh}</td>
            <td>{item?.maloaihh}</td>
            <td>{item?.makho}</td>
            <td>{item?.ngaynhap}</td>
            <td>{item?.gianhap}</td>
            <td>{item?.donvitinh}</td>
            <td>{item?.soluong}</td>
        </tr>
    })
}
export default function HH() {
    const [State, SetState] = useContext(Context);
    const [HHInfo, SetHHInfo] = useState({});
    const [KhoInfo, SetKhoInfo] = useState([]);

    const Handler_Onchange = (event) => {

        State.QLHHSTT !== 2 ? SetHHInfo({ ...HHInfo, [event.target.name]: event.target.value }) : SetHHInfo({ ...HHInfo, soluong: 0, [event.target.name]: event.target.value })
    }
    useEffect(() => {
        (async () => {
            let res = await axios.get("http://localhost:8080/Data/HH/GetAllHH")
            if (res.data.data !== undefined) {
                SetState({ type: "AllHH", payload: res.data.data })
                SetState({ type: "QLHHSTT", payload: -1 });
            }
        })()

    }, [])
    useEffect(() => {
        SetHHInfo({ ...State.AllHH[0] });
        (async () => {
            let res = await axios.get("http://localhost:8080/NV/KHO/GetAllKho");
            if (res.data.data !== undefined) SetKhoInfo(res.data.data);
        })()
        if (State.QLHHSTT === 2) SetHHInfo({});
    }, [State.QLHHSTT])
    return (
        <div className="container-fluid mt--10">
            {/* table */}
            <h1> Thống kê lượng hàng tồn kho</h1>
            {/* thống kê hàng hóa đã nhập */}
            <div>
                <h2> Quản Lý Hàng Hóa Đã Nhập</h2>
                <div className="row">
                    <div className="column">
                        <label >Từ ngày</label>
                        <input className="form-control" style={{ maxWidth: '50%' }} type="datetime-local" name="ngaynhap"></input>
                    </div>
                    <div className="column">
                        <label>Đến ngày</label>
                        <input className="form-control" style={{ maxWidth: '50%' }} type="datetime-local" name="ngaynhap"></input>
                    </div>
                </div>
                <div >
                    <a name="" id="" class="btn btn-primary" href="#" role="button">Thống kê</a>
                </div>
                <br></br>
                <h2> Bảng Thống Kê</h2>
                <form action method="get">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">STT</th>
                                <th scope="col">Mã HH</th>
                                <th scope="col">Tên HH</th>
                                <th scope="col">Mã Loại HH</th>
                                <th scope="col">Mã Kho</th>
                                <th scope="col">Ngày Nhập</th>
                                <th scope="col">Giá Nhập </th>
                                <th scope="col">ĐVT </th>
                                <th scope="col">Số Lượng </th>
                                <th scope="col">  Tổng Tiền</th>
                            </tr>
                        </thead>
                        <tbody>
                            <ListNV data={State.AllHH} />
                        </tbody>
                    </table>
                </form>
            </div>
            <br></br>
            {/* Thống kê hàng hóa đã xuất */}
            <div>

                <h2> Quản Lý Hàng Hóa Đã Xuất</h2>
                <div className="row">
                    <div className="column">
                        <label >Từ ngày</label>
                        <input className="form-control" style={{ maxWidth: '50%' }} type="datetime-local" name="ngaynhap"></input>
                    </div>
                    <div className="column">
                        <label>Đến ngày</label>
                        <input className="form-control" style={{ maxWidth: '50%' }} type="datetime-local" name="ngaynhap"></input>
                    </div>
                </div>
                <div >
                    <a name="" id="" class="btn btn-primary" href="#" role="button">Thống kê</a>
                </div>
                <br></br>
                <h2> Bảng Thống Kê</h2>
                <form action method="get">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">STT</th>
                                <th scope="col">Mã HH</th>
                                <th scope="col">Tên HH</th>
                                <th scope="col">Mã Loại HH</th>
                                <th scope="col">Mã Kho</th>
                                <th scope="col">Ngày Xuất</th>
                                <th scope="col">Đơn giá </th>
                                <th scope="col">Đơn vị tính </th>
                                <th scope="col">Số lượng </th>
                                <th scope="col">  Tổng tiền</th>
                            </tr>
                        </thead>
                        <tbody>
                            <ListNV data={State.AllHH} />
                        </tbody>
                    </table>
                </form>
            </div>
            {/* //   thống kê tình trạng hàng hóa  */}
            <h2> Bảng Thống Kê Tình Trạng Hàng Hóa</h2>
            <form action method="get">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">STT</th>
                            <th scope="col">Tên HH</th>
                            <th scope="col">Tên Kho</th>
                            <th scope="col">Đơn vị tính </th>
                            <th scope="col">Số lượng </th>
                            <th scope="col"> Tình Trạng</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td> 1</td>
                            <td> Hàng khô</td>
                            <td> Kho Văn cao</td>
                            <td> Kg</td>
                            <td> 7777</td>
                            <td> Còn hàng</td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    )


}
  // GET NV
