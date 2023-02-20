import React from "react"
import "./App.css"
import { Switch, Route, Redirect } from "react-router-dom"

import LoginPage from "./components/LoginPage"
import Home from "./components/Home"
import ItemDetailed from "./components/ItemDetailed"
import Cart from "./components/Cart"
import NotFound from "./components/NotFound"

import ProtectedRoute from "./components/ProtectedRoute"
import PaymentPage from "./components/PaymentPage"

function App() {
  return (
    <>
    <Switch>
        <Route path="/login" component={LoginPage} />
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute exact path="/cart" component={Cart} />
        <ProtectedRoute exact path="/restaurant/:id" component={ItemDetailed} />
        <ProtectedRoute exact path="/payment" component={PaymentPage} />
        <ProtectedRoute exact path="/not-found" component={NotFound} />
        <Redirect to="/not-found" />
    </Switch>
    </>
  )
}

export default App
