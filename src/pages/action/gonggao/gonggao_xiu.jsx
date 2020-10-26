import React, { useState } from 'react';
import { Button, Modal, Form, Input, Radio } from 'antd';
import axios from "axios";
import { EditOutlined } from '@ant-design/icons';
import styleObj from "./B.module.css";

function CollectionCreateForm({ visible, onCreate, onCancel, data}){
	
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title="修改内容"
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
		  initialValue={data.name}
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
		  initialValue={data.form}
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
		  initialValue={data.details}
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
		   initialValue={data.time}
		>
		  <Input />
		</Form.Item>
		
      </Form>
    </Modal>
  );
};

function CollectionsPage(props){
  const [visible, setVisible] = useState(false);
  const data = props.data;
  const onCreate = (values) => {
    console.log('公告修改值 ', values);
    console.log('对应id ', data.id);
    setVisible(false);
	let params = new URLSearchParams();
	params.append("id", data.id);
	params.append("name", values.name);
	params.append("form", values.form);
	params.append("details", values.details);
	params.append("time", values.time);
	axios({
		url:"http://10.35.167.30:8080/upnotice",
		method:"POST",
		data:params,
	}).then(res=>{
		if(res.data.statusCode == 1){
			window.location.reload()
		}else{
			alert("添加失败")
		}
	})
  }


  return (
    <div>
      <Button
        type="primary"
		className={styleObj.button1}
        onClick={() => {
          setVisible(true);
        }}
		icon={<EditOutlined />}
      >
      </Button>
      <CollectionCreateForm
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
		data={data}
      />
    </div>
  );
};

export default CollectionsPage;