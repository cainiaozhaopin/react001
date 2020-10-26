import React from "react";
import { Link } from "react-router-dom";
import "./login.css";
import { Form, Input, Button, Checkbox } from 'antd';
import axios from 'axios'


class Login extends React.Component {
  
  onFinish = (values) => {
    console.log('Success:', values);
    console.log("names",values.username);
    console.log("passwords",values.password);
    let params = new URLSearchParams(); //创建一个url传输的实例
    params.append("username", values.username);
    params.append("password", values.password); 
    axios({
      url: "http://10.35.167.31:8080/login",
      method: "post",
      data: params,
    }).then((res) => {
      console.log("res.data", res.data.statusCode);
      if (res.data.statusCode == "1") {
        alert("登录成功");
        this.props.history.push({pathname:"/Home"})
      } else {
        alert("登陆失败")
        this.props.histroy.push({pathname:"/login"})
      }
    }).catch(() => {
      console.log("服务器请求失败");
    })
  };
  onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  // componentDidMount(){    
  //   console.log("this.props",this.props);
  // }

  render() {
    const layout = {
      labelCol: {
        span: 6,
      },
      wrapperCol: {
        span: 12,
      },
    };
    const tailLayout = {
      wrapperCol: {
        offset: 8,
        span:8,
      },
    };
    return(
      <Form
      {...layout}
      name="basic"
      initialValues={{
        remember: true,
      }}
      onFinish={this.onFinish}
      onFinishFailed={this.onFinishFailed}
      className="log"
    >
      <Form.Item
        label="用户名"
        name="username"
        rules={[
          {
            required: true,
            message: '请输入您的用户名再点击提交!',
          },
        ]}
      >
        <Input/>
      </Form.Item>
      <Form.Item
        label="密码"
        name="password"
        rules={[
          {
            required: true,
            message: '请输入您的密码再点击提交!',
          },
        ]}
      >
        <Input.Password/>
      </Form.Item>
      <Form.Item {...this.tailLayout} name="remember" valuePropName="checked" className="ji">
        <Checkbox>保存住这次的密码</Checkbox>
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit"  >
         登录
        </Button>
        <Button type="primary" htmlType="submit" >
          <Link to="/log1">注册</Link>
        </Button>
      </Form.Item>
    </Form>
    )
    
  }
}
export default Login;
