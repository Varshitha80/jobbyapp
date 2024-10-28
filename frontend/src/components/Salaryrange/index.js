import './index.css'

const Salaryrange = props => {
  const {salarydetails, onchangeradio} = props
  const {label, salaryRangeId} = salarydetails

  const onchangeradioid = event => {
    if (event.target.checked) {
      const {id} = event.target
      onchangeradio(id)
    }
  }

  return (
    <li className="checkboxcon1">
      <input
        type="radio"
        className="checkboxsize1"
        id={salaryRangeId}
        onChange={onchangeradioid}
        name="salary"
      />
      <label className="employmentlabeltext1" htmlFor={salaryRangeId}>
        {label}
      </label>
    </li>
  )
}

export default Salaryrange
