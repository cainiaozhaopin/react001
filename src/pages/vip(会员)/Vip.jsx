import React, { useState } from "react";
import Tan from './add/B'
import Xiu from './alter/D'
import Remove from './remove/E'
import { Table, Button, Space, Switch } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import styleObj from "./Vip.module.css";
import axios from "axios"

//哪块不对打（console.log(要查看的地方)）哪里
//组件：https://ant.design/components/cascader-cn/

class Vip extends React.Component {
    constructor() {
        super();
        this.selectedRowKeys = [];
        this.ids=[];
        this.state = {
            loading: false,
            bottom: 'bottomCenter',
            columns: [
                {
                    title: '序号',
                    dataIndex: 'key',
                },
                {
                    title: '用户名',
                    dataIndex: 'name',
                },
                {
                    title: '性别',
                    dataIndex: 'sex',
                },
                {
                    title: '手机',
                    dataIndex: 'num',
                },
                {
                    title: '地址',
                    dataIndex: 'address',
                },
                {
                    title: '状态',
                    dataIndex: 'state',
                    render: () => (
                        <>
                            <Switch checkedChildren="已启用" unCheckedChildren="已停用" defaultChecked />
                        </>
                    )
                },
                {
                    title: '操作',
                    dataIndex: 'action',
                    render: (text, item) => (
                        <Space size="" align="center">
                            <Xiu id={item.key} data={item} />
                            <Remove remove={() => this.remove(item.id, item.key)} />
                        </Space>
                    ),
                }
            ],
            data: []
        }
        this.rowSelection = {
            onChange: this.onSelectChange
        }
    }

    componentDidMount() {
        axios({
            url: "http://10.35.167.31:8080/vip",
            // url:"http://localhost:3000/vip",
            method: "get"
        }).then((res) => {
            // console.log("res.data.data", res.data.data);
            //可以用console.log()在控制台查看res，然后再一级一级往下打点（例如：res.data）查看获取到的数据，直到打印出来是数组，
            //如果想要某单个数组里的对象，可以在后面加上[下标]（例如：res.data.data[0],表示要获取到的数组里第一个（下标为0）数据
            // console.log("res.data",res.data); //本地数据库
            this.setState({  //类似于监听，一边改变另一边跟着变
                data: res.data.data,
                // data:res.data  //本地数据库
            })
        })
    }

    start = (ids,keys) => {
        this.setState({ loading: true });
        // console.log("ids", ids)
        // console.log("keys", keys)
        // console.log("JSON.stringify(ids)",JSON.stringify({ids}))
        if (this.state.data.length <= 0) {
            return;
        }
        setTimeout(() => {
            if (this.state.data.length <= 0) {
                return;
            }
            let data={   //data 是对象形式
                "aaa":ids.join(",")  //把数组拼成字符串
            }
            console.log("传的数组",data.aaa)
            // 批量删除功能   essay,admin,role中的批量删除同这个一致
            let params =new URLSearchParams();
            params.append("ids",data.aaa)  //data.aaa 获取的是值
            axios({
                url: "http://10.35.167.31:8080/delSome",
                method: "post",
                data:params
            }).then((res) => {
                if (res.data.statusCode == 1) {
                    let arr = this.state.data;
                    arr = arr.filter(item => {
                        return this.selectedRowKeys.indexOf(item.key) == -1;
                    });
                }else{
                    alert("批量删除失败")
                }
            }).catch(() => {
                console.log("服务器请求失败")
            })

            //前端DOM批量删除，后端数据并不会改变
            let arr = this.state.data;
            arr = arr.filter(item => {
                return this.selectedRowKeys.indexOf(item.key) == -1;
            });
            // console.log("arr", arr);
            this.selectedRowKeys = [];
            this.setState({
                loading: false,
                data: arr
            }, () => {
                console.log("this.state.data", this.state.data);
            });
        }, 1000);
    };

    onSelectChange = (selectedRowKeys, selectedRows) => {
        // console.log('selectedRowKeys changed: ', selectedRowKeys);

        this.selectedRowKeys = selectedRowKeys;
        // console.log('selectedRows changed: ', selectedRows);
        this.ids=[]   //每次添加前先清空，要不然会叠加
        selectedRows.forEach((item,i) => {
            this.ids.push(item.id)
        
            console.log("this.ids",this.ids)
        })

        this.setState({ selectedRowKeys });
    };

    remove(id, index) {   //id为形参，是上面传过来的唯一标识，index为形参，是上面传来的编号
        console.log("id", id)
        console.log("index", index)
        // axios({
        //     url:"http://10.35.167.38:8080/vip2",
        //     method:"get",
        //     params:{
        //         "id":id
        //     }
        // }).then((res) => {   //服务器请求成功，获取返回值，然后写下一步要执行的动作，这里是删除
        //     if(res.data.statusCode == 1){    //返回值为1，后端删除数据成功，则前段进行DOM删除
        //         let arr=[...this.state.data]
        //         //如果不写let arr=[...this.state.data]这句话，则下面this.setState中data:[...this.state.data]
        //         this.state.data.splice(index-1,1);
        //         this.setState({
        //             data:arr
        //         })
        //     }else{
        //         alert("删除失败")
        //     } 
        // }).catch(() => {    //服务器请求失败，后台打印失败
        //     console.log("服务器连接失败")
        // })

        //本地模拟数据库的操作
        // console.log(key);
        this.state.data.splice(index - 1, 1)
        this.setState({
            data: [...this.state.data]
        })
    };

    //循环遍历获取到的数组，得到下标，然后给每个下标+1，并赋值给columns里的编号，实现动态编号，并不会出现中断现象
    fn() {
        this.state.data.forEach((item, i) => {
            item.key = i + 1
        })
    }

    setVisible() {
        useState(true)
    }

    render() {
        // console.log("render:this.state.data", this.state.data);
        let arr = [...this.state.data];
        const { loading } = this.state;

        // this.rowSelection = {
        //     ...this.rowSelection,
        //     selectedRowKeys: this.selectedRowKeys,
        // };

        this.fn()  //调用循环遍历
        const hasSelected = this.selectedRowKeys.length > 0;
        return (
            <div>
                <div className={styleObj.box}>
                    <Button type="primary" onClick={(record) => this.start(this.ids,this.selectedRowKeys)} disabled={!hasSelected} loading={loading} icon={<CloseOutlined />} className={styleObj.button}>
                        批量删除
                    </Button>
                    <Tan className={styleObj.tan} />
                </div>
                <Table rowSelection={this.rowSelection} columns={this.state.columns} dataSource={this.state.data} className={styleObj.table} pagination={{ position: [this.state.bottom], pageSize: 12 }} bordered={true} />
            </div>
        );
    }
}

export default Vip;