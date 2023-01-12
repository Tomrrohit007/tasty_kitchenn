import './index.css'
import { BsStarFill, BsBriefcase } from 'react-icons/bs'
import { MdLocationOn } from 'react-icons/md'
const SimilarJobs=(props)=>{
    const {each} = props
  const {companyLogoUrl,employmentType, jobDescription, location, rating,title} = each
    return(
        <li className='similar-job-item'>
            <div className='logo-name-cont'>
                    <img className='company-logo' src={companyLogoUrl} alt=''/>
                    <div className='rating-cont'>
                        <h1 className="job-profile-heading">{title}</h1>
                        <p className='job-rating'><span className='star-icon'><BsStarFill/></span>{rating}</p> 
                    </div>  
            </div>
            <div className='description'>
                    <h1 className="job-profile-heading description heading">Description</h1>
                    <p className='description-para'>{jobDescription}</p>
            </div>
            <div className="location-cont cont-location">
                    <p className="location-para"><MdLocationOn className='location-icon'/>{location}</p>
                    <p className="location-para"><BsBriefcase className='location-icon bag' />{employmentType}</p>
                </div>
        </li>
    )

}


export default SimilarJobs