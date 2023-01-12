import { Component } from 'react'
import Cookies from 'js-cookie'
import './index.css'
import { Redirect } from 'react-router-dom'

class Login extends Component{
    state={username:'', password:'', isFailed:false, errorMsg:''}

        submitForm=async(event)=>{
            event.preventDefault()
            const {username, password} = this.state
            const userDetails = {username, password}
            const options = {
                method:'POST',
                body:JSON.stringify(userDetails)
            }
            const apiUrl = 'https://apis.ccbp.in/login'
            const response = await fetch(apiUrl, options)
            const fetchedData = await response.json()
            if(response.ok){
                this.setState({isFailed:false, password:'', errorMsg:''})
                Cookies.set('jwt_token', fetchedData.jwt_token, {expires:30})
                const {history} = this.props
                history.replace('/')
            }
            else{
                this.setState({isFailed:true, password:'', errorMsg:fetchedData.error_msg})
            }

        }

    getUsername=(event)=>{
        this.setState({username:event.target.value})
    }

    getPassword=(event)=>{
        this.setState({password:event.target.value})
    }

    render(){
        const {password, isFailed, errorMsg} = this.state
        const jwtToken = Cookies.get('jwt_token')
        if(jwtToken!==undefined){
            return <Redirect to='/' />
        }
    return(
            <div className='login-cont'>
                <div className='login-card'>
                    <img className='logo' src='https://assets.ccbp.in/frontend/react-js/logo-img.png' alt='website-logo'/>
                    <form className='form' onSubmit={this.submitForm}>
                        <label className='username-label' htmlFor="username">USERNAME</label>
                        <input type="text" onChange={this.getUsername} id='username' className="username-input" placeholder='Username' />
                        <label className='password-label' htmlFor="password">PASSWORD</label>
                        <input type="password" id='password'  value={password}  onChange={this.getPassword} className="password-input" placeholder='Password' />
                        <button className="submit-btn" type='submit'>Login</button>
                        {isFailed && <p className="wrong-password">*{errorMsg}</p>}
                    </form>
                </div>
            </div>
        )
    }}

export default Login