
import React from "react";
import { withRouter } from "react-router-dom";

// export default class NewsConent extends React.Component {
//     constructor(props){
//         super(props);
//         console.log("props",props);
//     }
//     state = {

//     }

//     render = () => (
//         <div>
//             ？？新闻内容？？
//         </div>
//     )
// }

class NewsConent extends React.Component {
    constructor(props){
        super(props);
    }
    state = {

    }
    
    render = () => (
        <div>
            ？？新闻内容？？
        </div>
    )
}
export default withRouter(NewsConent);