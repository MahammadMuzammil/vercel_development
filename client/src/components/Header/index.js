import { Component } from "react";
import './index.css'
import {Link,withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
class Header extends Component{


renderLogo=()=>{
    return (
        <img src="https://t3.ftcdn.net/jpg/05/90/75/40/360_F_590754013_CoFRYEcAmLREfB3k8vjzuyStsDbMAnqC.jpg" alt="logo" className="logo"/>
    )
}
renderSearchInput=()=>{}
logOut=()=>{
    console.log('logout clicked')
Cookies.remove('jwt_token')

console.log(this.props.history)
this.props.history.replace('/login')
}
renderNavbar=()=>{
return(
    <nav>
        <ul className="navItemsContainer">
            <li>
            <Link to='/' className='linkItem'>
                Home
            </Link>
            </li>
            <li >
            <Link  to='/favorites' className='linkItem' >
                Favorites
            </Link>
            </li>

        <button className="logOutBtn" onClick={this.logOut}>Log Out</button>
        </ul>
    </nav>
)
}
render(){
    return(
        <div className="header">
            {this.renderLogo()}

        {this.renderSearchInput()}
        {this.renderNavbar()}
        </div>
    )
}



}


export default  withRouter(Header)

// Logo        search     Home   Favorites   LogOut 


