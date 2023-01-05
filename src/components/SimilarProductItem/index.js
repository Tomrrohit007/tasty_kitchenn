import './index.css'

const SimilarProductItem = props => {
  const {eachItem} = props
  const {imageUrl, title, brand, rating, price} = eachItem
  return (
    <li className="similar-item-cont">
      <img
        className="similar-item-image"
        src={imageUrl}
        alt="similar product"
      />
      <h1 className="similar-product-name">{title}</h1>
      <p className="similar-product-brand">by {brand}</p>
      <div className="similar-price-reviews-cont">
        <p className="similar-product-price">Rs {price}/-</p>
        <p className="rating">
          {rating}
          <img
            className="star-icon"
            src="https://assets.ccbp.in/frontend/react-js/star-img.png"
            alt=""
          />
        </p>
      </div>
    </li>
  )
}

export default SimilarProductItem
