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
      <Form form={form} layout="vertical" name="form_in_modal" initialValues={{ modifier: 'public' }}>
        <Form.Item name="name" label="文章标题" rules={[{ required: true, message: '请输入文章标题!' }]} initialValue={data.name}>
          <Input />
        </Form.Item>
        <Form.Item name="kind" label="文章类型" rules={[{ required: true, message: '请输入文章类型!' }]} initialValue={data.kind}>
          <Input />
        </Form.Item>
        <Form.Item name="author" label="作者" rules={[{ required: true, message: '请输入作者!' }]} initialValue={data.author}>
          <Input />
        </Form.Item>
        <Form.Item name="form" label="文章来源" rules={[{ required: true, message: '请输入文章来源!' }]} initialValue={data.form}>
          <Input />
        </Form.Item>
        <Form.Item name="rank" label="排序" rules={[{ required: true, message: '请输入排序!' }]} initialValue={data.rank}>
          <Input />
        </Form.Item>
        <Form.Item name="time" label="录入时间" rules={[{ required: true, message: '请输入录入时间!' }]} initialValue={data.time}>
          <Input />
        </Form.Item>
        <Form.Item name="stick" label="是否置顶" rules={[{ required: true, message: '请输入是或否!' }]} initialValue={data.stick}>
          <Input />
        </Form.Item>
        <Form.Item name="recommend" label="是否推荐" rules={[{ required: true, message: '请输入是或否!' }]} initialValue={data.recommend}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};


function Tan(props) {
  const [visible, setVisible] = useState(false);
  const data=props.data;
  const onCreate = (values) => {
    let params = new URLSearchParams();
    params.append("id",props.data.id)
    params.append("name", values.name)
    params.append("kind", values.kind)
    params.append("author", values.author)
    params.append("form", values.form)
    params.append("rank", values.rank)
    params.append("time", values.time)
    params.append("stick", values.stick)
    params.append("recommend", values.recommend)
    axios({
      url: "http://10.35.167.38:8080/essay1",
      method: "post",
      data: params,
    }).then((res) => {
      if (res.data.statusCode == 1) {
        window.location.reload()
      } else {
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
      <CollectionCreateForm 
      visible={visible} 
      onCreate={onCreate} 
      onCancel={() => { setVisible(false) }} 
      data={data}
      />
    </div>
  );
};

export default Tan;