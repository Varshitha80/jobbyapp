import {Component} from 'react'
import {BsStar, BsFillBriefcaseFill} from 'react-icons/bs'
import { FaLocationDot } from "react-icons/fa6";
import { FiExternalLink } from "react-icons/fi";
import {Rings} from 'react-loader-spinner'
import { useParams } from 'react-router-dom'
import Header from '../Header'
import Similarjobs from '../Similarjobs'
import Skilldetails from '../Skilldetails'
import './index.css'


const withRouter = (Component) => {
  const Wrapper = (props) => {
    const params = useParams();
    return <Component {...props} params={params} />
  }
  return Wrapper;
}
class Jobitemdetails extends Component {
  state = {
    jobdetailsdata: [],
    similarjobsdata: [],
    skillsdata: [],
    isloading: true,
    urlfail: false,
  }

  componentDidMount() {
    this.getjobdetailsdata()
  }

  getjobdetailsdata = async () => {
    const {id} = this.props.params
    const jwtToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhaHVsIiwicm9sZSI6IlBSSU1FX1VTRVIiLCJpYXQiOjE2MjMwNjU1MzJ9.D13s5wN3Oh59aa_qtXMo3Ec4wojOx0EZh8Xr5C5sRkU"
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      const updatedjobdetailsdata = {
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        id: data.job_details.id,
        jobDescription: data.job_details.job_description,
        title: data.job_details.title,
        lifeatcompanydesc: data.job_details.life_at_company.description,
        lifeatcompanyimageurl: data.job_details.life_at_company.image_url,
        location: data.job_details.location,
        packageperannum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
      }
      const updatedsimilarjobsdata = data.similar_jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        rating: each.rating,
        title: each.title,
      }))
      const updatedskillsdata = data.job_details.skills.map(eachskill => ({
        id: eachskill.id,
        imageUrl: eachskill.image_url,
        name: eachskill.name,
      }))
      this.setState({
        jobdetailsdata: updatedjobdetailsdata,
        similarjobsdata: updatedsimilarjobsdata,
        skillsdata: updatedskillsdata,
        isloading: false,
      })
    } else {
      this.setState({urlfail: true, isloading: false})
    }
  }

  renderloader = () => (
    <div className="loader-container loaderelement1" data-testid="loader">
      <Rings type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onclickjobdetailsretrybutton = () => this.getjobdetailsdata()

  renderjobdetailsdata = () => {
    const {jobdetailsdata, skillsdata} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      lifeatcompanydesc,
      lifeatcompanyimageurl,
      location,
      packageperannum,
      rating,
      title,
    } = jobdetailsdata

    return (
      <div className="jobcon2">
        <div className="job1">
          <img
            src={companyLogoUrl}
            alt="job details company logo"
            className="image1"
          />
          <div className="job2">
            <h1 className="jobheadingcon">{title}</h1>
            <div className="job1">
              <BsStar />
              <p className="jobparacon jobpara3">{rating}</p>
            </div>
          </div>
        </div>
        <div className="job3">
          <div className="job1">
            <div className="job1">
              <FaLocationDot />
              <p className="jobparacon jobpara3">{location}</p>
            </div>
            <div className="job1 margin1">
              <BsFillBriefcaseFill />
              <p className="jobparacon jobpara3">{employmentType}</p>
            </div>
          </div>
          <p className="jobparacon">{packageperannum}</p>
        </div>
        <hr className="lineseparator" />
        <div className="job3 margin2">
          <h1 className="jobheadingcon1">Description</h1>          
            <a
            href={companyWebsiteUrl}
            className="anchorelement"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit <FiExternalLink  />
          </a>
        </div>
        <p className="jobparacon">{jobDescription}</p>
        <h1 className="jobheadingcon1 ">Skills</h1>
        <ul className="skillcon">
          {skillsdata.map(eachskill => (
            <Skilldetails skilldetails={eachskill} key={eachskill.name} />
          ))}
        </ul>
        <h1 className="jobheadingcon1">Life at Company</h1>
        <div className="job4 ">
          <p className="jobparacon">{lifeatcompanydesc}</p>
          <img
            src={lifeatcompanyimageurl}
            alt="life at company"
            className="image2"
          />
        </div>
      </div>
    )
  }

  rendersimilarjobs = () => {
    const {similarjobsdata} = this.state
    return (
      <>
        <h1 className="jobheadingcon1">Similar Jobs</h1>
        <ul className="listconjob">
          {similarjobsdata.map(each => (
            <Similarjobs details={each} key={each.id} />
          ))}
        </ul>
      </>
    )
  }

  renderfailureview = () => (
    <div className="jobfailcon">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="jobfailimage"
      />
      <h1 className="jobfailheading">Oops! Something Went Wrong</h1>
      <p className="jobfailpara">
        We cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        className="retrybutton"
        onClick={this.onclickjobdetailsretrybutton}
      >
        Retry
      </button>
    </div>
  )

  render() {
    const {isloading, urlfail} = this.state
    const jobsbutton = urlfail ? (
      this.renderfailureview()
    ) : (
      <>
        {this.renderjobdetailsdata()}
        {this.rendersimilarjobs()}
      </>
    )
    return (
      <>
        <Header />
        <div className="jobcon1">
          {isloading ? this.renderloader() : jobsbutton}
        </div>
      </>
    )
  }
}
export default withRouter(Jobitemdetails)
