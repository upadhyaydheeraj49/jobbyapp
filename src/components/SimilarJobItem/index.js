import {FaStar} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import './index.css'

const SimilarJobItem = props => {
  const {job} = props
  return (
    <li className="similar-job-container">
      <div className="job-top-row">
        <img
          src={job.companyLogoUrl}
          alt="similar job company logo"
          className="company-logo"
        />
        <div className="job-title-rating-container">
          <h2 className="job-title">{job.title}</h2>
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
      <h4 className="description-heading">Description</h4>
      <p className="job-description">{job.jobDescription}</p>
    </li>
  )
}
export default SimilarJobItem
