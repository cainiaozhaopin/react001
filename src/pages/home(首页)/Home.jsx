import React from "react";
import "./Home.css";
import axios from 'axios';

export default class Home extends React.Component {
		constructor(props) {
			super(props); // 用于父子组件传值
			this.state = {
				news: []
			}
		}

		getMenuItems() {
			return this.state.news.map(item => {
				return ( <
					li key = {
						item.id
					} > {
						item.news
					} < /li>
				)
			})
		}

		componentDidMount() {
			axios({
				url: "http://10.35.167.51:8080/news",
			}).then(
				res => {
					console.log("res.data", res.data.data);
					this.setState({
						news: res.data.data
					})
				}
			)
		}

		CurentTime() {
			return new Date().toLocaleTimeString();
		}

   render = () => (
        <div className="home-box">
            <div className="home-top-box">
				<div className="home-small-box">
					<h3 className="time">欢迎管理员:{this.CurentTime()}</h3>
				</div>
			</div>
			<div className="home-center-box">
				<h2>数据统计</h2>
				<ul>
					<li>
						<h4>文章数</h4>
						<span>425</span>
					</li>
					<li>
						<h4>会员数</h4>
						<span>320</span>
					</li>
					<li>
						<h4>消息</h4>
						<span>99</span>
					</li>
					<li>
						<h4>公告</h4>
						<span>125</span>
					</li>
					<li>
						<h4>邮件</h4>
						<span>110</span>
					</li>
					<li>
						<h4>友情链接</h4>
						<span>163</span>
					</li>
				</ul>
			</div>
			<div className="home-news-box">
				<div className="home-news-left1-box">
					<h2>信息统计</h2>
					<table border="1">
						<tr>
							<th>统计</th>
							<th>资料库</th>
							<th>图片库</th>
							<th>产品库</th>
							<th>用户</th>
							<th>管理员</th>
						</tr>
						<tr>
							<td>总数</td>
							<td>92</td>
							<td>0</td>
							<td>0</td>
							<td>0</td>
							<td>20</td>
						</tr>
						<tr>
							<td>今日</td>
							<td>0</td>
							<td>0</td>
							<td>0</td>
							<td>0</td>
							<td>0</td>
						</tr>
						<tr>
							<td>昨日</td>
							<td>0</td>
							<td>0</td>
							<td>0</td>
							<td>0</td>
							<td>0</td>
						</tr>
						<tr>
							<td>本周</td>
							<td>2</td>
							<td>0</td>
							<td>0</td>
							<td>0</td>
							<td>0</td>
						</tr>
						<tr>
							<td>本月</td>
							<td>2</td>
							<td>0</td>
							<td>0</td>
							<td>0</td>
							<td>0</td>
						</tr>
					</table>
				</div>
				<div className="home-news-left2-box">
					<h2>文章统计</h2>
				</div>
				<div className="home-news-right1-box">
					<h2>数据月统计</h2>
				</div>
				<div className="home-news-right2-box">
					<h2>最新消息</h2>
					<ul>
						{this.getMenuItems()}
					</ul>
				</div>
			</div>
			<div className="home-bottom-box">
				<h2>系统信息</h2>
				<table border="1">
				  <tr>
				    <th colspan="2">服务器信息</th>
				  </tr>
				  <tr>
				    <td>服务器计算机名</td>
				    <td>http://127.0.0.1/</td>
				  </tr>
				  <tr>
				    <td>服务器IP地址</td>
				    <td>192.168.1.1</td>
				  </tr>
				  <tr>
				    <td>服务器域名</td>
				    <td>www.xxx.net</td>
				  </tr>
				  <tr>
				    <td>服务器端口</td>
				    <td>80</td>
				  </tr>
				  <tr>
				    <td>服务器IIS版本</td>
				    <td>Microsoft-IIS/6.0</td>
				  </tr>
				  <tr>
				    <td>本文件所在文件夹</td>
				    <td>D:\WebSite\</td>
				  </tr>
				  <tr>
				    <td>服务器操作系统</td>
				    <td>Microsoft Windows NT 5.2.3790 Service Pack 2</td>
				  </tr>
				  <tr>
				    <td>系统所在文件夹</td>
				    <td>C:\WINDOWS\system32</td>
				  </tr>
				  <tr>
				    <td>服务器脚本超时时间</td>
				    <td>30000秒</td>
				  </tr>
				  <tr>
				    <td>服务器的语言种类</td>
				    <td>Chinese (People's Republic of China)</td>
				  </tr>
				</table>
			</div>
			<div className="home-foot-box">
				<p>Copyright ©2020 All Rights Reserved.</p>
			</div>
        </div>
    )
}