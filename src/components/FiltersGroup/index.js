import {BsSearch} from 'react-icons/bs'
import './index.css'

const FiltersGroup = (props) => {
  const renderFilteredCategoryList=()=>{
    const {categoryOptions} = props
    return categoryOptions.map(each=>{
      const {selectCategory, activeCategory} = props
      const selectItem=()=>{
        selectCategory(each.categoryId)
      }
      const activeClass = activeCategory===each.categoryId?'active-category-name category-name':'category-name'

      return(
        <li className='category-item' onClick={selectItem}>
            <p className={activeClass}>{each.name}</p>
        </li>
      )
      })
  }

  const renderFilteredCategory=()=>{
    return(
      <>
      <h1 className='category-heading'>Category</h1>
      <ul className='categories-list'>{renderFilteredCategoryList()}</ul>
      </>
    )
  }

  const renderFilteredRatingList=()=>{
    const {ratingsList, selectRating, activeRating} = props
    return ratingsList.map(each=>{
      const selectRate = ()=>{
        selectRating(each.ratingId)
      }
      const activeClass  = activeRating===each.ratingId?'and-up active-rating':'and-up'
      return(
      <li className='rating-item' onClick={selectRate}>
        <img className='rating-img' src={each.imageUrl} alt='' />
        <p className={activeClass}>and up</p>
      </li>
     
    )})
  }
  
  const renderFilteredRating=()=>{
    return(
      <>
        <h1 className='rating-heading'>Rating</h1>
        <ul className='ratings-list'>{renderFilteredRatingList()}</ul>
      </>
    )
  }

  const searchBar=()=>{
    const {changeSearchInput, searchInput}=props
    
    const onPressEnter=(event)=>{
      if(event.key==='Enter'){
        changeSearchInput(event.target.value)
      }
      
    }

    return(
      <div className='search-input-container '>
        <input
         className='search-input'
          onKeyDown={onPressEnter}
          value={searchInput}
          placeholder='Search'/>
        <BsSearch className='search-icon' />
      </div>
    )
  }
  const {clearAllFilters} = props

  return(
    <div className='filters-group-container'>
      {searchBar()}
      {renderFilteredCategory()}
      {renderFilteredRating()}
      <button className='clear-filters-btn' onClick={clearAllFilters}>Clear Filters</button>
    </div>
  )




}

export default FiltersGroup
