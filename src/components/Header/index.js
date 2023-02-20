import React, {useRef } from 'react'
import Cookies from 'js-cookie'
import { Link, useLocation, withRouter } from 'react-router-dom'
import "./index.css"

function Header(props) {
    const location = useLocation()
    const {history} = props
    const activeRoute = useRef(location.pathname)

    const onClickLogout=()=>{
        Cookies.remove("jwt_token")
        history.replace("/login")
    }

    const onClickLogo=()=>{
        history.push("/")
        activeRoute.current = "/"
    }

  return (
    <nav className='main-nav'>
      <div className='header-main-cont'>

      <button className='nav-bar' onClick={onClickLogo}>
        <img src="https://res.cloudinary.com/dzqa2dgzj/image/upload/v1675343273/login_logo_lw9aq0.png" alt="" className="header-img" />
        <p className='name'>Tasty Kitchens</p>
      </button>
      <ul className='links'>
        <Link className='linkss' to="/" >
          <li className="nav-links home" >
            <button className={activeRoute.current === "/cart" || activeRoute === "/payment"? "" : "active"} onClick={()=>activeRoute.current="/"}>
              Home
            </button>
            </li>
        </Link>
        <Link className='linkss' to="/cart">
          <li className="nav-links cart" >
          <button className={activeRoute.current === "/cart" || activeRoute === "/payment"? "active": ""} onClick={()=>activeRoute.current="/cart"}>
              Cart
            </button>
          </li>
        </Link>
        <li className="nav-links">
          <button className='logout-btn' onClick={onClickLogout}>Logout</button>
        </li>
      </ul>
      </div>
    </nav>

  )
}

export default withRouter(Header)
