import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import FiltersGroup from '../FiltersGroup'
import ProductCard from '../ProductCard'
import ProductsHeader from '../ProductsHeader'

import './index.css'

const categoryOptions = [
  {
    name: 'Clothing',
    categoryId: '1',
  },
  {
    name: 'Electronics',
    categoryId: '2',
  },
  {
    name: 'Appliances',
    categoryId: '3',
  },
  {
    name: 'Grocery',
    categoryId: '4',
  },
  {
    name: 'Toys',
    categoryId: '5',
  },
]

const sortbyOptions = [
  {
    optionId: 'PRICE_HIGH',
    displayText: 'Price (High-Low)',
  },
  {
    optionId: 'PRICE_LOW',
    displayText: 'Price (Low-High)',
  },
]

const ratingsList = [
  {
    ratingId: '4',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-four-stars-img.png',
  },
  {
    ratingId: '3',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-three-stars-img.png',
  },
  {
    ratingId: '2',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-two-stars-img.png',
  },
  {
    ratingId: '1',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-one-star-img.png',
  },
]

const apiStatusConstant={
  intial:'INTIAL',
  success:'SUCCESS',
  failure:'FAILURE',
}

class AllProductsSection extends Component {
  state = {
    productsList: [],
    isLoading: false,
    activeOptionId: sortbyOptions[0].optionId,
    activeCategory:'',
    activeRating:'',
    searchInput:'',
    apiStatus:apiStatusConstant.intial
  }

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    this.setState({
      isLoading: true,
    })
    const jwtToken = Cookies.get('jwt_token')

    // TODO: Update the code to get products with filters applied

    const {activeOptionId, activeCategory, activeRating, searchInput} = this.state
    const apiUrl = `https://apis.ccbp.in/products?sort_by=${activeOptionId}&category=${activeCategory}&title_search=${searchInput}&rating=${activeRating}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.products.map(product => ({
        title: product.title,
        brand: product.brand,
        price: product.price,
        id: product.id,
        imageUrl: product.image_url,
        rating: product.rating,
      }))
      this.setState({
        productsList: updatedData,
        isLoading: false,
        apiStatus:apiStatusConstant.success
        })
    }
    else{
      this.setState({apiStatus:apiStatusConstant.failure})
    }
  }

  renderFailureView = () => (
    <div className="products-error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
        alt="products failure"
        className="products-failure-img"
      />
      <h1 className="product-failure-heading-text">
        Oops! Something Went Wrong
      </h1>
      <p className="products-failure-description">
        We are having some trouble processing your request. Please try again.
      </p>
    </div>
  )

  selectCategory=(categoryId)=>{
    this.setState({activeCategory:categoryId}, this.getProducts)
  }

  selectRating=(ratingId)=>{
    this.setState({activeRating:ratingId}, this.getProducts)
  }
  changeSearchInput=(value)=>{
    this.setState({searchInput:value}, this.getProducts)
  }
  clearAllFilters=()=>{
    this.setState({searchInput:'', activeCategory:'', activeRating:''}, this.getProducts)
  }

  changeSortby = activeOptionId => {
    this.setState({activeOptionId}, this.getProducts)
  }

  renderProductsList = () => {
    const {productsList, activeOptionId} = this.state

    // TODO: Add No Products View
    return (
      <div className="all-products-container">
        <ProductsHeader
          activeOptionId={activeOptionId}
          sortbyOptions={sortbyOptions}
          changeSortby={this.changeSortby}
        />
        <ul className="products-list">

          {productsList.length>0 && productsList.map(product => (
            <ProductCard productData={product} key={product.id} />
          ))}
          {productsList.length===0 && <div className='no-product-cont'>
          <img src='https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png' alt='no products'/>
          <h1 className='no-product-heading'>No Products Found</h1>
          <p className='and-up'>We could not find any products. Try other filters</p>
          </div>}
        </ul>
      </div>
    )
  }

  renderProductsListView=()=>{
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstant.success:
        return this.renderProductsList()
      case apiStatusConstant.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  renderLoader = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  // TODO: Add failure view

  render() {
    const {isLoading, activeCategory, activeRating, searchInput} = this.state

    return (
      <div className="all-products-section">
        <FiltersGroup
        categoryOptions={categoryOptions}
        ratingsList={ratingsList}
        selectCategory={this.selectCategory}
        activeCategory={activeCategory}
        selectRating={this.selectRating}
        activeRating={activeRating}
        changeSearchInput={this.changeSearchInput}
        clearAllFilters = {this.clearAllFilters}
        searchInput = {searchInput}
        />

        {isLoading?this.renderLoader():this.renderProductsListView()} 
        
      </div>
    )
  }
}

export default AllProductsSection
