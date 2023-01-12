import './index.css'
import { Link, withRouter } from 'react-router-dom'
import Cookies from 'js-cookie'

const Header=(props)=>{
    const onLogout=()=>{
        const jwtToken = Cookies.get('jwt_token')
        const {history} = props
        if(jwtToken!==undefined){
            Cookies.remove('jwt_token')
            history.replace('/login')
        }
    }
    return(
        <div className='header-cont'>
            <Link to='/' className='link'>
                <img  src='https://assets.ccbp.in/frontend/react-js/logo-img.png' alt='website logo' className='logo'/>
            </Link>
           <div className='menus-cont'>
                <Link to='/' className='link'>
                    <p className='menu-option'>Home</p>
                </Link>
                <Link to='/jobs' className='link'>
                    <p className="menu-option">Jobs</p>
                </Link>
           </div>
            <button className="logout-btn" onClick={onLogout}>Logout</button>
        </div>
    )
}

export default withRouter(Header)