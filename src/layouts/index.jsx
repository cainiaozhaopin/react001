import React from "react";
import  "./index.css";
import MyNav from "./MyNav";
import Content from "./Content";
import { BrowserRouter } from "react-router-dom";


export default class Index extends React.Component {
    state = {

    }

    render = () => (
        <BrowserRouter>
        <div className="box">
            <div className="top-box">
                <h1>后端管理系统</h1>
            </div>
            <div className="content-box">
                <div className="left-box">
                    <MyNav/>
                </div>
                <div className="right-box">
                    <Content/>
                </div>
            </div>
        </div>
        </BrowserRouter>
    )
    
}