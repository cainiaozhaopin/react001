import React, { useState } from 'react';
import { Button, Modal, Form, Input, Radio } from 'antd';
import axios from "axios";
import styleObj from "./B.module.css"

const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
	
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title="添加新内容"
      okText="添加"
      cancelText="取消"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
      >
	  
        <Form.Item
          name="name"
          label="公告标题"
          rules={[
            {
              required: true,
              message: '请输入完整信息',
            },
          ]}
        >
          <Input />
        </Form.Item>
		
		<Form.Item
		  name="form"
		  label="公告类型"
		  rules={[
		    {
		      required: true,
		      message: '请输入完整信息',
		    },
		  ]}
		>
		  <Input />
		</Form.Item>
		
		<Form.Item
		  name="details"
		  label="内容简介"
		  rules={[
		    {
		      required: true,
		      message: '请输入完整信息',
		    },
		  ]}
		>
		  <Input />
		</Form.Item>
		
		<Form.Item
		  name="time"
		  label="加入时间"
		  rules={[
		    {
		      required: true,
		      message: '请输入完整信息',
		    },
		  ]}
		>
		  <Input />
		</Form.Item>
		
      </Form>
    </Modal>
  );
};

const CollectionsPage = () => {
  const [visible, setVisible] = useState(false);

  const onCreate = (values) => {
    console.log('公告添加值 ', values);
    let params = new URLSearchParams();
    params.append("name", values.name);
    params.append("form", values.form);
    params.append("details", values.details);
    params.append("time", values.time);
    axios({
    	url:"http://10.35.167.30:8080/addnotice",
    	method:"POST",
    	data:params,
    }).then(res=>{
    	if(res.data.statusCode == 1){
    		window.location.reload()
    	}else{
    		alert("添加失败")
    	}
    }).catch(() => {
    	console.log("服务器请求失败")
    })
  };

  return (
    <div className={styleObj.box}>
      <Button
        type="primary"
		className={styleObj.button}
        onClick={() => {
          setVisible(true);
        }}
      >
        添加
      </Button>
      <CollectionCreateForm
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </div>
  );
};

export default CollectionsPage;