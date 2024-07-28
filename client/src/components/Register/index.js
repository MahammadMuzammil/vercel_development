import './index.css'
import { Component } from "react";
import Cookies from 'js-cookie'
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
class Register extends Component{
    state = {
        username: '',
        password: '',
        confirmPassword:'',
        confirmPasswordErrMsg:'',
        nameErrMsg:'',
        passwordErrMsg:'',
        errMsg:'',
        showConfirmPasswordErrMsg:false,
        showNameErr:false,
        showPasswordErr:false,
        showErrMsg:false
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
let confirmPasswordValidation = this.validateConfirmPassword()
        if(nameValidation && passwordValidation  && confirmPasswordValidation){

        
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

        const response = await fetch('http://localhost:3000/register', options);
        const jsonData = await response.json()
        console.log(jsonData)
        if(jsonData.status_code===200){

                let {history} = this.props
                history.replace('/login')
                
            }else{
                this.setState({showErrMsg:true,errMsg:jsonData.message})
                 setTimeout(()=>{
                    this.props.history.replace('/login')
                 },2000)
            }
    }   
    };


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
validateConfirmPassword=()=>{
    let {confirmPassword,password} = this.state
    if(confirmPassword==="" || confirmPassword!==password ){
        this.setState({confirmPasswordErrMsg:'*Both passwords should be Same',showConfirmPasswordErrMsg:true})
        return false
    }
    this.setState({confirmPasswordErrMsg:'',showConfirmPasswordErrMsg:false})
    return true


}
changeConfirmPassword=(e)=>{
    this.setState({confirmPassword:e.target.value})
}
    render(){
        let {errMsg,showErrMsg, nameErrMsg,passwordErrMsg,showNameErr,showPasswordErr,showConfirmPasswordErrMsg,confirmPasswordErrMsg} = this.state
let jwToken = Cookies.get('jwt_token')
if(jwToken!==undefined){
       return <Redirect to='/'/>
}
        return(
            <div className="register-background">
                <img src='https://img.freepik.com/free-vector/man-sitting-desk-unlocking-computer-computer-settings-login-flat-illustration_74855-20645.jpg'className="register-img"/>
                <form onSubmit={this.onSubmitForm} className="registration-form">
                    <h1 className="login-heading">Create an Account</h1>
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
                    <div className="align">
                        <label htmlFor="password">Confirm Password:</label>
                        <input type="password" id="password" placeholder="Enter Password" onChange={this.changeConfirmPassword} className="usernameInput" onBlur={this.validateConfirmPassword} />
                    </div>
                    {showConfirmPasswordErrMsg && <p className="errMsg">{confirmPasswordErrMsg}</p>}


                    <button type="submit" className="submitBtn">Register</button>
                    {errMsg && <p className="errMsg">{errMsg}</p> }
                    
                    
                </form>
            </div>
        )
    }
}

export default Register

