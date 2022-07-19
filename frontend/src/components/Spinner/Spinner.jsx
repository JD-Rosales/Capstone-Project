import './Spinner.css';
import simple_spinner from '../../assets/simple_spinner.gif'

const Spinner = () => {
  return (
    <div className="simple_spinner">
      <img className='simple_spinner-image' src={simple_spinner} alt='Loading'></img>
    </div>
  )
}

export default Spinner