import { useEffect, useState } from 'react'
import {useHistory, Link } from 'react-router-dom'
import CartItem from '../CartItem'
import Footer from '../Footer'
import Header from '../Header'
import "./index.css"

const typesList = [
  {id:1, name:"Item"},
  {id:2, name:"Quantity"},
  {id:3, name:"Price"}]


function Cart() {
  let history = useHistory()

  const [cartList, setCartList] = useState([])

  useEffect(()=>{
    let initialList = JSON.parse(localStorage.getItem("cartList"))
    if(initialList===null){
      initialList=[]
    }
    setCartList(initialList)
  }, [])

  useEffect(()=>{
    localStorage.setItem("cartList", JSON.stringify(cartList))
  }, [cartList])

  const increBtn=(id)=>{
    setCartList(prevList=>prevList.map(eachCartItem=>{
      if(eachCartItem.id===id){
        const updatedCount = eachCartItem.count + 1
        return {...eachCartItem, count:updatedCount}
      }
      return eachCartItem
    }))
  }

  const decreBtn=(id)=>{
    setCartList(prevList=>prevList.map(eachCartItem=>{
      if(eachCartItem.id===id){
        const updatedCount = eachCartItem.count - 1
        return {...eachCartItem, count:updatedCount}
      }
      return eachCartItem
    }))
  }

  const removeItem=(id)=>{
    setCartList(prevList=>prevList.filter(eachCartItem=>
      eachCartItem.id!==id))
  }

  const onClickPlaceOrder=()=>{
    history.push("/payment")
  }

let totalPriceOfCart = 0
for (let i of cartList){
  totalPriceOfCart = totalPriceOfCart + i.cost * i.count
}


  const cartItemView = ()=>{
    return <div className='cart-main'>
       <div className='cart-cont'>
        <ul className='types'>
          {typesList.map(each=><li key={each.id} className='type-item' >{each.name}</li>)}
        </ul>
        <ul className='cart-item-list'>
          {cartList.map(eachCartItem=><CartItem eachCartItem={eachCartItem} removeItem={removeItem} key={eachCartItem.id} increBtn={increBtn} decreBtn={decreBtn} />)}
        </ul>
        <hr color='#CBD2D9' className='hr' />
        <div className='total-cost-panel'>
            <h1 className='order-total-heading total'>Order Total:</h1>
            <span className='price-total'>
              <h1 className='total-price-of-cart total'>₹  {totalPriceOfCart}.00</h1>
              <button className='checkout-btn' onClick={onClickPlaceOrder}>Place Order</button>
            </span>
        </div>
        </div>
        <Footer/>
    </div>

  }

  const noItemView = ()=>{
    return <div className='no-item-cart-cont'>
        <img src='https://res.cloudinary.com/dzqa2dgzj/image/upload/v1675845284/cooking_1_arcyxq.svg' alt="empty cart" />
        <h1 className='no-order-heading'>No Order Yet!</h1>
        <p className="no-item-cart-para">Your cart is empty. Add something from the menu.</p>
        <Link to="/">
          <button className='order-now'>Order now</button>
        </Link>
    </div>
  }
  return (
    <>
    <Header/>
      {cartList.length===0?noItemView():cartItemView()}
    </>
  )
}

export default Cart