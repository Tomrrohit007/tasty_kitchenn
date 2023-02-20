import Cookies from "js-cookie"
import { Redirect, Route } from "react-router-dom"

function ProtectedRoute(props) {
    const jwtToken = Cookies.get("jwt_token")

    if(jwtToken===undefined){
      return <Redirect to="/login" />
    }
    return <Route {...props} />

}

export default ProtectedRoute
