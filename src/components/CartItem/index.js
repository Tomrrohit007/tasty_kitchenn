import { BiMinus } from "react-icons/bi";
import { BsPlus } from "react-icons/bs";
import "./index.css"

function CartItem(props) {
  const { eachCartItem, increBtn, decreBtn, removeItem } = props;
  const { id, cost, count, name, imageUrl } = eachCartItem;


  const onDecreasebtn=()=>{
  count>1 && decreBtn(id)
  count ===1 && removeItem(id)    
    }  

  const onIncreasebtn=()=>{
    increBtn(id)
  }


  const foodQuantity = () => {
    return (
      <span className="food-quantity btnns">
        <button className="buttons" onClick={onDecreasebtn}>
          <BiMinus className="minus-icon" />
        </button>
        {count}
        <button className="buttons" onClick={onIncreasebtn}>
          <BsPlus className="plus-icon" />
        </button>
      </span>
    )
  }

  return (
    <li className="cart-item">
      <span className="image-name-cont">
        <img src={imageUrl} alt="" className="cart-img" />
        <h1 className="cart-item-name">{name}</h1>
      </span>
      {foodQuantity()}
        <p className="food-cost cart-item-cost">₹  {count * cost}.00</p>
    </li>
  )
}
export default CartItem;
