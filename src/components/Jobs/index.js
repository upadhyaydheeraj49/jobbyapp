import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import FiltersGroup from '../FiltersGroup'
import JobItem from '../JobItem'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Jobs extends Component {
  state = {
    jobsApiStatus: apiStatusConstants.initial,
    userProfileApiStatus: apiStatusConstants.initial,
    jobList: [],
    userProfileData: {},
    searchQuery: '',
    employmentType: [],
    minimumPackage: '1000000',
  }

  componentDidMount() {
    this.getUserProfile()
    this.getJobsData()
  }

  getJobsData = async () => {
    this.setState({jobsApiStatus: apiStatusConstants.inProgress})
    const {searchQuery, employmentType, minimumPackage} = this.state
    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentType.join(
      ',',
    )}&minimum_package=${minimumPackage}&search=${searchQuery}`
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
      const {jobs} = data
      const jobList = jobs.map(job => ({
        companyLogoUrl: job.company_logo_url,
        employmentType: job.employment_type,
        id: job.id,
        jobDescription: job.job_description,
        location: job.location,
        packagePerAnnum: job.package_per_annum,
        rating: job.rating,
        title: job.title,
      }))
      this.setState({jobList, jobsApiStatus: apiStatusConstants.success})
    } else {
      this.setState({jobsApiStatus: apiStatusConstants.failure})
    }
  }

  getUserProfile = async () => {
    this.setState({userProfileApiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch('https://apis.ccbp.in/profile', options)
    if (response.ok === true) {
      const userData = await response.json()
      const profileDetails = userData.profile_details
      const userProfileData = {
        name: profileDetails.name,
        profileImageUrl: profileDetails.profile_image_url,
        shortBio: profileDetails.short_bio,
      }
      this.setState({
        userProfileData,
        userProfileApiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({userProfileApiStatus: apiStatusConstants.failure})
    }
  }

  updateSalaryRange = event => {
    const {id} = event.target
    this.setState({minimumPackage: id}, this.getJobsData)
  }

  updateEmploymentType = event => {
    const selectedId = event.target.id
    const isChecked = event.target.checked
    if (isChecked === true) {
      this.setState(
        prevState => ({
          employmentType: [...prevState.employmentType, selectedId],
        }),
        this.getJobsData,
      )
    } else {
      const {employmentType} = this.state
      const updatedEmploymentTypeList = employmentType.filter(
        item => item !== selectedId,
      )
      this.setState(
        {employmentType: updatedEmploymentTypeList},
        this.getJobsData,
      )
    }
  }

  updateSearchQuery = event => {
    this.setState({searchQuery: event.target.value})
  }

  onClickSearchButton = () => {
    this.getJobsData()
  }

  renderUserProfile = () => {
    const {userProfileData, userProfileApiStatus} = this.state
    if (userProfileApiStatus === apiStatusConstants.success) {
      const {name, profileImageUrl, shortBio} = userProfileData
      return (
        <div className="profile-container">
          <img src={profileImageUrl} alt="profile" className="profile-img" />
          <h4 className="profile-name">{name}</h4>
          <p className="profile-bio">{shortBio}</p>
        </div>
      )
    } else if (userProfileApiStatus === apiStatusConstants.failure) {
      return (
        <div className="profile-failure-container">
          <button className="retry-btn" onClick={this.getUserProfile}>
            Retry
          </button>
        </div>
      )
    } else if (userProfileApiStatus === apiStatusConstants.inProgress) {
      return <div className="user-profile-progress-view"></div>
    }
    return null
  }

  renderJobList = () => {
    const {jobList, searchQuery} = this.state
    const isListEmpty = jobList.length === 0
    return (
      <div className="jobs-right-side-container">
        <div className="search-container-lg">
          <input
            type="search"
            className="searchEl"
            placeholder="Search"
            id="searchEl"
            value={searchQuery}
            onChange={this.updateSearchQuery}
          />
          <button
            type="button"
            data-testid="searchButton"
            className="search-btn"
            onClick={this.onClickSearchButton}
          >
            <BsSearch className="search-icon" />
          </button>
        </div>
        !isListEmpty &&{' '}
        <ul className="jobs-container">
          {jobList.map(job => (
            <JobItem job={job} key={job.id} />
          ))}
        </ul>
        isListEmpty && {this.renderNoJobsView()}
      </div>
    )
  }

  renderSideBar = () => (
    <div className="jobs-side-bar">
      <div className="search-container-sm">
        <input type="search" className="searchEl" placeholder="Search" />
        <button type="button" data-testid="searchButton" className="search-btn">
          <BsSearch className="search-icon" />
        </button>
      </div>
      {this.renderUserProfile()}
      <FiltersGroup
        salaryRangesList={salaryRangesList}
        employmentTypesList={employmentTypesList}
        updateSalaryRange={this.updateSalaryRange}
        updateEmploymentType={this.updateEmploymentType}
      />
    </div>
  )

  renderLoadingView = () => {
    return (
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    )
  }

  renderFailureView = () => (
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
      <button className="retry-btn" onClick={this.getJobsData}>
        Retry
      </button>
    </div>
  )

  renderNoJobsView = () => (
    <div className="jobs-failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="failure-img"
      />
      <h5 className="failure-heading">No Jobs Found</h5>
      <p className="failure-description">
        We could not find any jobs. Try other filters
      </p>
    </div>
  )

  renderRightSideView = () => {
    const {jobsApiStatus} = this.state
    if (jobsApiStatus === apiStatusConstants.inProgress) {
      return this.renderLoadingView()
    } else if (jobsApiStatus === apiStatusConstants.success) {
      return this.renderJobList()
    } else if (jobsApiStatus === apiStatusConstants.failure) {
      return this.renderFailureView()
    }
    return null
  }

  render() {
    return (
      <div className="jobs-main-page">
        <Header />
        <div className="jobs-page">
          {this.renderSideBar()}
          {this.renderRightSideView()}
        </div>
      </div>
    )
  }
}
export default Jobs
