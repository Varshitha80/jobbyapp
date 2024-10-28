import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import {Rings} from 'react-loader-spinner'
import Header from '../Header'
import Jobdetails from '../Jobdetails'
import Checkbox from '../Checkbox'
import Salaryrange from '../Salaryrange'
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

class Jobs extends Component {
  state = {
    profiledata: [],
    checkboxid: [],
    radioid: '',
    jobslist: [],
    searchinput: '',
    profileerror: false,
    isloadingjobs: true,
    jobsfound: true,
    joberror: false,
    isloadingprofile: true,
  }

  componentDidMount() {
    this.getprofiledata()
    this.getjobslist()
  }

  getprofiledata = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const url = '/api/profile'
    const options = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedprofiledata = {
        name: data.username,
        profileImageUrl: data.profile_image_url,
        shortBio: data.short_bio,
      }
      this.setState({
        profiledata: updatedprofiledata,
        profileerror: false,
        isloadingprofile: false,
      })
    } else {
      this.setState({profileerror: true, isloadingprofile: false})
    }
  }

  renderprofilefailure = () => (
    <button type="button" className="retrybutton">
      Retry
    </button>
  )

  renderprofile = () => {
    const {profiledata} = this.state
    const {name, profileImageUrl, shortBio} = profiledata
    return (
      <div className="profilecon">
        <img src={profileImageUrl} alt="profile" className="profileimage" />
        <h1 className="profileheading">{name}</h1>
        <p className="profilepara">{shortBio}</p>
      </div>
    )
  }

  getjobslist = async () => {
    const {checkboxid, radioid, searchinput} = this.state
    let updated = ''
    updated = [...checkboxid].join(',')
    const jwtToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhaHVsIiwicm9sZSI6IlBSSU1FX1VTRVIiLCJpYXQiOjE2MjMwNjU1MzJ9.D13s5wN3Oh59aa_qtXMo3Ec4wojOx0EZh8Xr5C5sRkU"
    const url = `https://apis.ccbp.in/jobs?employment_type=${updated}&minimum_package=${radioid}&search=${searchinput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedjobsdata = data.jobs.map(eachjob => ({
        companyLogoUrl: eachjob.company_logo_url,
        employmentType: eachjob.employment_type,
        id: eachjob.id,
        jobDescription: eachjob.job_description,
        location: eachjob.location,
        packagePerAnnum: eachjob.package_per_annum,
        rating: eachjob.rating,
        title: eachjob.title,
      }))
      if (updatedjobsdata.length !== 0) {
        this.setState({jobslist: updatedjobsdata, isloadingjobs: false})
      } else {
        this.setState({jobsfound: false, isloadingjobs: false})
      }
    } else {
      this.setState({joberror: true, isloadingjobs: false})
    }
  }

  renderisloading = () => (
    <div className="loader-container loadcon" data-testid="loader">
      <Rings type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderjobsfailure = () => (
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
      <button type="button" className="retrybutton">
        Retry
      </button>
    </div>
  )

  onchangecheckbox = id =>
    this.setState(
      prevstate => ({checkboxid: [...prevstate.checkboxid, id]}),
      this.getjobslist,
    )

  uncheckedcheckbox = id =>
    this.setState(
      prevstate => ({
        checkboxid: prevstate.checkboxid.filter(each => each !== id),
      }),
      this.getjobslist,
    )

  onchangeradio = id => this.setState({radioid: id}, this.getjobslist)

  onchangesearch = event =>
    this.setState({searchinput: event.target.value}, this.getjobslist)

  renderemploymenttypes = () => (
    <div className="employmenttypescon">
      <h1 className="employmentheading">Type of Employment</h1>
      <ul className="listcon1">
        {employmentTypesList.map(each => (
          <Checkbox
            checkboxdetails={each}
            key={each.employmentTypeId}
            onchangecheckbox={this.onchangecheckbox}
            uncheckedcheckbox={this.uncheckedcheckbox}
          />
        ))}
      </ul>
    </div>
  )

  rendersalaryranges = () => (
    <div className="employmenttypescon">
      <h1 className="employmentheading">Salary Range</h1>
      <ul className="listcon1">
        {salaryRangesList.map(each1 => (
          <Salaryrange
            salarydetails={each1}
            key={each1.salaryRangeId}
            onchangeradio={this.onchangeradio}
          />
        ))}
      </ul>
    </div>
  )

  renderjobs = () => {
    const {jobslist} = this.state
    return (
      <ul className="jobslistcon">
        {jobslist.map(eachlist => (
          <Jobdetails details={eachlist} key={eachlist.id} />
        ))}
      </ul>
    )
  }

  renderjobnotfound = () => (
    <div className="jobfailcon">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="jobfailimage"
      />
      <h1 className="jobfailheading">No Jobs Found</h1>
      <p className="jobfailpara">
        We could not find any jobs.Try other filters.
      </p>
    </div>
  )

  render() {
    const {
      searchinput,
      profileerror,
      isloadingjobs,
      jobsfound,
      joberror,
      isloadingprofile,
    } = this.state
    let authbutton
    if (jobsfound) {
      authbutton = this.renderjobs()
    } else {
      authbutton = this.renderjobnotfound()
    }
    const authbutton1 = joberror ? this.renderjobsfailure() : authbutton
    const isloadingprofile1 = isloadingprofile
      ? this.renderisloading()
      : this.renderprofile()
    return (
      <div>
        <Header />
        <div className="jobscon">
          <div className="con1">
            {profileerror ? this.renderprofilefailure() : isloadingprofile1}
            <div>
              <hr className="horizontalline" />
            </div>
            {this.renderemploymenttypes()}
            <div>
              <hr className="horizontalline" />
            </div>
            {this.rendersalaryranges()}
          </div>
          <div className="con2">
            <div className="inputcon">
              <input
                type="search"
                placeholder="Search"
                className="searchelement"
                onChange={this.onchangesearch}
                value={searchinput}
              />
              <button
                type="button"
                className="button"
                data-testid="searchButton"
                label="searchicon"
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            {isloadingjobs ? this.renderisloading() : authbutton1}
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
