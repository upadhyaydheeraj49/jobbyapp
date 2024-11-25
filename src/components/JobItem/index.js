import {FaStar} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'

import {Link} from 'react-router-dom'
import './index.css'

const JobItem = props => {
  const {job} = props
  return (
    <li className="job-container">
      <Link to={`/jobs/${job.id}`} className="link">
        <div className="job-top-row">
          <img
            src={job.companyLogoUrl}
            alt="company logo"
            className="company-logo"
          />
          <div className="job-title-rating-container">
            <h5 className="job-title">{job.title}</h5>
            <div className="rating-container">
              <FaStar className="star" />
              <p className="rating">{job.rating}</p>
            </div>
          </div>
        </div>
        <div className="more-job-details-container">
          <div className="location-employment-container">
            <div className="more-detail-item">
              <MdLocationOn className="job-icon" />
              <p className="job-icon-label">{job.location}</p>
            </div>
            <div className="more-detail-item">
              <BsBriefcaseFill className="job-icon" />
              <p className="job-icon-label">{job.employmentType}</p>
            </div>
          </div>
          <p className="lpa">{job.packagePerAnnum}</p>
        </div>
        <hr className="line" />
        <h1 className="description-heading">Description</h1>
        <p className="job-description">{job.jobDescription}</p>
      </Link>
    </li>
  )
}
export default JobItem
