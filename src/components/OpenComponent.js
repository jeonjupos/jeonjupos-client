import React, {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import "../css/openComponent.css";
import axiosInstance from "../api/axiosClient";
import {MyContext} from "../contexts/MyContext";

const OpenComponent = () => {
    localStorage.setItem("openyn", "false");
    const navigate = useNavigate();

    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const {setStorename} = useContext(MyContext);

    const tableNavigate = () => {
        navigate("/tables");
    }

    const loginBtnHandler = async () => {
        const data = {
            id: id,
            password: password
        }
        const result = await axiosInstance.post("/user/login", data);
        if (result.status === 200) {
            if (result.data.result === true) {
                // storename
                // setStorename(result.data.data.storename);    // context
                localStorage.setItem("storename", result.data.data.storename);
                // storeid
                localStorage.setItem("storeid", result.data.data.storepkey);
                // jwt
                localStorage.setItem("jwt", result.data.data.jwt);

                localStorage.setItem("openyn", "true");
                tableNavigate();
            } else {
                alert(result.data.message)
            }
        } else {
            alert("api 통신오류[" + result.status + "]")
        }
    }

    const idHandler = (e) => {
        setId(e.target.value);
    }

    const passwordHandler = (e) => {
        setPassword(e.target.value);
    }

    return (
        <div className={"login-container"}>
            <div>
                <span>ID : </span>
                <input type={"text"} className={"id-input"} onChange={(e) => {idHandler(e)}}></input>
            </div>
            <div>
                <span>PS : </span>
                <input type={"password"} className={"password-input"} onChange={(e) => {passwordHandler(e)}}></input>
            </div>
            {/*<br/>*/}
            <button
                id={"login-btn"}
                onClick={loginBtnHandler}
            >
                오픈
            </button>
        </div>
    )
}

export default OpenComponent;