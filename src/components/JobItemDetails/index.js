import {Component} from 'react'
import Cookies from 'js-cookie'
import {FaStar} from 'react-icons/fa'
import {BsBoxArrowUpRight} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import SimilarJobItem from '../SimilarJobItem'
import './index.css'

class JobItemDetails extends Component {
  state = {
    apiStatus: 'INITIAL',
    jobDetails: {},
    similarJobsList: [],
  }

  componentDidMount() {
    this.getJobData()
  }

  convertToCamelCase = job => ({
    companyLogoUrl: job.company_logo_url,
    employmentType: job.employment_type,
    id: job.id,
    jobDescription: job.job_description,
    location: job.location,
    rating: job.rating,
    title: job.title,
  })

  getJobData = async () => {
    this.setState({apiStatus: 'IN_PROGRESS'})
    const {match} = this.props
    const {id} = match.params
    const url = `https://apis.ccbp.in/jobs/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const job = data.job_details
      const jobDetails = {
        companyLogoUrl: job.company_logo_url,
        companyWebsiteUrl: job.company_website_url,
        employmentType: job.employment_type,
        id: job.id,
        jobDescription: job.job_description,
        skills: job.skills,
        lifeAtCompany: job.life_at_company,
        location: job.location,
        packagePerAnnum: job.package_per_annum,
        rating: job.rating,
        title: job.title,
      }
      const similarJobsList = data.similar_jobs.map(jobData =>
        this.convertToCamelCase(jobData),
      )
      this.setState({jobDetails, similarJobsList, apiStatus: 'SUCCESS'})
    } else {
      this.setState({apiStatus: 'FAILURE'})
    }
  }

  renderJobDetails = () => {
    const {jobDetails, similarJobsList} = this.state
    return (
      <div className="job-details-section">
        <div className="job-details-container">
          <div className="job-top-row">
            <img
              src={jobDetails.companyLogoUrl}
              alt=" job details company logo"
              className="company-logo"
            />
            <div className="job-title-rating-container">
              <h5 className="job-title">{jobDetails.title}</h5>
              <div className="rating-container">
                <FaStar className="star" />
                <p className="rating">{jobDetails.rating}</p>
              </div>
            </div>
          </div>
          <div className="more-job-details-container">
            <div className="location-employment-container">
              <div className="more-detail-item">
                <MdLocationOn className="job-icon" />
                <p className="job-icon-label">{jobDetails.location}</p>
              </div>
              <div className="more-detail-item">
                <BsBriefcaseFill className="job-icon" />
                <p className="job-icon-label">{jobDetails.employmentType}</p>
              </div>
            </div>
            <p className="lpa">{jobDetails.packagePerAnnum}</p>
          </div>
          <hr className="line" />
          <div className="description-web-visit-container">
            <h1 className="description-heading">Description</h1>
            <a className="visit-link" href={jobDetails.companyWebsiteUrl}>
              <p className="visit-text">Visit</p>
              <BsBoxArrowUpRight className="visit-arrow-icon" />
            </a>
          </div>

          <p className="job-description">{jobDetails.jobDescription}</p>
          <h4 className="skills-heading">Skills</h4>
          <ul className="skills-container">
            {jobDetails.skills.map(skill => (
              <li className="skill-item" key={skill.name}>
                <img
                  src={skill.image_url}
                  alt={skill.name}
                  className="skill-img"
                />
                <p className="skill-name">{skill.name}</p>
              </li>
            ))}
          </ul>
          <h1 className="life-at-company-heading">Life at Company</h1>
          <div className="lac-container">
            <p className="lac-description">
              {jobDetails.lifeAtCompany.description}
            </p>
            <img
              src={jobDetails.lifeAtCompany.image_url}
              alt="life at company"
              className="lac-img"
            />
          </div>
        </div>
        <h4 className="similar-jobs-heading">Similar Jobs</h4>
        <ul className="similar-jobs-container">
          {similarJobsList.map(job => (
            <SimilarJobItem key={job.id} job={job} />
          ))}
        </ul>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#fff" width={50} height={50} />
    </div>
  )

  renderFailureView = () => {
    return (
      <div className="jobs-failure-view">
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
          className="failure-img"
        />
        <h5 className="failure-heading">Oops! Something Went Wrong</h5>
        <p className="failure-description">
          We cannot seem to find the page you are looking for.
        </p>
        <button className="retry-btn" onClick={this.getJobData}>
          Retry
        </button>
      </div>
    )
  }

  renderResult = () => {
    const {apiStatus} = this.state
    if (apiStatus === 'SUCCESS') {
      return this.renderJobDetails()
    } else if (apiStatus === 'IN_PROGRESS') {
      return this.renderLoadingView()
    } else if (apiStatus === 'FAILURE') {
      return this.renderFailureView()
    }
    return null
  }

  render() {
    return (
      <div className="job-details-main-container">
        <Header />
        {this.renderResult()}
      </div>
    )
  }
}
export default JobItemDetails
