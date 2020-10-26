import React, { useState } from 'react';
import { EditOutlined } from '@ant-design/icons';
import styleObj from "./D.module.css"
import { Button, Modal, Form, Input } from 'antd';
import axios from "axios"

function CollectionCreateForm({ visible, onCreate, onCancel,data }){
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
        <Form.Item name="job" label="角色名" initialValue={data.job} rules={[{ required: true, message: 'Please input the title of collection!' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="jurisdiction" label="拥有权限" initialValue={data.jurisdiction} rules={[{ required: true, message: 'Please input the title of collection!' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="describe" label="描述" initialValue={data.describe} rules={[{ required: true, message: 'Please input the title of collection!' }]}>
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
    params.append("job", values.job)
    params.append("jurisdiction", values.jurisdiction)
    params.append("describe", values.describe)
    axios({
      url: "http://10.35.167.38:8080/role1",
      method: "post",
      data:params
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
      <CollectionCreateForm data={data} visible={visible} onCreate={onCreate} onCancel={() => { setVisible(false) }} />
    </div>
  );
};

export default Tan;