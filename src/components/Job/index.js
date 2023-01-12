import Cookies from "js-cookie"
import { Component } from "react"
import Header from "../Header"
import AllJobsList from '../AllJobsList'
import FilterSection from '../FilterSection'
import Loader from "react-loader-spinner"
import './index.css'
import { BsSearch } from "react-icons/bs"

const employmentTypeList=[
    {
        textDisplay:'Full Time',
        type:'FULLTIME'
    },
    {
        textDisplay:'Part Time',
        type:'PARTTIME'
    },
    {
        textDisplay:'Freelance',
        type:'FREELANCE'
    },
    
    {
        textDisplay:'Internship',
        type:'INTERNSHIP'
    }
    
]

const salaryRangeList=[
    {
        textDisplay:'10 LPA and above',
        value:'1000000'
    },
    {
        textDisplay:'20 LPA and above',
        value:'2000000'
    },
    {
        textDisplay:'30 LPA and above',
        value:'3000000'
    },
    
    {
        textDisplay:'40 LPA and above',
        value:'4000000'
    }
    
]

const apiStatusConstant={
    success:'SUCCESS',
    failed:'FAILED',
    noData:'NODATA'
}




class Job extends Component{
    state={
        profileData:{},
        jobsList:[],
        isProfileLoading:false, 
        isListLoading:false,
        apiStatus:'',
        profileApiStatus:'',
        employmentFilter:[],
        packageRange:'',
        searchInput:'',
    }

    componentDidMount(){
        this.getProfileData()
        this.getJobsList()
    }
callApi=()=>{
        this.getProfileData()
        this.getJobsList()
    }

// ON PRESS ENTER
checkEnter=(event)=>{
    if(event.key==='Enter'){
        this.getJobsList()
    }
}
enterPressed=()=>{
    this.getJobsList()
}

onSearch=(event)=>{
    this.setState({searchInput:event.target.value})
}


// EMPLOYMENT QUERY
sendEmploymentInfo=(emplomentArray)=>{
    this.setState({employmentFilter:emplomentArray}, this.getJobsList)
    
    }

// GET EMPLOYMENT DETAILS

sendPackageInfo=(value)=>{
    this.setState({packageRange:value}, this.getJobsList)
    
}

//GET PROFILE DETAILS API CALL

    getProfileData=async()=>{
        this.setState({isProfileLoading:true})
        const jwtToken = Cookies.get('jwt_token')
        const options={
            method:'GET',
            headers:{
                Authorization:`Bearer ${jwtToken}`
            }
        }
        const response = await fetch('https://apis.ccbp.in/profile', options)
        const fetchedData = await response.json()

        const profileData={
            profileImgUrl:fetchedData.profile_details.profile_image_url,
            name:fetchedData.profile_details.name,
            shortBio:fetchedData.profile_details.short_bio
        }
        if(response.ok){
            this.setState({profileData:profileData, profileLoad:true, profileApiStatus:apiStatusConstant.success, isProfileLoading:false})
        }
        else{
        this.setState({ profileLoad:false, profileApiStatus:apiStatusConstant.failed, isProfileLoading:false})
        }
    }

// GET JOB LIST API CALL

    getJobsList=async()=>{
        this.setState({isListLoading:true})
        const {employmentFilter, packageRange, searchInput} = this.state
        const joinedStringOfEmploymentFilter = employmentFilter.join()
        const jwtToken = Cookies.get('jwt_token')
        const options={
            method:'GET',
            headers:{
                Authorization:`Bearer ${jwtToken}`
            }
        }  
        const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${joinedStringOfEmploymentFilter}&minimum_package=${packageRange}&search=${searchInput}`
        const response = await fetch(apiUrl, options)
        const fetchedData = await response.json()
        const updatedData = fetchedData.jobs.map(each=>({
            companyLogoUrl:each.company_logo_url,
            employmentType:each.employment_type,
            jobDescription:each.job_description,
            packagePerAnnum:each.package_per_annum,
            id:each.id,
            location:each.location,
            title:each.title,
            rating:each.rating
        }))
        if(response.ok){
            if(updatedData.length<1){
                this.setState({apiStatus:apiStatusConstant.noData})
            }
            else{
                this.setState({apiStatus:apiStatusConstant.success})
            }
            this.setState({jobsList:updatedData, isListLoading:false})
        }
        else{
            this.setState({apiStatus:apiStatusConstant.failed,  isListLoading:false})
        }
        
    }

// LOADER VIEW
    loaderView=()=>{
        return  <div className="loader-container" data-testid="loader">
                    <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
                </div>
    }

// JOB LIST FAILURE VIEW
    jobListfailureView=()=>{
        return <div className="failure-cont">
                    <img src="https://assets.ccbp.in/frontend/react-js/failure-img.png" alt="failure-view" className="failure-img"/>
                    <h1 className="failure-heading">Oops! Something Went Wrong</h1>
                    <p className="failure-para">We cannot seem to find the page you are looking for.</p>
                    <button className="logout-btn" onClick={this.callApi}>Retry</button>
                </div>
    }
// JOB LIST SUCCESS VIEW
    jobListSuccessView=()=>{
        const {jobsList}= this.state
        return(<ul className="job-list">
            {jobsList.map(each=>
                <AllJobsList each={each} key={each.id}/>)}
        </ul>)
    }
// NO JOBS FOUND SECTION 
    noJobsFoundView=()=>{
        return <div className="no-job-cont">
                    <img src="https://assets.ccbp.in/frontend/react-js/failure-img.png" alt="failure-view" className="no-job-img"/>
                    <h1 className="no-job-heading">No Jobs Found</h1>
                    <p className="no-job-para">We could not find any jobs. Try other filters</p>
                </div>
    }

// GET ALL VIEWS
    getAllView=()=>{
        const {apiStatus}=this.state
        switch (apiStatus) {
            case apiStatusConstant.success:
                return this.jobListSuccessView()
            case apiStatusConstant.noData:
                return this.noJobsFoundView()
            case apiStatusConstant.failed:
                return this.jobListfailureView()
            default:
                return null
        }

    }

// FINAL VIEW
    finalView=()=>{
        const { profileData, profileApiStatus, employmentFilter, isListLoading, isProfileLoading} = this.state
        return <div className="job-main-cont">
        <FilterSection 
        profileApiStatus={profileApiStatus}
        profileData={profileData}
        employmentTypeList={employmentTypeList}
        salaryRangeList={salaryRangeList}
        callApi={this.callApi}
        sendEmploymentInfo={this.sendEmploymentInfo}
        sendPackageInfo={this.sendPackageInfo}
        employmentValue = {employmentFilter}
        isProfileLoading={isProfileLoading}
        loaderView={this.loaderView}
        />
        <div className="job-section">
            <div className="search-cont">
                <input type="search" className="search-input" onKeyDown={this.checkEnter} onChange={this.onSearch}/>
                <button className="search-btn" onClick={this.enterPressed}>
                    <BsSearch className="search-icon" />
                </button>
            </div>
            {isListLoading?this.loaderView():this.getAllView()}
        </div>
    </div>
    }



    render(){
        return(
            <>
            <Header/>
            {this.finalView()}
            </>
        )
    }
}


export default Job