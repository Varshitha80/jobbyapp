import './index.css'

const Skilldetails = props => {
  const {skilldetails} = props
  const {imageUrl, name} = skilldetails
  return (
    <li className="skillcon1">
      <img src={imageUrl} alt={name} className="skillimage" />
      <p className="jobparacon margin1">{name}</p>
    </li>
  )
}

export default Skilldetails
