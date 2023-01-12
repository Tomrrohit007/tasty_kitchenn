import { Component } from "react";
import Cookies from "js-cookie";
import Header from "../Header";
import SimilarJobs from '../SimilarJobs'
import {BsStarFill, BsBriefcase} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import {FiExternalLink} from 'react-icons/fi'
import './index.css'
import Loader from "react-loader-spinner";

const apiStatusCon ={
    success:'SUCCESS',
    failed:'FAILED'
}

class JobItemDetailed extends Component{
    state={jobItemDetails:[],
        similarItems:[],
        skills:[],
        apiStatus:apiStatusCon.success,
        isLoading:false}

    componentDidMount(){
        this.getJobDetailedData()
    }


    callApi=()=>{
        this.getJobDetailedData()
    }
    getJobDetailedData= async ()=>{
        this.setState({isLoading:true})
        const jwtToken = Cookies.get('jwt_token')
        const options={
            method:'GET',
            headers:{
                Authorization:`Bearer ${jwtToken}`
            }
        }  
        const {match} = this.props
        const {params} = match
        const {id} = params
        const apiUrl = `https://apis.ccbp.in/jobs/${id}`

        const response = await fetch(apiUrl, options)
        const data = await response.json()
        const jobData={
            companyLogoUrl:data.job_details.company_logo_url,
            companyWebsiteUrl:data.job_details.company_website_url,
            employmentType:data.job_details.employment_type,
            id:data.job_details.id,
            jobDescription:data.job_details.job_description,
            lifeAtCompany:data.job_details.life_at_company,
            location:data.job_details.location,
            packagePerAnnum:data.job_details.package_per_annum,
            rating:data.job_details.rating,
            title:data.job_details.title,
            description:data.job_details.life_at_company.description,
            lifeAtCompanyImgUrl:data.job_details.life_at_company.image_url
        }


        const skills = data.job_details.skills.map(each=>({
            name:each.name,
            imageUrl:each.image_url
        }))
        let similarJobs = data.similar_jobs.map(each=>({
            companyLogoUrl:each.company_logo_url,
            employmentType:each.employment_type,
            id:each.id,
            jobDescription:each.job_description,
            location:each.location,
            rating:each.rating,
            title:each.title
        }))
        
        if(response.ok){
            this.setState({skills, similarItems:similarJobs, jobItemDetails:jobData, apiStatus:apiStatusCon.success, isLoading:false})
        }
        else{
            this.setState({apiStatus:apiStatusCon.failed, isLoading:false})
        }
        
    }
    renderSkills=()=>{
        const {skills} = this.state
        return <ul className="skill-list">
            {skills.map((each)=>{
                const {imageUrl, name} = each
                return <li className="skill-item">
                    <img src={imageUrl} alt="skill" className="skill-img" />
                    <h1 className="skill-name">{name}</h1>
            </li>
    })}
        </ul>
    }

    renderLifeAtCompany=()=>{
        const {jobItemDetails} = this.state
        const {description, lifeAtCompanyImgUrl} = jobItemDetails
        console.log(description)

        return <div className="life-at-company">
            <p className="job-description-para">{description}</p>
            <img src={lifeAtCompanyImgUrl} alt="" className="company-life-img" />
        </div>
    }
    failureView=()=>{
        return <div className="failure-container">
                    <img src="https://assets.ccbp.in/frontend/react-js/failure-img.png" alt="failure-view" className="failure-image"/>
                    <h1 className="failure-heading">Oops! Something Went Wrong</h1>
                    <p className="failure-para">We cannot seem to find the page you are looking for.</p>
                    <button className="logout-btn" onClick={this.callApi}>Retry</button>
                </div>
    }

    upperSection=()=>{
        const {jobItemDetails} = this.state
        const {companyLogoUrl, companyWebsiteUrl, employmentType, jobDescription, location, packagePerAnnum, title, rating} = jobItemDetails
        return(
            <div className='job-details-cont'>
                <div className='logo-name-cont'>
                    <img className='company-logo' src={companyLogoUrl} alt=''/>
                    <div className='rating-cont'>
                        <h1 className="job-profile-heading">{title}</h1>
                        <p className='job-rating'><span className='star-icon'><BsStarFill/></span>{rating}</p> 
                    </div>

                </div>
                <div className="location-cont">
                    <p className="location-para"><MdLocationOn className='location-icon'/>{location}</p>
                    <p className="location-para"><BsBriefcase className='location-icon bag' />{employmentType}</p>
                    <p className='package'>{packagePerAnnum}</p>
                </div>
                <hr color='#6366f1' />
                <div className='description'>
                    <div className="description-cont">
                    <h1 className="job-profile-heading">Description</h1>
                    <a className="anchor-tag" href={companyWebsiteUrl}>Visit <FiExternalLink/></a>
                    </div>
                    <p className='description-para paraa'>{jobDescription}</p>
                </div>
                <div className="skills-cont">
                    <h1 className="job-profile-heading skill-heading">Skills</h1>
                    {this.renderSkills()}
                </div>
                <div className="life-at-company-cont">
                    <h1 className="job-profile-heading">Life at Company</h1>
                    {this.renderLifeAtCompany()}
                </div>
        </div>
        )
    }

    bottomSection=()=>{
        const {similarItems} = this.state
        return <div className="bottom-cont">
                <ul className="similar-job-list">
                    {similarItems.map(each=> <SimilarJobs key={each.id} each={each} />)}
                </ul>
            </div>
    }
    successView=()=>{
        return <>
            {this.upperSection()}
            {this.bottomSection()}
        </>
    }

    renderAllView=()=>{
        const {apiStatus} = this.state
        switch (apiStatus) {
            case apiStatusCon.success:
                return this.successView()
            case apiStatusCon.failed:
                return this.failureView()
            default:
                return null
        }
    }
    loaderView=()=>{
        return  <div className="loader-container" data-testid="loader">
                    <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
                </div>
    }

    render(){
        const {isLoading} = this.state
        return(
            <div className="job-page-detail-cont">
                <Header/>
                {isLoading?this.loaderView():this.renderAllView()}
                </div>
        )
    }
}

export default JobItemDetailed