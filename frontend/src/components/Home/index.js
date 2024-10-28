import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = () => (
  <>
    <Header />
    <div className="homecon">
      <div className="homecon1">
        <h1 className="homeheading">Find The Job That Fits Your Life</h1>
        <p className="homepara">
          Millions of people are searching for jobs,salary information,company
          reviews.Find the job that fits your abilities and potential.
        </p>
        <Link to="/jobs">
          <button type="button" className="homebutton">
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
  </>
)
export default Home
