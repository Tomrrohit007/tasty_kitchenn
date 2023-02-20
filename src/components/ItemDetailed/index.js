import { useState, useEffect } from "react";
import { BsStarFill } from "react-icons/bs";
import AvailableFood from "../AvailableFood";
import LoaderComp from "../Loader";
import Header from "../Header"
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import Footer from "../Footer";
import "./index.css";


function ItemDetailed() {

  let initialList = JSON.parse(localStorage.getItem("cartList"))
  if(initialList===null){
    initialList = []
  }

  const { id } = useParams()
  const [foodList, setFoodList] = useState([]);
  const [itemList, setItemList] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [cartList, setCartList] = useState(initialList)

  const onAddToList = (item) => {
    const isPresent = cartList.some(eachItem=>eachItem.id===item.id)

    if (isPresent) {
      setCartList((prevList) =>
        prevList.map((eachCartItem) => {
          if (eachCartItem.id === item.id) {
            const updatedCount = eachCartItem.count + item.count;
            return { ...eachCartItem, count: updatedCount };
          }
          return eachCartItem;
        })
      );
    } else {
      setCartList(prevList => [...prevList, item]);
    }
  }

  const onIncreaseCount=(itemId)=>{
     setCartList(prevList=>prevList.map(eachItem=>{
      if(eachItem.id===itemId){
        const updatedCount = eachItem.count + 1
        return {...eachItem, count:updatedCount}
      }
      return eachItem
    }))
  }

  const onDecreaseCount=(itemId)=>{
    setCartList(prevList=> prevList.map(eachItem=>{
      if(eachItem.id===itemId){
        const updatedCount = eachItem.count - 1
        return {...eachItem, count:updatedCount}
      }

      return eachItem
    }))
  }

  useEffect(()=>{
    const finalList = cartList.filter(eachItem=>eachItem.count!==0)
    localStorage.setItem("cartList", JSON.stringify(finalList))
  }, [cartList])

  // API CALL
  useEffect(() => {
    const getRestaurantDetails = async () => {
      setLoading(true)
      const apiUrl = `https://apis.ccbp.in/restaurants-list/${id}`;
      const jwtToken = Cookies.get("jwt_token");
      const options = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        method: "GET",
      };
      const response = await fetch(apiUrl, options);

      if(response.ok){
        const data = await response.json();
        const { food_items } = data;
        const foodItemList = food_items.map((eachItem) => ({
        name: eachItem.name,
        id: eachItem.id,
        imageUrl: eachItem.image_url,
        rating: eachItem.rating,
        cost: eachItem.cost,
        foodType: eachItem.food_type,
      }));
      const itemList = {
        costOfTwo: data.cost_for_two,
        cuisine: data.cuisine,
        itemId: data.id,
        itemsCount: data.items_count,
        name: data.name,
        location: data.location,
        opensAt: data.opens_at,
        reviewsCount: data.reviews_count,
        rating: data.rating,
        imageUrl: data.image_url,
      };
      setFoodList(foodItemList);
      setItemList(itemList);
      setLoading(false)

    }
    };
    getRestaurantDetails();
  }, [id]);

  //Intro section

  const introSection = () => {
    const {
      costOfTwo,
      cuisine,
      name,
      location,
      reviewsCount,
      rating,
      imageUrl,
    } = itemList;
    return (
      <div className="upper-section-cont">
        <div className="upper-section-inner-cont">
          <img src={imageUrl} alt="" className="main-img" />
          <div className="detail">
            <h1 className="food-item-name">{name}</h1>
            <p className="location">{cuisine}</p>
            <p className="location">{location}</p>
            <div className="detailss-cont">
              <div className="itemss">
                <p className="location nnn">
                  <BsStarFill className="starrr" />
                  {rating}
                </p>
                <p className="locationn">{reviewsCount} - Ratings</p>
              </div>
              <div className="vertical-line" alt="" />
              <div className="itemss">
                <p className="location nnn">₹ {costOfTwo}</p>
                <p className="locationn">Cost of two</p>
              </div>
            </div>
          </div>
          <div className="content"></div>
        </div>
      </div>
    );
  };

  // Main render
  return (
    <>
    <Header/>
      {isLoading ? (
        <LoaderComp/>
      ) : (
        <div className="item-detailed-cont">
          {introSection()}
          <ul className="food-items-list">
            {foodList.map((eachItem) => (
              <AvailableFood foodItemData={eachItem} key={eachItem.id} onIncreaseCount={onIncreaseCount} onDecreaseCount={onDecreaseCount} onAddToList={onAddToList}/>
            ))}
          </ul>
          <Footer/>
        </div>
      )}
    </>
  )
}
export default ItemDetailed