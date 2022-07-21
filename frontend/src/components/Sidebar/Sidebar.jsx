import './Sidebar.css'
import { useNavigate} from 'react-router-dom'
import { CgLogOut } from 'react-icons/cg'

const Sidabar = (props) => {
  const navigate = useNavigate()

  const logout = () => {
    localStorage.clear()
    navigate('/login')
  }

  return (
    <div className='sidebar'>
      <div className='sidebar-header'>
        <span>Web-based E-Learning Sign Language Translator Game</span>

        {props.isAdmin === 'true' ? <span className='username'>Hi, {props.user}!</span>: ""}
        {props.isAdmin === 'true' ? <span>(Administrator)</span>: ""}
      </div>

      { props.isAdmin === 'true' ? 
        <button className='logout-btn' onClick={logout}>
        <span><CgLogOut /></span>
        Logout
        </button>
        : ""
      }
    </div>
  )
}

export default Sidabar