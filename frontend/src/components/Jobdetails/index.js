import {BsStar, BsFillBriefcaseFill} from 'react-icons/bs'
import { FaLocationDot } from "react-icons/fa6";
import {Link} from 'react-router-dom'
import './index.css'

const Jobdetails = props => {
  const {details} = props
  const {
    id,
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = details

  return (
    <Link to={`/jobs/${id}`} className="linkcon">
      <li className="detailslistcon">
        <div className="jobdetails1">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="companylogo"
          />
          <div className="Jobdetails2">
            <h1 className="jobheading">{title}</h1>
            <div className="jobdetails1">
              <BsStar />
              <p className="jobpara para3">{rating}</p>
            </div>
          </div>
        </div>
        <div className="jobdetails3">
          <div className="jobdetails1">
            <div className="jobdetails1">
              <FaLocationDot />
              <p className="jobpara para3">{location}</p>
            </div>
            <div className="jobdetails1 para1">
              <BsFillBriefcaseFill />
              <p className="jobpara para3">{employmentType}</p>
            </div>
          </div>
          <p className="jobheading">{packagePerAnnum}</p>
        </div>
        <hr className="horizontalline1" />
        <div className="Jobdetails2">
          <h1 className="jobheading1">Description</h1>
          <p className="jobpara para2">{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}

export default Jobdetails
