import {Component} from 'react'
import SimilarProductItem from '../SimilarProductItem'
import Header from '../Header'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import './index.css'

const apiStatusConstants = {
  intial: 'INTIAL',
  success: 'SUCCESS',
  failed: 'FAILED',
}

class ProductItemDetails extends Component {
  state = {
    productDetails: {},
    similarProducts: [],
    count: 1,
    isLoading: false,
    apiStatus: apiStatusConstants.intial,
  }

  componentDidMount() {
    this.getProductDetails()
  }

  increCount = () => {
    this.setState(prevState => ({count: prevState.count + 1}))
  }
  decreCount = () => {
    const {count} = this.state
    if (count > 1) {
      this.setState(prevState => ({count: prevState.count - 1}))
    }
  }

  renderLoadingView = () => (
    <div className="products-loader-container" testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )
  onClickContinueShopping = () => {
    const {history} = this.props
    history.replace('/products')
  }

  getProductDetails = async () => {
    this.setState({isLoading: true})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/products/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    const updatedData = {
      id: data.id,
      imageUrl: data.image_url,
      description: data.description,
      brand: data.brand,
      price: data.price,
      rating: data.rating,
      similarProducts: data.similar_products,
      title: data.title,
      availability: data.availability,
      totalReviews: data.total_reviews,
    }
    this.setState({isLoading: false})
    if (response.ok) {
      this.setState({
        productDetails: updatedData,
        apiStatus: apiStatusConstants.success,
      })
      this.changeCase(data.similar_products)
    } else {
      this.setState({apiStatus: apiStatusConstants.failed})
    }
  }
  changeCase = similar_products => {
    let similarProducts = similar_products.map(data => ({
      id: data.id,
      imageUrl: data.image_url,
      description: data.description,
      brand: data.brand,
      price: data.price,
      rating: data.rating,
      similarProducts: data.similar_products,
      title: data.title,
      availability: data.availability,
      totalReviews: data.total_reviews,
    }))
    this.setState({similarProducts})
  }

  renderSucessView = () => {
    const {productDetails, count, similarProducts} = this.state
    const {
      imageUrl,
      title,
      totalReviews,
      brand,
      description,
      availability,
      rating,
      price,
    } = productDetails
    return (
      <div className="main-product-details-cont">
        <div className="upper-section">
          <img className="product-img" src={imageUrl} alt="product" />
          <div className="description-cont">
            <h1 className="product-heading">{title}</h1>
            <p className="product-price">Rs {price}/-</p>
            <div className="review-cont">
              <p className="rating">
                {rating}
                <img
                  className="star-icon"
                  src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                  alt=""
                />
              </p>
              <p className="reviews">{totalReviews} Reviews</p>
            </div>
            <p className="description">{description}</p>
            <p className="stock-available">
              Available: <p className="brand">{availability}</p>
            </p>
            <p className="brand-name ">
              Brand: <p className="brand">{brand}</p>
            </p>
            <hr className="line" />
            <div className="incre-cont">
              <button
                className="minus"
                onClick={this.decreCount}
                testid="minus"
              >
                <BsDashSquare />
              </button>
              <p className="quantity-adjust">{count}</p>
              <button className="plus" onClick={this.increCount} testid="plus">
                <BsPlusSquare />
              </button>
            </div>
            <button className="add-to-cart-btn">ADD TO CART</button>
          </div>
        </div>
        <div className="bottom-section">
          <h1 className="similar-product-heading">Similar Products</h1>
          <ul className="similar-product-list">
            {similarProducts.map(eachItem => (
              <SimilarProductItem eachItem={eachItem} key={eachItem.id} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  renderFailedView = () => {
    return (
      <div className="main-product-details-cont">
        <img
          className="failed-img"
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
          alt="failure view"
        />
        <h1 className="failed-heading">Product Not Found</h1>
        <button
          className="continue-shopping-btn"
          onClick={this.onClickContinueShopping}
        >
          Continue Shopping
        </button>
      </div>
    )
  }

  renderAllView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSucessView()
      case apiStatusConstants.failed:
        return this.renderFailedView()
      default:
        return null
    }
  }

  render() {
    const {isLoading} = this.state
    return (
      <div className="product-item-details">
        <Header />
        {isLoading ? this.renderLoadingView() : this.renderAllView()}
      </div>
    )
  }
}
export default ProductItemDetails
