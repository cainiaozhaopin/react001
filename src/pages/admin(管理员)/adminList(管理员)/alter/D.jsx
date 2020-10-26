import React, { useState } from 'react';
import { EditOutlined } from '@ant-design/icons';
import styleObj from "./D.module.css"
import { Button, Modal, Form, Input } from 'antd';
import axios from "axios"

function CollectionCreateForm({ visible, onCreate, onCancel,data }) {
  const [form] = Form.useForm();

  return (
    <Modal visible={visible} title="添加" okText="确定" cancelText="取消" onCancel={onCancel}
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
      <Form form={form} layout="vertical" name="form_in_modal" initialValues={{ modifier: 'public' }} >
        <Form.Item name="name" label="登录名" rules={[{ required: true, message: 'Please input the title of collection!' }]} initialValue={data.name}>
          <Input />
        </Form.Item>
        <Form.Item name="num" label="手机" initialValue={data.num}
          rules={[{ required: true, message: 'Please input your phone number!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="email" label="邮箱" initialValue={data.email}
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!'
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="job" label="角色" rules={[{ required: true, message: 'Please input the title of collection!' }]} initialValue={data.job}>
          <Input />
        </Form.Item>
        <Form.Item name="time" label="加入时间" rules={[{ required: true, message: 'Please input the title of collection!' }]} initialValue={data.time}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};


function Tan(props) {
  const [visible, setVisible] = useState(false);
  const data=props.data
  const onCreate = (values) => {
  let params = new URLSearchParams();
  params.append("id",props.data.id)
  params.append("name",values.name)
  params.append("num",values.num)
  params.append("email",values.email)
  params.append("job",values.job)
  params.append("time",values.time)
    axios({
      url: "http://10.35.167.38:8080/admin1",
      method: "post",
      data: params,
    }).then((res) => {
      if (res.data.statusCode == 1) {
        window.location.reload()
        console.log("接受值",res.data.statusCode)
      } else {
        console.log("接受值",res.data.statusCode)
        alert("修改失败")
      }
    }).catch(() => {
      console.log("服务器连接失败")
    })
    console.log('Received values of form: ', values);
    console.log("props.data",props.data);
    console.log("props.data.id",props.data.id)
    console.log("props.data.key",props.data.key)
    setVisible(false);
  };

  return (
    <div>
      <Button type="primary" className={styleObj.button1} icon={<EditOutlined />} onClick={() => { setVisible(true); }}></Button>
      <CollectionCreateForm visible={visible} onCreate={onCreate} onCancel={() => { setVisible(false) }} data={data} />
    </div>
  );
};

export default Tan;