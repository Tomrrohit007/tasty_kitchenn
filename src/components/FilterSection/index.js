import './index.css'
import Loader from 'react-loader-spinner'

const FilterSection=(props)=>{
    const {profileData, employmentTypeList, salaryRangeList, profileApiStatus, callApi, sendEmploymentInfo, sendPackageInfo, employmentValue, isProfileLoading, loaderView} = props
    const {name, shortBio, profileImgUrl} = profileData
    const onClickRetry=()=>{
        callApi()
    }

    const renderProfile=()=>{
        if(profileApiStatus==='SUCCESS'){
            return <div className="profile-card">
                    <img src={profileImgUrl} alt='' className="profile-img" />
                    <h1 className="name">{name}</h1>
                    <p className="short-bio">{shortBio}</p>
                </div>
        }
        else{
            return <button className='logout-btn retry-profile-btn' onClick={onClickRetry}>Retry</button>
        }
        
    }

    const profileCard=()=>{
        return <div className='main-card'>
                    {isProfileLoading?loaderView():renderProfile()}
                </div>
    }
    const typeOfemployment=()=>{
        const addToList=(event)=>{
            const {value} = event.target
            if(employmentValue.includes(value)){
                const index = employmentValue.indexOf(value)
                employmentValue.splice(index, 1)
            }
            else{
                employmentValue.push(value)
            }
            sendEmploymentInfo(employmentValue)
        }
        return <div className='type-of-emploment-cont'>
                <h1 className='filter-type'>Type of Employment</h1>
                {employmentTypeList.map(each=>{
                const {type, textDisplay} = each
            return <div className='filter-option'>
                    <input type="checkbox" className="check-box" id={type} value={type} onChange={addToList}/>
                    <label htmlFor={type} className="label">{textDisplay}</label>
                    </div>
                    })}
                </div>
    }

    const salaryRange=()=>{
        return <div className='salary-range-cont'>
                <h1 className="filter-type">Salary Range</h1>
                {salaryRangeList.map(each=>{
                    const {textDisplay, value} = each
                    const getPackage=(event)=>{
                        sendPackageInfo(event.target.value)
                    }
                    return <div className='filter-option'>
                        <input type="radio" name='package' className="check-box" id={`${value}`} value={`${value}`} onChange={getPackage}/>
                        <label htmlFor={`${value}`} className="label">{textDisplay}</label>
                    </div>
                })}
            </div>
    }

    return(
        <div className="filter-cont">
            {profileCard()}
            <hr className='under-line' color='#6366f1'/>
            {typeOfemployment()}
            <hr className='under-line' color='#6366f1'/>
            {salaryRange()}
        </div>
    )
}

export default FilterSection