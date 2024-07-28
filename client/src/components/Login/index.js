import React, {  Component } from "react";
import './index.css';
import Cookies from 'js-cookie'
import { Redirect } from "react-router-dom";
class Login extends Component {
    state = {
        username: '',
        password: '',
        nameErrMsg:'',
        passwordErrMsg:'',
        errMsg:'',
        showRegisterBtn:false,
        showNameErr:false,
        showPasswordErr:false
    };

    changeUserName = (e) => {
        this.setState({ username: e.target.value });
    };

    changePassword = (e) => {
        this.setState({ password: e.target.value });
    };

    onSubmitForm = async (e) => {


        e.preventDefault();

let nameValidation= this.validateName()
let passwordValidation = this.validatePassword()

        if(nameValidation && passwordValidation){

        
        const { username, password } = this.state;
        const userdetails = {
            username,
            password
        };

        const options = {
            method: 'POST',
            body: JSON.stringify(userdetails),
        
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };

        const response = await fetch('http://localhost:3000/login', options);
        const jsonData = await response.json()
        console.log(jsonData)
        if(jsonData.status_code===200){
                let {history} = this.props
                history.replace('/')
                let {jwt_token} = jsonData
                Cookies.set('jwt_token',jwt_token,{expires:10})
                this.setState({errMsg:'',showRegisterBtn:false})
        }else if(jsonData.status_code===401){
                let error = jsonData.err_msg
                this.setState({errMsg:error,showRegisterBtn:false})
        }else{
            let error = jsonData.err_msg
            this.setState({errMsg:error,showRegisterBtn:true})
        }

    }   
    };

    handleRegister=()=>{
        let {history} = this.props
        history.replace('/register')
    }
renderRegister=()=>{
    return(
        <div>
            <h1 className="alertMsg">Doesn't Have an Account Create one!!</h1>
            <button className="register" onClick={this.handleRegister}>Create Account</button>

        </div>
        
    )
}

validateName=()=> {

let {username} = this.state
if(username===""){
    this.setState({nameErrMsg:'*required',showNameErr:true})
    return false
}
this.setState({nameErrMsg:'',showNameErr:false})
return true
}
validatePassword=()=>{
    let {password} = this.state
if(password===""){
    this.setState({passwordErrMsg:'*required',showPasswordErr:true})
    return false
}
this.setState({passwordErrMsg:'',showPasswordErr:false})
return true
}

    render() {
let {errMsg,showRegisterBtn,nameErrMsg,passwordErrMsg,showNameErr,showPasswordErr} = this.state
let jwToken = Cookies.get('jwt_token')
if(jwToken!==undefined){
       return <Redirect to='/'/>
}

        return (
            <div className="login-background">
                <div className="register-img">
                {showRegisterBtn && this.renderRegister()}
                <img src="https://static.vecteezy.com/system/resources/thumbnails/003/689/228/small/online-registration-or-sign-up-login-for-account-on-smartphone-app-user-interface-with-secure-password-mobile-application-for-ui-web-banner-access-cartoon-people-illustration-vector.jpg" className="side-img" alt="Login background" />
                </div>

                <form onSubmit={this.onSubmitForm} className="login-form">
                    <h1 className="login-heading">Login</h1>
                    <div className="align">
                        <label htmlFor="username">User Name:</label>
                        <input type="text" id="username" placeholder="Enter Username" onChange={this.changeUserName} className="usernameInput" onBlur={this.validateName} />
                    </div>
                    {showNameErr&&<p className="errMsg">{nameErrMsg}</p>}
                    
                    <div className="align">
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" placeholder="Enter Password" onChange={this.changePassword} className="usernameInput" onBlur={this.validatePassword} />
                    </div>
                    {showPasswordErr && <p className="errMsg">{passwordErrMsg}</p>}
                    
                    <button type="submit" className="submitBtn">Login</button>
                    <p className="errMsg">{errMsg}</p>
                </form>
            </div>
        );
    }
}

export default Login;
