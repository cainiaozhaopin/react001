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
      <Form form={form} layout="vertical" name="form_in_modal" initialValues={{ modifier: 'public' }}>
        <Form.Item name="name" label="文章标题" rules={[{ required: true, message: '请输入文章标题!' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="kind" label="文章类型" rules={[{ required: true, message: '请输入文章类型!' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="author" label="作者" rules={[{ required: true, message: '请输入作者!' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="form" label="文章来源" rules={[{ required: true, message: '请输入文章来源!' }]} >
          <Input />
        </Form.Item>
        <Form.Item name="rank" label="排序" rules={[{ required: true, message: '请输入排序!' }]} >
          <Input />
        </Form.Item>
        <Form.Item name="time" label="录入时间" rules={[{ required: true, message: '请输入录入时间!' }]} >
          <Input />
        </Form.Item>
        <Form.Item name="stick" label="是否置顶" rules={[{ required: true, message: '请输入是或否!' }]} >
          <Input />
        </Form.Item>
        <Form.Item name="recommend" label="是否推荐" rules={[{ required: true, message: '请输入是或否!' }]} >
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
    params.append("kind", values.kind)
    params.append("author", values.author)
    params.append("form", values.form)
    params.append("rank", values.rank)
    params.append("time", values.time)
    params.append("stick", values.stick)
    params.append("recommend", values.recommend)
    axios({
      url: "http://10.35.167.38:8080/essay",
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