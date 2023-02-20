import { useRef, useState } from "react"
import { Redirect, useHistory } from "react-router-dom"
import Cookies from "js-cookie"
import "./index.css"

const LoginPage = () => {
  const usernameRef = useRef("")
  const passwordRef = useRef("")
  const [isPwdWrong, changePwdState] = useState(false)

  let history = useHistory()

  const onSubmitForm = async (event) =>{
    event.preventDefault()
    const username = usernameRef.current.value
    const password = passwordRef.current.value

    const userData = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userData)
    }
    const response = await fetch("https://apis.ccbp.in/login", options)

    if(response.ok){
      changePwdState(false)
      const fetchData = await response.json()
      Cookies.set("jwt_token", fetchData.jwt_token, {expires:30})
      history.replace("/")
    }
    else{
      changePwdState(true)
    }
  }


  const jwtToken = Cookies.get("jwt_token")
  if(jwtToken!==undefined){
      return <Redirect to="/" />
  }


  return (
    <div className='login-page'>
      <div className='left-cont'>
        <div className='login-cont'>
            <img src="https://res.cloudinary.com/dzqa2dgzj/image/upload/v1675343273/login_logo_lw9aq0.png" alt="" className="logo" />
            <p className='name'>Tasty Kitchens</p>
            <h1 className='login'>Login</h1>
            <form className='form' onSubmit={onSubmitForm}>
              <label className='label'>Username</label>
              <input ref={usernameRef} type="text" className="input" />
              <label className="label">Password</label>
              <input ref={passwordRef} type="password" className="input" />
              {isPwdWrong && <p className='err-msg'>Please enter a valid Username & Password</p>}
              <button className='login-btn' type='submit'>Login</button>
            </form>
        </div>
      </div>
      <img src="https://res.cloudinary.com/dzqa2dgzj/image/upload/v1675343283/login_page_v2sgt6.svg" alt="" className="login-page-img" />
    </div>
  )
}

export default LoginPage