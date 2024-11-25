import {Link} from 'react-router-dom'
import Header from '../Header'

import './index.css'

const Home = () => (
  <div className="home-container">
    <Header />
    <div className="landing-page">
      <h1 className="landing-page-heading">Find The Job That Fits Your Life</h1>
      <p className="landing-page-description">
        Millions of people are searching for jobs, salary information, company
        reviews. Find the job that fits your abilities and potential.
      </p>
      <Link to="/jobs" className="link">
        <button className="landing-page-btn" type="button">
          Find Jobs
        </button>
      </Link>
    </div>
  </div>
)

export default Home
