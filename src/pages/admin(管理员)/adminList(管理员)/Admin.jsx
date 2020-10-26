import React, { useState } from "react";
import Tan from './add/B'
import Xiu from './alter/D'
import Remove from './remove/E'
import { Table, Button, Space, Switch } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import styleObj from "./Admin.module.css";
import axios from "axios"

class Admin extends React.Component {

    constructor(){
        super();
        this.selectedRowKeys= [];
        this.state = {
            loading: false,
            bottom: 'bottomCenter',
            columns: [
                {
                    title: '序号',
                    dataIndex: 'key',
                    key:'key'
                },
                {
                    title: '登录名',
                    dataIndex: 'name',
                    key:'name'
                },
                {
                    title: '手机',
                    dataIndex: 'num',
                    key:'num'
                },
                {
                    title: '邮箱',
                    dataIndex: 'email',
                    key:'email'
                },
                {
                    title: '角色',
                    dataIndex: 'job',
                    key:'job'
                },
                {
                    title: '加入时间',
                    dataIndex: 'time',
                    key:'time'
                },
                {
                    title: '状态',
                    dataIndex: '',
                    render:()=>(
                        <>
                            <Switch checkedChildren="已启用" unCheckedChildren="已停用" defaultChecked />
                        </>
                    )
                },
                {
                    title: '操作',
                    dataIndex: '',
                    render: (text, item) => (
                        <Space size="" align="center">
                            <Xiu id={item.id}  data={item}/>
                            <Remove remove={()=>this.remove(item.id, item.key)}/>
                        </Space>
                    ),
                }
            ],
            data: []
        }
        this.rowSelection={
            onChange:this.onSelectChange
        }
    }

    componentDidMount(){
        axios({
            // url:"http://10.35.167.38:8080/admin",
            url:"http://localhost:3000/admin",
            method:"get"
        }).then((res)=>{
            // console.log("res.data",res.data.data);
            console.log("res.data",res.data);
            this.setState({
                // data:res.data.data
                data:res.data
            })
        })
    }

    start = (keys) => {
        this.setState({ loading: true });
        if (this.state.data.length <= 0) {
            return;
        }
        // ajax request after empty completing
        setTimeout(() => {
            if (this.state.data.length <= 0) {
                return;
            }
            // 批量删除功能
            // axios({
            //     url: "",
            //     method: "get",
            //     params:keys
            // }).then((res) => {
            //     if (res.data == "1") {
            //         let arr = this.state.data;
            //         arr = arr.filter(item => {
            //             return this.selectedRowKeys.indexOf(item.key) == -1;
            //         });
            //     }else{
            //         alert("批量删除失败")
            //     }
            // }).catch(() => {
            //     console.log("服务器请求失败")
            // })
            let arr = this.state.data;
            arr = arr.filter(item => {
                return this.selectedRowKeys.indexOf(item.key) == -1;
            });
            console.log("arr", arr);
            this.selectedRowKeys = [];
            this.setState({
                loading: false,
                data: arr
            },() => {
                console.log("this.state.data", this.state.data)
            });
        }, 1000);
    };

    onSelectChange = (selectedRowKeys, selectedRows) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);

        this.selectedRowKeys = selectedRowKeys;

        console.log('selectedRows changed: ', selectedRows);
        this.setState({ selectedRowKeys });
        
    };

    fn(){
        this.state.data.forEach((item,i)=>{
            item.key=i+1;
        })
    };

    remove(id,index) {
        console.log("id",id)
        console.log("index",index)
        // axios({
        //     url:"http://10.35.167.38:8080/admin2",
        //     method:"get",
        //     params:{"id":id}
        // }).then((res) => {
        //     if(res.data.statusCode == 1){
        //         this.state.data.splice(index-1,1);
        //         this.setState({
        //             data:[...this.state.data]
        //         })
        //         // window.location.reload();
        //     }else{
        //         console.log("删除失败")
        //     }
        // }).catch(()=>{
        //     console.log("服务器连接失败")
        // })

        // console.log(key);
        this.state.data.splice(index-1,1);
        this.setState({
            data:[...this.state.data]
        })
    };

    setVisible(){
        useState(true)
    }

    render(item) {
        console.log("render:this.state.data", this.state.data);
        const { loading} = this.state;
        // const rowSelection = {
        //     ...this.rowSelection,
        //     selectedRowKeys: this.selectedRowKeys,
        // };
        this.fn();
        const hasSelected = this.selectedRowKeys.length > 0;
        return (
            <div>
                <div className={styleObj.box}>
                    <Button type="primary" onClick={(record) =>this.start(this.selectedRowKeys)} disabled={!hasSelected} loading={loading} icon={<CloseOutlined />} className={styleObj.button}>
                        批量删除
                    </Button>
                    <Tan className={styleObj.tan} />
                </div>
                <Table bordered={true} rowSelection={this.rowSelection} columns={this.state.columns} dataSource={this.state.data} className={styleObj.table} pagination={{ position: [this.state.bottom], pageSize: 12 }} />
            </div>
        );
    }
}

export default Admin;