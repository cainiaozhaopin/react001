// import React from "react";
import "./journal.css";
// import {Table,TimePicker} from 'antd';
import axios from 'axios';
import React, { useContext, useState, useEffect, useRef } from 'react';
import { Table, Input, Button, Popconfirm, Form,TimePicker } from 'antd';
const { RangePicker } = TimePicker;

const EditableContext = React.createContext();
const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};
const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef();
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);
  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };
  const save = async (e) => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;
  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }
  return <td {...restProps}>{childNode}</td>;
};

class Journal extends React.Component {
  constructor() {
    super();
    this.columns = [
      {
        title: 'Id',
        dataIndex: 'id',
      },
      {
        title: '用户名',
        dataIndex: 'name',
        editable: true,
      },
      {
        title: 'age',
        dataIndex: 'age',
      },
      {
        title: '类型',
        dataIndex: 'lei',
      },
      {
        title: '内容',
        dataIndex: 'login',
      },
      {
        title: '时间',
        dataIndex: 'time',
      },
      {
        title: 'address',
        dataIndex: 'ip',
      },
      {
        title: 'operation',
        dataIndex: 'operation',
        render: (text, record) =>
          this.state.data.length >= 1 ? (
            <Popconfirm title="确定要删除吗?" onConfirm={() => this.handleDelete(record.key)}>
              <a>删除</a>
            </Popconfirm>
          ) : null,
      },
    ];
    this.state = {
      data:[],
      count: 2,
    };
  }
  componentDidMount(){
    axios({
      url:"http://localhost:3000/books",
      method:"get",
      params:{}
    }).then((res)=>{
        console.log("res.data",res.data[2].data);
        this.setState({
            data:res.data[2].data
        })
    })
  }

  handleDelete = (key) => {
    const data = [...this.state.data];
    console.log("data",data);
    axios({
      url:"http://localhost:3000/books",
      method:"get",
      params: {//地址栏数据
        "id": key,
      }
    }).then((res)=>{
        console.log("res.data",res.data[2].data);
        this.setState({
            data:res.data[2].data
        })
    })
    this.setState({
      data: data.filter((item) => item.key !== key),
    });
  };
  handleAdd = () => {
    const { count, data } = this.state;
    const newData = {
      key: count,
      id:0,
      name: `小 ${count}`,
      age: 32,
      lei:`信息`,
      login:`登录成功`,
      time:`2018/02/22 22:22:22`,
      ip: `816222418${count}`,
    };
    this.setState({
      data: [...data, newData],
      count: count + 1,
    });
  };
  handleSave = (row) => {
    const newData = [...this.state.data];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    this.setState({
      data: newData,
    });
  };
  render() {
    const { data } = this.state;
    const components = {
      body: {
        row: EditableRow,
        cell: EditableCell,
      },
    };
    const columns = this.columns.map((col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: (record) => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });
    return (
      <div>
        <RangePicker className="timeb"/>
        <Button onClick={this.handleAdd} type="primary"
          style={{
            marginBottom: 0,
          }}
          className="btn"
        >
        增加 
        </Button>
        <Table components={components} rowClassName={() => 'editable-row'} bordered
          dataSource={data}
          columns={columns}
        />
      </div>
    );
  }
}

// const { RangePicker } = TimePicker;
// const columns = [
  // {
  //   title: 'Id',
  //   dataIndex: 'id',
  // },
  // {
  //   title: '类型',
  //   dataIndex: 'lei',
  // },
  // {
  //   title: '内容',
  //   dataIndex: 'login',
  // },
  // {
  //   title: '用户名',
  //   dataIndex: 'name',
  // },
  // {
  //   title: '客户端IP',
  //   dataIndex: 'ip',
  // },
  // {
  //   title: '时间',
  //   dataIndex: 'time',
  // },
  // {
  //   title: '操作',
  //   dataIndex: 'del',
  // }
// ];

// // const data = [];

// // for (let i = 0; i < 46; i++) {
// //   data.push({
// //     key: i,
// //     id:`${i}`,
// //     lei:`${i+1}`,
// //     login:`登陆成功！`,
// //     name: `小${i}`,
// //     ip: 816418326,
// //     time:` 2018/${i}/${i+1} 11:11:${i}`,
// //     del:`删除`
// //   });
// // }

// class journal extends React.Component {
//   state = {
//     selectedRowKeys: [],
//     loading: false,
//     data:[]
//   };

  // componentDidMount(){
  //   axios({
  //     url:"http://localhost:3000/books",
  //     method:"get"
  //   }).then((res)=>{
  //       console.log("res.data",res.data[2].data);
  //       this.setState({
  //           data:res.data[2].data
  //       })
  //   })
//   }
//   start = () => {
//     this.setState({ loading: true });
//     setTimeout(() => {
//       this.setState({
//         loading: false,
//       });
//     }, 1000);
//   };
//   onSelectChange = selectedRowKeys => {
//     console.log('selectedRowKeys changed: ', selectedRowKeys);
//     this.setState({ selectedRowKeys });
//   };
//   render() {
//     const { loading, selectedRowKeys } = this.state;
//     const rowSelection = {
//       selectedRowKeys,
//       onChange: this.onSelectChange,
//     };
//     const hasSelected = selectedRowKeys.length > 0;
//     return (
//       <div className='rizhi'>
//         <RangePicker className="timeb"/>;
//         <Table rowSelection={rowSelection} columns={columns} data={this.state.data} />
//         {/* 复选框    列表数据    全部数据 */}
//       </div>
//     );
//   }
// }

export default Journal;