import {BsStar, BsFillBriefcaseFill} from 'react-icons/bs'
import { FaLocationDot } from "react-icons/fa6";
import './index.css'

const Similarjobs = props => {
  const {details} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = details
  return (
    <li className="simlicon">
      <div className="simcon">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="simimage"
        />
        <div className="simcon1">
          <h1 className="simheading">{title}</h1>
          <div className="simcon">
            <BsStar />
            <p className="simpara simmargin">{rating}</p>
          </div>
        </div>
      </div>
      <h1 className="simheading">Description</h1>
      <p className="simpara">{jobDescription}</p>
      <div className="simcon">
        <FaLocationDot />
        <p className="simpara simmargin">{location}</p>
        <div className="simcon simmargin1">
          <BsFillBriefcaseFill />
          <p className="simpara simmargin">{employmentType}</p>
        </div>
      </div>
    </li>
  )
}

export default Similarjobs
