import './index.css'
import { Link } from 'react-router-dom'
import {BsStarFill, BsBriefcase} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'

const AllJobsList=(props)=>{
    const {each} = props
    const {location, id, title, rating, companyLogoUrl, jobDescription, packagePerAnnum,employmentType} = each
    return(
        <Link to={`/jobs/${id}`} className='link'>
            <li className="job-item">
            <div className='-job-details-cont'>
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
                    <h1 className="job-profile-heading">Description</h1>
                    <p className='description-para'>{jobDescription}</p>
                </div>
            </div>
        </li>
        </Link>
    )
}

export default AllJobsList