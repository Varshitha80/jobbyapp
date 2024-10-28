import './index.css'

const Checkbox = props => {
  const {checkboxdetails, onchangecheckbox, uncheckedcheckbox} = props
  const {employmentTypeId, label} = checkboxdetails

  const onchangecheckboxid = event => {
    if (event.target.checked) {
      const {id} = event.target
      onchangecheckbox(id)
    } else {
      const {id} = event.target
      uncheckedcheckbox(id)
    }
  }
  return (
    <li className="checkboxcon">
      <input
        type="checkbox"
        className="checkboxsize"
        id={employmentTypeId}
        onChange={onchangecheckboxid}
      />
      <label className="employmentlabeltext" htmlFor={employmentTypeId}>
        {label}
      </label>
    </li>
  )
}

export default Checkbox
