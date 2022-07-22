import './Sidebar.css'
import { Link, useNavigate} from 'react-router-dom'
import { CgLogOut } from 'react-icons/cg'

const Sidabar = (props) => {
  const navigate = useNavigate()

  const userData = JSON.parse(localStorage.getItem("userData"))

  const logout = () => {
    localStorage.clear()
    navigate('/login')
  }

  return (
    <div className='sidebar'>
      <div className='sidebar-header'>
        <span>Web-based E-Learning Sign Language Translator Game</span>

        {props.isAdmin === 'true' ? <span className='username'>Hi, {userData.username}!</span>: ""}
        {props.isAdmin === 'true' ? <span>(Administrator)</span>: ""}
      </div>

      <div className='games-list-container'>

        <button className='games-btn'>
          Manage Games
        </button>

        <div className='game-list-content'>
          <Link className='to-fingerspell' to='/administrator/finger-spell'>Finger Spell</Link>
          <Link className='to-spell-hand-sign' to='/administrator/spell-hand-sign'>Spell Hand Sign</Link>
        </div>

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