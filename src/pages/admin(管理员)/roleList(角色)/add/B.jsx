import React, { useState } from 'react';
import { PlusCircleOutlined } from '@ant-design/icons';
import styleObj from "./B.module.css"
import axios from "axios"
import { Button, Modal, Form, Input, } from 'antd';

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
      <Form form={form} layout="vertical" name="form_in_modal" initialValues={{ modifier: 'public' }}>
        <Form.Item name="job" label="角色名"  rules={[{ required: true, message: 'Please input the title of collection!' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="jurisdiction" label="拥有权限"  rules={[{ required: true, message: 'Please input the title of collection!' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="describe" label="描述"  rules={[{ required: true, message: 'Please input the title of collection!' }]}>
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
    params.append("job", values.job)
    params.append("jurisdiction", values.jurisdiction)
    params.append("describe", values.describe)
    axios({
      url: "http://10.35.167.38:8080/role",
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