import './Admin.css'
import { useEffect, useState } from 'react'
import { useNavigate} from 'react-router-dom'
import axios from 'axios'
import Sidebar from '../../components/Sidebar/Sidebar'
import Card from '../../components/Card/Card'

const Admin = () => {

  const [user, setUser] = useState('')

  const API_URL = 'http://localhost:5000/verifyJWT'
  const navigate = useNavigate()

  const userData = JSON.parse(localStorage.getItem("userData"))

  useEffect(() => {
    const verifyJWT = async () => {
    
      axios.get(API_URL, {
        headers: { Authorization: `Bearer ${userData.token}` }
      }).then((res) => {
        if(res.data.isAuthorized === true){
          setUser(userData.username)
        } else {
          localStorage.clear()
          navigate('/unauthorized')
        }
      }).catch((err) => {
        console.log(err)
        localStorage.clear()
        navigate('/unauthorized')
      })
    }
    
    if(localStorage.length === 0){
      navigate('/unauthorized')
    } else {
      return () => verifyJWT()
    }

  }, [navigate, userData.token, userData.username])

  return (
    <div className='administrator'>
      <Sidebar
        isAdmin='true'
        user={user}
      />

      <div className='main'>
        <Card className='card'/>
      </div>
    </div>
  )
}

export default Admin