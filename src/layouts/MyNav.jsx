import React from "react";
import { Link } from "react-router-dom";
import { Menu } from 'antd';
import "antd/dist/antd.css";
import styleObj from "./MyNav.module.css";
import { SettingOutlined,SoundOutlined,BankOutlined,RightOutlined,ContainerOutlined,TeamOutlined,AppstoreAddOutlined,UserOutlined,GlobalOutlined,TagOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;

class MyNav extends React.Component {
  // submenu keys of first level
  rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

  state = {
    openKeys: ['sub1'],
  };

  onOpenChange = openKeys => {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  };

  render() {
    return (
      <Menu
        mode="inline"
        openKeys={this.state.openKeys}
        onOpenChange={this.onOpenChange}
        className={styleObj.list}
      >
        <SubMenu
          key="sub1"
          title={
            <span><BankOutlined />
              <span>首页</span>
            </span>
          }
        >
          <Menu.Item key="1" icon={<RightOutlined />}><Link to="/Home">首页</Link></Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" icon={<ContainerOutlined />} title="文章管理">
          <Menu.Item key="2" icon={<RightOutlined />}><Link to="/Essay">文章列表</Link></Menu.Item>
        </SubMenu>
        <SubMenu key="sub3" icon={<SoundOutlined />} title="公告管理">
          <Menu.Item key="3" icon={<RightOutlined />}><Link to="/Notice">公告列表</Link></Menu.Item>
        </SubMenu>
        <SubMenu key="sub4" icon={<TeamOutlined />} title="管理员管理">
          <Menu.Item key="4" icon={<RightOutlined />}><Link to="/Admin">管理员列表</Link></Menu.Item>
          <Menu.Item key="5" icon={<RightOutlined />}><Link to="/Role">角色管理</Link></Menu.Item>
        </SubMenu>
        <SubMenu key="sub5" icon={<UserOutlined />} title="会员管理">
          <Menu.Item key="6" icon={<RightOutlined />}><Link to="/Vip">会员列表</Link></Menu.Item>
        </SubMenu>
        <SubMenu key="sub6" icon={<SettingOutlined />} title="系统设置">
          <Menu.Item key="7" icon={<RightOutlined />}><Link to="/Watermark">图片水印设置</Link></Menu.Item>
          <Menu.Item key="8" icon={<RightOutlined />}><Link to="/Journal">系统日志</Link></Menu.Item>
        </SubMenu>
        <SubMenu key="sub7" icon={<GlobalOutlined />} title="友情链接">
          <Menu.Item key="9" icon={<RightOutlined />}><Link to="/Blogroll">友情链接列表</Link></Menu.Item>
        </SubMenu>
        <SubMenu key="sub8" icon={<TagOutlined />} title="便签管理">
          <Menu.Item key="10" icon={<RightOutlined />}><Link to="/Note">便签列表</Link></Menu.Item>
        </SubMenu>
        <SubMenu key="sub9" icon={<AppstoreAddOutlined />} title="其他页面">
          <Menu.Item key="11" icon={<RightOutlined />}><Link to="/Login">登录页面</Link></Menu.Item>
          <Menu.Item key="12" icon={<RightOutlined />}><Link to="/Error">错误页面</Link></Menu.Item>
        </SubMenu>
      </Menu>
    );
  }
}

export default MyNav;