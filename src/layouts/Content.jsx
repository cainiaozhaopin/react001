import React from "react";
import { Route,Switch } from "react-router-dom";
import Home from "../pages/home(首页)/Home"
import Admin from "../pages/admin(管理员)/adminList(管理员)/Admin"
import Role from "../pages/admin(管理员)/roleList(角色)/Role"
import Blogroll from "../pages/blogroll(友情链接)/Blogroll"
import Essay from "../pages/essay(文章)/Essay"
import Note from "../pages/note(便签)/Note"
import Notice from "../pages/notice(公告)/Notice"
import Error from "../pages/others(其他)/error/Error"
import Login from "../pages/others(其他)/login/Login"
import Journal from "../pages/system(系统)/journal(日志)/Journal"
import Watermark from "../pages/system(系统)/watermark(水印)/Watermark"
import Vip from "../pages/vip(会员)/Vip"

export default class Content extends React.Component {
    state = {
        
    }

    render = () => (
            <Switch>
                <Route exact={true} path="/" component={(props) =><Login {...props} />}/>
                <Route path="/Home" component={(props) =><Home {...props} />}/>
                <Route path="/Admin" component={(props) =><Admin {...props} />}/>
                <Route path="/Role" component={(props) => <Role {...props} />}/>
                <Route path="/Blogroll" component={(props) => <Blogroll {...props}/>}/>
                <Route path="/Essay" component={(props) => <Essay {...props}/>}/>
                <Route path="/Note" component={(props) => <Note {...props}/>}/>
                <Route path="/Notice" component={(props) => <Notice {...props}/>}/>
                <Route path="/Login" component={(props) =><Login {...props}/>}/>                            
                <Route path="/Watermark" component={(props) =><Watermark {...props}/>}/>
                <Route path="/Journal" component={(props) =><Journal {...props}/>}/>
                <Route path="/Vip" component={(props) =><Vip {...props}/>}/>              
                <Route  component={Error}/> 
            </Switch>       
    )
}