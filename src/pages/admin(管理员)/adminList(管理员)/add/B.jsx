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
      <Form form={form} layout="vertical" name="form_in_modal" initialValues={{ modifier: 'public' }} initialValues={{ prefix: '86' }}>
        <Form.Item name="name" label="登录名" rules={[{ required: true, message: 'Please input the title of collection!' }]} >
          <Input />
        </Form.Item>
        <Form.Item name="num" label="手机"
          rules={[{ required: true, message: 'Please input your phone number!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="email" label="邮箱"
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
        <Form.Item name="job" label="角色" rules={[{ required: true, message: 'Please input the title of collection!' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="time" label="加入时间" rules={[{ required: true, message: 'Please input the title of collection!' }]} >
          <Input />
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
    params.append("num", values.num)
    params.append("email", values.email)
    params.append("job", values.job)
    params.append("time", values.time)
    axios({
      url: "http://10.35.167.38:8080/admin",
      method: "post",
      data: params,
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
  };

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