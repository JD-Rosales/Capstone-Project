import './Admin.css'
import { useEffect } from 'react'
import { useNavigate} from 'react-router-dom'
import axios from 'axios'

const Admin = () => {

  const API_URL = 'http://localhost:5000/verifyJWT'
  const navigate = useNavigate()

  useEffect(() => {
    const verifyJWT = async () => {
      const userData = JSON.parse(localStorage.getItem("userData"))
    
      axios.get(API_URL, {
        headers: { Authorization: `Bearer ${userData.token}` }
      }).then((res) => {
        console.log(res.data)
      }).catch((err) => {
        console.log(err)
        navigate('/unauthorized')
      })
    }
    
    if(localStorage.length === 0){
      navigate('/unauthorized')
    } else {
      return () => verifyJWT()
    }

  }, [navigate])

  return (
    <div>Admin</div>
  )
}

export default Admin