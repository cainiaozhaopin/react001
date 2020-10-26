import React from "react";
import { Table, Button, Space, Switch } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined, PlusCircleOutlined, EditOutlined, CloseOutlined } from '@ant-design/icons';
import styleObj from "./Vip.module.css";
import Tan from '../action/gonggao/gonggao.jsx';
import Xiu from '../action/gonggao/gonggao_xiu.jsx';
import Remove from '../action/remove/E.jsx';
import axios from "axios"

class Notice extends React.Component {
	constructor(){
		super();
	this.state = {
	    selectedRowKeys: [], // Check here to configure the default column
	    loading: false,
	    bottom: 'bottomCenter',
	    data: [],
		columns: [
			{
				title:'排序',
				dataIndex:'key',
			},
		  {
		    title: '公告标题',
		    dataIndex: 'name',
		  },
		  {
		    title: '公告类型',
		    dataIndex: 'form',
		  },
		 
		  {
		    title: '内容简介',
		    dataIndex: 'details',
		  },
		  {
		    title: '加入时间',
		    dataIndex: 'time',
		  },
		  {
		    title: '状态',
		    dataIndex: 'condition',
			render:()=>(
			    <>
			        <Switch checkedChildren="NO" unCheckedChildren="OFF" defaultChecked />
			    </>
			)
		  },{
		    title: '操作',
		    dataIndex: 'zuo',
			render:(text,item) => (
			        <Space>
			        <Xiu data={item}/>
					<Remove  remove={()=>this.remove(item.id,item.key-1)}/>
			        </Space>
			    )
			}
		  
		]
	}
	}
	
	componentDidMount(){
		axios({
			url:"http://10.35.167.30:8080/allnotice"
		}).then(res=>{
			this.setState({
				data:res.data.data 
				})
			})
	};
	

    // onSelectChange = (selectedRowKeys, selectedRows) => {
    //     console.log('selectedRowKeys changed: ', selectedRowKeys);
    //     console.log('selectedRows changed: ', selectedRows);
    //     this.setState({ selectedRowKeys });
    // };

    remove(id,key) {
    	console.log("id",id)
        console.log("key",key);
    	axios({
    		url:"http://10.35.167.30:8080/delnotice",
		params:{"id":id}
    	}).then(res=>{
    		if(res.data.statusCode == 1){
    			this.state.data.splice(key, 1);
    			this.setState({
    			    data: [...this.state.data]
    			})
    		}else{
    			console.log("删除失败")
				alert("删除失败")
    		}
    	}).catch(() =>{
    		console.log("请求失败")
			alert("请求失败")
    	})
    
    	
        this.state.data.splice(key, 1);
        this.setState({
            data: [...this.state.data]
        })
    };
    fn(){
        this.state.data.forEach((item,i)=>{
            item.key=i+1
        })
    }
    render() {
        const { loading, selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        this.fn();
        const hasSelected = selectedRowKeys.length > 0;
        return (
            <div>
                <div className={styleObj.box}>
                    
                    <Tan/>
                </div>
                <Table columns={this.state.columns} dataSource={this.state.data} className={styleObj.table} pagination={{ position: [this.state.bottom], pageSize: 5 }} bordered={true} />
            </div>
        );
    }
}

export default Notice;