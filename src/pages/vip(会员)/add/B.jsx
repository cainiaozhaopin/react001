import React, { useState } from 'react';
import { PlusCircleOutlined } from '@ant-design/icons';
import styleObj from "./B.module.css"
import axios from "axios"
import { Button, Modal, Form, Input } from 'antd';

const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
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
      <Form form={form} layout="vertical" name="form_in_modal" initialValues={{ modifier: 'public' }} initialValues={{prefix: '86'}}>
        <Form.Item name="name" label="用户名" rules={[{ required: true, message: 'Please input the title of collection!' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="sex" label="性别" rules={[{ required: true, message: 'Please input your sex!' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="num" label="电话"
          rules={[{ required: true, message: 'Please input your phone number!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="address" label="常住地址" rules={[{  required: true, message: 'Please select your habitual residence!' },]}>
          <Input/>
        </Form.Item>

      </Form>
    </Modal>
  );
};

const Tan = () => {
  const [visible, setVisible] = useState(false);

  const onCreate = (values) => {
    let params = new URLSearchParams();
    params.append("name", values.name)
    params.append("sex", values.sex)
    params.append("num", values.num)
    params.append("address", values.address)
    axios({
      url: "http://10.35.167.38:8080/vip",
      method: "post",
      data:params
    }).then((res) => {
      if (res.data.statusCode == 1) {
        window.location.reload();
      } else {
        alert("添加失败")
      }
    }).catch(() => {
      console.log("服务器连接失败");
    })

    console.log('Received values of form: ', values);
    setVisible(false);
  }

  return (
    <div className={styleObj.div}>
      <Button
        type="primary"
        icon={<PlusCircleOutlined />}
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

export default Tan;